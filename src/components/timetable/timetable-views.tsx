import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  User, 
  MapPin, 
  CalendarRange,
  Download,
  Printer,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CalendarDays,
  CalendarClock,
  CalendarCheck
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface TimetableViewsProps {
  mini?: boolean;
}

export function TimetableViews({ mini }: TimetableViewsProps) {
  const [viewType, setViewType] = useState("weekly");

  const timetableData = [
    { time: "08:00 AM", mon: { subject: "Mathematics", teacher: "Mr. Yusuf", room: "RM 201", color: "bg-blue-100 text-blue-700 border-blue-200" }, tue: { subject: "English", teacher: "Mrs. Okoro", room: "RM 104", color: "bg-green-100 text-green-700 border-green-200" }, wed: { subject: "Physics", teacher: "Dr. Ade", room: "Lab 1", color: "bg-purple-100 text-purple-700 border-purple-200" }, thu: { subject: "Chemistry", teacher: "Mrs. Smith", room: "Lab 2", color: "bg-orange-100 text-orange-700 border-orange-200" }, fri: { subject: "Biology", teacher: "Mr. Chen", room: "Lab 1", color: "bg-teal-100 text-teal-700 border-teal-200" } },
    { time: "09:00 AM", mon: { subject: "English", teacher: "Mrs. Okoro", room: "RM 104", color: "bg-green-100 text-green-700 border-green-200" }, tue: { subject: "Mathematics", teacher: "Mr. Yusuf", room: "RM 201", color: "bg-blue-100 text-blue-700 border-blue-200" }, wed: { subject: "History", teacher: "Ms. Patel", room: "RM 302", color: "bg-amber-100 text-amber-700 border-amber-200" }, thu: { subject: "Civics", teacher: "Mr. Obi", room: "RM 305", color: "bg-indigo-100 text-indigo-700 border-indigo-200" }, fri: { subject: "Geography", teacher: "Mrs. Khan", room: "RM 308", color: "bg-cyan-100 text-cyan-700 border-cyan-200" } },
    { time: "10:00 AM", mon: { subject: "Physics", teacher: "Dr. Ade", room: "Lab 1", color: "bg-purple-100 text-purple-700 border-purple-200" }, tue: { subject: "History", teacher: "Ms. Patel", room: "RM 302", color: "bg-amber-100 text-amber-700 border-amber-200" }, wed: { subject: "Break", type: "break" }, thu: { subject: "Mathematics", teacher: "Mr. Yusuf", room: "RM 201", color: "bg-blue-100 text-blue-700 border-blue-200" }, fri: { subject: "English", teacher: "Mrs. Okoro", room: "RM 104", color: "bg-green-100 text-green-700 border-green-200" } },
  ];

  if (mini) {
    return (
      <div className="rounded-[14px] border bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Current Session: JS3 Gold</h3>
          <Button variant="outline" size="sm" className="h-8 text-xs">View Full</Button>
        </div>
        <div className="space-y-4">
          {timetableData.slice(0, 3).map((row, idx) => (
             <div key={idx} className="flex items-center gap-4 rounded-lg border p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="min-w-[70px] text-xs font-semibold text-gray-500">{row.time}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{row.mon.subject}</p>
                  <p className="text-xs text-gray-500">{row.mon.teacher} • {row.mon.room}</p>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100">Today</Badge>
             </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-[14px] border bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border bg-muted p-1">
             <Button 
               variant={viewType === 'daily' ? 'secondary' : 'ghost'} 
               size="sm" 
               className="h-8 text-xs"
               onClick={() => setViewType('daily')}
             >
               Daily
             </Button>
             <Button 
               variant={viewType === 'weekly' ? 'secondary' : 'ghost'} 
               size="sm" 
               className="h-8 text-xs"
               onClick={() => setViewType('weekly')}
             >
               Weekly
             </Button>
             <Button 
               variant={viewType === 'monthly' ? 'secondary' : 'ghost'} 
               size="sm" 
               className="h-8 text-xs"
               onClick={() => setViewType('monthly')}
             >
               Monthly
             </Button>
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="text-sm font-medium">May 12 - 18, 2024</span>
            <Button variant="ghost" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Printer className="h-4 w-4" /> Print</Button>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
        </div>
      </div>

      <Tabs defaultValue="class" className="space-y-6">
        <TabsList className="bg-white border w-full justify-start h-12 px-2 shadow-sm rounded-xl">
          <TabsTrigger value="class" className="gap-2 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green">
            <Users className="h-4 w-4" /> Class Timetable
          </TabsTrigger>
          <TabsTrigger value="teacher" className="gap-2 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green">
            <GraduationCap className="h-4 w-4" /> Teacher Timetable
          </TabsTrigger>
          <TabsTrigger value="student" className="gap-2 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green">
            <User className="h-4 w-4" /> Student Timetable
          </TabsTrigger>
          <TabsTrigger value="exam" className="gap-2 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green">
            <CalendarRange className="h-4 w-4" /> Examination Timetable
          </TabsTrigger>
          <TabsTrigger value="room" className="gap-2 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green">
            <MapPin className="h-4 w-4" /> Room Timetable
          </TabsTrigger>
        </TabsList>

        <TabsContent value="class" className="outline-none">
          <div className="rounded-[14px] border bg-white shadow-sm overflow-hidden">
             <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b">
                      <th className="p-4 text-left font-medium text-gray-500 border-r w-32">Time</th>
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                        <th key={day} className="p-4 text-left font-medium text-gray-500 min-w-[200px] border-r">
                           <div className="flex flex-col">
                              <span>{day}</span>
                              <span className="text-[10px] text-gray-400 font-normal">May {day === 'Monday' ? '12' : day === 'Tuesday' ? '13' : '14'}</span>
                           </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {timetableData.map((row, idx) => (
                      <tr key={idx} className="h-32">
                        <td className="p-4 font-medium text-gray-700 bg-gray-50/30 border-r align-top">
                           {row.time}
                        </td>
                        {[row.mon, row.tue, row.wed, row.thu, row.fri].map((cell, cIdx) => (
                           <td key={cIdx} className="p-2 border-r align-top relative group">
                              {cell.type === 'break' ? (
                                <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                   <span className="text-xs font-bold text-gray-300 uppercase tracking-widest rotate-[-15deg]">Break Time</span>
                                </div>
                              ) : (
                                <div className={`h-full p-3 rounded-xl border ${cell.color} transition-all hover:scale-[1.02] cursor-pointer shadow-sm`}>
                                   <div className="flex items-center justify-between mb-1">
                                      <span className="font-bold text-sm truncate">{cell.subject}</span>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100"><MoreVertical className="h-3 w-3" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>Edit Period</DropdownMenuItem>
                                          <DropdownMenuItem>Change Teacher</DropdownMenuItem>
                                          <DropdownMenuItem className="text-red-600">Remove</DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                   </div>
                                   <div className="flex items-center gap-1.5 text-xs opacity-80 mb-1">
                                      <GraduationCap className="h-3.5 w-3.5" />
                                      <span>{cell.teacher}</span>
                                   </div>
                                   <div className="flex items-center gap-1.5 text-xs opacity-80">
                                      <MapPin className="h-3.5 w-3.5" />
                                      <span>{cell.room}</span>
                                   </div>
                                </div>
                              )}
                           </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </TabsContent>

        <TabsContent value="teacher">
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl bg-white text-gray-400">
             <GraduationCap className="h-12 w-12 mb-4 opacity-20" />
             <p>Select a teacher to view their individual timetable.</p>
          </div>
        </TabsContent>

        <TabsContent value="student">
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-xl bg-white text-gray-400">
             <User className="h-12 w-12 mb-4 opacity-20" />
             <p>Search for a student to view their class timetable.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
