import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LessonNoteSchema = z.object({
  id: z.string().uuid().optional(),
  teacher_id: z.string().uuid().optional(),
  tenant_id: z.string().uuid().optional(),
  academic_session: z.string(),
  term: z.string(),
  week: z.number(),
  lesson_date: z.string(),
  class_id: z.string(),
  subject_id: z.string(),
  topic: z.string(),
  sub_topic: z.string().optional(),
  learning_objectives: z.string().optional(),
  previous_knowledge: z.string().optional(),
  instructional_materials: z.string().optional(),
  introduction: z.string().optional(),
  presentation: z.string().optional(),
  teacher_activities: z.string().optional(),
  student_activities: z.string().optional(),
  assessment: z.string().optional(),
  homework: z.string().optional(),
  conclusion: z.string().optional(),
  references: z.string().optional(),
  duration: z.string().optional(),
  status: z.enum(['draft', 'submitted', 'reviewed', 'approved', 'returned']).optional(),
});

export const saveLessonNote = createServerFn({ method: "POST" })
  .validator((data: z.infer<typeof LessonNoteSchema>) => LessonNoteSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...noteData } = data;
    
    const { data: note, error } = id 
      ? await (supabaseAdmin.from('lesson_notes' as any) as any).update(noteData).eq('id', id).select().single()
      : await (supabaseAdmin.from('lesson_notes' as any) as any).insert(noteData).select().single();

    if (error) throw new Error(error.message);
    return note;
  });

export const getMyLessonNotes = createServerFn({ method: "GET" })
  .validator((data: { teacherId: string }) => z.object({ teacherId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: notes, error } = await (supabaseAdmin
      .from('lesson_notes' as any) as any)
      .select('*')
      .eq('teacher_id', data.teacherId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return notes;
  });

export const duplicateLessonNote = createServerFn({ method: "POST" })
  .validator((data: { noteId: string }) => z.object({ noteId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { data: original, error: fetchError } = await (supabaseAdmin
      .from('lesson_notes' as any) as any)
      .select('*')
      .eq('id', data.noteId)
      .single();

    if (fetchError || !original) throw new Error("Could not find original note");

    const { id, created_at, updated_at, status, reviewer_id, review_date, review_comment, ...newData } = original;
    
    const { data: newNode, error: insertError } = await (supabaseAdmin
      .from('lesson_notes' as any) as any)
      .insert({ ...newData, status: 'draft' })
      .select()
      .single();

    if (insertError) throw new Error(insertError.message);
    return newNode;
  });

export const getBiometricDevices = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: devices, error } = await (supabaseAdmin
      .from('biometric_devices' as any) as any)
      .select('*')
      .eq('tenant_id', data.tenantId);

    if (error) throw new Error(error.message);
    return devices;
  });

export const registerBiometricDevice = createServerFn({ method: "POST" })
  .validator((data: any) => z.object({
    tenant_id: z.string().uuid(),
    name: z.string(),
    device_type: z.string(),
    manufacturer: z.string().optional(),
    model: z.string().optional(),
    serial_number: z.string().optional(),
    location: z.string().optional(),
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: device, error } = await (supabaseAdmin
      .from('biometric_devices' as any) as any)
      .insert(data)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return device;
  });
