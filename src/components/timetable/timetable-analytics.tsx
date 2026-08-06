import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { 
  BarChart3, 
  Clock, 
  Users, 
  Home, 
  AlertTriangle,
  FileText,
  Download,
  Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";

const workloadData = [
  { name: 'Eng', hours: 45 },
  { name: 'Math', hours: 52 },
  { name: 'Phys', hours: 38 },
  { name: 'Chem', hours: 35 },
  { name: 'Bio', hours: 32 },
  { name: 'Hist', hours: 28 },
];

const utilizationData = [
  { name: 'Classrooms', value: 92 },
  { name: 'Free', value: 8 },
];

const COLORS = ['#0B6E3C', '#E8F5EE', '#FFBB28', '#FF8042'];

export function TimetableAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Performance & Analytics</h3>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm"><Printer className="h-4 w-4 mr-2" /> Print Reports</Button>
           <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-2" /> Export Excel</Button>
           <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90" size="sm"><Download className="h-4 w-4 mr-2" /> Download All</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-[14px] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Teacher Workload (Hrs/Week)</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workloadData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="hours" fill="#0B6E3C" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Classroom Occupancy</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={utilizationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {utilizationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                 <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-schoolgate-green" />
                    <span className="text-xs text-gray-500">Occupied (92%)</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-schoolgate-green-light" />
                    <span className="text-xs text-gray-500">Free (8%)</span>
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Free Period Analysis</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={workloadData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis axisLine={false} tickLine={false} fontSize={12} />
                      <Tooltip />
                      <Line type="monotone" dataKey="hours" stroke="#0B6E3C" strokeWidth={2} dot={{ r: 4, fill: '#0B6E3C' }} />
                   </LineChart>
                </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-[14px] border bg-white p-6 shadow-sm">
         <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Conflict Reports</h3>
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100">All Clear</Badge>
         </div>
         <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider pb-2 border-b">
               <span>Type</span>
               <span>Description</span>
               <span>Severity</span>
               <span>Resolution</span>
            </div>
            {[
               { type: 'Teacher', desc: 'Mr. Yusuf assigned to 2 classes at 8:00 AM', severity: 'High', status: 'Resolved' },
               { type: 'Room', desc: 'RM 201 over-capacity for JS3 Combined', severity: 'Medium', status: 'Fixed' },
               { type: 'Subject', desc: 'Mathematics scheduled 3 times in one day for SS1', severity: 'Low', status: 'Adjusted' },
            ].map((report, idx) => (
               <div key={idx} className="grid grid-cols-4 gap-4 text-sm items-center py-2 border-b last:border-0">
                  <span className="font-medium text-gray-900">{report.type}</span>
                  <span className="text-gray-500">{report.desc}</span>
                  <Badge variant="secondary" className={report.severity === 'High' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}>{report.severity}</Badge>
                  <span className="text-green-600 text-xs flex items-center gap-1">
                     <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                     {report.status}
                  </span>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}
