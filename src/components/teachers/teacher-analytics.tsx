import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Calendar,
  Filter,
  Users,
  Briefcase,
  GraduationCap,
  Activity
} from "lucide-react";

const attendanceData = [
  { month: 'Sep', rate: 94 },
  { month: 'Oct', rate: 92 },
  { month: 'Nov', rate: 96 },
  { month: 'Dec', rate: 91 },
  { month: 'Jan', rate: 95 },
];

const workloadDistribution = [
  { name: 'Overloaded (>22)', value: 15, color: '#ef4444' },
  { name: 'Optimal (16-22)', value: 65, color: '#0B6E3C' },
  { name: 'Underloaded (<16)', value: 20, color: '#3b82f6' },
];

export function TeacherAnalytics() {
  return (
    <div className="space-y-8">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 rounded-lg border-slate-200 gap-2 font-bold text-slate-600 text-xs">
            <Calendar size={16} /> 2024/2025 Session
          </Button>
          <Button variant="outline" className="h-10 rounded-lg border-slate-200 gap-2 font-bold text-slate-600 text-xs">
            <Filter size={16} /> All Schools
          </Button>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-10 rounded-lg border-slate-200 gap-2 font-bold text-slate-600 text-xs">
             <Download size={16} /> Export PDF
           </Button>
           <Button variant="outline" className="h-10 rounded-lg border-slate-200 gap-2 font-bold text-slate-600 text-xs">
             <FileSpreadsheet size={16} /> Excel Report
           </Button>
           <Button className="h-10 rounded-lg bg-schoolgate-green hover:bg-schoolgate-green/90 gap-2 font-black text-xs">
             <Printer size={16} /> Print Analytics
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 p-8 rounded-[14px] border-slate-100 shadow-sm bg-white">
           <div className="flex items-center justify-between mb-8">
             <div>
               <h3 className="text-lg font-black text-slate-800">Staff Attendance Trends</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Global monthly average attendance rate</p>
             </div>
             <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] px-3 py-1">Avg: 93.6%</Badge>
           </div>
           
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={attendanceData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis 
                   dataKey="month" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} 
                 />
                 <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} 
                   domain={[80, 100]}
                 />
                 <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                 />
                 <Line 
                   type="monotone" 
                   dataKey="rate" 
                   stroke="#0B6E3C" 
                   strokeWidth={4} 
                   dot={{ r: 6, fill: "#0B6E3C", strokeWidth: 3, stroke: "#fff" }} 
                   activeDot={{ r: 8 }} 
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </Card>

        <Card className="lg:col-span-4 p-8 rounded-[14px] border-slate-100 shadow-sm bg-white">
           <h3 className="text-lg font-black text-slate-800 mb-8">Workload Allocation</h3>
           <div className="h-[250px] w-full relative">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie
                   data={workloadDistribution}
                   cx="50%"
                   cy="50%"
                   innerRadius={60}
                   outerRadius={80}
                   paddingAngle={5}
                   dataKey="value"
                 >
                   {workloadDistribution.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
               <p className="text-2xl font-black text-slate-800">124</p>
               <p className="text-[10px] font-bold text-slate-400 uppercase">Staff</p>
             </div>
           </div>
           <div className="mt-4 space-y-3">
             {workloadDistribution.map((item, i) => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-xs font-bold text-slate-600">{item.name}</span>
                 </div>
                 <span className="text-xs font-black text-slate-800">{item.value}%</span>
               </div>
             ))}
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Attendance Report", icon: Users, sub: "Daily/Weekly/Monthly" },
          { label: "Workload Report", icon: Briefcase, sub: "Subject Allocation" },
          { label: "Performance Report", icon: Activity, sub: "360° Evaluation" },
          { label: "Development Report", icon: GraduationCap, sub: "Training Participation" },
        ].map((report, i) => (
          <Card key={i} className="p-6 border-slate-100 shadow-sm bg-white hover:border-schoolgate-green transition-all cursor-pointer group rounded-[14px]">
             <div className="flex items-center justify-between mb-4">
               <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-schoolgate-green group-hover:text-white transition-all">
                 <report.icon size={24} />
               </div>
               <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-300 group-hover:text-schoolgate-green">
                 <Download size={18} />
               </Button>
             </div>
             <h4 className="text-sm font-black text-slate-800">{report.label}</h4>
             <p className="text-xs text-slate-400 font-bold mt-1">{report.sub}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
