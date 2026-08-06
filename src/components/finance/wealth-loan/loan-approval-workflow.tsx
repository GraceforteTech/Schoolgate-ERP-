import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, User, MessageSquare, ArrowRight, XCircle, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const workflowSteps = [
  { stage: "Application", status: "Completed", user: "Staff Member", date: "Aug 01, 2026", icon: User },
  { stage: "HR Review", status: "Completed", user: "HR Manager", date: "Aug 02, 2026", icon: CheckCircle2 },
  { stage: "Accountant Review", status: "Completed", user: "Chief Accountant", date: "Aug 03, 2026", icon: CheckCircle2 },
  { stage: "Proprietor Approval", status: "Current", user: "School Proprietor", date: "Pending", icon: Clock },
  { stage: "Disbursement", status: "Upcoming", user: "Bursar", date: "Scheduled", icon: ArrowRight },
];

export function LoanApprovalWorkflow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 rounded-[14px] border-slate-100 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold text-slate-800">Loan Approval Timeline</CardTitle>
            <Badge className="bg-amber-100 text-amber-700 border-amber-200">Awaiting Proprietor</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-8 relative">
            {workflowSteps.map((step, i) => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step.status === "Completed" ? "bg-emerald-50 border-emerald-200 text-emerald-600" :
                  step.status === "Current" ? "bg-amber-50 border-amber-200 text-amber-600 animate-pulse" :
                  "bg-slate-50 border-slate-200 text-slate-400"
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                
                {i < workflowSteps.length - 1 && (
                  <div className={`absolute left-5 top-10 w-0.5 h-8 -z-10 ${
                    step.status === "Completed" ? "bg-emerald-200" : "bg-slate-100"
                  }`} />
                )}

                <div className="flex-1 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`font-bold ${step.status === "Upcoming" ? "text-slate-400" : "text-slate-800"}`}>
                        {step.stage}
                      </h4>
                      <p className="text-xs text-slate-500">Responsible: {step.user}</p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{step.date}</span>
                  </div>
                  {step.status === "Completed" && (
                    <div className="mt-2 bg-slate-50 rounded-lg p-3 border border-slate-100">
                      <p className="text-xs text-slate-600 italic">"Verified eligibility and savings balance. Recommended for approval."</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="rounded-[14px] border-slate-100 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Approval Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-schoolgate-green h-11 font-bold gap-2">
              <CheckCircle2 className="h-5 w-5" /> Approve Application
            </Button>
            <Button variant="outline" className="w-full border-rose-200 text-rose-600 hover:bg-rose-50 h-11 font-bold gap-2">
              <XCircle className="h-5 w-5" /> Reject Application
            </Button>
            <Button variant="ghost" className="w-full text-amber-600 hover:bg-amber-50 h-11 font-bold gap-2">
              <Info className="h-5 w-5" /> Request Info
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-slate-100 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-4 w-4 text-slate-400" />
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recent Comments</h4>
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
              <div>
                <p className="text-[11px] font-bold text-slate-700">Accountant Review</p>
                <p className="text-[11px] text-slate-500">"Savings balance is ₦450,000. Loan requested is ₦500,000. Within 120% threshold."</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
