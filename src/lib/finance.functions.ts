import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getStudentFinanceProfile = createServerFn({ method: "GET" })
  .validator((data: { studentId: string; tenantId: string }) => z.object({
    studentId: z.string().uuid(),
    tenantId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // Fetch Wallet
    const { data: wallet } = await (supabaseAdmin
      .from('student_wallets')
      .select('*')
      .eq('student_id', data.studentId)
      .eq('tenant_id', data.tenantId)
      .maybeSingle());

    // Fetch Fees
    const { data: fees } = await (supabaseAdmin
      .from('student_fees')
      .select('*, fee_types(*)')
      .eq('student_id', data.studentId)
      .eq('tenant_id', data.tenantId));

    // Fetch Recent Transactions
    const { data: transactions } = await (supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('student_id', data.studentId)
      .eq('tenant_id', data.tenantId)
      .order('created_at', { ascending: false })
      .limit(10));

    return { wallet, fees, transactions };
  });

export const processPayment = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    tenantId: z.string().uuid(),
    studentId: z.string().uuid(),
    walletId: z.string().uuid().optional(),
    amount: z.number().positive(),
    method: z.enum(['card', 'bank_transfer', 'cash', 'cheque', 'wallet']),
    description: z.string().optional(),
    reference: z.string().optional(),
    type: z.enum(['credit', 'fee_payment']).default('credit')
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Check for Duplicate Reference
    if (data.reference) {
      const { data: existing } = await (supabaseAdmin
        .from('transactions')
        .select('id')
        .eq('reference', data.reference)
        .eq('tenant_id', data.tenantId)
        .maybeSingle());
      
      if (existing) throw new Error(`Duplicate payment detected. Reference ${data.reference} already exists.`);
    }

    // 2. Create Transaction record (Pending by default)
    const { data: transaction, error } = await (supabaseAdmin
      .from('transactions')
      .insert({
        tenant_id: data.tenantId,
        student_id: data.studentId,
        wallet_id: data.walletId,
        amount: data.amount,
        method: data.method,
        type: data.type,
        status: 'pending',
        description: data.description,
        reference: data.reference,
        created_at: new Date().toISOString()
      })
      .select()
      .single());

    if (error) throw new Error(`Transaction failed: ${error.message}`);
    
    return { success: true, transactionId: transaction.id };
  });

export const approveTransaction = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    transactionId: z.string().uuid(),
    adminId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Get Transaction
    const { data: transaction } = await (supabaseAdmin
      .from('transactions')
      .select('*')
      .eq('id', data.transactionId)
      .single());

    if (!transaction) throw new Error("Transaction not found");
    if (transaction.status === 'approved') throw new Error("Transaction already approved");

    // 2. Update Status
    const { error } = await (supabaseAdmin
      .from('transactions')
      .update({
        status: 'approved',
        approved_by: data.adminId,
        approved_at: new Date().toISOString()
      })
      .eq('id', data.transactionId));

    if (error) throw new Error(`Approval failed: ${error.message}`);

    // 3. If it's a fee payment, update the student_fees record
    if (transaction.type === 'fee_payment') {
        const { data: currentFee } = await (supabaseAdmin
            .from('student_fees')
            .select('*')
            .eq('student_id', transaction.student_id)
            .eq('academic_session', transaction.academic_session || '2023/2024')
            .eq('term', transaction.term || 'First Term')
            .limit(1)
            .maybeSingle());

        if (currentFee) {
            await (supabaseAdmin
                .from('student_fees')
                .update({ amount_paid: Number(currentFee.amount_paid) + Number(transaction.amount) })
                .eq('id', currentFee.id));
        }
    }

    return { success: true };
  });
