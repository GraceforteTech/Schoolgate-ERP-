import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ResultKPIs } from "@/components/finance/results/result-kpi-cards";
import { ResultConfig } from "@/components/finance/results/result-config";
import { ResultEntrySystem } from "@/components/finance/results/result-entry-system";
import { ResultApprovalCentre } from "@/components/finance/results/result-approval-centre";
import { ReportCardGenerator } from "@/components/finance/results/report-card-generator";
import { ResultAnalytics } from "@/components/finance/results/result-analytics";
import { TranscriptManagement } from "@/components/finance/results/transcript-management";
import { AcademicDashboard } from "@/components/finance/results/academic-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, LayoutDashboard, FileText, Settings, ClipboardList, CheckCircle2, BarChart3, History, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/finance/results")({
  component: ResultManagementPage,
});

function ResultManagementPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Result & Report Card Management</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Manage assessment scores, result computation and report card generation.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <Download size={18} />
            Export Archive
          </Button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-schoolgate-green animate-pulse" />
            Academic Engine Active
          </div>
        </div>
      </div>

      {/* Module 2: Executive KPI Cards */}
      <div className="mb-8">
        <ResultKPIs />
      </div>

      {/* Main Workspace Tabs */}
      <Tabs defaultValue="entry" className="space-y-8">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="bg-white border border-slate-100 rounded-xl p-1 shadow-sm h-12 inline-flex min-w-max">
            <TabsTrigger 
              value="dashboard" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Executive Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="config" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2"
            >
              <Settings className="w-4 h-4" />
              Result Setup
            </TabsTrigger>
            <TabsTrigger 
              value="entry" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2"
            >
              <ClipboardList className="w-4 h-4" />
              Result Entry
            </TabsTrigger>
            <TabsTrigger 
              value="approval" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Approval Workflow
            </TabsTrigger>
            <TabsTrigger 
              value="report-cards" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2"
            >
              <FileText className="w-4 h-4" />
              Report Cards
            </TabsTrigger>
            <TabsTrigger 
              value="transcripts" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Transcripts
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AcademicDashboard />
        </TabsContent>

        <TabsContent value="config" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultConfig />
        </TabsContent>

        <TabsContent value="entry" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultEntrySystem />
        </TabsContent>

        <TabsContent value="approval" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultApprovalCentre />
        </TabsContent>

        <TabsContent value="report-cards" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ReportCardGenerator />
        </TabsContent>

        <TabsContent value="transcripts" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TranscriptManagement />
        </TabsContent>

        <TabsContent value="analytics" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ResultAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
