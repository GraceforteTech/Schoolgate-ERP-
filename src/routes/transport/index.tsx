import { createFileRoute } from '@tanstack/react-router';
import { 
  Bus, 
  Users, 
  MapPin, 
  Navigation, 
  Wrench, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Wallet,
  PlusCircle,
  FileText,
  Printer,
  Download,
  Search,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
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
  Cell,
  PieChart,
  Pie
} from 'recharts';

export const Route = createFileRoute('/transport/')({
  component: TransportDashboard,
});

const kpiData = [
  { label: 'Total Vehicles', value: '42', icon: Bus, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Vehicles', value: '38', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Under Maintenance', value: '4', icon: Wrench, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Total Drivers', value: '45', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Active Drivers', value: '41', icon: Users, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Transport Students', value: '850', icon: GraduationCap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Active Routes', value: '24', icon: Navigation, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Fees Collected', value: '₦12.5M', icon: Wallet, color: 'text-schoolgate-green', bg: 'bg-schoolgate-green-light' },
  { label: 'Outstanding Fees', value: '₦2.1M', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Trips Today', value: '48', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const revenueData = [
  { name: 'Jan', amount: 1200000 },
  { name: 'Feb', amount: 1500000 },
  { name: 'Mar', amount: 1800000 },
  { name: 'Apr', amount: 1100000 },
  { name: 'May', amount: 2100000 },
  { name: 'Jun', amount: 2400000 },
];

const routeData = [
  { name: 'Route A', students: 120, status: 'Active' },
  { name: 'Route B', students: 95, status: 'Active' },
  { name: 'Route C', students: 110, status: 'Busy' },
  { name: 'Route D', students: 85, status: 'Active' },
];

function GraduationCap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

function TransportDashboard() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Transport Management</h2>
          <p className="text-muted-foreground">
            Manage school buses, routes, drivers and student transportation efficiently.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
          <Button className="h-8 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white">
            <PlusCircle className="mr-2 h-4 w-4" /> Register Vehicle
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="rounded-[14px] border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className={cn("p-2 rounded-lg group-hover:scale-110 transition-transform", kpi.bg)}>
                  <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                  <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-7">
        <Card className="col-span-4 rounded-[14px] border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Transport Revenue Summary</CardTitle>
            <Button variant="ghost" size="sm" className="text-schoolgate-green">View Details</Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Bar dataKey="amount" fill="#0B6E3C" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <QuickActionButton icon={Bus} label="Register Vehicle" />
            <QuickActionButton icon={Users} label="Register Driver" />
            <QuickActionButton icon={Navigation} label="Create Route" />
            <QuickActionButton icon={Users} label="Assign Students" />
            <QuickActionButton icon={Wrench} label="Record Maintenance" />
            <QuickActionButton icon={FileText} label="Print Reports" />
          </CardContent>
          <div className="px-6 pb-6">
            <Card className="bg-schoolgate-green-light border-none rounded-[12px] p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-schoolgate-green" />
                <div>
                  <p className="text-sm font-semibold text-schoolgate-green">Maintenance Alert</p>
                  <p className="text-xs text-schoolgate-green/80">4 vehicles are due for service this week.</p>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Route Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {routeData.map((route, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-lg">
                      <MapPin className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{route.name}</p>
                      <p className="text-xs text-muted-foreground">{route.students} Students</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100">
                    {route.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ActivityItem 
                title="Vehicle #BUS-012 Departed" 
                time="10 mins ago" 
                desc="Route A - Morning Session"
                icon={Navigation}
                color="bg-blue-100 text-blue-600"
              />
              <ActivityItem 
                title="Maintenance Completed" 
                time="45 mins ago" 
                desc="Vehicle #BUS-008 service done"
                icon={Wrench}
                color="bg-green-100 text-green-600"
              />
              <ActivityItem 
                title="Driver Assigned" 
                time="2 hours ago" 
                desc="John Doe assigned to Route C"
                icon={Users}
                color="bg-purple-100 text-purple-600"
              />
              <ActivityItem 
                title="Fuel Record Logged" 
                time="4 hours ago" 
                desc="₦15,000 for Vehicle #BUS-015"
                icon={Wallet}
                color="bg-amber-100 text-amber-600"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Fleet Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Active', value: 38 },
                        { name: 'Maintenance', value: 4 },
                      ]}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#0B6E3C" />
                      <Cell fill="#cbd5e1" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-8 mt-4 w-full">
                <div className="text-center">
                  <p className="text-2xl font-bold text-schoolgate-green">38</p>
                  <p className="text-xs text-muted-foreground">Active Vehicles</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-400">4</p>
                  <p className="text-xs text-muted-foreground">Maintenance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function QuickActionButton({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2 rounded-xl border-slate-100 hover:border-schoolgate-green hover:bg-schoolgate-green-light hover:text-schoolgate-green transition-all group">
      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-schoolgate-green" />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
}

function ActivityItem({ title, time, desc, icon: Icon, color }: { title: string, time: string, desc: string, icon: any, color: string }) {
  return (
    <div className="flex gap-4">
      <div className={cn("mt-0.5 h-8 w-8 shrink-0 rounded-full flex items-center justify-center", color)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">{title}</p>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{time}</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
