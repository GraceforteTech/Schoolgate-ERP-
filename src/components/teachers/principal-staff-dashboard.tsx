import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  BookOpen,
  Calendar,
  Activity,
  HeartPulse
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const trendData = [
  { month: 'Sep', attendance: 92, completion: 85 },
  { month: 'Oct', attendance: 94, completion: 88 },
  { month: 'Nov', attendance: 91, completion: 82 },
  { month: 'Dec', attendance: 95, completion: 90 },
  { month: 'Jan', attendance: 96, completion: 92 },
];

export function PrincipalStaffDashboard() {
  return (
    <div className="space-y-8">
      {/* Workforce Health Score */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[20px] shadow-sm border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center relative overflow-hidden">
             <HeartPulse size={40} className="relative z-10" />
             <div className="absolute inset-0 bg-emerald-100/50 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Workforce Health Score</h3>
              <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-xs px-2 py-0.5">EXCELLENT</Badge>
            </div>
            <p className="text-slate-500 font-medium">Dynamic staff productivity and engagement metric.</p>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Score</p>
            <div className="flex items-baseline justify-center gap-1">
               <span className="text-5xl font-black text-schoolgate-green">88</span>
               <span className="text-xl font-bold text-slate-300">/100</span>
            </div>
          </div>
          <div className="w-px h-16 bg-slate-100 hidden md:block" />
          <div className="space-y-3 min-w-[200px]">
             <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Monthly Progress</span>
                <span className="text-emerald-600">+4.2%</span>
             </div>
             <Progress value={88} className="h-2 rounded-full" />
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Top 5% among peer schools</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Lesson Completion", value: "94.2%", trend: "+2.5%", positive: true, icon: CheckCircle2 },
          { label: "Staff Attendance", value: "96.8%", trend: "+1.2%", positive: true, icon: Users },
          { label: "Subject Coverage", value: "91.0%", trend: "-0.8%", positive: false, icon: BookOpen },
          { label: "Payroll Stability", value: "100%", trend: "Stable", positive: true, icon: Activity },
        ].map((kpi, i) => (
          <Card key={i} className="p-6 border-slate-100 shadow-sm bg-white hover:shadow-lg transition-all rounded-[14px]">
             <div className="flex items-center justify-between mb-4">
               <div className="p-2 rounded-lg bg-slate-50 text-slate-400">
                 <kpi.icon size={20} />
               </div>
               <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {kpi.trend}
               </div>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
             <p className="text-3xl font-black text-slate-800 tracking-tight">{kpi.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 p-8 rounded-[14px] border-slate-100 shadow-sm bg-white">
           <div className="flex items-center justify-between mb-8">
             <div>
               <h3 className="text-lg font-black text-slate-800">Academic Output Trends</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Attendance vs Lesson Completion</p>
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-schoolgate-green" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">Attendance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-black text-slate-400 uppercase">Completion</span>
                </div>
             </div>
           </div>
           
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={trendData}>
                 <defs>
                   <linearGradient id="colorAtt" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                   </linearGradient>
                   <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
                 <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} domain={[70, 100]} />
                 <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                 <Area type="monotone" dataKey="attendance" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorAtt)" />
                 <Area type="monotone" dataKey="completion" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </Card>

        <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-8">
           <h3 className="text-lg font-black text-slate-800">Support Required</h3>
           <div className="space-y-6">
              {[
                { name: "Mr. David Adeleke", reason: "Low Lesson Submission", score: 62 },
                { name: "Mrs. Ngozi Peters", reason: "Frequent Tardiness", score: 58 },
                { name: "Mr. Samuel Bankole", reason: "Student Performance Dip", score: 65 },
              ].map((staff, i) => (
                <div key={i} className="space-y-3">
                   <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-bold text-slate-800">{staff.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{staff.reason}</p>
                      </div>
                      <Badge className="bg-red-50 text-red-600 border-none font-black text-[10px]">ALERT</Badge>
                   </div>
                   <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                         <span>Productivity Score</span>
                         <span className="text-red-500">{staff.score}%</span>
                      </div>
                      <Progress value={staff.score} className="h-1.5 bg-slate-50" />
                   </div>
                </div>
              ))}
           </div>
           <Button variant="outline" className="w-full h-11 rounded-xl border-slate-200 text-slate-600 font-black gap-2">
              SCHEDULE STAFF REVIEWS
           </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
         <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white border-l-4 border-l-schoolgate-green">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Professional Development</h4>
            <p className="text-2xl font-black text-slate-800">45%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Staff participated this term</p>
         </Card>
         <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white border-l-4 border-l-blue-500">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject Coverage</h4>
            <p className="text-2xl font-black text-slate-800">91%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Across all departments</p>
         </Card>
         <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white border-l-4 border-l-purple-500">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Staff Retention</h4>
            <p className="text-2xl font-black text-slate-800">98%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Global retention rate</p>
         </Card>
         <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white border-l-4 border-l-amber-500">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Punctuality Score</h4>
            <p className="text-2xl font-black text-slate-800">94%</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Average arrival before 7:45AM</p>
         </Card>
      </div>
    </div>
  );
}
