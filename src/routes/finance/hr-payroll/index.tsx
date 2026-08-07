import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Download, Filter, Plus, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HRDashboardKPIs } from "@/components/hr/hr-dashboard-kpis";
import { HRDashboardAnalytics } from "@/components/hr/hr-dashboard-analytics";
import { HRDashboardFeeds } from "@/components/hr/hr-dashboard-feeds";
import { EmployeeList } from "@/components/hr/employee-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecruitmentHub } from "@/components/hr/recruitment/recruitment-hub";
import { AwardsPromotions } from "@/components/hr/performance/awards-promotions";
import { LeaveManagementSystem } from "@/components/hr/leave/leave-management-system";

export const Route = createFileRoute("/finance/hr-payroll/")({
  component: HRPayrollDashboard,
});

function HRPayrollDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-12">
      {/* Header Area */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 gap-4 max-w-[1600px] mx-auto">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              HR & Payroll Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage employees, payroll and staff welfare from one intelligent dashboard.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-9 gap-2 border-slate-200 rounded-lg">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button variant="outline" className="h-9 gap-2 border-slate-200 rounded-lg">
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button className="h-9 gap-2 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg shadow-sm">
              <Plus className="h-4 w-4" />
              New Employee
            </Button>
          </div>
        </div>
        
        {/* Global Filters Bar */}
        <div className="px-6 py-2 bg-slate-50/50 flex items-center gap-4 overflow-x-auto no-scrollbar border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
            <Filter className="h-3 w-3" />
            Quick Filters:
          </div>
          <div className="flex items-center gap-2">
            {["2024/2025 Session", "1st Term", "All Departments", "All Staff Types"].map((filter) => (
              <button
                key={filter}
                className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-schoolgate-green hover:text-schoolgate-green transition-all shadow-sm whitespace-nowrap"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Top KPI Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-schoolgate-green" />
              Executive KPI Overview
            </h2>
          </div>
          <HRDashboardKPIs />
        </section>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <div className="flex items-center justify-between bg-white p-1 rounded-xl shadow-sm border border-slate-200/60 overflow-x-auto no-scrollbar">
            <TabsList className="bg-transparent h-auto p-0 gap-1">
              {[
                { id: "overview", label: "Overview" },
                { id: "payroll", label: "Payroll Summary" },
                { id: "employees", label: "Employee Hub" },
                { id: "recruitment", label: "Recruitment" },
                { id: "attendance", label: "Attendance" },
                { id: "leave", label: "Leave Mgmt" },
                { id: "performance", label: "Performance" },
                { id: "wealth", label: "Wealth & Loans" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="px-4 py-2 text-xs font-bold rounded-lg data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green hover:text-schoolgate-green transition-all"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6 outline-none">
            {/* Analytics Grid */}
            <HRDashboardAnalytics />
            
            {/* Notifications and Activity */}
            <HRDashboardFeeds />
          </TabsContent>
          
          <TabsContent value="payroll" className="h-40 flex items-center justify-center bg-white rounded-[14px] border border-dashed border-slate-300">
             <div className="text-center">
               <p className="text-sm text-muted-foreground font-medium italic">Payroll Detailed Module Placeholder</p>
               <Button variant="link" className="text-schoolgate-green text-xs">View Registry</Button>
             </div>
          </TabsContent>
          <TabsContent value="employees" className="outline-none">
            <EmployeeList />
          </TabsContent>
          <TabsContent value="recruitment" className="outline-none">
            <RecruitmentHub />
          </TabsContent>
          <TabsContent value="leave" className="outline-none">
            <LeaveManagementSystem />
          </TabsContent>
          <TabsContent value="performance" className="outline-none">
            <AwardsPromotions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
