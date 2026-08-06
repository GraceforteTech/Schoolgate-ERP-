import { 
  Users, 
  UserMinus, 
  Clock, 
  BarChart3, 
  GraduationCap, 
  School, 
  UserCheck, 
  UserX, 
  CalendarCheck, 
  AlertTriangle 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const kpiData = [
  { label: "Students Present Today", value: "1,240", icon: Users, color: "text-emerald-600", bg: "bg-emerald-100" },
  { label: "Students Absent Today", value: "45", icon: UserMinus, color: "text-rose-600", bg: "bg-rose-100" },
  { label: "Students Late Today", value: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-100" },
  { label: "Attendance Percentage", value: "96.5%", icon: BarChart3, color: "text-blue-600", bg: "bg-blue-100" },
  { label: "Primary Attendance Rate", value: "97.2%", icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-100" },
  { label: "Secondary Attendance Rate", value: "95.8%", icon: School, color: "text-violet-600", bg: "bg-violet-100" },
  { label: "Staff Present", value: "88/90", icon: UserCheck, color: "text-teal-600", bg: "bg-teal-100" },
  { label: "Staff Absent", value: "2", icon: UserX, color: "text-orange-600", bg: "bg-orange-100" },
  { label: "Average Monthly Attendance", value: "94.8%", icon: CalendarCheck, color: "text-cyan-600", bg: "bg-cyan-100" },
  { label: "Chronic Absentees", value: "18", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100" },
];

export function ExecutiveKPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpiData.map((kpi) => (
        <Card 
          key={kpi.label} 
          className="group relative overflow-hidden rounded-[14px] border-none bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md cursor-pointer"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-schoolgate-green group-hover:text-white", kpi.bg, kpi.color)}>
                <kpi.icon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-500">{kpi.label}</span>
                <span className="text-xl font-bold tracking-tight text-slate-900">{kpi.value}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-schoolgate-green transition-all group-hover:w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
