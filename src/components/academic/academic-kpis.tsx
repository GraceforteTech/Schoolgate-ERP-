import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, GraduationCap, Users, BookOpen, UserCheck, CalendarDays, Zap } from "lucide-react";

export function AcademicKPIs() {
  const kpis = [
    { label: "Academic Sessions", value: "2023/24", icon: CalendarDays },
    { label: "Active Term", value: "2nd Term", icon: Zap },
    { label: "Total Classes", value: "14", icon: BookOpen },
    { label: "Total Arms", value: "32", icon: Users },
    { label: "Total Subjects", value: "48", icon: GraduationCap },
    { label: "Teaching Staff", value: "85", icon: UserCheck },
    { label: "Students Enrolled", value: "1,240", icon: Users },
    { label: "Teacher Workload", value: "18.5h", icon: UserCheck },
    { label: "Curriculum Completion", value: "78%", icon: BookOpen },
    { label: "Lesson Completion", value: "92%", icon: Zap },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="rounded-[14px] border-none shadow-sm bg-white p-4 hover:shadow-md transition-all cursor-pointer group">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-schoolgate-green-light rounded-lg group-hover:bg-schoolgate-green transition-colors">
              <kpi.icon className="w-4 h-4 text-schoolgate-green group-hover:text-white transition-colors" />
            </div>
            <ArrowUpRight size={14} className="text-slate-300 group-hover:text-schoolgate-green" />
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
          <h3 className="text-xl font-black text-slate-900 mt-1">{kpi.value}</h3>
        </Card>
      ))}
    </div>
  );
}
