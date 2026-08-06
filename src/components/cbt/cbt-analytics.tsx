import { Card } from "@/components/ui/card";
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
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  Download, 
  FileText, 
  Printer, 
  TrendingUp, 
  Users, 
  Trophy, 
  Target,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const data = [
  { name: "Math", score: 75, passRate: 85 },
  { name: "Physics", score: 68, passRate: 72 },
  { name: "Chem", score: 72, passRate: 80 },
  { name: "Bio", score: 82, passRate: 92 },
  { name: "English", score: 78, passRate: 88 },
  { name: "Govt", score: 85, passRate: 95 },
];

const COLORS = ["#0B6E3C", "#2563eb", "#f59e0b", "#7c3aed", "#db2777", "#4b5563"];

export function CBTAnalytics() {
  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-black text-slate-800">CBT Performance Insights</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 gap-2 font-bold text-slate-600">
            <Printer size={16} />
            Print Report
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-10 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 gap-2 font-bold shadow-md">
                <Download size={16} />
                Export Results
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl p-2 w-40">
              <DropdownMenuItem className="rounded-lg font-bold text-xs">Excel Spreadsheet</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg font-bold text-xs">PDF Document</DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg font-bold text-xs">CSV Data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="p-6 border-slate-100 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Trophy size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Score</p>
          </div>
          <p className="text-3xl font-black text-slate-800">76.4%</p>
          <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <TrendingUp size={14} />
            <span>+4.2% from last term</span>
          </div>
        </Card>
        <Card className="p-6 border-slate-100 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <Target size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pass Rate</p>
          </div>
          <p className="text-3xl font-black text-slate-800">88.2%</p>
          <div className="mt-4 flex items-center gap-2 text-emerald-600 font-bold text-xs">
            <TrendingUp size={14} />
            <span>Highest this session</span>
          </div>
        </Card>
        <Card className="p-6 border-slate-100 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <Users size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Participation</p>
          </div>
          <p className="text-3xl font-black text-slate-800">94.5%</p>
          <div className="mt-4 text-slate-400 font-bold text-[10px] uppercase">
            1,245 students participated
          </div>
        </Card>
        <Card className="p-6 border-slate-100 shadow-sm bg-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
              <FileText size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Questions Taken</p>
          </div>
          <p className="text-3xl font-black text-slate-800">42.8k</p>
          <div className="mt-4 text-slate-400 font-bold text-[10px] uppercase">
            Unique attempts tracked
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Subject Performance Analysis</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="score" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">Pass Rate vs Target</h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: "#94a3b8" }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="passRate" fill="#0B6E3C" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
