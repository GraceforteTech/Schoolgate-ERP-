import { Card } from "@/components/ui/card";
import { 
  Users, 
  School, 
  Building2, 
  UserPlus, 
  UserCheck, 
  UserMinus, 
  GraduationCap, 
  UserX, 
  User, 
  Users2, 
  CalendarCheck, 
  PieChart 
} from "lucide-react";

export function ExecutiveKpiCards() {
  const kpis = [
    { label: "Total Students", value: "2,450", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Primary Students", value: "1,200", icon: School, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Secondary Students", value: "1,250", icon: Building2, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "New Admissions", value: "156", icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Active Students", value: "2,380", icon: UserCheck, color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
    { label: "Suspended Students", value: "12", icon: UserMinus, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Total Alumni", value: "450", icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Withdrawn Students", value: "8", icon: UserX, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Male Students", value: "1,280", icon: User, color: "text-cyan-600", bg: "bg-cyan-50" },
    { label: "Female Students", value: "1,170", icon: Users2, color: "text-pink-600", bg: "bg-pink-50" },
    { label: "Avg. Attendance", value: "94%", icon: CalendarCheck, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Capacity Utilization", value: "88%", icon: PieChart, color: "text-slate-600", bg: "bg-slate-50" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="p-4 hover:shadow-lg transition-all cursor-pointer border-slate-100 rounded-[14px] group">
          <div className="flex flex-col gap-3">
            <div className={`p-2 w-fit rounded-lg ${kpi.bg} ${kpi.color} group-hover:scale-110 transition-transform`}>
              <kpi.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium truncate">{kpi.label}</p>
              <p className="text-xl font-bold text-slate-800">{kpi.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
