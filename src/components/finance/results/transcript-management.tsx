import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, GraduationCap, Download, Printer, ShieldCheck, FileText, Calendar, TrendingUp } from "lucide-react";

export function TranscriptManagement() {
  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Transcript & Academic History</h2>
          <p className="text-sm font-medium text-slate-500 italic">Generate verified official transcripts and cumulative academic records.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input placeholder="Find student record..." className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-schoolgate-green/20 w-64 shadow-sm" />
          </div>
          <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 h-10 rounded-xl font-bold shadow-lg shadow-schoolgate-green/20 gap-2">
            <GraduationCap size={16} /> New Transcript
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Student Profile Overview */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-900 relative">
                <div className="absolute -bottom-10 left-6 p-1 bg-white rounded-2xl shadow-xl">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center font-black text-3xl text-slate-300">BO</div>
                </div>
              </div>
              <div className="pt-14 p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Blessing Okoro</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">ADM: SG-2024-002 • Grade 4 Blue</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Academic Standing</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700 border-none px-2 py-0.5 font-bold uppercase text-[9px]">Excellent</Badge>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Promotion Status</span>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-700 border-none px-2 py-0.5 font-bold uppercase text-[9px]">Promoted</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Quick Actions</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="justify-start gap-3 rounded-xl border-slate-100 hover:bg-slate-50 text-slate-600 font-bold h-11">
                      <Printer size={16} /> Print Official Transcript
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 rounded-xl border-slate-100 hover:bg-slate-50 text-slate-600 font-bold h-11">
                      <Download size={16} /> Download PDF (Verified)
                    </Button>
                    <Button variant="outline" className="justify-start gap-3 rounded-xl border-slate-100 hover:bg-slate-50 text-slate-600 font-bold h-11">
                      <ShieldCheck size={16} /> Verify Credentials
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[14px] border-none shadow-sm bg-amber-50 border border-amber-100 overflow-hidden">
            <CardContent className="p-6 flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Star className="text-amber-600" size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-amber-900">Academic Awards</h4>
                <p className="text-xs text-amber-800 font-medium">Winner, School Science Fair 2023. Best student in Mathematics (Grade 3).</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Academic History Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                Cumulative Performance History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/30">
                  <TableRow className="hover:bg-transparent border-slate-50">
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider px-6">Session & Term</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider">Class</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Avg. Score</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Position</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider text-right px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { session: '2023/2024', term: 'Second Term', class: 'Grade 4 Blue', avg: '84.2%', pos: '1st', status: 'Active' },
                    { session: '2023/2024', term: 'First Term', class: 'Grade 4 Blue', avg: '81.5%', pos: '3rd', status: 'Completed' },
                    { session: '2022/2023', term: 'Third Term', class: 'Grade 3 Red', avg: '88.0%', pos: '1st', status: 'Completed' },
                    { session: '2022/2023', term: 'Second Term', class: 'Grade 3 Red', avg: '82.4%', pos: '2nd', status: 'Completed' },
                  ].map((row, i) => (
                    <TableRow key={i} className="hover:bg-slate-50/50 border-slate-50 transition-colors">
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 text-sm">{row.session}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{row.term}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-slate-700">{row.class}</TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm font-black text-schoolgate-green">{row.avg}</span>
                      </TableCell>
                      <TableCell className="text-center font-black text-slate-800 text-xs">{row.pos}</TableCell>
                      <TableCell className="text-right px-6">
                        <Button variant="ghost" size="sm" className="h-8 rounded-lg text-slate-400 hover:text-schoolgate-green hover:bg-emerald-50 gap-2 font-bold px-3">
                          <Eye size={14} /> View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Growth Trend */}
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Performance Growth Trend</h4>
              <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} /> IMPROVING
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Current Session Performance', value: 84, color: 'bg-schoolgate-green' },
                { label: 'Previous Session Performance', value: 78, color: 'bg-slate-200' },
              ].map((bar, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
                    <span>{bar.label}</span>
                    <span className="text-slate-900">{bar.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                    <div className={`h-full ${bar.color} rounded-full transition-all duration-1000`} style={{ width: `${bar.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return <div className="h-px w-full bg-slate-100" />;
}
