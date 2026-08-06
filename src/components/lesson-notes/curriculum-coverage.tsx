import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  Target,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const coverageData = [
  { subject: "Mathematics", class: "JSS 1", progress: 85, topicsCompleted: 12, totalTopics: 14, teacher: "Sarah Johnson", endDate: "2024-06-15" },
  { subject: "English Language", class: "JSS 1", progress: 72, topicsCompleted: 10, totalTopics: 14, teacher: "Emma White", endDate: "2024-06-20" },
  { subject: "Basic Science", class: "JSS 2", progress: 95, topicsCompleted: 13, totalTopics: 14, teacher: "David Miller", endDate: "2024-06-10" },
  { subject: "Business Studies", class: "JSS 3", progress: 45, topicsCompleted: 6, totalTopics: 14, teacher: "Grace Lee", endDate: "2024-07-05" },
];

export function CurriculumCoverage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Overall Completion", value: "78%", icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "On Track Subjects", value: "32", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Behind Schedule", value: "4", icon: TrendingUp, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Topics Delivered", value: "482", icon: BookOpen, color: "text-[#0B6E3C]", bg: "bg-schoolgate-green-light" },
        ].map((item, i) => (
          <Card key={i} className="p-4 rounded-[14px] shadow-sm border-none">
            <div className="flex items-center gap-4">
              <div className={cn("p-2 rounded-lg", item.bg)}>
                <item.icon className={cn("h-5 w-5", item.color)} />
              </div>
              <div>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{item.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 rounded-[14px] shadow-sm border-none">
        <h3 className="text-xl font-bold mb-8 text-[#0B6E3C]">Curriculum Coverage Tracking</h3>
        <div className="space-y-6">
          {coverageData.map((item, i) => (
            <div key={i} className="p-5 rounded-xl border border-slate-100 hover:border-[#0B6E3C]/20 transition-all hover:shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-3">
                  <h4 className="font-bold text-slate-800">{item.subject}</h4>
                  <p className="text-xs text-muted-foreground">{item.class} • Teacher: {item.teacher}</p>
                </div>
                
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span>Weekly Progress</span>
                    <span className="text-[#0B6E3C]">{item.progress}% Complete</span>
                  </div>
                  <Progress value={item.progress} className="h-2 rounded-full" />
                </div>

                <div className="lg:col-span-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Topics</span>
                    <span className="font-bold">{item.topicsCompleted} / {item.totalTopics} Topics Completed</span>
                  </div>
                </div>

                <div className="lg:col-span-2 flex justify-end gap-2">
                  <div className="text-right mr-4">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Target Date</p>
                    <p className="text-xs font-bold text-slate-700">{item.endDate}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-schoolgate-green-light hover:text-[#0B6E3C]">
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
