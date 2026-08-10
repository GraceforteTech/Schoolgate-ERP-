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

export const getAcademicResultsDashboardStats = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string, session?: string, term?: string }) => 
    z.object({ 
      tenantId: z.string().uuid(),
      session: z.string().optional(),
      term: z.string().optional()
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Basic counts
    const { count: totalStudents } = await supabaseAdmin
      .from('students')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', data.tenantId);

    const { count: totalSubjects } = await supabaseAdmin
      .from('subjects')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', data.tenantId);

    // 2. Result stats
    let query = supabaseAdmin
      .from('academic_results')
      .select('status, total_score, student_id, class_id, subject_id', { count: 'exact' })
      .eq('tenant_id', data.tenantId);
    
    if (data.session) query = query.eq('academic_session', data.session);
    if (data.term) query = query.eq('term', data.term);

    const { data: results, count: totalResults } = await query;

    const resultsArray = results || [];
    const approvedResults = resultsArray.filter((r: any) => r.status === 'approved').length;
    const publishedResults = resultsArray.filter((r: any) => r.status === 'approved').length; // Assuming approved means published for now
    const pendingResults = resultsArray.filter((r: any) => r.status === 'submitted' || r.status === 'reviewed').length;
    
    // 3. Performance metrics
    const validScores = resultsArray.filter((r: any) => r.total_score !== null);
    const averageScore = validScores.length > 0 
      ? validScores.reduce((sum: number, r: any) => sum + Number(r.total_score), 0) / validScores.length 
      : 0;

    const passCount = validScores.filter((r: any) => Number(r.total_score) >= 40).length; // Default pass mark 40
    const passRate = validScores.length > 0 ? (passCount / validScores.length) * 100 : 0;

    // 4. Class stats
    const distinctClasses = new Set(resultsArray.map((r: any) => r.class_id));
    
    return {
      totalStudents: totalStudents || 0,
      totalSubjects: totalSubjects || 0,
      totalClasses: distinctClasses.size || 0,
      resultsGenerated: totalResults || 0,
      resultsApproved: approvedResults,
      resultsPublished: publishedResults,
      resultsPending: pendingResults,
      averageScore: Number(averageScore.toFixed(1)),
      passRate: Number(passRate.toFixed(1)),
      distinctionRate: validScores.length > 0 
        ? Number(((validScores.filter((r: any) => Number(r.total_score) >= 75).length / validScores.length) * 100).toFixed(1)) 
        : 0
    };
  });

export const getAcademicPerformanceAnalytics = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string, session?: string, term?: string }) => 
    z.object({ 
      tenantId: z.string().uuid(),
      session: z.string().optional(),
      term: z.string().optional()
    }).parse(data)
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let query = supabaseAdmin
      .from('academic_results')
      .select('total_score, subject_id, academic_session, term, subjects(name)')
      .eq('tenant_id', data.tenantId);

    if (data.session) query = query.eq('academic_session', data.session);
    if (data.term) query = query.eq('term', data.term);

    const { data: results } = await query;
    const resultsArray = results || [];

    // 1. Subject performance leaderboard
    const subjectMap: Record<string, { sum: number, count: number, name: string }> = {};
    resultsArray.forEach((r: any) => {
      const name = r.subjects?.name || 'Unknown';
      if (!subjectMap[name]) subjectMap[name] = { sum: 0, count: 0, name };
      subjectMap[name].sum += Number(r.total_score || 0);
      subjectMap[name].count += 1;
    });

    const subjectLeaderboard = Object.values(subjectMap)
      .map(s => ({
        subject: s.name,
        score: Number((s.sum / s.count).toFixed(1))
      }))
      .sort((a, b) => b.score - a.score);

    // 2. Grade distribution
    const distribution = [
      { name: 'Distinction (A)', value: 0, color: '#0B6E3C' },
      { name: 'Credit (B-C)', value: 0, color: '#3B82F6' },
      { name: 'Pass (D-E)', value: 0, color: '#EAB308' },
      { name: 'Fail (F)', value: 0, color: '#EF4444' },
    ];

    resultsArray.forEach((r: any) => {
      const score = Number(r.total_score || 0);
      if (score >= 75) {
        if (distribution[0]) distribution[0].value += 1;
      } else if (score >= 50) {
        if (distribution[1]) distribution[1].value += 1;
      } else if (score >= 40) {
        if (distribution[2]) distribution[2].value += 1;
      } else {
        if (distribution[3]) distribution[3].value += 1;
      }
    });


    const totalResults = resultsArray.length;
    const gradeDistribution = distribution.map(d => ({
      ...d,
      value: totalResults > 0 ? Number(((d.value / totalResults) * 100).toFixed(1)) : 0
    }));

    // 3. Performance Trend (Last 6 terms/sessions found in data)
    const trendMap: Record<string, { sum: number, count: number }> = {};
    resultsArray.forEach((r: any) => {
      const key = `${r.academic_session} ${r.term}`;
      if (!trendMap[key]) trendMap[key] = { sum: 0, count: 0 };
      trendMap[key].sum += Number(r.total_score || 0);
      trendMap[key].count += 1;
    });

    const performanceTrend = Object.entries(trendMap)
      .map(([name, s]) => ({
        name,
        score: Number((s.sum / s.count).toFixed(1))
      }))
      .slice(-6);

    return {
      subjectLeaderboard,
      gradeDistribution,
      performanceTrend
    };
  });


export const getAcademicSubjects = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: subjects, error } = await supabaseAdmin
      .from('subjects')
      .select('*')
      .eq('tenant_id', data.tenantId)
      .order('name');

    if (error) throw new Error(error.message);
    return subjects;
  });

