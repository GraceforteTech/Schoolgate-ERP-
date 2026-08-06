import { Card } from "@/components/ui/card";
import { Users, GraduationCap, UserCheck, TrendingUp } from "lucide-react";

const kpis = [
  {
    label: "Total Classes",
    value: "42",
    icon: GraduationCap,
    trend: "+2 this term",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Total Students",
    value: "1,240",
    icon: Users,
    trend: "+12% vs last term",
    color: "bg-schoolgate-green-light text-schoolgate-green",
  },
  {
    label: "Average Class Size",
    value: "29",
    icon: UserCheck,
    trend: "Optimal range",
    color: "bg-orange-50 text-orange-600",
  },
  {
    label: "Teacher Allocation",
    value: "95%",
    icon: TrendingUp,
    trend: "2 pending slots",
    color: "bg-purple-50 text-purple-600",
  },
];

export function ClassKpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="p-5 border-none shadow-sm rounded-[14px] bg-white group hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className={`h-12 w-12 rounded-2xl ${kpi.color} grid place-items-center`}>
              <kpi.icon className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.trend}</span>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">{kpi.value}</h3>
            <p className="text-sm font-medium text-slate-500 mt-0.5">{kpi.label}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
