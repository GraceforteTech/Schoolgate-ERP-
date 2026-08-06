import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Briefcase, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Download, 
  FileSpreadsheet, 
  Plus, 
  Printer,
  FileEdit
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const workloadData = [
  { day: 'Mon', periods: 6 },
  { day: 'Tue', periods: 4 },
  { day: 'Wed', periods: 7 },
  { day: 'Thu', periods: 5 },
  { day: 'Fri', periods: 4 },
];

const teachersWorkload = [
  {
    name: "Dr. Sarah Adebayo",
    subjects: "Physics, Further Maths",
    classes: "SS3 A, SS3 B",
    weeklyPeriods: 24,
    freePeriods: 6,
    lessonNotes: 8,
    assignments: 12,
    cbtExams: 4,
    percentage: 80
  },
  {
    name: "Mr. Johnson Okeke",
    subjects: "English Literature",
    classes: "SS2 A, SS2 C",
    weeklyPeriods: 18,
    freePeriods: 12,
    lessonNotes: 6,
    assignments: 8,
    cbtExams: 2,
    percentage: 60
  }
];

export function TeacherWorkload() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-black text-slate-800">Global Staff Workload Trend</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Average periods per day</p>
            </div>
            <div className="flex items-center gap-3">
               <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-xs font-bold gap-2">
                 <Calendar size={16} /> This Term
               </Button>
            </div>
          </div>
          
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={workloadData}>
                <defs>
                  <linearGradient id="colorPeriods" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="periods" 
                  stroke="#0B6E3C" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorPeriods)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-4 p-6 rounded-[14px] border-slate-100 shadow-sm bg-white flex flex-col justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-2">
            <Clock size={32} />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weekly Average Workload</h4>
            <div className="text-4xl font-black text-slate-800">18.5 <span className="text-sm text-slate-400 uppercase">Periods</span></div>
          </div>
          <div className="pt-4 space-y-3">
             <div className="flex items-center justify-between text-xs font-bold text-slate-500">
               <span>Optimal Target</span>
               <span>20 Periods</span>
             </div>
             <Progress value={92.5} className="h-2 rounded-full bg-slate-50" />
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">Within recommended capacity</p>
          </div>
        </Card>
      </div>

      <Card className="rounded-[14px] border-slate-100 shadow-sm overflow-hidden bg-white">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800">Teacher Assignments & Output</h3>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="h-10 rounded-xl border-slate-200 gap-2 font-bold text-slate-600 text-xs">
                <Printer size={16} /> Print Timetables
             </Button>
             <Button className="h-10 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 gap-2 font-black text-xs">
                <Plus size={16} /> Assign Subject
             </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead className="font-black text-[10px] uppercase tracking-widest py-4">Teacher Name</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest">Subjects / Classes</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Periods (W/D)</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Lesson Notes</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Workload %</TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachersWorkload.map((t, index) => (
                <TableRow key={index} className="hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="font-bold text-slate-800 text-sm">{t.name}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-600">{t.subjects}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.classes}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <p className="text-sm font-black text-slate-800">{t.weeklyPeriods}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{Math.round(t.weeklyPeriods/5)} / Day</p>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 font-bold text-[10px]">
                        {t.lessonNotes} / 8 Submitted
                     </Badge>
                  </TableCell>
                  <TableCell className="text-center w-[150px]">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold">
                         <span className="text-slate-500 uppercase">{t.percentage}%</span>
                         <span className="text-slate-400 uppercase">{t.weeklyPeriods}/30</span>
                       </div>
                       <Progress value={t.percentage} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                          <FileEdit size={16} />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                          <ChevronRight size={16} />
                       </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
