import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Filter,
  TrendingUp,
  Award,
  AlertTriangle
} from "lucide-react";

const submissionData = [
  { name: 'Week 1', rate: 85 },
  { name: 'Week 2', rate: 92 },
  { name: 'Week 3', rate: 88 },
  { name: 'Week 4', rate: 95 },
  { name: 'Week 5', rate: 90 },
];

const performanceData = [
  { name: 'Math', approval: 98, delivery: 95 },
  { name: 'English', approval: 95, delivery: 92 },
  { name: 'Science', approval: 90, delivery: 88 },
  { name: 'Arts', approval: 100, delivery: 98 },
];

export function LessonAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Executive Analytics</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-lg"><FileSpreadsheet className="mr-2 h-4 w-4" /> Excel</Button>
          <Button variant="outline" size="sm" className="rounded-lg"><FileText className="mr-2 h-4 w-4" /> PDF</Button>
          <Button variant="outline" size="sm" className="rounded-lg"><Printer className="mr-2 h-4 w-4" /> Print</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="font-bold text-slate-800">Weekly Submission Rate (%)</h4>
              <p className="text-xs text-muted-foreground">Compliance trend across terms</p>
            </div>
            <div className="flex items-center gap-2 text-[#0B6E3C] bg-schoolgate-green-light px-2 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" />
              <span className="text-[10px] font-bold">+12% vs last term</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={submissionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#0B6E3C" strokeWidth={3} dot={{fill: '#0B6E3C', r: 4}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <h4 className="font-bold text-slate-800 mb-8">Departmental Performance</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="approval" fill="#0B6E3C" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="delivery" fill="#E8F5EE" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 rounded-[14px] shadow-sm border-none bg-[#0B6E3C] text-white">
          <Award className="h-8 w-8 mb-4 opacity-50" />
          <h4 className="font-bold text-lg mb-1">Top Performing Teacher</h4>
          <p className="text-white/70 text-sm mb-4">Highest lesson delivery and quality rating.</p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">SJ</div>
            <div>
              <p className="font-bold">Sarah Johnson</p>
              <p className="text-xs text-white/70">Mathematics Department</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <AlertTriangle className="h-8 w-8 mb-4 text-rose-500" />
          <h4 className="font-bold text-lg mb-1">Low Submission Alert</h4>
          <p className="text-muted-foreground text-sm mb-4">4 teachers have missed 2+ weeks of lesson notes.</p>
          <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 p-0 font-bold">Take Action Now</Button>
        </Card>

        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <TrendingUp className="h-8 w-8 mb-4 text-indigo-500" />
          <h4 className="font-bold text-lg mb-1">Curriculum Milestone</h4>
          <p className="text-muted-foreground text-sm mb-4">JSS 1 Science is 3 weeks ahead of schedule.</p>
          <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 p-0 font-bold">View Curriculum</Button>
        </Card>
      </div>
    </div>
  );
}
