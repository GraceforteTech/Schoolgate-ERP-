import { Card, CardContent } from "@/components/ui/card";
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
  Cell 
} from "recharts";

const dailyData = [
  { name: 'Mon', attendance: 95 },
  { name: 'Tue', attendance: 98 },
  { name: 'Wed', attendance: 92 },
  { name: 'Thu', attendance: 96 },
  { name: 'Fri', attendance: 94 },
];

const genderData = [
  { name: 'Male', value: 650 },
  { name: 'Female', value: 590 },
];

const COLORS = ['#0B6E3C', '#E8F5EE'];

export function AttendanceAnalytics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="rounded-[14px] shadow-sm border-none bg-white">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold mb-4 text-slate-700 uppercase tracking-wider">Daily Attendance Trend</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#0B6E3C" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0B6E3C' }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[14px] shadow-sm border-none bg-white">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold mb-4 text-slate-700 uppercase tracking-wider">Attendance by Class</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  cursor={{ fill: '#E8F5EE' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="attendance" fill="#0B6E3C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-[14px] shadow-sm border-none bg-white">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold mb-4 text-slate-700 uppercase tracking-wider">Attendance by Gender</h3>
          <div className="h-[250px] w-full">
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-schoolgate-green" />
              <span className="text-xs text-slate-500">Male</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-schoolgate-green-light" />
              <span className="text-xs text-slate-500">Female</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
