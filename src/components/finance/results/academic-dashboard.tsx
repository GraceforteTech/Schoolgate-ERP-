import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LineChart, Line } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Star, AlertTriangle, Users, BookOpen, GraduationCap, ArrowUpRight, Award, Zap } from "lucide-react";

const schoolPerformanceData = [
  { name: 'JSS 1', passRate: 85, score: 72 },
  { name: 'JSS 2', passRate: 82, score: 68 },
  { name: 'JSS 3', passRate: 90, score: 75 },
  { name: 'SS 1', passRate: 78, score: 65 },
  { name: 'SS 2', passRate: 75, score: 62 },
  { name: 'SS 3', passRate: 94, score: 82 },
];

const subjectPerformance = [
  { subject: 'Math', score: 88, status: 'Strong' },
  { subject: 'English', score: 84, status: 'Strong' },
  { subject: 'Physics', score: 72, status: 'Average' },
  { subject: 'Chemistry', score: 65, status: 'Weak' },
  { subject: 'Biology', score: 78, status: 'Average' },
];

export function AcademicDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Executive Overview Section */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-schoolgate-green-light rounded-lg">
          <Zap size={20} className="text-schoolgate-green" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Executive Academic Insights</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">30-Second Performance Snapshot</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Side: KPIs & Trends */}
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden p-6 relative group">
              <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">School Pass Rate</span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">92.4%</h3>
                  <div className="mb-1 flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    <ArrowUpRight size={10} /> +2.1%
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-schoolgate-green rounded-full" style={{ width: '92.4%' }} />
                </div>
              </div>
            </Card>

            <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden p-6 relative group">
              <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Promotion Rate</span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">88.5%</h3>
                  <div className="mb-1 flex items-center gap-1 text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                    <ArrowUpRight size={10} /> +0.8%
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: '88.5%' }} />
                </div>
              </div>
            </Card>

            <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden p-6 relative group">
              <div className="absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WAEC Readiness</span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl font-black text-slate-900 tracking-tight">76%</h3>
                  <div className="mb-1 flex items-center gap-1 text-[10px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                    <ArrowUpRight size={10} /> +4%
                  </div>
                </div>
                <div className="h-1.5 w-full bg-slate-50 rounded-full mt-4 overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: '76%' }} />
                </div>
              </div>
            </Card>
          </div>

          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Class Performance Matrix</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={schoolPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
                      dx={-10}
                    />
                    <Tooltip 
                      cursor={{ fill: '#F8FAFC' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="passRate" fill="#0B6E3C" radius={[6, 6, 0, 0]} barSize={32} name="Pass Rate %" />
                    <Bar dataKey="score" fill="#94A3B8" radius={[6, 6, 0, 0]} barSize={32} name="Avg. Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side: Performance Alerts & Ranking */}
        <div className="xl:col-span-4 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Top & Bottom Subjects</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Strongest Performance</h4>
                {subjectPerformance.filter(s => s.status === 'Strong').map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100/50">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                      <span className="text-xs font-bold text-emerald-900">{s.subject}</span>
                    </div>
                    <span className="text-sm font-black text-emerald-700">{s.score}%</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-2">
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Critical Attention Needed</h4>
                {subjectPerformance.filter(s => s.status === 'Weak').map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-100/50">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-bold text-rose-900">{s.subject}</span>
                    </div>
                    <span className="text-sm font-black text-rose-700">{s.score}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[14px] border-none shadow-sm bg-slate-900 text-white overflow-hidden">
            <CardHeader className="border-b border-white/10 py-4 px-6">
              <CardTitle className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Academic Growth Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={schoolPerformanceData}>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0F172A', border: 'none', color: '#fff', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="passRate" 
                      stroke="#0B6E3C" 
                      strokeWidth={3} 
                      dot={{ fill: '#0B6E3C', strokeWidth: 2, r: 4 }} 
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">
                  Overall academic growth is up by 4.2% compared to Term 1. SS 3 shows the highest maturity in scores.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
