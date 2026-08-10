import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

/** Search students inside the caller's school (RLS-scoped). */
export const searchStudentsForPosting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({
    tenantId: z.string().uuid(),
    search: z.string().trim().min(1).max(120),
  }).parse(data))
  .handler(async ({ data, context }) => {
    const term = data.search.replace(/[%,()]/g, "");
    const { data: students, error } = await context.supabase
      .from("students")
      .select("id, full_name, admission_number, class_id, status, parent_id")
      .eq("tenant_id", data.tenantId)
      .or(`full_name.ilike.%${term}%,admission_number.ilike.%${term}%`)
      .limit(10);

    if (error) throw new Error(error.message);
    return students ?? [];
  });

/** Post/adjust an individual student's fee record for a session + term. */
export const saveManualFeePosting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({
    tenantId: z.string().uuid(),
    studentId: z.string().uuid(),
    academicSession: z.string().trim().min(4).max(20),
    term: z.string().trim().min(3).max(30),
    classId: z.string().trim().min(1).max(60),
    fees: z.number().min(0).max(1_000_000_000),
    broughtForward: z.number().min(0).max(1_000_000_000),
    discount: z.number().min(0).max(1_000_000_000),
    reason: z.string().trim().max(160).optional(),
    notes: z.string().trim().max(1000).optional(),
  }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Only school admins/owners or bursars may adjust fee records
    const [{ data: isAdmin }, { data: isBursar }] = await Promise.all([
      supabase.rpc("can_admin_tenant", { _user_id: userId, _tenant_id: data.tenantId }),
      supabase.rpc("has_role", { _user_id: userId, _tenant_id: data.tenantId, _role: "bursar" }),
    ]);
    if (!isAdmin && !isBursar) throw new Error("You are not permitted to post fees for this school");

    if (data.discount > 0 && !data.reason) throw new Error("A discount category is required");

    const amountDue = data.fees + data.broughtForward - data.discount;
    if (amountDue < 0) throw new Error("Discount cannot exceed total fees");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("student_fees")
      .select("id")
      .eq("tenant_id", data.tenantId)
      .eq("student_id", data.studentId)
      .eq("academic_session", data.academicSession)
      .eq("term", data.term)
      .is("fee_type_id", null)
      .maybeSingle();

    const payload = {
      tenant_id: data.tenantId,
      student_id: data.studentId,
      fee_type_id: null,
      academic_session: data.academicSession,
      term: data.term,
      class_id: data.classId,
      amount_due: amountDue,
      waived_amount: data.discount,
      adjustment_amount: data.broughtForward,
      adjustment_reason: [data.reason, data.notes].filter(Boolean).join(" — ") || null,
      adjusted_by: userId,
      updated_at: new Date().toISOString(),
    };

    const { data: row, error } = existing
      ? await supabaseAdmin.from("student_fees").update(payload).eq("id", existing.id).select("id").single()
      : await supabaseAdmin.from("student_fees").insert(payload).select("id").single();

    if (error) throw new Error(`Fee posting failed: ${error.message}`);
    return { success: true, feeId: row.id, amountDue };
  });
