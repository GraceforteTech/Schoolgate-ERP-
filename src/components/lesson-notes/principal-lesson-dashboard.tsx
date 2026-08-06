import { Card } from "@/components/ui/card";
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  Users, 
  BookOpen, 
  Target,
  BarChart2,
  TrendingUp,
  AlertCircle
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
} from "recharts";
import { cn } from "@/lib/utils";

const schoolData = [
  { name: 'Primary', completion: 82 },
  { name: 'Secondary', completion: 74 },
];

const COLORS = ['#0B6E3C', '#E8F5EE'];

export function PrincipalLessonDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Lesson Notes Submitted", value: "92%", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Approvals", value: "14", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Curriculum Completion", value: "78%", icon: Target, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Teachers Yet to Submit", value: "8", icon: Users, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((item, i) => (
          <Card key={i} className="p-4 rounded-[14px] shadow-sm border-none">
            <div className="flex flex-col gap-2">
              <div className={cn("p-2 rounded-lg w-fit", item.bg)}>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 p-6 rounded-[14px] shadow-sm border-none">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Primary vs Secondary Progress</h3>
            <div className="text-xs font-bold text-[#0B6E3C] bg-schoolgate-green-light px-3 py-1 rounded-full uppercase tracking-wider">
              Real-time Sync
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={schoolData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 14, fontWeight: 'bold'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="completion" radius={[0, 10, 10, 0]} barSize={40}>
                  {schoolData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#0B6E3C' : '#4F46E5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-4 p-6 rounded-[14px] shadow-sm border-none flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <svg className="h-40 w-40 transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
              <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset={440 - (440 * 88) / 100} className="text-[#0B6E3C]" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-[#0B6E3C]">88</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
            </div>
          </div>
          <h4 className="font-black text-xl text-slate-800 mb-2">Academic Health Score</h4>
          <p className="text-xs text-muted-foreground mb-6">Based on submission quality, delivery rates, and student performance correlation.</p>
          <div className="w-full flex items-center justify-between bg-[#F5F7FA] p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-700">Excellent</span>
            </div>
            <span className="text-xs font-black text-[#0B6E3C]">+4.2%</span>
          </div>
        </Card>
      </div>

      <Card className="p-6 rounded-[14px] shadow-sm border-none">
        <h3 className="text-lg font-bold mb-6">Department Performance Matrix</h3>
        <div className="space-y-4">
          {[
            { dept: "Mathematics", score: 94, status: "Excellent", color: "bg-emerald-500" },
            { dept: "English Language", score: 88, status: "Excellent", color: "bg-emerald-500" },
            { dept: "Sciences", score: 72, status: "Good", color: "bg-blue-500" },
            { dept: "Humanities", score: 45, status: "Needs Support", color: "bg-rose-500" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#F5F7FA] group hover:bg-white hover:shadow-sm transition-all">
              <div className="flex items-center gap-4">
                <div className={cn("h-3 w-3 rounded-full animate-pulse", item.color)} />
                <span className="font-bold text-slate-700">{item.dept}</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Productivity</span>
                  <span className="text-sm font-black text-slate-800">{item.score}/100</span>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                  item.status === "Excellent" ? "bg-emerald-100 text-emerald-700" : 
                  item.status === "Good" ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
                )}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
