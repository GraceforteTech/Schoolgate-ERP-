import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Gets result details for a specific student, session, and term.
 * Includes student info and a list of subjects with scores.
 */
export const getStudentResultDetails = createServerFn({ method: "GET" })
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
    
    // 1. Get Student Info
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

    // 3. Aggregate metrics
    const validScores = (results || []).filter((r: any) => r.total_score !== null);
    const totalScore = validScores.reduce((sum: number, r: any) => sum + Number(r.total_score), 0);
    const averageScore = validScores.length > 0 ? totalScore / validScores.length : 0;
    
    // Determine overall grade (simple logic for now, should use grading_schemes eventually)
    let overallGrade = 'N/A';
    if (averageScore >= 75) overallGrade = 'A1';
    else if (averageScore >= 70) overallGrade = 'B2';
    else if (averageScore >= 65) overallGrade = 'B3';
    else if (averageScore >= 60) overallGrade = 'C4';
    else if (averageScore >= 55) overallGrade = 'C5';
    else if (averageScore >= 50) overallGrade = 'C6';
    else if (averageScore >= 45) overallGrade = 'D7';
    else if (averageScore >= 40) overallGrade = 'E8';
    else if (averageScore > 0) overallGrade = 'F9';

    return {
      student,
      results: results || [],
      summary: {
        totalScore,
        averageScore: Number(averageScore.toFixed(2)),
        overallGrade,
        subjectCount: results?.length || 0,
        status: results?.every((r: any) => r.status === 'approved') ? 'Approved' : 'Pending'
      }
    };
  });

/**
 * Bulk updates the status of academic results.
 * Used for Bulk Approve and Bulk Publish.
 */
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
    
    // Log in audit trail
    await (supabaseAdmin.from('academic_results_audit' as any) as any).insert(
      data.resultIds.map(id => ({
        result_id: id,
        changed_by: 'system', // Should be auth.uid() in real usage
        old_status: 'unknown',
        new_status: data.status,
        action: `BULK_${data.status.toUpperCase()}`
      }))
    );

    return { success: true, count: updated?.length || 0 };
  });

/**
 * Gets a list of results eligible for bulk operations.
 */
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
