import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExecutiveKpiCards } from "@/components/finance/wealth-loan/executive-kpi-cards";
import { SavingsManagement } from "@/components/finance/wealth-loan/savings-management";
import { LoanManagement } from "@/components/finance/wealth-loan/loan-management";
import { RepaymentSchedule } from "@/components/finance/wealth-loan/repayment-schedule";
import { LoanApprovalWorkflow } from "@/components/finance/wealth-loan/loan-approval-workflow";
import { WealthLoanAnalytics } from "@/components/finance/wealth-loan/wealth-loan-analytics";
import { ProprietorWealthDashboard } from "@/components/finance/wealth-loan/proprietor-wealth-dashboard";
import { Wallet, PiggyBank, HandCoins, CalendarClock, ShieldCheck, BarChart3, LayoutDashboard } from "lucide-react";

export const Route = createFileRoute("/finance/wealth-loan/")({
  component: WealthLoanPage,
});

function WealthLoanPage() {
  return (
    <div className="min-h-screen bg-page-background p-4 md:p-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Schoolgate Wealth & Loan Scheme</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Manage staff wealth contributions, savings, loans and financial wellbeing.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Wealth Fund Active
        </div>
      </div>

      {/* Module 2: Executive KPI Cards */}
      <div className="mb-8">
        <ExecutiveKpiCards />
      </div>

      {/* Main Workspace Tabs */}
      <Tabs defaultValue="savings" className="space-y-8">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="bg-white border border-slate-100 rounded-xl p-1 shadow-sm h-12 flex-nowrap">
            <TabsTrigger 
              value="savings" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full flex items-center gap-2"
            >
              <PiggyBank className="h-4 w-4" /> Savings
            </TabsTrigger>
            <TabsTrigger 
              value="loans" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full flex items-center gap-2"
            >
              <HandCoins className="h-4 w-4" /> Loans
            </TabsTrigger>
            <TabsTrigger 
              value="repayments" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full flex items-center gap-2"
            >
              <CalendarClock className="h-4 w-4" /> Repayments
            </TabsTrigger>
            <TabsTrigger 
              value="approval" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full flex items-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" /> Approval Centre
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="proprietor" 
              className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4" /> Proprietor
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="savings">
          <SavingsManagement />
        </TabsContent>

        <TabsContent value="loans">
          <LoanManagement />
        </TabsContent>

        <TabsContent value="repayments">
          <RepaymentSchedule />
        </TabsContent>

        <TabsContent value="approval">
          <LoanApprovalWorkflow />
        </TabsContent>

        <TabsContent value="analytics">
          <WealthLoanAnalytics />
        </TabsContent>

        <TabsContent value="proprietor">
          <ProprietorWealthDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
