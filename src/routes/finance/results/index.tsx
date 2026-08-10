import { createFileRoute, useSearch, useNavigate } from "@tanstack/react-router";
import { 
  BarChart3, 
  CheckCircle2, 
  ClipboardList, 
  Download, 
  FileText, 
  LayoutDashboard, 
  Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExecutiveAcademicDashboard } from "@/components/finance/results/executive-examination-dashboard";
import { ResultConfig } from "@/components/finance/results/result-config";
import { ResultEntrySystem } from "@/components/finance/results/result-entry-system";
import { ResultApprovalCentre } from "@/components/finance/results/result-approval-centre";
import { ReportCardGenerator } from "@/components/finance/results/report-card-generator";
import { ResultAnalytics } from "@/components/finance/results/result-analytics";
import { ResultKPIs } from "@/components/finance/results/result-kpi-cards";
import { StudentResultDrillDown } from "@/components/finance/results/student-result-drilldown";
import { z } from "zod";

const resultsSearchSchema = z.object({
  session: z.string().optional(),
  term: z.string().optional(),
  studentId: z.string().optional(),
  tab: z.string().optional(),
});

export const Route = createFileRoute("/finance/results/")({
  validateSearch: (search) => resultsSearchSchema.parse(search),
  component: ResultsDashboardPage,
});

function ResultsDashboardPage() {
  const { session = "2023/2024", term = "Second Term", studentId, tab = "dashboard" } = useSearch({ from: Route.fullPath });
  const navigate = useNavigate();

  const handleBack = () => {
    navigate({
      to: Route.fullPath,
      search: (prev) => ({ ...prev, studentId: undefined }) as any,
    });
  };

  if (studentId) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-8">
        <StudentResultDrillDown 
          studentId={studentId} 
          session={session} 
          term={term} 
          onBack={handleBack} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Results & Report Card Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Comprehensive academic analytics and management hub.</p>
        </div>
        <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
          <Download size={18} /> Export Results
        </Button>
      </div>

      <div className="mb-8">
        <ResultKPIs />
      </div>

      <Tabs 
        defaultValue={tab} 
        onValueChange={(v) => navigate({ search: (prev) => ({ ...prev, tab: v }) as any })}
        className="space-y-8"
      >
        <TabsList className="bg-white border border-slate-100 rounded-xl p-1 shadow-sm h-12 inline-flex">
          <TabsTrigger value="dashboard" className="px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
            <LayoutDashboard className="w-4 h-4" /> Executive Dashboard
          </TabsTrigger>
          <TabsTrigger value="config" className="px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
            <Settings className="w-4 h-4" /> Result Setup
          </TabsTrigger>
          <TabsTrigger value="entry" className="px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
            <ClipboardList className="w-4 h-4" /> Result Entry
          </TabsTrigger>
          <TabsTrigger value="approval" className="px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
            <CheckCircle2 className="w-4 h-4" /> Approvals
          </TabsTrigger>
          <TabsTrigger value="analytics" className="px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
            <BarChart3 className="w-4 h-4" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="report-cards" className="px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
            <FileText className="w-4 h-4" /> Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard"><ExecutiveAcademicDashboard /></TabsContent>
        <TabsContent value="config"><ResultConfig /></TabsContent>
        <TabsContent value="entry"><ResultEntrySystem /></TabsContent>
        <TabsContent value="approval"><ResultApprovalCentre /></TabsContent>
        <TabsContent value="analytics"><ResultAnalytics /></TabsContent>
        <TabsContent value="report-cards"><ReportCardGenerator /></TabsContent>
      </Tabs>
    </div>
  );
}
