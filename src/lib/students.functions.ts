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
