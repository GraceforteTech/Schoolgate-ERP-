import { Card } from "@/components/ui/card";
import { Users, DollarSign, Briefcase, FileText, PiggyBank, Target, Clock, TrendingUp, BarChart3, Receipt } from "lucide-react";

export function ExecutiveKpiCards() {
  const kpis = [
    { label: "Total Staff", value: "156", icon: Users },
    { label: "Monthly Gross", value: "₦12.5M", icon: DollarSign },
    { label: "Monthly Net", value: "₦10.2M", icon: Briefcase },
    { label: "Pension", value: "₦850K", icon: PiggyBank },
    { label: "Wealth Fund", value: "₦420K", icon: Target },
    { label: "Loan Deductions", value: "₦310K", icon: Receipt },
    { label: "Pending Approval", value: "12", icon: Clock },
    { label: "Processed This Month", value: "Yes", icon: FileText },
    { label: "Average Salary", value: "₦210K", icon: TrendingUp },
    { label: "Payroll Expense Ratio", value: "42%", icon: BarChart3 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="p-4 hover:shadow-lg transition-all cursor-pointer border-slate-100 rounded-[14px]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-schoolgate-green-light rounded-lg text-schoolgate-green">
              <kpi.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
              <p className="text-lg font-bold text-slate-800">{kpi.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
