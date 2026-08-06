import { createFileRoute } from "@tanstack/react-router";
import { 
  Bell, 
  Search, 
  Filter, 
  ChevronRight,
  TrendingUp,
  History,
  Info
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExecutiveKpiCards } from "@/components/finance/admissions/executive-kpi-cards";
import { QuickActions } from "@/components/finance/admissions/quick-actions";
import { AdmissionPipeline } from "@/components/finance/admissions/admission-pipeline";
import { ApplicantTable } from "@/components/finance/admissions/applicant-table";
import { AdmissionAnalytics } from "@/components/finance/admissions/admission-analytics";

export const Route = createFileRoute("/finance/admissions/")({
  component: AdmissionsPage,
});

function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admissions Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage the complete student admission process from enquiry to enrolment.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Card className="flex items-center gap-3 py-2 px-4 border-slate-200 rounded-xl shadow-sm bg-white">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 grid place-items-center overflow-hidden"
                >
                  <div className="w-full h-full bg-schoolgate-green-light text-[10px] font-bold text-schoolgate-green grid place-items-center">
                    U{i}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Review Team</p>
              <p className="text-xs font-bold text-slate-700">8 Active Admins</p>
            </div>
            <div className="h-6 w-px bg-slate-200 mx-1" />
            <div className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-schoolgate-green cursor-pointer transition-colors">
              <Bell className="h-4 w-4" />
            </div>
          </Card>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold">
          <TrendingUp className="h-5 w-5 text-schoolgate-green" />
          <span>Executive Admission KPIs</span>
        </div>
        <ExecutiveKpiCards />
      </div>

      {/* Pipeline & Quick Actions Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Interactive Pipeline */}
        <div className="xl:col-span-8 space-y-4">
          <Card className="p-6 bg-white border-slate-100 shadow-sm rounded-[14px]">
            <AdmissionPipeline />
          </Card>

          {/* Analytics Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <TrendingUp className="h-5 w-5 text-schoolgate-green" />
              <span>Admission Analytics & Conversion</span>
            </div>
            <AdmissionAnalytics />
          </div>
        </div>

        {/* Quick Actions & Notifications */}
        <div className="xl:col-span-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 font-bold">
              <ChevronRight className="h-5 w-5 text-schoolgate-green" />
              <span>Admission Quick Actions</span>
            </div>
            <QuickActions />
          </div>

          <Card className="p-6 bg-white border-slate-100 shadow-sm rounded-[14px] flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <History className="h-5 w-5 text-schoolgate-green" />
                <span>Recent Notifications</span>
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 text-[10px] uppercase">View All</Badge>
            </div>
            <div className="space-y-4">
              {[
                { title: "New Application", desc: "Adebayo Olawale submitted an application for JSS 1", time: "2 mins ago", type: "info" },
                { title: "Interview Scheduled", desc: "Chiamaka Okoro interview set for tomorrow 10:00 AM", time: "1 hour ago", type: "success" },
                { title: "Exam Result Uploaded", desc: "Entrance exam results for SS 1 are now available", time: "3 hours ago", type: "warning" },
              ].map((note, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer p-2 -m-2 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`mt-1 p-1.5 rounded-lg ${
                    note.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 
                    note.type === 'warning' ? 'bg-orange-50 text-orange-600' : 
                    'bg-blue-50 text-blue-600'
                  }`}>
                    <Info className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{note.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{note.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{note.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Main Applicant Table Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <Search className="h-5 w-5 text-schoolgate-green" />
            <span>Applicant Registry & Management</span>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-slate-200 text-slate-500 font-bold">Total: 1,245</Badge>
            <Badge className="bg-schoolgate-green text-white font-bold">New: 24</Badge>
          </div>
        </div>
        
        <Card className="p-6 bg-white border-slate-100 shadow-sm rounded-[14px]">
          <ApplicantTable />
        </Card>
      </div>
    </div>
  );
}
