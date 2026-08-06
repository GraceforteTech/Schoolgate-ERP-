import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Plus, 
  Calendar,
  Zap,
  ArrowRight,
  MoreVertical,
  History,
  MessageSquare,
  Layout
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const kpis = [
  { label: "Total Lesson Notes", value: "48", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Approved Notes", value: "42", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pending Review", value: "4", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Returned for Correction", value: "2", icon: History, color: "text-rose-600", bg: "bg-rose-50" },
];

const recentNotes = [
  { id: 1, subject: "Mathematics", topic: "Simultaneous Equations", class: "JSS 2B", week: "Week 6", status: "Approved", date: "Today, 10:20 AM" },
  { id: 2, subject: "Mathematics", topic: "Circle Geometry", class: "SSS 1A", week: "Week 7", status: "Pending", date: "Yesterday" },
  { id: 3, subject: "Further Math", topic: "Integration", class: "SSS 3B", week: "Week 6", status: "Returned", date: "2 days ago" },
];

export function TeacherLessonNoteDashboard({ onNewLesson }: { onNewLesson: () => void }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[14px] hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-xl transition-colors group-hover:scale-110", kpi.bg)}>
                  <kpi.icon className={cn("h-6 w-6", kpi.color)} />
                </div>
                <div>
                  <p className="text-2xl font-black tracking-tight text-slate-800">{kpi.value}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Notes & Quick Actions */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none shadow-sm rounded-[14px]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-schoolgate-green" />
                Recent Lesson Notes
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-schoolgate-green font-bold text-xs">
                View All Notes <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {recentNotes.map((note) => (
                  <div key={note.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-schoolgate-green">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-schoolgate-green transition-colors">{note.subject}: {note.topic}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{note.class} • {note.week} • {note.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider",
                        note.status === "Approved" ? "bg-emerald-50 text-emerald-700" : 
                        note.status === "Pending" ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700"
                      )}>
                        {note.status}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreVertical className="h-4 w-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card 
              className="border-none shadow-sm rounded-[14px] bg-schoolgate-green text-white p-6 cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden group"
              onClick={onNewLesson}
            >
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">New Lesson Note</h3>
                <p className="text-white/70 text-sm">Create a curriculum-compliant lesson note manually or with AI.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
            </Card>

            <Card className="border-none shadow-sm rounded-[14px] bg-indigo-900 text-white p-6 cursor-pointer hover:scale-[1.02] transition-transform relative overflow-hidden group">
              <div className="relative z-10">
                <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">AI Quick Generator</h3>
                <p className="text-indigo-100 text-sm">Generate objectives, activities, or full notes in seconds.</p>
              </div>
              <div className="absolute -right-6 -bottom-6 h-24 w-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform"></div>
            </Card>
          </div>
        </div>

        {/* Right Column: Progress & Activity */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none shadow-sm rounded-[14px]">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                Curriculum Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { label: "Mathematics - JSS 2", progress: 85, color: "bg-schoolgate-green" },
                { label: "Further Math - SSS 3", progress: 72, color: "bg-indigo-600" },
                { label: "Mathematics - SSS 1", progress: 45, color: "bg-amber-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{item.label}</span>
                    <span className="font-black text-slate-900">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className={cn("h-2 rounded-full", "[&>div]:" + item.color)} />
                </div>
              ))}
              <Button variant="outline" className="w-full rounded-xl text-xs font-bold border-slate-200">
                View Full Curriculum <Layout className="ml-2 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm rounded-[14px]">
            <CardHeader>
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-amber-500" />
                Approval Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 px-6 pb-4">
                {[
                  { user: "HOD Mathematics", action: "Approved your note", time: "1 hour ago", type: "success" },
                  { user: "VP Academics", action: "Left a comment on SSS 3 note", time: "3 hours ago", type: "info" },
                  { user: "Principal", action: "Returned note for correction", time: "Yesterday", type: "error" },
                ].map((act, i) => (
                  <div key={i} className="py-4 flex gap-3">
                    <div className={cn(
                      "h-2 w-2 rounded-full mt-1.5 shrink-0",
                      act.type === "success" ? "bg-emerald-500" : act.type === "error" ? "bg-rose-500" : "bg-blue-500"
                    )} />
                    <div>
                      <p className="text-xs font-bold text-slate-800">{act.user}</p>
                      <p className="text-[11px] text-slate-500">{act.action}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-widest">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
