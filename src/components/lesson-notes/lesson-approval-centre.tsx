import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Printer, 
  Eye, 
  MessageSquare,
  Clock,
  History,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const pendingApprovals = [
  { id: "1", subject: "Mathematics", teacher: "Sarah Johnson", topic: "Introduction to Calculus", class: "SSS 3B", submittedDate: "2024-05-18", status: "Pending HOD" },
  { id: "2", subject: "Physics", teacher: "David Miller", topic: "Wave Optics", class: "SSS 2A", submittedDate: "2024-05-17", status: "Pending VP" },
  { id: "3", subject: "English", teacher: "Emma White", topic: "Creative Writing", class: "JSS 2C", submittedDate: "2024-05-18", status: "Pending HOD" },
];

export function LessonApprovalCentre() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-6">
        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Pending Approvals</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg font-bold"><Printer className="mr-2 h-4 w-4" /> Print Report</Button>
            </div>
          </div>

          <div className="space-y-4">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-4 rounded-xl border border-slate-100 bg-[#F5F7FA] hover:bg-white hover:shadow-md transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      <Clock className="h-6 w-6 text-amber-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-800">{item.subject}: {item.topic}</h4>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">{item.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">By {item.teacher} • {item.class} • Submitted {item.submittedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-9 px-3 rounded-lg"><Eye className="mr-2 h-4 w-4" /> Review</Button>
                    <Button className="h-9 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm"><CheckCircle className="mr-2 h-4 w-4" /> Approve</Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-700"><RotateCcw size={18}/></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <h3 className="text-lg font-bold mb-6">Approval History</h3>
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {[
              { role: "Teacher", user: "Sarah Johnson", time: "May 18, 09:30 AM", status: "Submitted", icon: RotateCcw, color: "text-blue-500", bg: "bg-blue-50" },
              { role: "HOD Academics", user: "John Carter", time: "May 18, 11:20 AM", status: "Approved", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
              { role: "VP Academics", user: "Angela Smith", time: "May 19, 08:45 AM", status: "Returned for Correction", comment: "Please update the learning objectives to be more specific.", icon: RotateCcw, color: "text-amber-500", bg: "bg-amber-50" },
            ].map((step, i) => (
              <div key={i} className="relative flex items-start gap-6 ml-5">
                <div className={cn("absolute -left-[2.35rem] flex h-9 w-9 items-center justify-center rounded-full border-4 border-white shadow-sm shrink-0", step.bg)}>
                  <step.icon className={cn("h-4 w-4", step.color)} />
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-800">{step.status} by {step.user}</h4>
                    <span className="text-xs text-slate-400 font-medium">{step.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2 font-medium">{step.role}</p>
                  {step.comment && (
                    <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 text-xs text-amber-800 italic">
                      "{step.comment}"
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <h3 className="text-lg font-bold mb-6">Reviewer Centre</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Reviewer Comments</label>
              <textarea 
                placeholder="Type your feedback here..." 
                className="w-full rounded-xl border-slate-200 p-3 text-sm min-h-[120px] focus:ring-schoolgate-green focus:border-schoolgate-green"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-6 font-bold">
                Approve
              </Button>
              <Button variant="outline" className="w-full rounded-xl py-6 font-bold text-rose-600 border-rose-100 hover:bg-rose-50">
                Reject
              </Button>
            </div>
            <Button variant="outline" className="w-full rounded-xl py-6 font-bold text-amber-600 border-amber-100 hover:bg-amber-50">
              Return for Correction
            </Button>
            <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-wider">
              Note: Comments are visible to the teacher
            </p>
          </div>
        </Card>

        <Card className="p-0 rounded-[14px] shadow-sm border-none bg-schoolgate-green text-white overflow-hidden">
          <div className="p-6">
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <History className="h-5 w-5" /> Recent Actions
            </h4>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 pb-3 border-b border-white/10 last:border-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  <div>
                    <p className="text-xs font-bold">Mathematics note approved</p>
                    <p className="text-[10px] text-white/70">JSS 2 • 10 mins ago</p>
                  </div>
                  <ChevronRight className="ml-auto h-3 w-3 text-white/50" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
