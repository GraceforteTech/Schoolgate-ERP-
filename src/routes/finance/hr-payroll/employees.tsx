import { createFileRoute } from "@tanstack/react-router";
import { UserPlus, LayoutDashboard } from "lucide-react";
import { EmployeeKPIs } from "@/components/hr/employee-mgmt/employee-kpis";
import { EmployeeDirectory } from "@/components/hr/employee-mgmt/employee-directory";

export const Route = createFileRoute("/finance/hr-payroll/employees")({
  component: EmployeeManagementPage,
});

function EmployeeManagementPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-12">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="px-6 py-6 max-w-[1600px] mx-auto">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Employee Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage employee records, appointments, departments and employment lifecycle.</p>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6 max-w-[1600px] mx-auto">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4 text-schoolgate-green" />
              Executive KPI Cards
            </h2>
          </div>
          <EmployeeKPIs />
        </section>

        <section>
          <EmployeeDirectory />
        </section>
      </div>
    </div>
  );
}
