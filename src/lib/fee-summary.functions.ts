import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getFeeSummaryStats = createServerFn({ method: "GET" })
  .validator((data: { 
    tenantId: string;
    academicSession?: string;
    term?: string;
    classId?: string;
  }) => z.object({
    tenantId: z.string().uuid(),
    academicSession: z.string().optional(),
    term: z.string().optional(),
    classId: z.string().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let query = supabaseAdmin
      .from('student_fees')
      .select('amount_due, amount_paid, status, student_id')
      .eq('tenant_id', data.tenantId);

    if (data.academicSession) query = query.eq('academic_session', data.academicSession);
    if (data.term) query = query.eq('term', data.term);
    if (data.classId) query = query.eq('class_id', data.classId);

    const { data: fees, error } = await query;
    if (error) throw new Error(error.message);

    const totalFeesBilled = fees?.reduce((sum, f) => sum + Number(f.amount_due), 0) || 0;
    const totalCollected = fees?.reduce((sum, f) => sum + Number(f.amount_paid), 0) || 0;
    const totalOutstanding = totalFeesBilled - totalCollected;
    const paymentRate = totalFeesBilled > 0 ? (totalCollected / totalFeesBilled) * 100 : 0;

    const uniqueStudents = new Set(fees?.map(f => f.student_id)).size;
    const paidStudents = new Set(fees?.filter(f => f.status === 'paid').map(f => f.student_id)).size;
    const partiallyPaidStudents = new Set(fees?.filter(f => f.status === 'partially_paid').map(f => f.student_id)).size;
    const unpaidStudents = uniqueStudents - paidStudents - partiallyPaidStudents;

    // Fetch pending payments (transactions)
    let txQuery = supabaseAdmin
      .from('transactions')
      .select('amount')
      .eq('tenant_id', data.tenantId)
      .eq('status', 'pending')
      .eq('type', 'fee_payment');
    
    if (data.academicSession) txQuery = txQuery.eq('academic_session', data.academicSession);
    if (data.term) txQuery = txQuery.eq('term', data.term);

    const { data: pendingTxs } = await txQuery;
    const pendingPaymentsValue = pendingTxs?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;

    return {
      totalFeesBilled,
      totalCollected,
      totalOutstanding,
      paymentRate,
      pendingPaymentsValue,
      paidStudents,
      partiallyPaidStudents,
      unpaidStudents,
      totalStudents: uniqueStudents
    };
  });
