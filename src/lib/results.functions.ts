import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Gets a student's full result details including all subject scores,
 * CA/Exam breakdown, and calculated summary metrics.
 */
export const getStudentResultDrillDown = createServerFn({ method: "GET" })
  .validator((data: { 
    tenantId: string, 
    studentId: string, 
    session: string, 
    term: string 
  }) => z.object({ 
    tenantId: z.string().uuid(),
    studentId: z.string().uuid(),
    session: z.string(),
    term: z.string()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Get Student & Teacher Info
    const { data: student, error: studentError } = await supabaseAdmin
      .from('students')
      .select('*, profiles!students_parent_id_fkey(full_name)')
      .eq('id', data.studentId)
      .eq('tenant_id', data.tenantId)
      .single();

    if (studentError || !student) throw new Error("Student not found");

    // 2. Get Results for the student
    const { data: results, error: resultsError } = await supabaseAdmin
      .from('academic_results')
      .select('*, subjects(name)')
      .eq('student_id', data.studentId)
      .eq('tenant_id', data.tenantId)
      .eq('academic_session', data.session)
      .eq('term', data.term);

    if (resultsError) throw new Error(resultsError.message);

    // 3. Get Grading Schemes for the tenant
    const { data: schemes } = await supabaseAdmin
      .from('grading_schemes')
      .select('id')
      .eq('tenant_id', data.tenantId);

    let gradingRules: any[] = [];
    if (schemes && schemes.length > 0) {
      const { data: rules } = await supabaseAdmin
        .from('grading_rules')
        .select('*')
        .in('scheme_id', schemes.map((s: any) => s.id));
      gradingRules = rules || [];
    }

    const getGrade = (score: number) => {
      if (!gradingRules || gradingRules.length === 0) {
        if (score >= 75) return 'A1';
        if (score >= 70) return 'B2';
        if (score >= 65) return 'B3';
        if (score >= 60) return 'C4';
        if (score >= 55) return 'C5';
        if (score >= 50) return 'C6';
        if (score >= 45) return 'D7';
        if (score >= 40) return 'E8';
        return 'F9';
      }
      const rule = gradingRules.find((g: any) => score >= g.min_score && score <= g.max_score);
      return rule ? rule.grade : 'F9';
    };

    const enrichedResults = (results || []).map((r: any) => ({
      ...r,
      total_score: (Number(r.ca_score || 0) + Number(r.exam_score || 0)),
      grade: getGrade(Number(r.ca_score || 0) + Number(r.exam_score || 0)),
      remark: (Number(r.ca_score || 0) + Number(r.exam_score || 0)) >= 40 ? 'Pass' : 'Fail'
    }));

    const validScores = enrichedResults.filter((r: any) => r.total_score !== null);
    const totalScore = validScores.reduce((sum: number, r: any) => sum + Number(r.total_score), 0);
    const averageScore = validScores.length > 0 ? totalScore / validScores.length : 0;
    
    return {
      student,
      results: enrichedResults,
      summary: {
        totalScore,
        averageScore: Number(averageScore.toFixed(2)),
        overallGrade: getGrade(averageScore),
        subjectCount: results?.length || 0,
        status: enrichedResults.every((r: any) => r.status === 'published') ? 'Published' : 
                enrichedResults.some((r: any) => r.status === 'approved') ? 'Approved' : 'Pending'
      }
    };
  });

export const bulkUpdateResultStatus = createServerFn({ method: "POST" })
  .validator((data: { 
    tenantId: string, 
    resultIds: string[], 
    status: 'approved' | 'published' | 'submitted' 
  }) => z.object({
    tenantId: z.string().uuid(),
    resultIds: z.array(z.string().uuid()),
    status: z.enum(['approved', 'published', 'submitted'])
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { data: updated, error } = await (supabaseAdmin
      .from('academic_results' as any) as any)
      .update({ status: data.status })
      .in('id', data.resultIds)
      .eq('tenant_id', data.tenantId)
      .select();

    if (error) throw new Error(error.message);
    
    if (updated && updated.length > 0) {
      await (supabaseAdmin.from('academic_results_audit' as any) as any).insert(
        data.resultIds.map(id => ({
          result_id: id,
          changed_by: 'system', 
          new_status: data.status,
          action: `BULK_${data.status.toUpperCase()}`
        }))
      );
    }

    return { success: true, count: updated?.length || 0 };
  });

export const getResultsForBulkAction = createServerFn({ method: "GET" })
  .validator((data: { 
    tenantId: string, 
    session: string, 
    term: string,
    classId?: string
  }) => z.object({
    tenantId: z.string().uuid(),
    session: z.string(),
    term: z.string(),
    classId: z.string().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let query = supabaseAdmin
      .from('academic_results')
      .select('*, students(full_name, admission_number), subjects(name)')
      .eq('tenant_id', data.tenantId)
      .eq('academic_session', data.session)
      .eq('term', data.term);

    if (data.classId) query = query.eq('class_id', data.classId);

    const { data: results, error } = await query;
    if (error) throw new Error(error.message);

    return results || [];
  });

export const saveResultScores = createServerFn({ method: "POST" })
  .validator((data: { 
    tenantId: string, 
    results: Array<{
      id?: string,
      studentId: string,
      subjectId: string,
      classId: string,
      session: string,
      term: string,
      caScore: number,
      examScore: number,
      status?: string
    }> 
  }) => z.object({
    tenantId: z.string().uuid(),
    results: z.array(z.object({
      id: z.string().uuid().optional(),
      studentId: z.string().uuid(),
      subjectId: z.string().uuid(),
      classId: z.string().uuid(),
      session: z.string(),
      term: z.string(),
      caScore: z.number(),
      examScore: z.number(),
      status: z.string().optional()
    }))
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const upsertData = data.results.map(r => ({
      id: r.id,
      tenant_id: data.tenantId,
      student_id: r.studentId,
      subject_id: r.subjectId,
      class_id: r.classId,
      academic_session: r.session,
      term: r.term,
      ca_score: r.caScore,
      exam_score: r.examScore,
      status: r.status || 'submitted',
      total_score: r.caScore + r.examScore
    }));

    const { data: saved, error } = await supabaseAdmin
      .from('academic_results')
      .upsert(upsertData)
      .select();

    if (error) throw new Error(error.message);
    return { success: true, count: saved?.length || 0 };
  });

export const updateGradingScheme = createServerFn({ method: "POST" })
  .validator((data: { 
    tenantId: string, 
    rules: Array<{
      id?: string,
      grade: string,
      min_score: number,
      max_score: number,
      remark: string
    }> 
  }) => z.object({
    tenantId: z.string().uuid(),
    rules: z.array(z.object({
      id: z.string().uuid().optional(),
      grade: z.string(),
      min_score: z.number(),
      max_score: z.number(),
      remark: z.string()
    }))
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    // 1. Get or create the default scheme for this tenant
    let { data: scheme } = await supabaseAdmin
      .from('grading_schemes')
      .select('id')
      .eq('tenant_id', data.tenantId)
      .eq('is_default', true)
      .single();

    if (!scheme) {
      const { data: newScheme, error: createError } = await supabaseAdmin
        .from('grading_schemes')
        .insert({
          tenant_id: data.tenantId,
          name: 'Default Scheme',
          is_default: true
        })
        .select('id')
        .single();
      
      if (createError) throw new Error(createError.message);
      scheme = newScheme;
    }

    // 2. Upsert rules for this scheme
    const upsertData = data.rules.map(r => ({
      id: r.id,
      scheme_id: scheme!.id,
      grade: r.grade,
      min_score: r.min_score,
      max_score: r.max_score,
      remark: r.remark
    }));

    const { data: saved, error } = await supabaseAdmin
      .from('grading_rules')
      .upsert(upsertData)
      .select();

    if (error) throw new Error(error.message);
    return { success: true, count: saved?.length || 0 };
  });
