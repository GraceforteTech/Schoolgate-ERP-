import { Card } from "@/components/ui/card";
import { GraduationCap, Briefcase, School, Heart, TrendingUp, Users } from "lucide-react";

export function AlumniKpiCards() {
  const kpis = [
    {
      label: "Total Alumni",
      value: "4,850",
      change: "+12.5%",
      icon: GraduationCap,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
    },
    {
      label: "Employment Rate",
      value: "84.2%",
      change: "+3.1%",
      icon: Briefcase,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
    },
    {
      label: "Higher Ed Placement",
      value: "72.8%",
      change: "+5.4%",
      icon: School,
      color: "bg-purple-500",
      lightColor: "bg-purple-50",
    },
    {
      label: "Donation Revenue",
      value: "₦8.4M",
      change: "+24%",
      icon: Heart,
      color: "bg-rose-500",
      lightColor: "bg-rose-50",
    },
    {
      label: "Active Mentors",
      value: "124",
      change: "+15",
      icon: Users,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
    },
    {
      label: "Community Growth",
      value: "92%",
      change: "+4.2%",
      icon: TrendingUp,
      color: "bg-indigo-500",
      lightColor: "bg-indigo-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="p-4 border-none shadow-sm bg-white hover:shadow-md transition-all duration-300 rounded-[14px]">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-xl ${kpi.lightColor}`}>
              <kpi.icon className={`h-5 w-5 ${kpi.color.replace('bg-', 'text-')}`} />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {kpi.change}
            </span>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
            <h3 className="text-xl font-black text-slate-900 mt-1">{kpi.value}</h3>
          </div>
        </Card>
      ))}
    </div>
  );
}
