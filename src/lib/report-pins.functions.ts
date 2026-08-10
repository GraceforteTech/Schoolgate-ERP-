import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// We use "as any" for table names because the Supabase types are not yet updated 
// with the new tables, causing TS build errors. The logic is verified via E2E tests.

export const generateReportPins = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({
    tenantId: z.string().uuid(),
    students: z.array(z.string()),
    sessionId: z.string(),
    termId: z.string(),
    classId: z.string(),
    usageLimit: z.number().nullable(),
    expiresAt: z.string().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    const pins = data.students.map(studentId => ({
      tenant_id: data.tenantId,
      student_id: studentId,
      session_id: data.sessionId,
      term_id: data.termId,
      class_id: data.classId,
      pin_code: Math.floor(100000 + Math.random() * 900000).toString(),
      usage_limit: data.usageLimit,
      expires_at: data.expiresAt || null,
      status: 'active'
    }));

    const { data: inserted, error } = await (supabaseAdmin
      .from('report_pins' as any) as any)
      .upsert(pins, { onConflict: 'tenant_id,student_id,session_id,term_id' })
      .select();

    if (error) throw new Error(`DB Error: ${error.message}`);
    return inserted as any[];
  });

export const redeemPin = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({
    pinCode: z.string(),
    tenantId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { data: result, error } = await supabaseAdmin.rpc('redeem_report_pin' as any, {
      _pin_code: data.pinCode,
      _tenant_id: data.tenantId
    });

    if (error) throw new Error(error.message);
    return result as { success: boolean; student_id?: string; error?: string };
  });

export const togglePinStatus = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({
    pinId: z.string().uuid(),
    status: z.enum(['active', 'deactivated'])
  }).parse(data))
  .handler(async ({ data }) => {
    const { data: updated, error } = await (supabaseAdmin
      .from('report_pins' as any) as any)
      .update({ status: data.status, updated_at: new Date().toISOString() })
      .eq('id', data.pinId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return updated;
  });

export const bulkDeactivatePins = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({
    tenantId: z.string().uuid(),
    classId: z.string(),
    sessionId: z.string(),
    termId: z.string()
  }).parse(data))
  .handler(async ({ data }) => {
    const { error } = await (supabaseAdmin
      .from('report_pins' as any) as any)
      .update({ status: 'deactivated', updated_at: new Date().toISOString() })
      .match({
        tenant_id: data.tenantId,
        class_id: data.classId,
        session_id: data.sessionId,
        term_id: data.termId
      });

    if (error) throw new Error(error.message);
    return { success: true };
  });
