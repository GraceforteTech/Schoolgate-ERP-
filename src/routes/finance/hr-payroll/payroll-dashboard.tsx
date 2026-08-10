import { createFileRoute, Link } from "@tanstack/react-router";
import { 
  Banknote, 
  LayoutDashboard, 
  ArrowUpRight, 
  TrendingUp, 
  FileText, 
  Settings,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { PayrollKPIs } from "@/components/hr/payroll-mgmt/payroll-kpis";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export const Route = createFileRoute("/finance/hr-payroll/payroll-dashboard")({
  component: PayrollDashboard,
});

const monthlySummaryData = [
  { month: "Jan", gross: 21000000, net: 17500000 },
  { month: "Feb", gross: 21500000, net: 17800000 },
  { month: "Mar", gross: 21200000, net: 17600000 },
  { month: "Apr", gross: 21800000, net: 18100000 },
  { month: "May", gross: 22100000, net: 18300000 },
  { month: "Jun", gross: 22500000, net: 18400000 },
];

function PayrollDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-12">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="px-6 py-6 max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl bg-white border-none shadow-sm" asChild>
              <Link to="/finance/hr-payroll">
                <ArrowLeft className="h-5 w-5 text-slate-600" />
              </Link>
            </Button>
            <div className="h-12 w-12 rounded-2xl bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
              <Banknote size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Payroll Management Centre</h1>
              <p className="text-sm text-muted-foreground mt-1">Provide HR officers, accountants and proprietors with a complete overview of payroll activities.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg">
                <Settings className="h-4 w-4" />
                Config
             </Button>
             <Button className="h-10 gap-2 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg shadow-sm">
                <Banknote className="h-4 w-4" />
                Process Payroll
             </Button>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 space-y-6 max-w-[1600px] mx-auto">
        {/* KPI Cards Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
              <LayoutDashboard className="h-4 w-4 text-schoolgate-green" />
              Executive Payroll KPIs
            </h2>
          </div>
          <PayrollKPIs />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Monthly Payroll Summary Chart */}
          <Card className="lg:col-span-2 border-none shadow-sm rounded-[14px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">Monthly Payroll Summary</CardTitle>
                  <CardDescription>Comparison of Gross vs Net payroll trends</CardDescription>
                </div>
                <Badge variant="outline" className="bg-schoolgate-green-light text-schoolgate-green border-schoolgate-green/20">
                  Last 6 Months
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlySummaryData}>
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
                    <Bar dataKey="gross" name="Gross" fill="#0B6E3C" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar dataKey="net" name="Net" fill="#E8F5EE" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Payroll Status & Quick Actions */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm rounded-[14px]">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Payroll Status</CardTitle>
                <CardDescription>Current processing state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                         <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <CheckCircle2 className="h-5 w-5" />
                         </div>
                         <span className="text-sm font-bold text-slate-700">Validated</span>
                      </div>
                      <Badge className="bg-green-500 text-white border-none">100%</Badge>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-center gap-3">
                         <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Clock className="h-5 w-5" />
                         </div>
                         <span className="text-sm font-bold text-slate-700">Pending Approval</span>
                      </div>
                      <Badge className="bg-blue-500 text-white border-none">92%</Badge>
                   </div>
                   <Button className="w-full h-11 bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl gap-2 font-bold">
                      View Processing Centre
                      <ArrowRight className="h-4 w-4" />
                   </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-[14px]">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl border-slate-200">
                  <FileText className="h-5 w-5 text-schoolgate-green" />
                  <span className="text-xs font-bold">Generate Payslips</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl border-slate-200">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  <span className="text-xs font-bold">Tax Reports</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl border-slate-200">
                  <Banknote className="h-5 w-5 text-orange-600" />
                  <span className="text-xs font-bold">Advances</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl border-slate-200">
                  <Settings className="h-5 w-5 text-slate-600" />
                  <span className="text-xs font-bold">Settings</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activities & Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <Card className="border-none shadow-sm rounded-[14px]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">Recent Activities</CardTitle>
                <Button variant="link" className="text-schoolgate-green text-xs font-bold">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                   {[
                     { user: "HR Admin", action: "processed", target: "August 2024 Payroll Batch", time: "2 hours ago", icon: CheckCircle2, color: "text-schoolgate-green" },
                     { user: "Accountant", action: "applied", target: "Staff Salary Advances", time: "5 hours ago", icon: Banknote, color: "text-blue-500" },
                     { user: "System", action: "locked", target: "July 2024 Final Payroll", time: "Yesterday", icon: FileText, color: "text-slate-500" },
                   ].map((activity, i) => (
                     <div key={i} className="flex gap-4">
                        <div className={cn("h-10 w-10 shrink-0 rounded-full bg-slate-50 flex items-center justify-center", activity.color)}>
                           <activity.icon className="h-5 w-5" />
                        </div>
                        <div>
                           <p className="text-sm font-medium">
                             <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-bold text-slate-700">{activity.target}</span>
                           </p>
                           <p className="text-[11px] text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </CardContent>
           </Card>

           <Card className="border-none shadow-sm rounded-[14px]">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">Smart Notifications</CardTitle>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                   {[
                     { title: "Salary Advance Approval", desc: "3 staff members requested salary advance.", priority: "High" },
                     { title: "Statutory Filing", desc: "Tax and Pension filing due in 5 days.", priority: "Medium" },
                     { title: "New Salary Structure", desc: "Teaching allowance update needs review.", priority: "Low" },
                   ].map((notif, i) => (
                     <div key={i} className="p-4 bg-slate-50 rounded-xl border-l-4 border-schoolgate-green relative">
                        <h4 className="text-sm font-bold text-slate-800">{notif.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{notif.desc}</p>
                        <Badge className="absolute top-4 right-4 text-[9px] uppercase font-bold bg-white text-slate-600 border border-slate-200">
                          {notif.priority}
                        </Badge>
                     </div>
                   ))}
                </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
