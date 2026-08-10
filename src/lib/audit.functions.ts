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

export const getAuditLogs = createServerFn({ method: "GET" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    filters: z.object({
        userId: z.string().uuid().optional(),
        userRole: z.string().optional(),
        action: z.string().optional(),
        entityType: z.string().optional(),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
        searchTerm: z.string().optional(),
        academicSession: z.string().optional(),
        term: z.string().optional(),
        classId: z.string().uuid().optional(),
        studentId: z.string().uuid().optional()
    }).optional(),
    page: z.number().default(1),
    pageSize: z.number().default(50)
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let query = supabaseAdmin
      .from('audit_logs')
      .select('*', { count: 'exact' })
      .eq('tenant_id', data.tenantId)
      .order('created_at', { ascending: false });

    if (data.filters?.userId) query = query.eq('user_id', data.filters.userId);
    if (data.filters?.userRole) query = query.eq('user_role', data.filters.userRole);
    if (data.filters?.action) query = query.ilike('action', `%${data.filters.action}%`);
    if (data.filters?.entityType) query = query.eq('entity_type', data.filters.entityType);
    if (data.filters?.dateFrom) query = query.gte('created_at', data.filters.dateFrom);
    if (data.filters?.dateTo) query = query.lte('created_at', data.filters.dateTo);
    
    if (data.filters?.searchTerm) {
      query = query.or(`description.ilike.%${data.filters.searchTerm}%,action.ilike.%${data.filters.searchTerm}%,user_name.ilike.%${data.filters.searchTerm}%`);
    }

    const from = (data.page - 1) * data.pageSize;
    const to = from + data.pageSize - 1;
    
    const { data: logs, error, count } = await query.range(from, to);
    if (error) throw new Error(error.message);
    return { logs: logs || [], count: count || 0 };
  });

export const exportAuditLogs = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    userId: z.string().uuid(),
    userName: z.string().optional(),
    userRole: z.string().optional(),
    filters: z.object({
        userId: z.string().uuid().optional(),
        userRole: z.string().optional(),
        action: z.string().optional(),
        entityType: z.string().optional(),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
        searchTerm: z.string().optional()
    }).optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let query = supabaseAdmin
      .from('audit_logs')
      .select('*')
      .eq('tenant_id', data.tenantId)
      .order('created_at', { ascending: false })
      .limit(1000); // Guard rail for export

    if (data.filters?.userId) query = query.eq('user_id', data.filters.userId);
    if (data.filters?.userRole) query = query.eq('user_role', data.filters.userRole);
    if (data.filters?.action) query = query.ilike('action', `%${data.filters.action}%`);
    if (data.filters?.entityType) query = query.eq('entity_type', data.filters.entityType);
    if (data.filters?.dateFrom) query = query.gte('created_at', data.filters.dateFrom);
    if (data.filters?.dateTo) query = query.lte('created_at', data.filters.dateTo);
    
    if (data.filters?.searchTerm) {
      query = query.or(`description.ilike.%${data.filters.searchTerm}%,action.ilike.%${data.filters.searchTerm}%,user_name.ilike.%${data.filters.searchTerm}%`);
    }

    const { data: logs, error } = await query;
    if (error) throw new Error(error.message);

    // Record the export event
    await logAuditAction({
      data: {
        tenantId: data.tenantId,
        userId: data.userId,
        userName: data.userName,
        userRole: data.userRole as any,
        action: 'AUDIT_CSV_EXPORT',
        entityType: 'audit_logs',
        entityId: new Date().toISOString(),
        description: `Exported ${logs?.length || 0} audit records to CSV.`,
        metadata: {
          filters: data.filters,
          recordCount: logs?.length || 0,
          exportType: 'CSV'
        }
      }
    });

    return { logs: logs || [] };
  });

export const importCSVData = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    userId: z.string().uuid(),
    type: z.enum(['students', 'student_fees', 'academic_results']),
    records: z.array(z.any()),
    metadata: z.object({
        filename: z.string(),
        totalRecords: z.number(),
        createdCount: z.number(),
        updatedCount: z.number(),
        failedCount: z.number(),
        warningCount: z.number()
    })
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let table = '';
    switch(data.type) {
        case 'students': table = 'students'; break;
        case 'student_fees': table = 'student_fees'; break;
        case 'academic_results': table = 'academic_results'; break;
    }

    const safeRecords = data.records.map(r => ({ ...r, tenant_id: data.tenantId }));

    const { error } = await supabaseAdmin
        .from(table)
        .upsert(safeRecords, { onConflict: 'id' });

    if (error) throw new Error(error.message);

    await logAuditAction({
        data: {
            tenantId: data.tenantId,
            userId: data.userId,
            action: `CSV_IMPORT_${data.type.toUpperCase()}`,
            entityType: data.type,
            entityId: data.metadata.filename,
            description: `Imported ${data.metadata.totalRecords} records from ${data.metadata.filename}. Success: ${data.metadata.createdCount + data.metadata.updatedCount}, Failed: ${data.metadata.failedCount}`,
            metadata: data.metadata
        }
    });

    return { success: true };
  });
