import { Card } from "@/components/ui/card";
import { 
  Zap, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  UserCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StaffPersonalKpis() {
  const kpis = [
    {
      label: "Productivity Score",
      value: "94%",
      sub: "Top 5% in Faculty",
      icon: Zap,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      label: "Attendance Rate",
      value: "98.2%",
      sub: "Current Session",
      icon: UserCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      label: "Pending Lessons",
      value: "04",
      sub: "Due this week",
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      label: "Result Submission",
      value: "On-Track",
      sub: "12/15 Completed",
      icon: CheckCircle2,
      color: "text-purple-500",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <Card key={index} className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white group hover:border-schoolgate-green transition-all duration-300">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
              <kpi.icon size={24} />
            </div>
            <Badge variant="outline" className="text-[10px] font-black text-slate-300 uppercase tracking-tighter border-none">Personal</Badge>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-black text-slate-800">{kpi.value}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{kpi.label}</p>
            <p className="text-[10px] text-slate-500 italic mt-2 font-medium">{kpi.sub}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}