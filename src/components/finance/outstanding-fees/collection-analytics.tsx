import { Card } from "@/components/ui/card";
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

const classData = [
  { name: 'JSS 1', amount: 2400000 },
  { name: 'JSS 2', amount: 3200000 },
  { name: 'JSS 3', amount: 1800000 },
  { name: 'SSS 1', amount: 4500000 },
  { name: 'SSS 2', amount: 2100000 },
  { name: 'SSS 3', amount: 5600000 },
];

const schoolData = [
  { name: 'Primary', value: 62800000 },
  { name: 'Secondary', value: 82400000 },
];

const COLORS = ['#0B6E3C', '#fbbf24'];

const trendData = [
  { month: 'Jan', recovery: 4.2 },
  { month: 'Feb', recovery: 3.8 },
  { month: 'Mar', recovery: 5.1 },
  { month: 'Apr', recovery: 4.5 },
  { month: 'May', recovery: 6.2 },
  { month: 'Jun', recovery: 4.8 },
];

export function CollectionAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {/* Outstanding by Class */}
      <Card className="p-5 border-none bg-white rounded-[14px] shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-6">Outstanding by Class</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(value) => `₦${value/1000000}M`} />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
              />
              <Bar dataKey="amount" fill="#0B6E3C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Outstanding by School */}
      <Card className="p-5 border-none bg-white rounded-[14px] shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-6">School Distribution</h3>
        <div className="h-[250px] w-full flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={schoolData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {schoolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {schoolData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index]}} />
                <span className="text-xs font-medium text-slate-600">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recovery Trend */}
      <Card className="p-5 border-none bg-white rounded-[14px] shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-6">Recovery Trend (Millions)</h3>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <Tooltip />
              <Line type="monotone" dataKey="recovery" stroke="#0B6E3C" strokeWidth={3} dot={{r: 4, fill: '#0B6E3C'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
