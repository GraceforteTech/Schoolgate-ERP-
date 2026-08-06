import { createFileRoute } from "@tanstack/react-router";
import { ExecutiveKpiCards } from "@/components/finance/payroll-management/executive-kpi-cards";
import { PayrollActionBar } from "@/components/finance/payroll-management/payroll-action-bar";
import { PayrollProcessingTable } from "@/components/finance/payroll-management/payroll-processing-table";
import { SalaryBreakdownPanel } from "@/components/finance/payroll-management/salary-breakdown-panel";
import { PayrollApprovalWorkflow } from "@/components/finance/payroll-management/approval-workflow";
import { PayrollAnalytics } from "@/components/finance/payroll-management/payroll-analytics";
import { ProprietorDashboard } from "@/components/finance/payroll-management/proprietor-dashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Download, FileSpreadsheet, FileText, Printer, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/finance/payroll-management/")({
  component: PayrollManagementPage,
});

function PayrollManagementPage() {
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-page-background p-4 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Payroll Management</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Process salaries, deductions and staff financial benefits efficiently.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" className="bg-white border-slate-200 text-slate-600 hover:bg-slate-50">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Payroll Engine
          </div>
        </div>
      </div>

      {/* Module 2: Executive KPI Cards */}
      <div className="mb-8">
        <ExecutiveKpiCards />
      </div>

      {/* Module 3: Action Bar */}
      <div className="mb-8">
        <PayrollActionBar />
      </div>

      {/* Main Workspace Tabs */}
      <Tabs defaultValue="processing" className="space-y-8">
        <div className="flex items-center justify-between">
          <TabsList className="bg-white border border-slate-100 rounded-xl p-1 shadow-sm h-12">
            <TabsTrigger 
              value="processing" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full"
            >
              Payroll Processing
            </TabsTrigger>
            <TabsTrigger 
              value="approval" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full"
            >
              Approval Workflow
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="proprietor" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full"
            >
              Proprietor Dashboard
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Module 4: Processing Table */}
        <TabsContent value="processing">
          <PayrollProcessingTable />
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" className="text-slate-400 text-xs" onClick={() => setBreakdownOpen(true)}>
              Demo: Open Salary Breakdown
            </Button>
          </div>
        </TabsContent>

        {/* Module 7: Approval Workflow */}
        <TabsContent value="approval">
          <PayrollApprovalWorkflow />
        </TabsContent>

        {/* Module 8: Analytics */}
        <TabsContent value="analytics">
          <PayrollAnalytics />
        </TabsContent>

        {/* Module 9: Proprietor Dashboard */}
        <TabsContent value="proprietor">
          <ProprietorDashboard />
        </TabsContent>
      </Tabs>

      {/* Module 5: Salary Breakdown Panel */}
      <SalaryBreakdownPanel open={breakdownOpen} onOpenChange={setBreakdownOpen} />
    </div>
  );
}
