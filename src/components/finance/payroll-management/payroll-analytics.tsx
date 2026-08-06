import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const trendData = [
  { name: "Mar", payroll: 9.8 },
  { name: "Apr", payroll: 10.2 },
  { name: "May", payroll: 10.5 },
  { name: "Jun", payroll: 11.0 },
  { name: "Jul", payroll: 12.1 },
  { name: "Aug", payroll: 12.5 },
];

const deptData = [
  { name: "Secondary", value: 45, color: "#0B6E3C" },
  { name: "Primary", value: 30, color: "#10b981" },
  { name: "Admin", value: 15, color: "#34d399" },
  { name: "Support", value: 10, color: "#6ee7b7" },
];

export function PayrollAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="rounded-[14px] border-slate-100 shadow-sm">
        <CardHeader><CardTitle className="text-sm font-bold text-slate-600">Payroll Trend (Millions ₦)</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="#94a3b8" />
              <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#94a3b8" />
              <Tooltip cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="payroll" fill="#0B6E3C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-[14px] border-slate-100 shadow-sm">
        <CardHeader><CardTitle className="text-sm font-bold text-slate-600">Distribution by Department</CardTitle></CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={deptData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {deptData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
