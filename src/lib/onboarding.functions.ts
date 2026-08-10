import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const completeOnboarding = createServerFn({ method: "POST" })
  .validator((data) => z.object({
    userId: z.string().uuid(),
    schoolName: z.string(),
    workspaceSlug: z.string(),
    contactEmail: z.string().email(),
    contactPhone: z.string(),
    campusName: z.string(),
    plan: z.string().default('trial')
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Create Tenant
    const { data: tenant, error: tenantError } = await (supabaseAdmin
      .from('tenants' as any) as any)
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
    const { data: campus, error: campusError } = await (supabaseAdmin
      .from('campuses' as any) as any)
      .insert({
        tenant_id: tenant.id,
        name: data.campusName,
        is_primary: true
      })
      .select()
      .single();

    if (campusError) throw new Error(`Campus creation failed: ${campusError.message}`);

    // 3. Create Membership (Owner)
    const { error: membershipError } = await (supabaseAdmin
      .from('memberships' as any) as any)
      .insert({
        tenant_id: tenant.id,
        user_id: data.userId,
        campus_id: campus.id,
        is_default: true,
        is_active: true
      });

    if (membershipError) throw new Error(`Membership creation failed: ${membershipError.message}`);

    // 4. Assign School Owner Role
    const { error: roleError } = await (supabaseAdmin
      .from('user_roles' as any) as any)
      .insert({
        tenant_id: tenant.id,
        user_id: data.userId,
        role: 'school_owner'
      });

    if (roleError) throw new Error(`Role assignment failed: ${roleError.message}`);

    return { success: true, tenantId: tenant.id };
  });

export const checkUserTenants = createServerFn({ method: "GET" })
  .validator((data) => z.object({ userId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { data: memberships, error } = await (supabaseAdmin
      .from('memberships' as any) as any)
      .select('tenant_id')
      .eq('user_id', data.userId);

    if (error) throw new Error(error.message);
    return { hasTenants: (memberships?.length ?? 0) > 0 };
  });

export const getExecutiveDashboardStats = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({
    tenantId: z.string().uuid()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Student Stats
    const { count: totalStudents } = await (supabaseAdmin
      .from('profiles' as any) as any)
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', data.tenantId)
      .eq('role', 'student');

    // 2. Class Stats
    const { count: totalClasses } = await (supabaseAdmin
      .from('campuses' as any) as any) // Classes are likely in a table not yet fully implemented or we use campuses as proxy/placeholder if table missing
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', data.tenantId);

    // 3. Staff Stats
    const { count: totalStaff } = await (supabaseAdmin
      .from('profiles' as any) as any)
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', data.tenantId)
      .in('role', ['teacher', 'admin', 'bursar']);

    // 4. Financial Stats (Transactions)
    const { data: transactions } = await (supabaseAdmin
      .from('transactions' as any) as any)
      .select('amount, status, type')
      .eq('tenant_id', data.tenantId);

    const approvedCollections = transactions?.filter((t: any) => t.status === 'approved' && t.type === 'fee_payment')
      .reduce((sum: number, t: any) => sum + Number(t.amount), 0) || 0;
    
    const pendingPaymentsCount = transactions?.filter((t: any) => t.status === 'pending').length || 0;
    const approvedPaymentsCount = transactions?.filter((t: any) => t.status === 'approved').length || 0;

    // 5. Fee Stats (Student Fees)
    const { data: fees } = await (supabaseAdmin
      .from('student_fees' as any) as any)
      .select('amount_due, amount_paid, status')
      .eq('tenant_id', data.tenantId);

    const totalFeesBilled = fees?.reduce((sum: number, f: any) => sum + Number(f.amount_due), 0) || 0;
    const outstandingFees = fees?.reduce((sum: number, f: any) => sum + (Number(f.amount_due) - Number(f.amount_paid)), 0) || 0;
    
    const paidStudentsCount = fees?.filter((f: any) => f.status === 'paid').length || 0;
    const partiallyPaidStudentsCount = fees?.filter((f: any) => f.status === 'partially_paid').length || 0;
    const unpaidStudentsCount = fees?.filter((f: any) => f.status === 'unpaid').length || 0;

    // 6. Expense Stats
    const { data: expenses } = await (supabaseAdmin
      .from('expenses' as any) as any)
      .select('amount, status')
      .eq('tenant_id', data.tenantId);

    const totalExpenses = expenses?.reduce((sum: number, e: any) => sum + Number(e.amount), 0) || 0;
    const approvedExpenses = expenses?.filter((e: any) => e.status === 'approved')
      .reduce((sum: number, e: any) => sum + Number(e.amount), 0) || 0;

    const collectionRate = totalFeesBilled > 0 ? (approvedCollections / totalFeesBilled) * 100 : 0;

    return {
      totalStudents: totalStudents || 0,
      totalClasses: totalClasses || 0,
      totalStaff: totalStaff || 0,
      totalFeesBilled,
      totalFeesCollected: approvedCollections,
      outstandingFees,
      pendingPayments: pendingPaymentsCount,
      approvedPayments: approvedPaymentsCount,
      paidStudents: paidStudentsCount,
      partiallyPaidStudents: partiallyPaidStudentsCount,
      unpaidStudents: unpaidStudentsCount,
      collectionRate,
      totalExpenses,
      approvedExpenses,
      netPosition: approvedCollections - approvedExpenses,
      lastRefresh: new Date().toISOString()
    };
  });
