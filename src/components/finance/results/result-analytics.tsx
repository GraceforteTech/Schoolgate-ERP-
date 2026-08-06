import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, BookOpen, Star, AlertTriangle, ArrowUpRight } from "lucide-react";

const performanceData = [
  { name: 'Term 1 2022', score: 65 },
  { name: 'Term 2 2022', score: 68 },
  { name: 'Term 3 2022', score: 72 },
  { name: 'Term 1 2023', score: 70 },
  { name: 'Term 2 2023', score: 75 },
  { name: 'Term 3 2023', score: 82 },
];

const distributionData = [
  { name: 'Distinction (A1)', value: 15, color: '#0B6E3C' },
  { name: 'Credit (B2-C6)', value: 55, color: '#3B82F6' },
  { name: 'Pass (D7-E8)', value: 22, color: '#EAB308' },
  { name: 'Fail (F9)', value: 8, color: '#EF4444' },
];

const subjectPerformance = [
  { subject: 'Mathematics', score: 88 },
  { subject: 'English', score: 82 },
  { subject: 'Physics', score: 76 },
  { subject: 'Chemistry', score: 74 },
  { subject: 'Biology', score: 85 },
];

export function ResultAnalytics() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Performance Trend */}
        <Card className="xl:col-span-8 rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-schoolgate-green" />
              Academic Performance Trend
            </CardTitle>
            <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 py-1 font-bold">+12% Growth</Badge>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#0B6E3C" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card className="xl:col-span-4 rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
            <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              {distributionData.map((entry, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{entry.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-800">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
            <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Subject Performance Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="subject" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fontWeight: 700, fill: '#64748B' }}
                    width={100}
                  />
                  <Tooltip 
                    cursor={{ fill: '#F8FAFC' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={20}>
                    {subjectPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#0B6E3C' : '#94A3B8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Insights & Actions */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="rounded-[14px] border-none shadow-sm bg-emerald-600 text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-emerald-200" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">Top Subject</span>
                </div>
                <h4 className="text-xl font-black mb-1">Mathematics</h4>
                <p className="text-[10px] font-bold text-emerald-100 uppercase">88% Average Score</p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black bg-white/10 w-fit px-2 py-1 rounded-lg">
                  <ArrowUpRight size={10} /> +5% VS LAST TERM
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-[14px] border-none shadow-sm bg-rose-600 text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-4 h-4 text-rose-200" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-rose-100">Weak Subject</span>
                </div>
                <h4 className="text-xl font-black mb-1">Chemistry</h4>
                <p className="text-[10px] font-bold text-rose-100 uppercase">74% Average Score</p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-black bg-white/10 w-fit px-2 py-1 rounded-lg">
                  <AlertTriangle size={10} /> REQUIRES INTERVENTION
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Top Performing Students</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { name: 'Blessing Okoro', class: 'Grade 4 Blue', score: '94.2%', rank: 1 },
                { name: 'David Adeleke', class: 'Grade 4 Blue', score: '91.8%', rank: 2 },
                { name: 'Sarah Ahmed', class: 'Grade 4 Blue', score: '89.5%', rank: 3 },
              ].map((student, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'}`}>
                      {student.rank}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800">{student.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{student.class}</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-schoolgate-green">{student.score}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
          <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Detailed Drill-down Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 rounded-xl flex flex-col items-start px-6 border-slate-100 hover:border-schoolgate-green hover:bg-emerald-50 transition-all group">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-schoolgate-green">Teacher Performance</span>
              <span className="text-sm font-bold text-slate-700">Detailed Analytics Report</span>
            </Button>
            <Button variant="outline" className="h-16 rounded-xl flex flex-col items-start px-6 border-slate-100 hover:border-schoolgate-green hover:bg-emerald-50 transition-all group">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-schoolgate-green">Class Comparative</span>
              <span className="text-sm font-bold text-slate-700">Multi-Term Growth Analysis</span>
            </Button>
            <Button variant="outline" className="h-16 rounded-xl flex flex-col items-start px-6 border-slate-100 hover:border-schoolgate-green hover:bg-emerald-50 transition-all group">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-schoolgate-green">Primary vs Secondary</span>
              <span className="text-sm font-bold text-slate-700">Performance Benchmark</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
