import { createFileRoute } from "@tanstack/react-router";
import { ExecutiveKpiCards } from "@/components/finance/expense-management/executive-kpi-cards";
import { ExpenseActionBar } from "@/components/finance/expense-management/expense-action-bar";
import { ExpenseRegisterTable } from "@/components/finance/expense-management/expense-register-table";
import { ExpenseAnalytics } from "@/components/finance/expense-management/expense-analytics";
import { ApprovalCentre } from "@/components/finance/expense-management/approval-centre";
import { RecentActivities } from "@/components/finance/expense-management/recent-activities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/finance/expense-management/")({
  component: ExpenseManagementPage,
});

function ExpenseManagementPage() {
  return (
    <div className="min-h-screen bg-page-background p-4 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Expense Management</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Record, approve and monitor all school expenditures.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Financial Sync
        </div>
      </div>

      {/* Module 2: Executive KPI Cards */}
      <div className="mb-8">
        <ExecutiveKpiCards />
      </div>

      {/* Module 3: Action Bar & Filters */}
      <div className="mb-8">
        <ExpenseActionBar />
      </div>

      {/* Main Workspace Tabs */}
      <Tabs defaultValue="register" className="space-y-8">
        <div className="flex items-center justify-between">
          <TabsList className="bg-white border border-slate-100 rounded-xl p-1 shadow-sm h-12">
            <TabsTrigger 
              value="register" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full"
            >
              Expense Register
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full"
            >
              Expense Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="approval" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full"
            >
              Approval Centre
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Module 4: Expense Register */}
        <TabsContent value="register" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
              <ExpenseRegisterTable />
            </div>
            <div className="xl:col-span-1">
              <RecentActivities />
            </div>
          </div>
        </TabsContent>

        {/* Module 5: Expense Analytics */}
        <TabsContent value="analytics">
          <ExpenseAnalytics />
        </TabsContent>

        {/* Module 7: Approval Workflow */}
        <TabsContent value="approval">
          <ApprovalCentre />
        </TabsContent>
      </Tabs>
    </div>
  );
}
