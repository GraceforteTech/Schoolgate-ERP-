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
    academic_session: z.string().optional(),
    term: z.string().optional(),
    type: z.enum(['credit', 'fee_payment']).default('credit'),
    createdBy: z.string().uuid()
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
        academic_session: data.academic_session,
        term: data.term,
        created_by: data.createdBy,
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
        const feeQuery = supabaseAdmin
            .from('student_fees')
            .select('*')
            .eq('student_id', transaction.student_id);
            
        if (transaction.academic_session) feeQuery.eq('academic_session', transaction.academic_session);
        if (transaction.term) feeQuery.eq('term', transaction.term);
        if (transaction.fee_type_id) feeQuery.eq('fee_type_id', transaction.fee_type_id);

        const { data: fees } = await feeQuery;

        if (fees && fees.length > 0) {
            // If multiple fees match and no specific fee_type_id was provided, 
            // we distribute the payment among unpaid fees for that session/term
            let remainingPayment = Number(transaction.amount);
            
            for (const fee of fees) {
                if (remainingPayment <= 0) break;
                
                const outstanding = Number(fee.total_amount) - Number(fee.amount_paid);
                if (outstanding <= 0) continue;
                
                const paymentForThisFee = Math.min(remainingPayment, outstanding);
                const newAmountPaid = Number(fee.amount_paid) + paymentForThisFee;
                const totalAmount = Number(fee.total_amount);
                let status = 'partially_paid';
                if (newAmountPaid >= totalAmount) {
                    status = 'paid';
                }
                
                await (supabaseAdmin
                    .from('student_fees')
                    .update({ 
                        amount_paid: newAmountPaid,
                        status: status
                    })
                    .eq('id', fee.id));
                    
                remainingPayment -= paymentForThisFee;
            }
        }
    }

    return { success: true };
  });

export const rejectTransaction = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    transactionId: z.string().uuid(),
    adminId: z.string().uuid(),
    reason: z.string().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { error } = await (supabaseAdmin
      .from('transactions')
      .update({
        status: 'rejected',
        rejected_by: data.adminId,
        rejected_at: new Date().toISOString(),
        description: data.reason ? `REJECTED: ${data.reason}` : 'REJECTED'
      })
      .eq('id', data.transactionId)
      .eq('status', 'pending'));

    if (error) throw new Error(`Rejection failed: ${error.message}`);
    return { success: true };
  });
