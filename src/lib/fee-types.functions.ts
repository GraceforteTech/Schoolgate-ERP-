import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getFeeTypesRegistry = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({
    tenantId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Fetch Fee Types
    const { data: feeTypes, error: feeTypesError } = await supabaseAdmin
      .from('fee_types')
      .select('*')
      .eq('tenant_id', data.tenantId)
      .order('created_at', { ascending: false });

    if (feeTypesError) throw new Error(feeTypesError.message);

    // 2. Fetch Aggregated Assignment Stats for these Fee Types
    // We want to know how many students are assigned to each fee type and total expected revenue
    const { data: feeStats, error: statsError } = await supabaseAdmin
      .from('student_fees')
      .select('fee_type_id, student_id, amount_due')
      .eq('tenant_id', data.tenantId);

    if (statsError) throw new Error(statsError.message);

    // Group stats by fee_type_id
    const statsMap: Record<string, { count: number; expected: number }> = {};
    (feeStats || []).forEach((f: any) => {
      if (!f.fee_type_id) return;
      if (!statsMap[f.fee_type_id]) statsMap[f.fee_type_id] = { count: 0, expected: 0 };
      const current = statsMap[f.fee_type_id]!;
      current.count += 1;
      current.expected += Number(f.amount_due);
    });

    // 3. Overall Registry Summary
    const totalFeeTypes = feeTypes?.length || 0;
    const activeFeeTypes = feeTypes?.filter((f: any) => f.is_active).length || 0;
    const totalExpectedRevenue = (feeStats || []).reduce((sum: number, f: any) => sum + Number(f.amount_due), 0) || 0;
    const totalAssignedFees = feeStats?.length || 0;

    return {
      feeTypes: (feeTypes || []).map((f: any) => ({
        ...f,
        studentsAssigned: statsMap[f.id]?.count || 0,
        expectedRevenue: statsMap[f.id]?.expected || 0
      })),
      summary: {
        totalFeeTypes,
        activeFeeTypes,
        archivedFeeTypes: totalFeeTypes - activeFeeTypes,
        totalAssignedFees,
        totalExpectedRevenue
      }
    };
  });

export const createFeeType = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    name: z.string(),
    description: z.string().optional(),
    category: z.string(),
    amount: z.number().nonnegative(),
    session: z.string(),
    term: z.string(),
    applicableClasses: z.array(z.string()),
    isMandatory: z.boolean().default(true),
    isRecurring: z.boolean().default(true),
    isActive: z.boolean().default(true),
    userId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // Check for duplicate name in same tenant
    const { data: existing } = await supabaseAdmin
      .from('fee_types')
      .select('id')
      .eq('tenant_id', data.tenantId)
      .eq('name', data.name)
      .maybeSingle();

    if (existing) throw new Error(`A fee type with the name "${data.name}" already exists.`);

    const { data: feeType, error } = await supabaseAdmin
      .from('fee_types')
      .insert({
        tenant_id: data.tenantId,
        name: data.name,
        description: data.description,
        category: data.category,
        amount: data.amount,
        academic_session: data.session,
        term: data.term,
        applicable_classes: data.applicableClasses,
        is_mandatory: data.isMandatory,
        is_recurring: data.isRecurring,
        is_active: data.isActive,
        created_by: data.userId
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return feeType;
  });

export const updateFeeTypeStatus = createServerFn({ method: "POST" })
  .validator((data: { id: string; isActive: boolean; tenantId: string }) => z.object({
    id: z.string().uuid(),
    isActive: z.boolean(),
    tenantId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from('fee_types')
      .update({ is_active: data.isActive, updated_at: new Date().toISOString() })
      .eq('id', data.id)
      .eq('tenant_id', data.tenantId);
    
    if (error) throw new Error(error.message);
    return { success: true };
  });
