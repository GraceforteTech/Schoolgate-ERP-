import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Printer, 
  FileDown, 
  Copy, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["08:00 - 08:40", "08:40 - 09:20", "09:20 - 10:00", "10:00 - 10:30", "10:30 - 11:10", "11:10 - 11:50"];

const lessons = [
  { day: "Monday", time: "08:00 - 08:40", subject: "Mathematics", class: "JSS 1A", topic: "Algebra Basics", status: "Approved", completion: "Delivered" },
  { day: "Monday", time: "09:20 - 10:00", subject: "Further Math", class: "SSS 3B", topic: "Calculus", status: "Pending", completion: "Pending" },
  { day: "Tuesday", time: "10:30 - 11:10", subject: "Mathematics", class: "JSS 2C", topic: "Geometry", status: "Approved", completion: "Delivered" },
  { day: "Wednesday", time: "08:00 - 08:40", subject: "Mathematics", class: "JSS 1A", topic: "Algebra Basics", status: "Approved", completion: "Pending" },
];

export function WeeklyLessonPlanner() {
  return (
    <div className="space-y-6">
      <Card className="p-6 rounded-[14px] shadow-sm border-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold">Weekly Lesson Planner</h3>
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft size={16}/></Button>
              <span className="px-4 text-sm font-medium">May 15 - May 19, 2024</span>
              <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight size={16}/></Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg"><Copy className="mr-2 h-4 w-4" /> Copy Previous Week</Button>
            <Button variant="outline" size="sm" className="rounded-lg"><Printer className="mr-2 h-4 w-4" /> Print Plan</Button>
            <Button variant="outline" size="sm" className="rounded-lg"><FileDown className="mr-2 h-4 w-4" /> Export PDF</Button>
            <Button className="bg-[#0B6E3C] hover:bg-[#0B6E3C]/90 rounded-lg"><Plus className="mr-2 h-4 w-4" /> Add Lesson</Button>
          </div>
        </div>

        <div className="overflow-x-auto border rounded-xl border-slate-200">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-left text-sm font-semibold text-slate-600 border-r w-[150px]">Time Slot</th>
                {days.map(day => (
                  <th key={day} className="p-4 text-left text-sm font-semibold text-slate-600 border-r min-w-[200px]">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((slot, sIdx) => (
                <tr key={sIdx} className="border-b border-slate-200 last:border-0">
                  <td className="p-4 text-xs font-medium text-slate-500 border-r bg-slate-50/50">{slot}</td>
                  {days.map((day, dIdx) => {
                    const lesson = lessons.find(l => l.day === day && l.time === slot);
                    const isBreak = slot === "10:00 - 10:30";

                    if (isBreak) {
                      return dIdx === 0 ? (
                        <td key={dIdx} colSpan={5} className="p-2 text-center bg-slate-100 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Short Break</td>
                      ) : null;
                    }

                    return (
                      <td key={dIdx} className="p-2 border-r align-top relative group">
                        {lesson ? (
                          <div className={cn(
                            "p-3 rounded-lg border shadow-sm transition-all hover:shadow-md cursor-pointer",
                            lesson.status === "Approved" ? "bg-emerald-50 border-emerald-100" : "bg-amber-50 border-amber-100"
                          )}>
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{lesson.class}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={12}/></Button>
                            </div>
                            <p className="text-sm font-bold text-slate-800 truncate mb-1">{lesson.subject}</p>
                            <p className="text-xs text-slate-500 mb-3 truncate">{lesson.topic}</p>
                            
                            <div className="flex items-center justify-between mt-auto">
                              <div className="flex items-center gap-1">
                                {lesson.status === "Approved" ? (
                                  <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                ) : (
                                  <Clock className="h-3 w-3 text-amber-600" />
                                )}
                                <span className={cn(
                                  "text-[10px] font-medium",
                                  lesson.status === "Approved" ? "text-emerald-700" : "text-amber-700"
                                )}>{lesson.status}</span>
                              </div>
                              {lesson.completion === "Delivered" && (
                                <span className="bg-emerald-100 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded-full font-bold">DELIVERED</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="h-24 w-full rounded-lg border border-dashed border-slate-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-slate-50">
                            <Plus className="h-4 w-4 text-slate-300" />
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
