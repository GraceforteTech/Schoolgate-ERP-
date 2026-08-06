import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2, XCircle, Undo2, Globe, FileText, Search, User, Clock, ArrowRight } from "lucide-react";

const approvalRequests = [
  { id: "REQ-001", subject: "Mathematics", class: "Grade 4 Blue", teacher: "Mr. Yusuf Bello", students: 32, status: "Submitted", time: "2 hours ago", workflow: "Teacher → Subject Head" },
  { id: "REQ-002", subject: "English Language", class: "Grade 6 Red", teacher: "Mrs. Sarah Okon", students: 28, status: "Pending VP", time: "5 hours ago", workflow: "Subject Head → VP Academics" },
  { id: "REQ-003", subject: "Social Studies", class: "JSS 2 Green", teacher: "Ms. Amina Ibrahim", students: 45, status: "Pending Principal", time: "1 day ago", workflow: "VP Academics → Principal" },
  { id: "REQ-004", subject: "Agricultural Science", class: "SS 1 Gold", teacher: "Mr. David Segun", students: 38, status: "Rejected", time: "2 days ago", workflow: "Subject Head → Teacher (Correction)" },
];

export function ResultApprovalCentre() {
  return (
    <div className="space-y-8">
      {/* Workflow Visualization */}
      <div className="bg-white p-8 rounded-[14px] shadow-sm border border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Approval Workflow Pipeline</h3>
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-0" />
          {[
            { label: "Teacher", active: true },
            { label: "Subject Head", active: true },
            { label: "VP Academics", active: true },
            { label: "Principal", active: false },
            { label: "Published", active: false, icon: Globe }
          ].map((step, i, arr) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step.active ? "bg-schoolgate-green border-schoolgate-green text-white scale-110 shadow-lg shadow-schoolgate-green/20" : "bg-white border-slate-200 text-slate-400"}`}>
                {step.icon ? <step.icon size={18} /> : <span className="text-sm font-bold">{i + 1}</span>}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${step.active ? "text-schoolgate-green" : "text-slate-400"}`}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics */}
        <div className="space-y-4">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Approval Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50">
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600 w-4 h-4" />
                  <span className="text-sm font-bold text-blue-900">Submitted</span>
                </div>
                <span className="text-lg font-black text-blue-900">12</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50">
                <div className="flex items-center gap-3">
                  <Clock className="text-amber-600 w-4 h-4" />
                  <span className="text-sm font-bold text-amber-900">Pending Approval</span>
                </div>
                <span className="text-lg font-black text-amber-900">8</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-600 w-4 h-4" />
                  <span className="text-sm font-bold text-emerald-900">Approved</span>
                </div>
                <span className="text-lg font-black text-emerald-900">45</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50">
                <div className="flex items-center gap-3">
                  <XCircle className="text-rose-600 w-4 h-4" />
                  <span className="text-sm font-bold text-rose-900">Rejected</span>
                </div>
                <span className="text-lg font-black text-rose-900">3</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                <div className="flex items-center gap-3">
                  <FileText className="text-slate-600 w-4 h-4" />
                  <span className="text-sm font-bold text-slate-900">Approval History</span>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold uppercase tracking-wider text-schoolgate-green">View All</Button>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 h-12 rounded-xl font-bold shadow-lg shadow-schoolgate-green/20 gap-2">
            <Globe size={18} /> Publish Approved Results
          </Button>
          <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-slate-200 gap-2 text-slate-600 mt-2">
            <FileText size={18} /> Print Approval Report
          </Button>
        </div>

        {/* Requests List */}
        <div className="lg:col-span-2">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden h-full">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Submitted Results Queue</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input placeholder="Filter requests..." className="pl-9 pr-4 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-schoolgate-green w-48" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/30">
                  <TableRow className="hover:bg-transparent border-slate-50">
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider px-6">Subject & Class</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider">Teacher</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Status</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider text-right px-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvalRequests.map((req) => (
                    <TableRow key={req.id} className="hover:bg-slate-50/50 border-slate-50 transition-colors">
                      <TableCell className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-900 text-sm tracking-tight">{req.subject}</span>
                          <span className="text-xs font-bold text-slate-500">{req.class} • {req.students} Students</span>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-medium">
                            <Clock size={10} /> {req.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <User size={14} className="text-slate-400" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{req.teacher}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`rounded-full border-none px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                          req.status === 'Rejected' ? 'bg-rose-100 text-rose-600' : 
                          req.status === 'Submitted' ? 'bg-blue-100 text-blue-600' : 
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {req.status}
                        </Badge>
                        <div className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{req.workflow}</div>
                      </TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg">
                            <CheckCircle2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg">
                            <XCircle size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg" title="Return for Correction">
                            <Undo2 size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                            <ArrowRight size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
        <Clock size={14} /> Last approval activity was logged at 12:45 PM by Principal.
      </div>
    </div>
  );
}
