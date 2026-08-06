import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, GraduationCap, Users, BookOpen, UserCheck, CalendarDays, Zap } from "lucide-react";

export function AcademicKPIs() {
  const kpis = [
    { label: "Active Sessions", value: "2", icon: CalendarDays },
    { label: "Active Term", value: "2nd Term", icon: Zap },
    { label: "Total Classes", value: "14", icon: BookOpen },
    { label: "Total Arms", value: "32", icon: Users },
    { label: "Total Subjects", value: "48", icon: GraduationCap },
    { label: "Teaching Staff", value: "85", icon: UserCheck },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="rounded-[14px] border-none shadow-sm bg-white p-4 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-schoolgate-green-light rounded-lg">
              <kpi.icon className="w-4 h-4 text-schoolgate-green" />
            </div>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
          <h3 className="text-xl font-black text-slate-900 mt-1">{kpi.value}</h3>
        </Card>
      ))}
    </div>
  );
}
