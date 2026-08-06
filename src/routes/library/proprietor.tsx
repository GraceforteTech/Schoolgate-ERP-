import { createFileRoute } from '@tanstack/react-router';
import { 
  Library, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Clock, 
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const COLLECTION_VALUE_DATA = [
  { month: 'Jan', value: 4200000 },
  { month: 'Feb', value: 4500000 },
  { month: 'Mar', value: 4800000 },
  { month: 'Apr', value: 5100000 },
  { month: 'May', value: 5500000 },
];

export const Route = createFileRoute('/library/proprietor')({
  component: ProprietorLibraryDashboard,
});

function ProprietorLibraryDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Proprietor Library Dashboard</h1>
            <Badge className="bg-schoolgate-green-light text-schoolgate-green border-none">Executive View</Badge>
          </div>
          <p className="text-muted-foreground">Strategic oversight of library assets, utilization, and literacy impact.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2"><Share2 className="h-4 w-4" /> Share</Button>
          <Button className="bg-[#0B6E3C] hover:bg-[#095A31] gap-2"><Download className="h-4 w-4" /> Executive Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Total Asset Value</p>
              <h3 className="text-xl font-bold">₦12.5M</h3>
              <p className="text-[10px] text-green-600 font-medium flex items-center gap-0.5 mt-0.5">
                <TrendingUp className="h-3 w-3" /> +8.4% YoY
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Active Literacy Rate</p>
              <h3 className="text-xl font-bold">92.4%</h3>
              <p className="text-[10px] text-blue-600 font-medium flex items-center gap-0.5 mt-0.5">
                Target: 95%
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Library Utilization</p>
              <h3 className="text-xl font-bold">78%</h3>
              <p className="text-[10px] text-orange-600 font-medium flex items-center gap-0.5 mt-0.5">
                Capacity: 1,200/day
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">AI Assistant ROI</p>
              <h3 className="text-xl font-bold">2.4x</h3>
              <p className="text-[10px] text-purple-600 font-medium mt-0.5">Search efficiency ↑</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-[14px] border-none shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Collection Growth & Value</CardTitle>
            <CardDescription>Estimated market value of physical and digital assets over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={COLLECTION_VALUE_DATA}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₦${value/1000000}M`} />
                <Tooltip formatter={(value: number) => `₦${value.toLocaleString()}`} />
                <Area type="monotone" dataKey="value" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm overflow-hidden bg-[#0B6E3C] text-white">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> Executive Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             {[
               { title: 'Resource Gap', desc: 'Critical shortage of JSS 3 Mathematics textbooks detected.', action: 'Order 50 Units' },
               { title: 'Library Safety', desc: 'All fire extinguishers inspected. CCTV coverage at 100%.', action: 'Certified' },
               { title: 'Digital Shift', desc: 'Digital resource usage up 45% this term. Bandwidth upgrade recommended.', action: 'Review Plan' }
             ].map((insight, i) => (
               <div key={i} className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-2">
                 <div className="flex justify-between items-start">
                   <p className="text-sm font-bold">{insight.title}</p>
                   <Badge variant="outline" className="border-white/20 text-white text-[9px] uppercase">{insight.action}</Badge>
                 </div>
                 <p className="text-xs text-white/70 leading-relaxed">{insight.desc}</p>
               </div>
             ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Staff Compliance & Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: 'Inventory Accuracy', value: 98 },
              { label: 'Issue Response Time', value: 85 },
              { label: 'Cataloguing Progress', value: 92 },
              { label: 'Student Discipline', value: 96 }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{stat.label}</span>
                  <span className="font-bold text-schoolgate-green">{stat.value}%</span>
                </div>
                <Progress value={stat.value} className="h-1.5 bg-gray-100" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Critical Library Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'warning', msg: 'Insurance for digital assets expiring in 12 days.', date: 'Today' },
                { type: 'alert', msg: 'Unreturned book value exceeds ₦50,000 threshold for JSS 2.', date: 'Yesterday' },
                { type: 'success', msg: 'Successful donation of 200 Encyclopedia volumes received.', date: '2 days ago' }
              ].map((note, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3 p-3 rounded-xl border",
                  note.type === 'warning' ? 'bg-orange-50/50 border-orange-100' :
                  note.type === 'alert' ? 'bg-red-50/50 border-red-100' :
                  'bg-green-50/50 border-green-100'
                )}>
                  <div className={cn(
                    "mt-0.5",
                    note.type === 'warning' ? 'text-orange-600' :
                    note.type === 'alert' ? 'text-red-600' :
                    'text-green-600'
                  )}>
                    {note.type === 'warning' ? <Clock className="h-4 w-4" /> :
                     note.type === 'alert' ? <AlertCircle className="h-4 w-4" /> :
                     <ShieldCheck className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900 leading-tight">{note.msg}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{note.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
