import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

export const recordExpense = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) => z.object({
    tenantId: z.string().uuid(),
    category: z.string().trim().min(2).max(80),
    amount: z.number().positive().max(1_000_000_000),
    description: z.string().trim().max(1000).optional(),
    vendor: z.string().trim().max(160).optional(),
    method: z.enum(['card', 'bank_transfer', 'cash', 'cheque', 'wallet']).optional(),
    reference: z.string().trim().max(120).optional(),
    date: z.string().optional(),
  }).parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Tenant isolation: the caller must be an active member of this school
    const { data: membership } = await supabase
      .from('memberships')
      .select('id')
      .eq('tenant_id', data.tenantId)
      .eq('user_id', userId)
      .eq('is_active', true)
      .maybeSingle();

    if (!membership) throw new Error("You do not have access to this school");

    const { data: expense, error } = await supabase
      .from('expenses')
      .insert({
        tenant_id: data.tenantId,
        category: data.category,
        amount: data.amount,
        description: data.description ?? null,
        vendor_payee: data.vendor ?? null,
        method: data.method ?? null,
        reference: data.reference ?? null,
        date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
        created_by: userId,
        status: 'pending',
      })
      .select('id')
      .single();

    if (error) throw new Error(`Expense recording failed: ${error.message}`);
    return { success: true, expenseId: expense.id };
  });

export const getSchoolFinancialSummary = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({
    tenantId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { data: revenue } = await (supabaseAdmin
      .from('transactions')
      .select('amount')
      .eq('tenant_id', data.tenantId)
      .eq('status', 'approved'));

    const { data: expenses } = await (supabaseAdmin
      .from('expenses')
      .select('amount, category')
      .eq('tenant_id', data.tenantId)
      .eq('status', 'approved'));

    return { 
      totalRevenue: revenue?.reduce((sum: number, t: any) => sum + Number(t.amount), 0) || 0,
      totalExpenses: expenses?.reduce((sum: number, e: any) => sum + Number(e.amount), 0) || 0,
      expenseBreakdown: expenses
    };
  });

export const approveExpense = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: any) => z.object({
    expenseId: z.string().uuid(),
    adminId: z.string().uuid().optional(),
    status: z.enum(['approved', 'rejected']),
    notes: z.string().optional()
  }).parse(data))
  .handler(async ({ data, context }) => {
    // RLS restricts this update to admins/bursars of the expense's tenant
    const { error } = await context.supabase
      .from('expenses')
      .update({
        status: data.status,
        approved_by: context.userId,
        approved_at: new Date().toISOString(),
      })
      .eq('id', data.expenseId);

    if (error) throw new Error(`Expense update failed: ${error.message}`);
    return { success: true };
  });
