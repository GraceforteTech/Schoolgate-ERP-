import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const revenueData = [
  { name: 'Jan', expected: 4000000, collected: 2400000 },
  { name: 'Feb', expected: 3000000, collected: 1398000 },
  { name: 'Mar', expected: 2000000, collected: 9800000 },
  { name: 'Apr', expected: 2780000, collected: 3908000 },
  { name: 'May', expected: 1890000, collected: 4800000 },
  { name: 'Jun', expected: 2390000, collected: 3800000 },
];

const schoolData = [
  { name: 'Primary', value: 18500000, color: '#0B6E3C' },
  { name: 'Secondary', value: 26750000, color: '#3B82F6' },
];

export function FinanceAnalytics() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <Card className="border-none shadow-sm rounded-[14px] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold text-slate-900">Revenue Analytics</CardTitle>
          <div className="flex gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[120px] h-8 text-xs font-bold border-slate-100 rounded-lg">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">By Day</SelectItem>
                <SelectItem value="week">By Week</SelectItem>
                <SelectItem value="month">By Month</SelectItem>
                <SelectItem value="session">By Session</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Area type="monotone" dataKey="collected" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorCollected)" />
              <Area type="monotone" dataKey="expected" stroke="#cbd5e1" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm rounded-[14px] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-bold text-slate-900">Revenue by School</CardTitle>
          <Select defaultValue="collected">
            <SelectTrigger className="w-[140px] h-8 text-xs font-bold border-slate-100 rounded-lg">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="collected">Collected</SelectItem>
              <SelectItem value="expected">Expected</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-[350px] flex items-center justify-center pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={schoolData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {schoolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center">
            <span className="text-sm font-bold text-slate-400">Total</span>
            <span className="text-xl font-black text-slate-900">₦45.2M</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
