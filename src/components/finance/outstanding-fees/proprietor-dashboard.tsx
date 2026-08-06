import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Activity,
  ArrowUpRight,
  School,
  Calendar
} from "lucide-react";
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
  Area
} from "recharts";

const recoveryTrend = [
  { day: 'Mon', amount: 1.2 },
  { day: 'Tue', amount: 2.1 },
  { day: 'Wed', amount: 0.8 },
  { day: 'Thu', amount: 3.4 },
  { day: 'Fri', amount: 4.8 },
  { day: 'Sat', amount: 1.5 },
  { day: 'Sun', amount: 0.5 },
];

export function ProprietorDashboard() {
  return (
    <div className="space-y-8">
      {/* Executive Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-none bg-schoolgate-green text-white rounded-[14px] shadow-md relative overflow-hidden group">
          <div className="absolute right-[-10%] top-[-10%] opacity-10 group-hover:scale-110 transition-transform">
            <DollarSign size={120} />
          </div>
          <p className="text-sm font-medium opacity-80 mb-1">Total Outstanding Revenue</p>
          <h3 className="text-3xl font-bold mb-4">₦145,280,000</h3>
          <div className="flex items-center gap-2 text-xs bg-white/20 w-fit px-2 py-1 rounded-full">
            <Activity size={14} />
            <span>Health Score: 68/100</span>
          </div>
        </Card>

        <Card className="p-6 border-none bg-white rounded-[14px] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">Monthly Recovery</p>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">₦24.5M</h3>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{width: '64%'}} />
            </div>
            <span className="text-xs font-bold text-slate-600">64%</span>
          </div>
        </Card>

        <Card className="p-6 border-none bg-white rounded-[14px] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">Expected Remaining</p>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Calendar size={18} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">₦120.7M</h3>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Next Milestone: July 15</p>
        </Card>

        <Card className="p-6 border-none bg-white rounded-[14px] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium text-slate-500">At Risk Debt</p>
              <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                <AlertCircle size={18} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">₦12.4M</h3>
          </div>
          <p className="text-xs text-red-500 mt-2 font-bold flex items-center gap-1">
            <ArrowUpRight size={14} />
            +2.4% from last week
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recovery Trend Chart */}
        <Card className="lg:col-span-8 p-6 border-none bg-white rounded-[14px] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Daily Recovery Trend</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs font-bold bg-slate-50">Weekly</Button>
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs font-bold">Monthly</Button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoveryTrend}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Debtors List */}
        <Card className="lg:col-span-4 p-6 border-none bg-white rounded-[14px] shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Critical Debt Exposure</h3>
          <div className="space-y-5">
            {[
              { label: 'SSS 3 Gold', amount: '₦12.5M', type: 'Class' },
              { label: 'Secondary School', amount: '₦82.4M', type: 'Section' },
              { label: 'Primary 5 Silver', amount: '₦8.2M', type: 'Class' },
              { label: 'New Enrollment Debt', amount: '₦4.1M', type: 'Category' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                    <School size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{item.type}</p>
                  </div>
                </div>
                <p className="font-bold text-red-600">{item.amount}</p>
              </div>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-6 text-schoolgate-green font-bold text-sm">View Exposure Report</Button>
        </Card>
      </div>
    </div>
  );
}
