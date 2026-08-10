import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, Printer, Download, Send, Share2, Mail, QrCode, User, BookOpen, GraduationCap, Calendar, BarChart3, Info, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTenant } from "@/hooks/use-tenant";
import { supabase } from "@/integrations/supabase/client";
import { getStudentResultDrillDown } from "@/lib/results.functions";
import { useServerFn } from "@tanstack/react-start";
import { Skeleton } from "@/components/ui/skeleton";

export function ReportCardGenerator() {
  const { tenantId } = useTenant();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [session, setSession] = useState("2023/2024");
  const [term, setTerm] = useState("Second Term");
  const [currentIndex, setCurrentIndex] = useState(0);
  const getDrillDown = useServerFn(getStudentResultDrillDown);

  // 1. Fetch classes for the dropdown
  const { data: classes } = useQuery({
    queryKey: ['classes-for-reports', tenantId],
    queryFn: async () => {
      const { data, error } = await supabase.from('campuses').select('id, name').eq('tenant_id', tenantId!);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId
  });

  // 2. Fetch students in the selected class
  const { data: students, isLoading: loadingStudents } = useQuery({
    queryKey: ['students-for-reports', tenantId, selectedClass],
    queryFn: async () => {
      const { data, error } = await supabase.from('students')
        .select('id, full_name, admission_number')
        .eq('tenant_id', tenantId!)
        .eq('class_id', selectedClass!);
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId && !!selectedClass
  });

  const currentStudent = students?.[currentIndex];

  // 3. Fetch detailed results for the current student
  const { data: reportData, isLoading: loadingReport } = useQuery({
    queryKey: ['student-report-detail', tenantId, currentStudent?.id, session, term],
    queryFn: () => getDrillDown({
      data: {
        tenantId: tenantId!,
        studentId: currentStudent!.id,
        session,
        term
      }
    }),
    enabled: !!tenantId && !!currentStudent
  });

  const nextStudent = () => {
    if (students && currentIndex < students.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevStudent = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Control Panel */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
            <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Generator Controls</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Academic Session</label>
                <Select value={session} onValueChange={setSession}>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 font-bold">
                    <SelectValue placeholder="Select Session" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023/2024">2023/2024</SelectItem>
                    <SelectItem value="2024/2025">2024/2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Term</label>
                <Select value={term} onValueChange={setTerm}>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 font-bold">
                    <SelectValue placeholder="Select Term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First Term">First Term</SelectItem>
                    <SelectItem value="Second Term">Second Term</SelectItem>
                    <SelectItem value="Third Term">Third Term</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Select Class</label>
                <Select value={selectedClass || ""} onValueChange={(val) => { setSelectedClass(val); setCurrentIndex(0); }}>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 font-bold">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes?.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button disabled={!selectedClass} className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 h-12 rounded-xl font-bold shadow-lg shadow-schoolgate-green/20 gap-2">
                <Printer size={18} /> Bulk Print Class Reports
              </Button>
              <Button disabled={!selectedClass} variant="outline" className="w-full h-11 rounded-xl font-bold border-slate-200 gap-2 text-slate-600">
                <Download size={18} /> Download All (PDF)
              </Button>
              <Button disabled={!selectedClass} variant="outline" className="w-full h-11 rounded-xl font-bold border-slate-200 gap-2 text-slate-600">
                <Send size={18} /> Push to Parent Portals
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm bg-indigo-600 text-white overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Share2 size={20} />
              </div>
              <h3 className="font-bold">Digital Distribution</h3>
            </div>
            <p className="text-xs text-indigo-100 font-medium leading-relaxed">
              Instantly share report cards via WhatsApp, Email and SMS. Each report includes a unique verification QR code.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white text-xs h-9 rounded-lg gap-2">
                <Share2 size={14} /> WhatsApp
              </Button>
              <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white text-xs h-9 rounded-lg gap-2">
                <Mail size={14} /> Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-800 tracking-tight">Report Card Preview</h3>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevStudent} 
              disabled={currentIndex === 0 || loadingStudents}
              className="h-9 w-9 rounded-lg hover:bg-white border border-transparent hover:border-slate-100"
            >
              <ChevronLeft size={18} />
            </Button>
            <div className="px-3 py-1 bg-white border border-slate-100 rounded-lg shadow-sm">
              <span className="text-xs font-bold text-slate-500">
                {loadingStudents ? "..." : `${currentIndex + 1} of ${students?.length || 0} Students`}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextStudent} 
              disabled={!students || currentIndex === students.length - 1 || loadingStudents}
              className="h-9 w-9 rounded-lg hover:bg-white border border-transparent hover:border-slate-100"
            >
              <ChevronRight size={18} />
            </Button>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <Button variant="ghost" className="text-xs font-bold text-slate-500 gap-2 h-9 px-3 hover:bg-white">
              <Eye size={16} /> Live Preview
            </Button>
          </div>
        </div>

        {/* The Actual Report Card Mockup */}
        <Card className="rounded-[20px] border-none shadow-xl bg-white overflow-hidden max-w-[800px] mx-auto min-h-[1000px] flex flex-col relative">
          {loadingReport && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-10 h-10 text-schoolgate-green animate-spin" />
              <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">Generating Live Preview...</p>
            </div>
          )}

          {!selectedClass ? (
            <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-4">
              <div className="p-6 bg-slate-50 rounded-full">
                <FileText size={48} className="text-slate-300" />
              </div>
              <h4 className="text-xl font-black text-slate-800">Select a Class to Start</h4>
              <p className="text-sm font-medium text-slate-400 max-w-xs">Choose a class from the control panel to generate and preview report cards.</p>
            </div>
          ) : (
            <>
              {/* Report Card Header */}
              <div className="bg-schoolgate-green p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-2xl">
                      <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                        {reportData?.student.photo_url ? (
                          <img src={reportData.student.photo_url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <User size={48} className="text-slate-300" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <h2 className="text-2xl font-black tracking-tight uppercase">{reportData?.student.full_name || currentStudent?.full_name}</h2>
                      <div className="flex items-center gap-3 text-emerald-100 text-xs font-bold uppercase tracking-widest">
                        <span>{classes?.find(c => c.id === selectedClass)?.name || "Class"}</span>
                        <span className="w-1 h-1 bg-emerald-300 rounded-full" />
                        <span>ADM: {reportData?.student.admission_number || currentStudent?.admission_number || "N/A"}</span>
                      </div>
                      <div className="bg-white/10 rounded-lg px-3 py-1.5 inline-block mt-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-50">{term} Report Card • {session}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center ml-auto mb-2">
                      <QrCode size={40} className="text-schoolgate-green" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">VERIFIED REPORT</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-10 flex-1 space-y-10">
                {/* Quick Stats Grid */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap size={14} className="text-slate-400" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Attendance</span>
                    </div>
                    <span className="text-xl font-black text-slate-800">98%</span>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Excellent</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 size={14} className="text-slate-400" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Subjects</span>
                    </div>
                    <span className="text-xl font-black text-schoolgate-green">{reportData?.stats.totalSubjects || 0}</span>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Academic Load</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-slate-400" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Mean Score</span>
                    </div>
                    <span className="text-xl font-black text-slate-800">{reportData?.stats.averageScore || 0}%</span>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Performance</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} className="text-slate-400" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Total Score</span>
                    </div>
                    <span className="text-xl font-black text-emerald-600">{reportData?.stats.totalScore || 0}</span>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Aggregate</p>
                  </div>
                </div>

                {/* Academic Record Table */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Academic Record</h4>
                    <div className="h-px flex-1 bg-slate-100" />
                  </div>
                  <div className="rounded-2xl border border-slate-100 overflow-hidden">
                    <div className="grid grid-cols-6 bg-slate-50 p-3 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <div className="col-span-2 px-2">Subject</div>
                      <div className="text-center">CA Total</div>
                      <div className="text-center">Exam</div>
                      <div className="text-center">Total</div>
                      <div className="text-center">Grade</div>
                    </div>
                    {reportData?.results.map((row, i) => (
                      <div key={i} className="grid grid-cols-6 p-4 text-xs font-bold text-slate-700 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                        <div className="col-span-2 px-2 uppercase">{row.subject.name}</div>
                        <div className="text-center text-slate-400">{row.ca_score}</div>
                        <div className="text-center text-slate-400">{row.exam_score}</div>
                        <div className="text-center font-black text-slate-900">{row.ca_score + row.exam_score}</div>
                        <div className="text-center font-black text-schoolgate-green">{row.grade || 'N/A'}</div>
                      </div>
                    ))}
                    {(!reportData?.results || reportData.results.length === 0) && (
                      <div className="p-8 text-center text-slate-400 font-medium italic text-xs">
                        No results found for this student in the selected term.
                      </div>
                    )}
                  </div>
                </div>

                {/* Remarks Section */}
                <div className="grid grid-cols-2 gap-8 pt-6">
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teacher's Remark</h4>
                    <div className="p-4 bg-slate-50 rounded-2xl min-h-[80px] text-xs font-medium italic text-slate-600 leading-relaxed">
                      "An impressive display of academic dedication. {reportData?.student.full_name.split(' ')[0]} shows great potential in science subjects."
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Principal's Remark</h4>
                    <div className="p-4 bg-emerald-50/50 rounded-2xl min-h-[80px] text-xs font-medium italic text-emerald-800 leading-relaxed border border-emerald-100/50">
                      "Outstanding performance. Keep up the good work and maintain this momentum in the next session."
                    </div>
                  </div>
                </div>

                {/* Assessment Grid */}
                <div className="grid grid-cols-3 gap-6 pt-6">
                  {['Affective Domain', 'Psychomotor', 'Behaviour'].map((title, i) => (
                    <div key={i} className="space-y-3">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
                      <div className="space-y-2">
                        {['Punctuality', 'Neatness', 'Creativity'].map((trait, j) => (
                          <div key={j} className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">{trait}</span>
                            <div className="flex gap-0.5">
                              {[1,2,3,4,5].map(dot => (
                                <div key={dot} className={`w-2 h-2 rounded-full ${dot <= 4 ? "bg-schoolgate-green" : "bg-slate-200"}`} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Footer Info */}
              <div className="p-10 pt-0 flex items-center justify-between border-t border-slate-50 pt-8 mt-auto">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Next Term Fees</p>
                  <p className="text-xl font-black text-slate-800 tracking-tight">₦0.00</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                    <Info size={18} className="text-slate-400" />
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 leading-tight">
                    This report is electronically generated.<br />Verify at portal.schoolgate.com
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
