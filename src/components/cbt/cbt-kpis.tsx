import { Card } from "@/components/ui/card";
import { 
  Database, 
  FileText, 
  Calendar, 
  MonitorPlay, 
  CheckCircle2, 
  Users, 
  Trophy, 
  Target, 
  AlertCircle, 
  Layers 
} from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Question Bank", value: "8,450", sub: "+120 this month", icon: Database, color: "blue" },
  { label: "Active Exams", value: "24", sub: "12 live now", icon: MonitorPlay, color: "emerald" },
  { label: "Scheduled", value: "48", sub: "Next in 2 hours", icon: Calendar, color: "orange" },
  { label: "Live Students", value: "1,245", sub: "3 campuses", icon: Users, color: "blue" },
  { label: "Completed", value: "3,890", sub: "Today's total", icon: CheckCircle2, color: "emerald" },
  { label: "Avg Score", value: "72%", sub: "Across all subjects", icon: Trophy, color: "purple" },
  { label: "Pass Rate", value: "85%", sub: "Benchmark: 65%", icon: Target, color: "emerald" },
  { label: "Failed Exams", value: "12", sub: "Under review", icon: AlertCircle, color: "rose" },
  { label: "Categories", value: "156", sub: "Topics & Tags", icon: Layers, color: "blue" },
  { label: "Total Questions", value: "12.5k", sub: "Archive included", icon: FileText, color: "slate" },
];

export function CBTKpis() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, i) => (
        <Card 
          key={i} 
          className={cn(
            "p-4 border-slate-100 shadow-sm rounded-[14px] hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer bg-white group"
          )}
          onClick={() => alert(`Drill-down: ${kpi.label}`)}
        >
          <div className="flex items-start justify-between">
            <div className={cn(
              "p-2.5 rounded-xl group-hover:scale-110 transition-transform",
              kpi.color === "blue" && "bg-blue-50 text-blue-600",
              kpi.color === "emerald" && "bg-emerald-50 text-emerald-600",
              kpi.color === "orange" && "bg-orange-50 text-orange-600",
              kpi.color === "purple" && "bg-purple-50 text-purple-600",
              kpi.color === "rose" && "bg-rose-50 text-rose-600",
              kpi.color === "slate" && "bg-slate-50 text-slate-600",
            )}>
              <kpi.icon size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{kpi.label}</h4>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-800">{kpi.value}</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-1 italic">{kpi.sub}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
