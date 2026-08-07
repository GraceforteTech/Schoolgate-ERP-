import React from "react";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Plane, 
  Plus, 
  Filter,
  ArrowRight,
  ClipboardList
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const leaveRequests = [
  {
    id: "LR-101",
    staff: "Adebayo Olawale",
    type: "Annual Leave",
    duration: "10 Days",
    period: "Aug 15 - Aug 25",
    status: "Pending",
    reason: "Summer vacation with family",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo"
  },
  {
    id: "LR-102",
    staff: "Sarah Johnson",
    type: "Sick Leave",
    duration: "3 Days",
    period: "Aug 07 - Aug 10",
    status: "Approved",
    reason: "Medical checkup",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "LR-103",
    staff: "Chinedu Okoro",
    type: "Maternity",
    duration: "90 Days",
    period: "Sept 01 - Nov 30",
    status: "Reviewing",
    reason: "Maternity leave",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu"
  }
];

const leaveBalances = [
  { type: "Annual", used: 12, total: 20, color: "bg-blue-500" },
  { type: "Sick", used: 4, total: 10, color: "bg-red-500" },
  { type: "Casual", used: 2, total: 5, color: "bg-orange-500" },
  { type: "Compassionate", used: 0, total: 5, color: "bg-purple-500" },
];

export const LeaveManagementSystem = () => {
  return (
    <div className="space-y-6">
      {/* Leave Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {leaveBalances.map((balance, i) => (
          <Card key={i} className="border-none shadow-sm rounded-xl overflow-hidden group">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{balance.type}</span>
                <Badge variant="outline" className="text-[10px] rounded-full px-1.5 py-0">
                  {balance.used}/{balance.total} Days
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-1000 group-hover:opacity-80", balance.color)} 
                    style={{ width: `${(balance.used / balance.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                  <span>Used</span>
                  <span>{balance.total - balance.used} Remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Leave Requests Table */}
        <Card className="xl:col-span-2 border-none shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="bg-white border-b border-slate-50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-schoolgate-green" />
                Leave Approval Queue
              </CardTitle>
              <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase tracking-wider rounded-lg">
                   <Filter className="h-3 w-3 mr-1.5" /> Filter
                 </Button>
                 <Button size="sm" className="h-8 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-schoolgate-green hover:bg-schoolgate-green/90 text-white">
                   <Plus className="h-3 w-3 mr-1.5" /> New Request
                 </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="text-[10px] font-bold uppercase pl-6">Staff Member</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase">Leave Type</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase">Period</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase">Duration</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase text-right pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveRequests.map((req) => (
                  <TableRow key={req.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 ring-2 ring-white">
                          <AvatarImage src={req.avatar} />
                          <AvatarFallback>{req.staff[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-bold text-slate-900 group-hover:text-schoolgate-green transition-colors">{req.staff}</p>
                          <p className="text-[9px] text-muted-foreground">{req.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] font-medium bg-slate-100 text-slate-600 border-none rounded-full px-2">
                        {req.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-slate-600">{req.period}</TableCell>
                    <TableCell className="text-xs font-bold text-slate-700">{req.duration}</TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge className={cn(
                        "rounded-full text-[10px] font-bold px-2 py-0",
                        req.status === "Approved" ? "bg-green-50 text-green-700 border-green-200" :
                        req.status === "Pending" ? "bg-orange-50 text-orange-700 border-orange-200" :
                        "bg-blue-50 text-blue-700 border-blue-200"
                      )}>
                        {req.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mini Leave Calendar */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Staff Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center h-48">
              <div className="text-center space-y-2">
                 <Calendar className="h-10 w-10 text-slate-300 mx-auto" />
                 <p className="text-xs text-muted-foreground font-medium italic">Interactive Leave Calendar <br/> Placeholder</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Upcoming Absences</h4>
              {[
                { name: "John Doe", type: "Annual", date: "Aug 15" },
                { name: "Mrs. Peters", type: "Sick", date: "Tomorrow" },
              ].map((abs, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg border border-slate-100 group hover:border-schoolgate-green transition-all">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-400 group-hover:scale-125 transition-transform" />
                    <span className="text-xs font-bold text-slate-800">{abs.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[9px] font-medium">{abs.type}</Badge>
                    <span className="text-[10px] font-bold text-slate-500">{abs.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
