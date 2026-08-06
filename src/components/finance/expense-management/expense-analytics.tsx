import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryData = [
  { name: 'Salaries', value: 4500000 },
  { name: 'Utilities', value: 850000 },
  { name: 'Academic', value: 1200000 },
  { name: 'Maintenance', value: 650000 },
  { name: 'Supplies', value: 450000 },
];

const monthlyTrend = [
  { name: 'Jan', amount: 1200000, budget: 1500000 },
  { name: 'Feb', amount: 1800000, budget: 1500000 },
  { name: 'Mar', amount: 1400000, budget: 1500000 },
  { name: 'Apr', amount: 2100000, budget: 1500000 },
  { name: 'May', amount: 1900000, budget: 1500000 },
  { name: 'Jun', amount: 1600000, budget: 1500000 },
];

const COLORS = ['#0B6E3C', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

export function ExpenseAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
            <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
            <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">Monthly Expense Trend</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrend}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
                    tickFormatter={(value) => `₦${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">Budget vs Actual</CardTitle>
          <Tabs defaultValue="monthly">
            <TabsList className="bg-white border border-slate-100 rounded-lg h-8">
              <TabsTrigger value="monthly" className="text-[10px] font-bold uppercase tracking-wider h-6 rounded-md data-[state=active]:bg-schoolgate-green data-[state=active]:text-white">Monthly</TabsTrigger>
              <TabsTrigger value="session" className="text-[10px] font-bold uppercase tracking-wider h-6 rounded-md data-[state=active]:bg-schoolgate-green data-[state=active]:text-white">Session</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#94A3B8' }}
                  tickFormatter={(value) => `₦${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="top" align="right" height={36}/>
                <Bar dataKey="budget" name="Budgeted" fill="#E2E8F0" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="amount" name="Actual" fill="#0B6E3C" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
