import { 
  Calendar, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Home, 
  AlertTriangle, 
  Clock, 
  Zap, 
  BarChart3 
} from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  {
    title: "Total Timetables",
    value: "48",
    icon: Calendar,
    color: "bg-blue-50 text-blue-600",
    description: "Across all classes"
  },
  {
    title: "Active Timetables",
    value: "32",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600",
    description: "Currently in use"
  },
  {
    title: "Total Classes",
    value: "24",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
    description: "JSS1 - SS3"
  },
  {
    title: "Total Teachers",
    value: "86",
    icon: GraduationCap,
    color: "bg-orange-50 text-orange-600",
    description: "All departments"
  },
  {
    title: "Total Subjects",
    value: "18",
    icon: BookOpen,
    color: "bg-indigo-50 text-indigo-600",
    description: "Core & Electives"
  },
  {
    title: "Available Classrooms",
    value: "42",
    icon: Home,
    color: "bg-teal-50 text-teal-600",
    description: "Capacity: 1,200 students"
  },
  {
    title: "Timetable Conflicts",
    value: "0",
    icon: AlertTriangle,
    color: "bg-red-50 text-red-600",
    description: "Resolved: 12 today"
  },
  {
    title: "Free Periods",
    value: "14",
    icon: Clock,
    color: "bg-amber-50 text-amber-600",
    description: "Teacher prep time"
  },
  {
    title: "Teacher Utilization",
    value: "78%",
    icon: Zap,
    color: "bg-pink-50 text-pink-600",
    description: "+2.4% from last week"
  },
  {
    title: "Classroom Utilization",
    value: "92%",
    icon: BarChart3,
    color: "bg-cyan-50 text-cyan-600",
    description: "Optimal usage"
  },
];

export function TimetableKPIs() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi, index) => (
        <button
          key={index}
          className={cn(
            "group flex flex-col items-start rounded-[14px] border bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md",
            "text-left focus:outline-none focus:ring-2 focus:ring-schoolgate-green focus:ring-offset-2"
          )}
        >
          <div className={cn("mb-3 rounded-lg p-2.5", kpi.color)}>
            <kpi.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{kpi.title}</p>
            <h3 className="mt-1 text-2xl font-bold text-gray-900">{kpi.value}</h3>
            <p className="mt-1 text-[10px] text-gray-400 font-medium">
              {kpi.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
