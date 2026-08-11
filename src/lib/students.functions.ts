import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getChildren = createServerFn({ method: "GET" })
  .validator((data: { parentId: string }) => z.object({ parentId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: children, error } = await (supabaseAdmin
      .from('students' as any)
      .select('*, campuses(name)')
      .eq('parent_id', data.parentId));
    if (error) throw new Error(error.message);
    return children;
  });

export const getStudentProfile = createServerFn({ method: "GET" })
  .validator((data: { studentId: string }) => z.object({ studentId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: student, error } = await (supabaseAdmin
      .from('students' as any)
      .select('*, campuses(name), parent:profiles!parent_id(*)')
      .eq('id', data.studentId)
      .single());
    if (error) throw new Error(error.message);
    return student;
  });

export const getStudents = createServerFn({ method: "GET" })
  .validator((data: { 
    tenantId: string, 
    search?: string, 
    status?: string, 
    classId?: string,
    campusId?: string
  }) => z.object({
    tenantId: z.string().uuid(),
    search: z.string().optional(),
    status: z.string().optional(),
    classId: z.string().optional(),
    campusId: z.string().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let query = supabaseAdmin
      .from('students')
      .select('*, campuses(name)')
      .eq('tenant_id', data.tenantId);

    if (data.search) {
      query = query.or(`full_name.ilike.%${data.search}%,admission_number.ilike.%${data.search}%`);
    }
    if (data.status) {
      query = query.eq('status', data.status.toLowerCase());
    }
    if (data.classId) {
      query = query.eq('class_id', data.classId);
    }
    if (data.campusId) {
      query = query.eq('campus_id', data.campusId);
    }

    const { data: students, error } = await query.order('full_name');
    if (error) throw new Error(error.message);
    return students;
  });

export const enrollStudent = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenant_id: z.string().uuid(),
    campus_id: z.string().uuid(),
    full_name: z.string().min(3),
    admission_number: z.string().min(2),
    class_id: z.string(),
    gender: z.string().optional(),
    parent_id: z.string().uuid().optional(),
    status: z.string().default('active')
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { data: student, error } = await (supabaseAdmin
      .from('students' as any) as any)
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return student;
  });

export const getCampuses = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: campuses, error } = await supabaseAdmin
      .from('campuses')
      .select('*')
      .eq('tenant_id', data.tenantId);
    if (error) throw new Error(error.message);
    return (campuses || []).map((c: any) => ({
      id: String(c.id),
      name: String(c.name || '')
    }));
  });


