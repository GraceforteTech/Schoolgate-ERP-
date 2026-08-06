import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, Printer, Download, Send, Share2, Mail, QrCode, User, BookOpen, GraduationCap, Calendar, BarChart3, Info } from "lucide-react";

export function ReportCardGenerator() {
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
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Select Template</label>
                <Select defaultValue="premium">
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 font-bold">
                    <SelectValue placeholder="Select Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premium">Premium Modern Card</SelectItem>
                    <SelectItem value="classic">Classic Academic Record</SelectItem>
                    <SelectItem value="compact">Compact Progress Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Select Class</label>
                <Select defaultValue="grade4">
                  <SelectTrigger className="h-11 rounded-xl border-slate-200 font-bold">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade4">Grade 4 Blue</SelectItem>
                    <SelectItem value="grade5">Grade 5 Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 h-12 rounded-xl font-bold shadow-lg shadow-schoolgate-green/20 gap-2">
                <Printer size={18} /> Bulk Print Report Cards
              </Button>
              <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-slate-200 gap-2 text-slate-600">
                <Download size={18} /> Download All (PDF)
              </Button>
              <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-slate-200 gap-2 text-slate-600">
                <Send size={18} /> Send to Parents Portal
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
            <Button variant="ghost" className="text-xs font-bold text-slate-500 gap-2 h-9 px-3 hover:bg-white">
              <Eye size={16} /> Preview Mode
            </Button>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <span className="text-xs font-bold text-slate-400">1 of 32 Students</span>
          </div>
        </div>

        {/* The Actual Report Card Mockup */}
        <Card className="rounded-[20px] border-none shadow-xl bg-white overflow-hidden max-w-[800px] mx-auto min-h-[1000px] flex flex-col">
          {/* Report Card Header */}
          <div className="bg-schoolgate-green p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="flex items-start justify-between relative z-10">
              <div className="flex gap-6">
                <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-2xl">
                  <div className="w-full h-full rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden">
                    <User size={48} className="text-slate-300" />
                  </div>
                </div>
                <div className="space-y-1 mt-2">
                  <h2 className="text-2xl font-black tracking-tight">BLESSING OKORO</h2>
                  <div className="flex items-center gap-3 text-emerald-100 text-xs font-bold uppercase tracking-widest">
                    <span>Grade 4 Blue</span>
                    <span className="w-1 h-1 bg-emerald-300 rounded-full" />
                    <span>ADM: SG-2024-002</span>
                  </div>
                  <div className="bg-white/10 rounded-lg px-3 py-1.5 inline-block mt-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-50">Second Term Report Card • 2023/2024</span>
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
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Position</span>
                </div>
                <span className="text-xl font-black text-schoolgate-green">1st / 32</span>
                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Class Leader</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={14} className="text-slate-400" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Mean Score</span>
                </div>
                <span className="text-xl font-black text-slate-800">84.2%</span>
                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">A1 Average</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-slate-400" />
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Status</span>
                </div>
                <span className="text-xl font-black text-emerald-600">PROMOTED</span>
                <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">To Grade 5</p>
              </div>
            </div>

            {/* Academic Record Table Placeholder */}
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
                {[
                  { sub: "Mathematics", ca: 38, exam: 55, total: 93, grade: "A1" },
                  { sub: "English Language", ca: 35, exam: 52, total: 87, grade: "A1" },
                  { sub: "General Science", ca: 32, exam: 48, total: 80, grade: "A1" },
                  { sub: "Social Studies", ca: 36, exam: 54, total: 90, grade: "A1" },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-6 p-4 text-xs font-bold text-slate-700 border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                    <div className="col-span-2 px-2">{row.sub}</div>
                    <div className="text-center text-slate-400">{row.ca}</div>
                    <div className="text-center text-slate-400">{row.exam}</div>
                    <div className="text-center font-black text-slate-900">{row.total}</div>
                    <div className="text-center font-black text-schoolgate-green">{row.grade}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Remarks Section */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teacher's Remark</h4>
                <div className="p-4 bg-slate-50 rounded-2xl min-h-[80px] text-xs font-medium italic text-slate-600 leading-relaxed">
                  "Blessing is an exceptionally brilliant student who consistently demonstrates excellence in all her subjects. She is a joy to have in class."
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Principal's Remark</h4>
                <div className="p-4 bg-emerald-50/50 rounded-2xl min-h-[80px] text-xs font-medium italic text-emerald-800 leading-relaxed border border-emerald-100/50">
                  "An outstanding performance. Maintain this momentum and focus on leadership growth in the next session."
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
              <p className="text-xl font-black text-slate-800 tracking-tight">₦185,000.00</p>
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
        </Card>
      </div>
    </div>
  );
}
