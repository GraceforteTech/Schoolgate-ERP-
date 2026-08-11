import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getEmployees = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string, search?: string }) => z.object({
    tenantId: z.string().uuid(),
    search: z.string().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // Employees are profiles with specific roles
    // We join profiles with user_roles to identify staff
    const { data: staff, error } = await supabaseAdmin
      .from('profiles')
      .select('*, memberships!inner(tenant_id), user_roles(role)')
      .eq('memberships.tenant_id', data.tenantId)
      .not('user_roles', 'is', null);

    if (error) throw new Error(error.message);

    return (staff || []).map((s: any) => ({
      ...s,
      roles: s.user_roles.map((r: any) => r.role),
      status: 'Active' // Placeholder status
    }));
  });

export const getRecruitmentStats = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    return {
      openPositions: 4,
      totalApplicants: 156,
      interviewsToday: 3,
      hiredThisMonth: 2
    };
  });
