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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText, Printer } from "lucide-react";

const enrollmentTrendData = [
  { name: "2020", count: 1800 },
  { name: "2021", count: 1950 },
  { name: "2022", count: 2100 },
  { name: "2023", count: 2300 },
  { name: "2024", count: 2450 },
];

const sectionData = [
  { name: "Primary", value: 1200 },
  { name: "Secondary", value: 1250 },
];

const genderData = [
  { name: "Male", value: 1280 },
  { name: "Female", value: 1170 },
];

const classDistributionData = [
  { name: "Primary 1", students: 180 },
  { name: "Primary 2", students: 200 },
  { name: "Primary 3", students: 190 },
  { name: "Primary 4", students: 210 },
  { name: "Primary 5", students: 220 },
  { name: "Primary 6", students: 200 },
  { name: "JSS 1", students: 240 },
  { name: "JSS 2", students: 230 },
  { name: "JSS 3", students: 220 },
  { name: "SS 1", students: 200 },
  { name: "SS 2", students: 190 },
  { name: "SS 3", students: 170 },
];

const COLORS = ["#0B6E3C", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6"];

export function StudentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800">Student Analytics & Insights</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold">
            <FileSpreadsheet className="h-3.5 w-3.5 mr-1.5 text-emerald-600" /> Excel
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold">
            <FileText className="h-3.5 w-3.5 mr-1.5 text-rose-600" /> PDF
          </Button>
          <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold">
            <Printer className="h-3.5 w-3.5 mr-1.5 text-slate-600" /> Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800">Enrollment Growth Trend</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+6.5% YoY</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentTrendData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Area type="monotone" dataKey="count" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-6">Gender Distribution</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? "#3B82F6" : "#EC4899"} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Male (52%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500" />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Female (48%)</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-6">Section Enrollment</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-schoolgate-green" />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-bold text-slate-600 uppercase">Secondary</span>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-800 mb-6">Student Distribution by Class</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classDistributionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#94A3B8", fontSize: 10 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#94A3B8", fontSize: 12 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="students" fill="#0B6E3C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
