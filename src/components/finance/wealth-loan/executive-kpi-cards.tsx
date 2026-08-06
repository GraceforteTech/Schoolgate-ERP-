import { Card } from "@/components/ui/card";
import { Users, DollarSign, Wallet, PiggyBank, Target, BarChart3 } from "lucide-react";

export function ExecutiveKpiCards() {
  const kpis = [
    { label: "Total Fund", value: "₦45.2M", icon: Wallet },
    { label: "Staff Contrib.", value: "₦25.1M", icon: Users },
    { label: "School Contrib.", value: "₦20.1M", icon: DollarSign },
    { label: "Active Loans", value: "84", icon: Target },
    { label: "Pending Approval", value: "12", icon: PiggyBank },
    { label: "Sustainability", value: "98%", icon: BarChart3 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="p-4 hover:shadow-lg transition-all cursor-pointer border-slate-100 rounded-[14px]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-schoolgate-green-light rounded-lg text-schoolgate-green">
              <kpi.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">{kpi.label}</p>
              <p className="text-sm font-bold text-slate-800">{kpi.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
