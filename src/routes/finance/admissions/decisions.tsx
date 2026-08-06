import { createFileRoute } from "@tanstack/react-router";
import { 
  Users, CheckCircle2, XCircle, Clock, Mail, MessageSquare, ShieldCheck, History, Send, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/finance/admissions/decisions")({
  component: AdmissionDecisionPage,
});

function AdmissionDecisionPage() {
  const applicant = {
    name: "Adebayo Olawale",
    id: "APP/2026/001",
    examScore: "85/100",
    interviewScore: "18/20",
    recommendation: "Highly Recommended",
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Interview & Admission Decision</h1>
          <p className="text-sm text-slate-500 mt-1">Review applicant performance and make final admission decisions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-schoolgate-green" />
              Applicant Performance Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase">Entrance Exam</p>
                <p className="text-xl font-black text-schoolgate-green mt-1">{applicant.examScore}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase">Interview Score</p>
                <p className="text-xl font-black text-schoolgate-green mt-1">{applicant.interviewScore}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-xs font-bold text-slate-400 uppercase">Recommendation</p>
                <p className="text-sm font-bold text-slate-700 mt-1">{applicant.recommendation}</p>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <h4 className="font-bold text-slate-700 text-sm">Interview Panel Remarks</h4>
              <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl italic">
                "The applicant demonstrated excellent communication skills and strong foundational knowledge in Mathematics. 
                Highly recommended for JSS 1 placement."
              </p>
            </div>
          </Card>

          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <History className="h-5 w-5 text-schoolgate-green" />
              Decision History
            </h3>
            <div className="space-y-4">
              {[
                { action: "Application Submitted", officer: "System", date: "Aug 01, 2026 10:20 AM" },
                { action: "Exam Completed", officer: "CBT Admin", date: "Aug 15, 2026 02:45 PM" },
                { action: "Interview Completed", officer: "Principal", date: "Aug 16, 2026 11:30 AM" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-4 text-sm">
                  <div className="mt-1 w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-800">{log.action}</p>
                    <p className="text-xs text-slate-500">by {log.officer} • {log.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <h3 className="font-bold text-slate-800 mb-6">Final Decision</h3>
            <div className="space-y-3">
              <Button className="w-full bg-schoolgate-green gap-2 h-12">
                <CheckCircle2 className="h-5 w-5" /> Approve Admission
              </Button>
              <Button variant="outline" className="w-full gap-2 h-12 text-orange-600 border-orange-100 hover:bg-orange-50">
                <Clock className="h-5 w-5" /> Move to Waiting List
              </Button>
              <Button variant="outline" className="w-full gap-2 h-12 text-destructive border-red-100 hover:bg-red-50">
                <XCircle className="h-5 w-5" /> Reject Admission
              </Button>
            </div>
          </Card>

          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <h3 className="font-bold text-slate-800 mb-6">Communications</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full gap-2 justify-start font-medium border-slate-100">
                <Mail className="h-4 w-4 text-blue-500" /> Send Admission Email
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start font-medium border-slate-100">
                <MessageSquare className="h-4 w-4 text-emerald-500" /> Send WhatsApp Notification
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start font-medium border-slate-100">
                <FileText className="h-4 w-4 text-slate-500" /> Generate Admission Letter
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
