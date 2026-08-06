import { Card } from "@/components/ui/card";
import { 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Target, 
  BookOpen, 
  Activity, 
  Flame,
  Award,
  Zap
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const data = [
  { name: "Week 1", exams: 45, participation: 78 },
  { name: "Week 2", exams: 52, participation: 82 },
  { name: "Week 3", exams: 48, participation: 80 },
  { name: "Week 4", exams: 70, participation: 94 },
];

const performanceData = [
  { name: "Math", value: 85, color: "#0B6E3C" },
  { name: "English", value: 78, color: "#2563eb" },
  { name: "Science", value: 72, color: "#f59e0b" },
  { name: "Others", value: 80, color: "#94a3b8" },
];

export function ProprietorCBTDashboard() {
  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[14px] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800">CBT Readiness & Performance</h3>
            <p className="text-sm text-slate-500 font-medium">Global academic health score across all branches.</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Readiness Score</p>
            <p className="text-3xl font-black text-schoolgate-green">92%</p>
          </div>
          <div className="w-px h-10 bg-slate-100 hidden md:block" />
          <div className="text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exam Stability</p>
            <p className="text-3xl font-black text-blue-600">99.8%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total CBT Exams", value: "1,245", sub: "+12% vs last term", icon: BookOpen, color: "blue" },
          { label: "Participation Rate", value: "94.8%", sub: "Industry avg: 85%", icon: Users, color: "emerald" },
          { label: "Question Bank Growth", value: "+850", sub: "New additions", icon: TrendingUp, color: "orange" },
          { label: "Teacher Activity", value: "92%", sub: "High engagement", icon: Activity, color: "purple" },
        ].map((kpi, i) => (
          <Card key={i} className="p-6 border-slate-100 shadow-sm bg-white hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2 rounded-lg ${
                kpi.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                kpi.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                kpi.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                'bg-purple-50 text-purple-600'
              }`}>
                <kpi.icon size={20} />
              </div>
              <Badge variant="outline" className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-none">Monthly</Badge>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{kpi.label}</p>
            <p className="text-3xl font-black text-slate-800 mt-1">{kpi.value}</p>
            <p className="text-[10px] font-bold text-emerald-600 mt-2">{kpi.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white xl:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Participation Trends</h4>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-schoolgate-green" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Exams</span>
              </div>
              <div className="flex items-center gap-1.5 ml-4">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">Students</span>
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorExams" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="exams" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorExams)" />
                <Area type="monotone" dataKey="participation" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPart)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8">Exam Body Readiness</h4>
          <div className="space-y-6">
            {[
              { name: "WAEC Readiness", score: 95, color: "bg-schoolgate-green", icon: Award },
              { name: "JAMB / UTME Prep", score: 82, color: "bg-blue-600", icon: Zap },
              { name: "NECO / GCE Prep", score: 78, color: "bg-orange-500", icon: Flame },
              { name: "SAT / International", score: 88, color: "bg-purple-600", icon: Target },
            ].map((exam, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <exam.icon size={14} className="text-slate-400" />
                    <span className="text-xs font-bold text-slate-700">{exam.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-900">{exam.score}%</span>
                </div>
                <Progress value={exam.score} className="h-2 rounded-full bg-slate-100">
                   <div className={`h-full ${exam.color} rounded-full transition-all`} style={{ width: `${exam.score}%` }} />
                </Progress>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white">
         <div className="flex items-center justify-between mb-8">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Branch Academic Health</h4>
            <Badge variant="outline" className="border-slate-100 text-slate-500 font-bold uppercase text-[10px]">6 Active Branches</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { name: "Abuja Main Campus", students: 1200, passRate: 94 },
              { name: "Lagos Victoria Island", students: 850, passRate: 92 },
              { name: "Portharcourt Branch", students: 740, passRate: 88 },
            ].map((branch, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
                <p className="text-sm font-bold text-slate-800 mb-1">{branch.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-4">{branch.students} Active Students</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pass Rate</span>
                  <span className="text-lg font-black text-schoolgate-green">{branch.passRate}%</span>
                </div>
                <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-schoolgate-green h-full rounded-full" style={{ width: `${branch.passRate}%` }} />
                </div>
              </div>
            ))}
          </div>
      </Card>
    </div>
  );
}
