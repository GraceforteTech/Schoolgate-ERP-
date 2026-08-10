import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentResultDrillDown } from "@/lib/results.functions";
import { useTenant } from "@/hooks/use-tenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  BookOpen, 
  GraduationCap, 
  TrendingUp, 
  ArrowLeft,
  Printer,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface StudentResultDrillDownProps {
  studentId: string;
  session: string;
  term: string;
  onBack: () => void;
}

export function StudentResultDrillDown({ 
  studentId, 
  session, 
  term, 
  onBack 
}: StudentResultDrillDownProps) {
  const { tenantId } = useTenant();

  const { data, isLoading, error } = useQuery({
    queryKey: ['student-result-drilldown', studentId, session, term, tenantId],
    queryFn: () => getStudentResultDrillDown({ 
      tenantId: tenantId!, 
      studentId, 
      session, 
      term 
    }),
    enabled: !!tenantId && !!studentId,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-900">Failed to load results</h3>
        <p className="text-slate-500 mb-6">There was an error retrieving the academic records for this student.</p>
        <Button onClick={onBack} variant="outline" className="rounded-xl">Go Back</Button>
      </div>
    );
  }

  const { student, results, summary } = data;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 uppercase tracking-widest text-[10px] font-black">Published</Badge>;
      case 'Approved':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-100 uppercase tracking-widest text-[10px] font-black">Approved</Badge>;
      default:
        return <Badge className="bg-orange-50 text-orange-700 border-orange-100 uppercase tracking-widest text-[10px] font-black">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="group hover:bg-white text-slate-500 font-bold gap-2"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Directory
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl border-slate-200 gap-2 font-bold text-slate-600">
            <Printer size={18} /> Print Record
          </Button>
          <Button className="h-11 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 shadow-lg shadow-schoolgate-green/20 gap-2 font-bold">
            <Download size={18} /> Download PDF
          </Button>
        </div>
      </div>

      {/* Student Profile Header */}
      <Card className="rounded-[24px] border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-slate-50 border-b border-slate-100 p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="h-24 w-24 rounded-3xl bg-white p-1 shadow-sm border border-slate-200">
              <div className="w-full h-full rounded-2xl bg-slate-100 grid place-items-center">
                <User size={48} className="text-slate-300" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{student.full_name}</h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">ADM: {student.admission_number}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Class: {student.class_id || 'N/A'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                {getStatusBadge(summary.status)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Score</p>
                <p className="text-xl font-black text-slate-800">{summary.totalScore}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Average</p>
                <p className="text-xl font-black text-schoolgate-green">{summary.averageScore}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-[20px] border-none shadow-sm bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-blue-50 grid place-items-center text-blue-600">
              <BookOpen size={20} />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Subjects</span>
          </div>
          <p className="text-2xl font-black text-slate-800">{summary.subjectCount}</p>
          <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Academic Load</p>
        </Card>
        
        <Card className="rounded-[20px] border-none shadow-sm bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 grid place-items-center text-emerald-600">
              <GraduationCap size={20} />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Grade</span>
          </div>
          <p className="text-2xl font-black text-emerald-700">{summary.overallGrade}</p>
          <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Overall Standing</p>
        </Card>

        <Card className="rounded-[20px] border-none shadow-sm bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-orange-50 grid place-items-center text-orange-600">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Position</span>
          </div>
          <p className="text-2xl font-black text-slate-800">--</p>
          <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Pending Audit</p>
        </Card>

        <Card className="rounded-[20px] border-none shadow-sm bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-slate-50 grid place-items-center text-slate-600">
              <Clock size={20} />
            </div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Term</span>
          </div>
          <p className="text-2xl font-black text-slate-800">{term}</p>
          <p className="text-xs font-bold text-slate-500 mt-1 uppercase">{session}</p>
        </Card>
      </div>

      {/* Results Table */}
      <Card className="rounded-[24px] border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Academic Subject Records</CardTitle>
            <p className="text-sm text-slate-500 font-medium italic mt-1">Detailed breakdown of scores for each registered subject.</p>
          </div>
          <Badge className="bg-slate-100 text-slate-600 border-none font-bold uppercase tracking-widest text-[9px] px-3 py-1">
            Official Record
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-5">Subject</th>
                  <th className="px-4 py-5 text-center">CA Score (40)</th>
                  <th className="px-4 py-5 text-center">Exam Score (60)</th>
                  <th className="px-4 py-5 text-center">Total (100)</th>
                  <th className="px-4 py-5 text-center">Grade</th>
                  <th className="px-4 py-5 text-center">Remark</th>
                  <th className="px-8 py-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-8 py-12 text-center text-slate-400 font-medium">
                      No results found for this term.
                    </td>
                  </tr>
                ) : (
                  results.map((res: any, idx: number) => (
                    <tr 
                      key={res.id} 
                      className={`text-sm font-bold text-slate-700 border-b border-slate-50 hover:bg-slate-50/30 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/20' : ''}`}
                    >
                      <td className="px-8 py-5 text-slate-900">{res.subjects?.name || 'Unknown'}</td>
                      <td className="px-4 py-5 text-center text-slate-400">{res.ca_score || 0}</td>
                      <td className="px-4 py-5 text-center text-slate-400">{res.exam_score || 0}</td>
                      <td className="px-4 py-5 text-center font-black text-slate-900">{res.total_score}</td>
                      <td className="px-4 py-5 text-center">
                        <span className={`inline-block w-8 h-8 rounded-lg grid place-items-center text-[10px] font-black border ${
                          res.total_score >= 70 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                          res.total_score >= 50 ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          'bg-rose-50 text-rose-700 border-rose-100'
                        }`}>
                          {res.grade}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className={`text-[10px] uppercase tracking-wider ${res.remark === 'Pass' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {res.remark}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center">
                          {res.status === 'published' ? (
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          ) : (
                            <Clock size={18} className="text-slate-300" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
