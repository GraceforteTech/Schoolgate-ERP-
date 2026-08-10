import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const logAuditAction = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    userId: z.string().uuid().optional(),
    userName: z.string().optional(),
    userRole: z.enum([
      "platform_admin", "school_owner", "school_admin", "bursar", 
      "principal", "teacher", "staff", "parent", "student"
    ]).optional(),
    action: z.string(),
    entityType: z.string(),
    entityId: z.string(),
    description: z.string().optional(),
    oldValues: z.any().optional(),
    newValues: z.any().optional(),
    metadata: z.any().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { error } = await supabaseAdmin
      .from('audit_logs')
      .insert({
        tenant_id: data.tenantId,
        user_id: data.userId,
        user_name: data.userName,
        user_role: data.userRole as any,
        action: data.action,
        entity_type: data.entityType,
        entity_id: data.entityId,
        description: data.description,
        old_values: data.oldValues,
        new_values: data.newValues,
        metadata: data.metadata
      });

    if (error) console.error("Audit log failed:", error.message);
    return { success: !error };
  });

export const bulkAssignFees = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    feeTypeId: z.string().uuid(),
    studentIds: z.array(z.string().uuid()),
    academicSession: z.string(),
    term: z.string(),
    amount: z.number().nonnegative(),
    userId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // Fetch students to get their class_ids
    const { data: students } = await supabaseAdmin
      .from('students')
      .select('id, class_id')
      .in('id', data.studentIds)
      .eq('tenant_id', data.tenantId);

    if (!students || students.length === 0) throw new Error("No valid students found.");

    const assignments = students.map(s => ({
      tenant_id: data.tenantId,
      student_id: s.id,
      fee_type_id: data.feeTypeId,
      academic_session: data.academicSession,
      term: data.term,
      class_id: s.class_id,
      amount_due: data.amount,
      status: 'unpaid'
    }));

    const { error } = await supabaseAdmin
      .from('student_fees')
      .upsert(assignments, { 
        onConflict: 'tenant_id,student_id,fee_type_id,academic_session,term',
        ignoreDuplicates: true // Business rule: Prevent accidental duplicates
      });

    if (error) throw new Error(error.message);

    // Log audit
    await logAuditAction({
        data: {
            tenantId: data.tenantId,
            userId: data.userId,
            action: 'BULK_FEE_ASSIGN',
            entityType: 'student_fees',
            entityId: data.feeTypeId,
            description: `Bulk assigned fee type to ${data.studentIds.length} students.`,
            metadata: { studentCount: data.studentIds.length, amount: data.amount }
        }
    });

    return { success: true, count: assignments.length };
  });

export const bulkWaiverAdjustment = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    feeAssignmentIds: z.array(z.string().uuid()),
    type: z.enum(['waiver', 'adjustment']),
    amount: z.number().nonnegative(), // Amount to waive or adjust
    reason: z.string().min(3),
    userId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Fetch current records to check for payments
    const { data: records } = await supabaseAdmin
      .from('student_fees')
      .select('*')
      .in('id', data.feeAssignmentIds)
      .eq('tenant_id', data.tenantId);

    if (!records) throw new Error("Records not found.");

    const results = { successful: 0, failed: 0, skipped: 0, reasons: [] as string[] };

    for (const record of records) {
      // Protection: Don't modify if payments exist (unless business rules allow partial adjustment)
      if ((record.amount_paid || 0) > 0 && data.type === 'waiver') {
         results.skipped++;
         results.reasons.push(`${record.id}: Already has payments.`);
         continue;
      }

      const updates: any = {
        updated_at: new Date().toISOString(),
        adjustment_reason: data.reason,
        adjusted_by: data.userId
      };

      if (data.type === 'waiver') {
        updates.waived_amount = data.amount;
        // Logic: new amount_due could be adjusted if we want, but usually waivers are separate tracked fields
      } else {
        updates.adjustment_amount = data.amount;
      }

      const { error } = await supabaseAdmin
        .from('student_fees')
        .update(updates)
        .eq('id', record.id);

      if (error) {
        results.failed++;
        results.reasons.push(`${record.id}: ${error.message}`);
      } else {
        results.successful++;
      }
    }

    // Log audit
    await logAuditAction({
        data: {
            tenantId: data.tenantId,
            userId: data.userId,
            action: `BULK_${data.type.toUpperCase()}`,
            entityType: 'student_fees',
            entityId: 'multiple',
            description: `Bulk ${data.type} applied to ${results.successful} records. Reason: ${data.reason}`,
            metadata: { successful: results.successful, failed: results.failed, amount: data.amount }
        }
    });

    return results;
  });

export const getAuditLogs = createServerFn({ method: "GET" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    filters: z.object({
        userId: z.string().uuid().optional(),
        action: z.string().optional(),
        entityType: z.string().optional(),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional()
    }).optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let query = supabaseAdmin
      .from('audit_logs')
      .select('*')
      .eq('tenant_id', data.tenantId)
      .order('created_at', { ascending: false });

    if (data.filters?.userId) query = query.eq('user_id', data.filters.userId);
    if (data.filters?.action) query = query.ilike('action', `%${data.filters.action}%`);
    if (data.filters?.entityType) query = query.eq('entity_type', data.filters.entityType);
    if (data.filters?.dateFrom) query = query.gte('created_at', data.filters.dateFrom);
    if (data.filters?.dateTo) query = query.lte('created_at', data.filters.dateTo);

    const { data: logs, error } = await query.limit(100);
    if (error) throw new Error(error.message);
    return logs;
  });
