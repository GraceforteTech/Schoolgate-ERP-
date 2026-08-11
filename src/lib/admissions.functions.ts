import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getAdmissionsAnalytics = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    // In a real app, this would query an 'applicants' or 'admissions' table
    return {
      totalApplications: 450,
      shortlisted: 120,
      offered: 85,
      accepted: 62,
      pendingExams: 45,
      conversionRate: 13.8
    };
  });

export const getApplicants = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string, search?: string, status?: string }) => z.object({
    tenantId: z.string().uuid(),
    search: z.string().optional(),
    status: z.string().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Placeholder for actual admissions table
    return [];
  });
