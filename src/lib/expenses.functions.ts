import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const recordExpense = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    tenantId: z.string().uuid(),
    category: z.string(),
    amount: z.number().positive(),
    description: z.string().optional(),
    vendor: z.string().optional(),
    method: z.enum(['card', 'bank_transfer', 'cash', 'cheque', 'wallet']).optional(),
    reference: z.string().optional(),
    userId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { data: expense, error } = await (supabaseAdmin
      .from('expenses')
      .insert({
        tenant_id: data.tenantId,
        category: data.category,
        amount: data.amount,
        description: data.description,
        vendor_payee: data.vendor,
        method: data.method,
        reference: data.reference,
        created_by: data.userId,
        status: 'pending'
      })
      .select()
      .single());

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
