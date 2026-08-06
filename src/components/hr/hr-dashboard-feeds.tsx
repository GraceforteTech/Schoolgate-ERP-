import React from "react";
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertTriangle,
  UserPlus,
  Plane,
  CreditCard,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    title: "Leave Approval Required",
    desc: "Mr. Adebayo (Mathematics) requested 3 days sick leave.",
    time: "10 mins ago",
    type: "urgent",
    icon: Clock,
    color: "bg-red-50 text-red-600"
  },
  {
    id: 2,
    title: "Payroll Computation Ready",
    desc: "August payroll draft is ready for review.",
    time: "2 hours ago",
    type: "info",
    icon: FileText,
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: 3,
    title: "Loan Request",
    desc: "New loan application from Mrs. Sarah (Admin).",
    time: "5 hours ago",
    type: "warning",
    icon: CreditCard,
    color: "bg-orange-50 text-orange-600"
  },
  {
    id: 4,
    title: "Policy Update",
    desc: "Staff handbook v2.4 has been published.",
    time: "1 day ago",
    type: "success",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600"
  }
];

const activities = [
  {
    id: 1,
    user: "System",
    action: "Onboarded",
    target: "John Doe (Junior Teacher)",
    time: "20 mins ago",
    icon: UserPlus,
    color: "text-blue-500"
  },
  {
    id: 2,
    user: "Admin",
    action: "Approved",
    target: "Salary Advance - Mrs. Peters",
    time: "1 hour ago",
    icon: CheckCircle2,
    color: "text-schoolgate-green"
  },
  {
    id: 3,
    user: "Principal",
    action: "Submitted",
    target: "Q2 Performance Reviews",
    time: "4 hours ago",
    icon: FileText,
    color: "text-purple-500"
  },
  {
    id: 4,
    user: "HR",
    action: "Updated",
    target: "Pension Contribution Rates",
    time: "Yesterday",
    icon: MessageSquare,
    color: "text-orange-500"
  }
];

export const HRDashboardFeeds = () => {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Notifications */}
      <Card className="border-none shadow-sm rounded-[14px]">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-bold">Smart Notifications</CardTitle>
          <Badge variant="outline" className="text-schoolgate-green border-schoolgate-green/20 bg-schoolgate-green-light/50">
            {notifications.length} New
          </Badge>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] pr-4">
            <div className="space-y-4">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className={cn("h-10 w-10 shrink-0 rounded-full flex items-center justify-center", notif.color)}>
                    <notif.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-schoolgate-green transition-colors">
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {notif.desc}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="border-none shadow-sm rounded-[14px]">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px] pr-4">
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              {activities.map((activity) => (
                <div key={activity.id} className="relative flex items-center gap-6 pl-2">
                  <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full bg-white ring-4 ring-slate-50">
                    <activity.icon className={cn("h-4 w-4", activity.color)} />
                  </div>
                  <div className="flex-1 ml-6">
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">{activity.user}</span>
                      {" "}
                      <span className="text-muted-foreground">{activity.action}</span>
                      {" "}
                      <span className="font-medium text-slate-700">{activity.target}</span>
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 italic">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
