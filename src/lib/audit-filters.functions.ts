import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getSavedAuditFilters = createServerFn({ method: "GET" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    userId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: filters, error } = await supabaseAdmin
      .from('saved_audit_filters')
      .select('*')
      .eq('tenant_id', data.tenantId)
      .eq('user_id', data.userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return filters || [];
  });

export const saveAuditFilter = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenantId: z.string().uuid(),
    userId: z.string().uuid(),
    name: z.string().min(1),
    filterDefinition: z.any(),
    isDefault: z.boolean().default(false)
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    if (data.isDefault) {
      await supabaseAdmin
        .from('saved_audit_filters')
        .update({ is_default: false })
        .eq('tenant_id', data.tenantId)
        .eq('user_id', data.userId);
    }

    const { data: filter, error } = await supabaseAdmin
      .from('saved_audit_filters')
      .insert({
        tenant_id: data.tenantId,
        user_id: data.userId,
        name: data.name,
        filter_definition: data.filterDefinition,
        is_default: data.isDefault
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return filter;
  });

export const deleteAuditFilter = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    id: z.string().uuid(),
    userId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from('saved_audit_filters')
      .delete()
      .eq('id', data.id)
      .eq('user_id', data.userId);

    if (error) throw new Error(error.message);
    return { success: true };
  });
