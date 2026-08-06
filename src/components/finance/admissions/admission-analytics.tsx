import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area 
} from "recharts";
import { 
  ArrowUpRight, Users, UserCheck, UserX, Clock, Percent, GraduationCap, School, MapPin, Share2, Target 
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const conversionData = [
  { name: "Applied", value: 1200, color: "#94a3b8" },
  { name: "Exam Passed", value: 850, color: "#3b82f6" },
  { name: "Interviewed", value: 600, color: "#f59e0b" },
  { name: "Offered", value: 450, color: "#0B6E3C" },
  { name: "Enrolled", value: 400, color: "#10b981" },
];

const classData = [
  { name: "JSS 1", apps: 320 },
  { name: "JSS 2", apps: 180 },
  { name: "JSS 3", apps: 150 },
  { name: "SS 1", apps: 280 },
  { name: "SS 2", apps: 140 },
  { name: "SS 3", apps: 130 },
];

const sourceData = [
  { name: "Social Media", value: 40 },
  { name: "Referrals", value: 30 },
  { name: "Website", value: 20 },
  { name: "Others", value: 10 },
];

const COLORS = ["#0B6E3C", "#3b82f6", "#f59e0b", "#94a3b8"];

export function AdmissionAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPI Cards */}
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Target className="h-5 w-5" />
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none">+12%</Badge>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</p>
          <p className="text-2xl font-black text-slate-900 mt-1">33.4%</p>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[33.4%]" />
          </div>
        </Card>

        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none">92%</Badge>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capacity Used</p>
          <p className="text-2xl font-black text-slate-900 mt-1">840 / 1000</p>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full w-[84%]" />
          </div>
        </Card>

        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
              <Share2 className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-slate-500">Top Source</p>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Main Channel</p>
          <p className="text-2xl font-black text-slate-900 mt-1">Social Media</p>
          <p className="text-[10px] text-slate-400 mt-4">Contributing 40% of total leads</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <h3 className="font-bold text-slate-800 mb-6">Admission Conversion Funnel</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData} layout="vertical" margin={{ left: 40, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: "#64748b" }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Applications by Class */}
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <h3 className="font-bold text-slate-800 mb-6">Applications by Class</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={classData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "#94a3b8" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "#94a3b8" }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="apps" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Referral Sources */}
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white lg:col-span-1">
          <h3 className="font-bold text-slate-800 mb-6">Referral Sources</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: '#64748b' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Geographic Distribution */}
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800">Applications by State</h3>
            <Badge variant="outline" className="text-[10px] uppercase">Top 5 States</Badge>
          </div>
          <div className="space-y-4">
            {[
              { name: "Lagos", count: 450, percent: 38 },
              { name: "Abuja", count: 280, percent: 23 },
              { name: "Ogun", count: 180, percent: 15 },
              { name: "Oyo", count: 120, percent: 10 },
              { name: "Kano", count: 90, percent: 8 },
            ].map((state, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">{state.name}</span>
                  <span className="text-slate-400">{state.count} Apps ({state.percent}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-schoolgate-green h-full rounded-full" 
                    style={{ width: `${state.percent}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
