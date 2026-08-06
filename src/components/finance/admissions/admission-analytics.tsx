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
  Line
} from "recharts";
import { Card } from "@/components/ui/card";

const conversionData = [
  { name: "Mon", apps: 20, offers: 5, enrolled: 2 },
  { name: "Tue", apps: 45, offers: 15, enrolled: 8 },
  { name: "Wed", apps: 30, offers: 25, enrolled: 20 },
  { name: "Thu", apps: 60, offers: 40, enrolled: 30 },
  { name: "Fri", apps: 50, offers: 45, enrolled: 42 },
  { name: "Sat", apps: 25, offers: 20, enrolled: 18 },
  { name: "Sun", apps: 10, offers: 8, enrolled: 5 },
];

const categoryData = [
  { name: "Nursery", value: 120 },
  { name: "Primary", value: 350 },
  { name: "Junior Secondary", value: 240 },
  { name: "Senior Secondary", value: 180 },
];

const COLORS = ["#0B6E3C", "#10B981", "#3B82F6", "#F59E0B"];

export function AdmissionAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 border-slate-100 rounded-[14px]">
        <h3 className="text-sm font-bold text-slate-800 mb-6">Application to Enrolment Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#94A3B8", fontSize: 12 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#94A3B8", fontSize: 12 }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
              />
              <Bar dataKey="apps" name="Applications" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
              <Bar dataKey="enrolled" name="Enrolled" fill="#0B6E3C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 border-slate-100 rounded-[14px]">
        <h3 className="text-sm font-bold text-slate-800 mb-6">Distribution by Section</h3>
        <div className="h-[300px] w-full flex items-center justify-center">
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
              <Tooltip />
              <g>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-800 font-bold text-xl">
                  890
                </text>
                <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-400 text-[10px] font-medium uppercase">
                  Total Apps
                </text>
              </g>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
