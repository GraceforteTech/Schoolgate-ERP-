import { createFileRoute } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Database, 
  FileEdit, 
  MonitorPlay, 
  BarChart3, 
  Sparkles, 
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Download,
  BrainCircuit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CBTKpis } from "@/components/cbt/cbt-kpis";
import { QuestionBank } from "@/components/cbt/question-bank";
import { ExamBuilder } from "@/components/cbt/exam-builder";
import { LiveExamMonitor } from "@/components/cbt/live-exam-monitor";
import { CBTAnalytics } from "@/components/cbt/cbt-analytics";
import { AIQuestionCentre } from "@/components/cbt/ai-question-centre";
import { ProprietorCBTDashboard } from "@/components/cbt/proprietor-cbt-dashboard";
import { AILearningAssistant } from "@/components/cbt/ai-learning-assistant";


export const Route = createFileRoute("/cbt/")({
  component: CBTManagementPage,
});

function CBTManagementPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Computer-Based Testing (CBT)</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Create, schedule and monitor online examinations and practice tests.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <Download size={18} />
            Export Data
          </Button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-schoolgate-green animate-pulse" />
            System Live
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-8">
        <CBTKpis />
      </div>

      <Tabs defaultValue="dashboard" className="space-y-8">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="bg-white border border-slate-100 rounded-xl p-1 shadow-sm h-12 inline-flex min-w-max">
            <TabsTrigger value="dashboard" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="questions" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <Database className="w-4 h-4" /> Question Bank
            </TabsTrigger>
            <TabsTrigger value="builder" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <FileEdit className="w-4 h-4" /> Exam Builder
            </TabsTrigger>
            <TabsTrigger value="live" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <MonitorPlay className="w-4 h-4" /> Live Monitor
            </TabsTrigger>
            <TabsTrigger value="analytics" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <BarChart3 className="w-4 h-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="ai" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <Sparkles className="w-4 h-4" /> AI Question Centre
            </TabsTrigger>
            <TabsTrigger value="proprietor" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <ShieldCheck className="w-4 h-4" /> Executive
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 space-y-6">
              {/* Recent Activities Placeholder */}
              <div className="bg-white p-6 rounded-[14px] shadow-sm border border-slate-100">
                <h3 className="text-lg font-black text-slate-800 mb-4">Live Activity Stream</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">AO</div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-700">Adebayo Olawale started JSS 3 Mathematics Exam</p>
                        <p className="text-xs text-slate-400">2 minutes ago • Primary School • Abuja Campus</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase rounded-lg">Online</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="xl:col-span-4">
               <div className="bg-white p-6 rounded-[14px] shadow-sm border border-slate-100">
                <h3 className="text-lg font-black text-slate-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="h-20 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 flex flex-col gap-2 font-bold shadow-md">
                    <Plus size={20} />
                    <span className="text-xs uppercase tracking-wider">New Question</span>
                  </Button>
                  <Button variant="outline" className="h-20 rounded-xl border-slate-100 flex flex-col gap-2 font-bold text-slate-600 hover:bg-slate-50">
                    <FileEdit size={20} />
                    <span className="text-xs uppercase tracking-wider">Create Exam</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="questions"><QuestionBank /></TabsContent>
        <TabsContent value="builder"><ExamBuilder /></TabsContent>
        <TabsContent value="live"><LiveExamMonitor /></TabsContent>
        <TabsContent value="analytics"><CBTAnalytics /></TabsContent>
        <TabsContent value="ai"><AIQuestionCentre /></TabsContent>
        <TabsContent value="proprietor"><ProprietorCBTDashboard /></TabsContent>
      </Tabs>
    </div>
  );
}
