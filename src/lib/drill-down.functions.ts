import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const drillDownSchema = z.object({
  tenantId: z.string().uuid(),
  type: z.enum([
    'total_students', 
    'total_fees_billed', 
    'total_collected', 
    'outstanding_fees', 
    'pending_payments', 
    'paid_students', 
    'partially_paid_students', 
    'unpaid_students', 
    'total_expenses'
  ]),
  filters: z.object({
    session: z.string().optional(),
    term: z.string().optional(),
    classId: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional()
  }).optional(),
  page: z.number().default(1),
  pageSize: z.number().default(20)
});

export const getDrillDownData = createServerFn({ method: "GET" })
  .validator((data: any) => drillDownSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const offset = (data.page - 1) * data.pageSize;
    
    let result: { data: any[], count: number } = { data: [], count: 0 };

    switch (data.type) {
      case 'total_students':
      case 'paid_students':
      case 'partially_paid_students':
      case 'unpaid_students': {
        let query = supabaseAdmin
          .from('students')
          .select('*, memberships!inner(tenant_id)', { count: 'exact' })
          .eq('memberships.tenant_id', data.tenantId);
        
        if (data.filters?.classId) query = query.eq('class_id', data.filters.classId);

        // For paid/unpaid, we need to join with student_fees
        if (['paid_students', 'partially_paid_students', 'unpaid_students'].includes(data.type)) {
          const status = data.type === 'paid_students' ? 'paid' : 
                         data.type === 'partially_paid_students' ? 'partially_paid' : 'unpaid';
          
          // Get distinct student IDs with that status first to be efficient
          let feeQuery = supabaseAdmin
            .from('student_fees')
            .select('student_id')
            .eq('tenant_id', data.tenantId)
            .eq('status', status);
          
          if (data.filters?.session) feeQuery = feeQuery.eq('academic_session', data.filters.session);
          if (data.filters?.term) feeQuery = feeQuery.eq('term', data.filters.term);

          const { data: feeData } = await feeQuery;
          const studentIds = Array.from(new Set((feeData || []).map((f: any) => f.student_id)));
          
          if (studentIds.length > 0) {
            query = query.in('id', studentIds);
          } else {
            return { data: [], count: 0 };
          }
        }

        const { data: students, count, error } = await query
          .range(offset, offset + data.pageSize - 1)
          .order('first_name', { ascending: true });
        
        if (error) throw new Error(error.message);
        result = { data: students || [], count: count || 0 };
        break;
      }

      case 'total_fees_billed':
      case 'outstanding_fees': {
        let query = supabaseAdmin
          .from('student_fees')
          .select('*, students(first_name, last_name, admission_no), fee_types(name)', { count: 'exact' })
          .eq('tenant_id', data.tenantId);

        if (data.filters?.session) query = query.eq('academic_session', data.filters.session);
        if (data.filters?.term) query = query.eq('term', data.filters.term);
        if (data.filters?.classId) query = query.eq('class_id', data.filters.classId);
        
        if (data.type === 'outstanding_fees') {
          query = query.or('status.eq.unpaid,status.eq.partially_paid');
        }

        const { data: fees, count, error } = await query
          .range(offset, offset + data.pageSize - 1)
          .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        result = { data: fees || [], count: count || 0 };
        break;
      }

      case 'total_collected':
      case 'pending_payments': {
        let query = supabaseAdmin
          .from('transactions')
          .select('*, students(first_name, last_name, admission_no)', { count: 'exact' })
          .eq('tenant_id', data.tenantId)
          .eq('type', 'fee_payment');

        const status = data.type === 'total_collected' ? 'approved' : 'pending';
        query = query.eq('status', status);

        if (data.filters?.session) query = query.eq('academic_session', data.filters.session);
        if (data.filters?.term) query = query.eq('term', data.filters.term);

        const { data: txs, count, error } = await query
          .range(offset, offset + data.pageSize - 1)
          .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        result = { data: txs || [], count: count || 0 };
        break;
      }

      case 'total_expenses': {
        let query = supabaseAdmin
          .from('expenses')
          .select('*', { count: 'exact' })
          .eq('tenant_id', data.tenantId);

        const { data: expenses, count, error } = await query
          .range(offset, offset + data.pageSize - 1)
          .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        result = { data: expenses || [], count: count || 0 };
        break;
      }
    }

    return result;
  });
