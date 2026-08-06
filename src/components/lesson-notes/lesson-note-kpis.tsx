import { Card } from "@/components/ui/card";
import { 
  FileText, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  Target,
  Users,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { title: "Total Lesson Notes", value: "1,240", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Draft Lesson Notes", value: "42", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { title: "Submitted for Approval", value: "156", icon: Send, color: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "Approved Lesson Notes", value: "982", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Returned for Correction", value: "18", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
  { title: "Lessons Delivered", value: "854", icon: BookOpen, color: "text-[#0B6E3C]", bg: "bg-schoolgate-green-light" },
  { title: "Curriculum Completion", value: "78%", icon: Target, color: "text-purple-600", bg: "bg-purple-50" },
  { title: "Weekly Completion Rate", value: "92%", icon: TrendingUp, color: "text-cyan-600", bg: "bg-cyan-50" },
  { title: "Teachers Yet to Submit", value: "24", icon: Users, color: "text-orange-600", bg: "bg-orange-50" },
  { title: "Lessons Due Today", value: "112", icon: Calendar, color: "text-pink-600", bg: "bg-pink-50" },
];

export function LessonNoteKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, i) => (
        <Card 
          key={i} 
          className="p-4 rounded-[14px] shadow-sm border-none hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex flex-col gap-3">
            <div className={cn("p-2 rounded-lg w-fit transition-colors group-hover:bg-[#0B6E3C]/10", kpi.bg)}>
              <kpi.icon className={cn("h-5 w-5", kpi.color, "group-hover:text-[#0B6E3C]")} />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{kpi.title}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
