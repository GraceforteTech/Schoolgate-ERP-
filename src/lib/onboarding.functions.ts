import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const completeOnboarding = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({
    userId: z.string().uuid(),
    schoolName: z.string(),
    workspaceSlug: z.string(),
    contactEmail: z.string().email(),
    contactPhone: z.string(),
    campusName: z.string(),
    plan: z.string().default('trial')
  }).parse(data))
  .handler(async ({ data }) => {
    // 1. Create Tenant
    const { data: tenant, error: tenantError } = await supabaseAdmin
      .from('tenants')
      .insert({
        name: data.schoolName,
        slug: data.workspaceSlug,
        plan: data.plan,
        status: 'trial',
        primary_color: '#0B6E3C'
      })
      .select()
      .single();

    if (tenantError) throw new Error(`Tenant creation failed: ${tenantError.message}`);

    // 2. Create Primary Campus
    const { data: campus, error: campusError } = await supabaseAdmin
      .from('campuses')
      .insert({
        tenant_id: tenant.id,
        name: data.campusName,
        is_primary: true
      })
      .select()
      .single();

    if (campusError) throw new Error(`Campus creation failed: ${campusError.message}`);

    // 3. Create Membership (Owner)
    const { error: membershipError } = await supabaseAdmin
      .from('memberships')
      .insert({
        tenant_id: tenant.id,
        user_id: data.userId,
        campus_id: campus.id,
        is_default: true,
        is_active: true
      });

    if (membershipError) throw new Error(`Membership creation failed: ${membershipError.message}`);

    // 4. Assign School Owner Role
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        tenant_id: tenant.id,
        user_id: data.userId,
        role: 'school_owner'
      });

    if (roleError) throw new Error(`Role assignment failed: ${roleError.message}`);

    return { success: true, tenantId: tenant.id };
  });

export const checkUserTenants = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { data: memberships, error } = await supabaseAdmin
      .from('memberships')
      .select('tenant_id')
      .eq('user_id', data.userId);

    if (error) throw new Error(error.message);
    return { hasTenants: memberships.length > 0 };
  });
