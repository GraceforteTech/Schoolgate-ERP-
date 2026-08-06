import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { 
  LayoutDashboard, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  GraduationCap,
  ArrowRight,
  TrendingUp,
  Activity
} from "lucide-react";

const performanceData = [
  { name: 'Primary', completed: 95, remaining: 5 },
  { name: 'Secondary', completed: 88, remaining: 12 },
];

const COLORS = ['#0B6E3C', '#E8F5EE'];

export function PrincipalTimetableDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
            <h3 className="text-lg font-semibold text-gray-900">Principal's Executive Summary</h3>
            <p className="text-sm text-gray-500">Real-time school-wide timetable health & utilization</p>
         </div>
         <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90">
            Generate School Report
         </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
         {[
            { title: "Timetable Completion", value: "92%", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Teacher Utilization", value: "84%", icon: GraduationCap, color: "text-green-600", bg: "bg-green-50" },
            { title: "Subject Coverage", value: "100%", icon: CheckCircle2, color: "text-purple-600", bg: "bg-purple-50" },
            { title: "Active Conflicts", value: "0", icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
         ].map((kpi, idx) => (
            <Card key={idx} className="rounded-[14px] shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
               <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${kpi.bg}`}>
                     <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                  </div>
                  <div>
                     <p className="text-xs text-gray-500 font-medium">{kpi.title}</p>
                     <h4 className="text-xl font-bold text-gray-900">{kpi.value}</h4>
                  </div>
               </CardContent>
            </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
         <Card className="lg:col-span-2 rounded-[14px] shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
               <CardTitle className="text-base font-semibold">School Block Readiness (Primary vs Secondary)</CardTitle>
               <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={performanceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="completed" stackId="a" fill="#0B6E3C" radius={[0, 0, 0, 0]} barSize={40} />
                        <Bar dataKey="remaining" stackId="a" fill="#E8F5EE" radius={[0, 4, 4, 0]} barSize={40} />
                     </BarChart>
                  </ResponsiveContainer>
               </div>
               <div className="flex gap-6 mt-4">
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 rounded-full bg-schoolgate-green" />
                     <span className="text-xs text-gray-500">Completed (Timetables Set)</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="h-3 w-3 rounded-full bg-schoolgate-green-light" />
                     <span className="text-xs text-gray-500">Pending Allocation</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="rounded-[14px] shadow-sm">
            <CardHeader>
               <CardTitle className="text-base font-semibold">Urgent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               {[
                  { title: "Teacher Absence", desc: "Physics teacher on leave, 4 periods affected.", time: "10 mins ago", severity: "High" },
                  { title: "Room Maintenance", desc: "Lab 1 closed for repairs, redirecting classes.", time: "1 hour ago", severity: "Medium" },
                  { title: "New Session Prep", desc: "Next term timetable requires final approval.", time: "4 hours ago", severity: "Low" },
               ].map((alert, idx) => (
                  <div key={idx} className="flex gap-4 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
                     <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                        alert.severity === 'High' ? 'bg-red-500' : 
                        alert.severity === 'Medium' ? 'bg-orange-500' : 'bg-blue-500'
                     }`} />
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                           <Badge variant="outline" className="text-[10px] h-4 py-0">{alert.severity}</Badge>
                        </div>
                        <p className="text-xs text-gray-500">{alert.desc}</p>
                        <p className="mt-2 text-[10px] text-gray-400">{alert.time}</p>
                     </div>
                  </div>
               ))}
               <Button variant="outline" className="w-full mt-2 text-xs h-9">View All Alerts <ArrowRight className="ml-2 h-3 w-3" /></Button>
            </CardContent>
         </Card>
      </div>

      <div className="rounded-[14px] border bg-white p-6 shadow-sm">
         <h3 className="font-semibold text-gray-900 mb-6">Staff Teaching Load Distribution</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
               { name: "Science", load: "92%", avg: "18.5 hrs", status: "Optimal" },
               { name: "Mathematics", load: "98%", avg: "20.2 hrs", status: "High" },
               { name: "Arts", load: "65%", avg: "12.4 hrs", status: "Low" },
               { name: "Languages", load: "82%", avg: "16.8 hrs", status: "Optimal" },
            ].map((dept, idx) => (
               <div key={idx} className="p-4 rounded-xl border bg-gray-50/30">
                  <p className="text-sm font-semibold text-gray-900 mb-1">{dept.name}</p>
                  <div className="flex items-end gap-2 mb-3">
                     <span className="text-2xl font-bold text-schoolgate-green">{dept.load}</span>
                     <span className="text-xs text-gray-400 mb-1">load</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                     <span className="text-gray-500">{dept.avg} avg.</span>
                     <Badge variant="secondary" className={
                        dept.status === 'High' ? 'bg-orange-50 text-orange-600' : 
                        dept.status === 'Low' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                     }>{dept.status}</Badge>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
