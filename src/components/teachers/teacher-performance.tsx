import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  Download, 
  Printer, 
  AlertCircle,
  Zap,
  MessageSquare,
  Star,
  LineChart
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const performanceMetrics = [
  { name: 'Attendance', score: 95, target: 90, color: '#0B6E3C' },
  { name: 'Curriculum', score: 82, target: 85, color: '#3b82f6' },
  { name: 'Student GPA', score: 78, target: 75, color: '#f59e0b' },
  { name: 'Result Submission', score: 100, target: 100, color: '#8b5cf6' },
];

export function TeacherPerformance() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Overall Rating", value: "4.8/5", icon: Star, color: "text-amber-500", sub: "Based on 124 reviews" },
          { label: "Avg. Productivity Score", value: "91%", icon: Zap, color: "text-schoolgate-green", sub: "Global Average" },
          { label: "Lesson Completion", value: "88%", icon: CheckCircle2, color: "text-blue-500", sub: "+5% from last month" },
          { label: "Performance Alerts", value: "2", icon: AlertCircle, color: "text-red-500", sub: "Requires Immediate Review" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-slate-100 shadow-sm bg-white rounded-[14px]">
             <div className="flex items-center gap-3 mb-4">
               <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                 <stat.icon size={20} />
               </div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
             </div>
             <p className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</p>
             <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{stat.sub}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 p-8 rounded-[14px] border-slate-100 shadow-sm bg-white">
           <div className="flex items-center justify-between mb-8">
             <div>
               <h3 className="text-lg font-black text-slate-800">Departmental Performance Comparison</h3>
               <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Average productivity score per department</p>
             </div>
             <div className="flex items-center gap-2">
               <Button variant="outline" className="h-10 rounded-xl border-slate-200 gap-2 font-bold text-slate-600 text-xs">
                 <LineChart size={16} /> Trends
               </Button>
             </div>
           </div>
           
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={performanceMetrics}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis 
                   dataKey="name" 
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
                 <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={40}>
                   {performanceMetrics.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </Card>

        <Card className="lg:col-span-4 p-8 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-6">
           <h3 className="text-lg font-black text-slate-800 mb-2">Top Performers</h3>
           <div className="space-y-4">
              {[
                { name: "Dr. Sarah Adebayo", dept: "Science", score: 98, productivity: 96 },
                { name: "Mr. Johnson Okeke", dept: "Arts", score: 92, productivity: 94 },
                { name: "Mrs. Fatima Ibrahim", dept: "Languages", score: 90, productivity: 92 },
              ].map((teacher, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 space-y-3 hover:bg-slate-50 transition-all cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{teacher.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{teacher.dept}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] px-2 py-0.5">
                      #{i+1}
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <span>Productivity</span>
                      <span className="text-schoolgate-green">{teacher.productivity}%</span>
                    </div>
                    <Progress value={teacher.productivity} className="h-1.5" />
                  </div>
                </div>
              ))}
           </div>
           <Button className="w-full h-11 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 font-black shadow-lg">
              VIEW FULL RANKINGS
           </Button>
        </Card>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" className="h-11 rounded-xl border-slate-200 gap-2 font-bold text-slate-600">
          <Printer size={18} /> Print Performance Report
        </Button>
        <Button className="h-11 rounded-xl bg-blue-600 hover:bg-blue-700 font-black shadow-lg gap-2">
          <Zap size={18} /> SET IMPROVEMENT PLAN
        </Button>
      </div>
    </div>
  );
}
