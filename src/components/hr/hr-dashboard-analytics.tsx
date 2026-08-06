import React from "react";
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
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const payrollData = [
  { month: "Jan", basic: 12000000, allowances: 2500000, deductions: 800000 },
  { month: "Feb", basic: 12100000, allowances: 2600000, deductions: 850000 },
  { month: "Mar", basic: 12050000, allowances: 2400000, deductions: 820000 },
  { month: "Apr", basic: 12200000, allowances: 2700000, deductions: 900000 },
  { month: "May", basic: 12300000, allowances: 2800000, deductions: 950000 },
  { month: "Jun", basic: 12400000, allowances: 3000000, deductions: 1000000 },
];

const staffComposition = [
  { name: "Teaching", value: 85, color: "#0B6E3C" },
  { name: "Admin", value: 15, color: "#10b981" },
  { name: "Maintenance", value: 22, color: "#3b82f6" },
  { name: "Security", value: 12, color: "#6366f1" },
  { name: "Others", value: 8, color: "#94a3b8" },
];

const attendanceTrend = [
  { day: "Mon", rate: 96 },
  { day: "Tue", rate: 94 },
  { day: "Wed", rate: 98 },
  { day: "Thu", rate: 95 },
  { day: "Fri", rate: 92 },
];

export const HRDashboardAnalytics = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Payroll Trend */}
      <Card className="lg:col-span-2 border-none shadow-sm rounded-[14px]">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Payroll Trend</CardTitle>
          <CardDescription>Monthly disbursement overview (Basic vs Allowances)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={payrollData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `₦${value / 1000000}M`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, ""]}
                />
                <Bar dataKey="basic" fill="#0B6E3C" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="allowances" fill="#E8F5EE" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Staff Composition */}
      <Card className="border-none shadow-sm rounded-[14px]">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Staff Composition</CardTitle>
          <CardDescription>Distribution by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={staffComposition}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {staffComposition.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {staffComposition.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Area Chart */}
      <Card className="border-none shadow-sm rounded-[14px]">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Attendance Trend</CardTitle>
          <CardDescription>Weekly average attendance %</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} hide />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#0B6E3C" 
                  fillOpacity={1} 
                  fill="url(#colorRate)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Highest</p>
              <p className="text-sm font-bold text-schoolgate-green">98%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Average</p>
              <p className="text-sm font-bold">95%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Lowest</p>
              <p className="text-sm font-bold text-red-500">92%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wealth Pool Growth */}
      <Card className="lg:col-span-2 border-none shadow-sm rounded-[14px]">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Wealth & Loan Activity</CardTitle>
          <CardDescription>Contribution pool vs Loan disbursement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={payrollData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="basic" name="Savings" stroke="#0B6E3C" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="allowances" name="Loans" stroke="#6366f1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
