import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  Briefcase, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Zap,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export function TeacherKpis() {
  const kpis = [
    { label: "Total Teachers", value: "124", sub: "Global Staff", icon: Users, color: "blue" },
    { label: "Active Teachers", value: "118", sub: "Currently Active", icon: UserCheck, color: "emerald" },
    { label: "Teaching Staff", value: "96", sub: "Academic Staff", icon: BookOpen, color: "indigo" },
    { label: "Non-Teaching Staff", value: "28", sub: "Admin & Support", icon: Briefcase, color: "orange" },
    { label: "Teachers Present Today", value: "112", sub: "90% Attendance", icon: CheckCircle2, color: "green" },
    { label: "Teachers Absent Today", value: "6", sub: "Action Required", icon: AlertCircle, color: "red" },
    { label: "Average Workload", value: "18.5", sub: "Periods / Week", icon: Clock, color: "purple" },
    { label: "Performance Rating", value: "4.8", sub: "School Average", icon: TrendingUp, color: "amber" },
    { label: "Lesson Completion", value: "92%", sub: "Weekly Target", icon: GraduationCap, color: "cyan" },
    { label: "Staff Development", value: "45", sub: "Active Participation", icon: Award, color: "rose" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <Card 
          key={index} 
          className="p-5 border-slate-100 shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group rounded-[14px]"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-xl transition-colors ${
              kpi.color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' :
              kpi.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' :
              kpi.color === 'indigo' ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' :
              kpi.color === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white' :
              kpi.color === 'green' ? 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white' :
              kpi.color === 'red' ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white' :
              kpi.color === 'purple' ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' :
              kpi.color === 'amber' ? 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white' :
              kpi.color === 'cyan' ? 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white' :
              'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white'
            }`}>
              <kpi.icon size={18} />
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{kpi.label}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-black text-slate-800 tracking-tight">{kpi.value}</p>
          </div>
          <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{kpi.sub}</p>
        </Card>
      ))}
    </div>
  );
}
