import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageSquare, Smartphone, CheckCircle2, Clock } from "lucide-react";

const notifications = [
  { id: 1, date: "06 Aug 2026", student: "Fatima Yusuf", parent: "Mr. Yusuf Ibrahim", type: "Absent", method: "WhatsApp", status: "Delivered", sentBy: "System" },
  { id: 2, date: "06 Aug 2026", student: "Chukwuma Ifeanyi", parent: "Mrs. Ifeanyi", type: "Late", method: "SMS", status: "Sent", sentBy: "Admin" },
  { id: 3, date: "05 Aug 2026", student: "Grace Okon", parent: "Mr. Okon", type: "Absent", method: "Email", status: "Read", sentBy: "System" },
];

export function ParentNotificationCentre() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "SMS Notifications", count: "124", icon: Smartphone, color: "text-blue-600" },
          { label: "WhatsApp Alerts", count: "89", icon: MessageSquare, color: "text-emerald-600" },
          { label: "Email Summaries", count: "45", icon: Mail, color: "text-indigo-600" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm rounded-[14px] bg-white">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn("p-3 rounded-xl bg-slate-50", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.count}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border-none">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-700">Notification History</h3>
          <Badge className="bg-schoolgate-green-light text-schoolgate-green hover:bg-schoolgate-green-light border-none">Live Updates</Badge>
        </div>
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Notification Type</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notif) => (
              <TableRow key={notif.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="text-sm text-slate-600">{notif.date}</TableCell>
                <TableCell className="font-semibold text-slate-900">{notif.student}</TableCell>
                <TableCell className="text-sm text-slate-600">{notif.parent}</TableCell>
                <TableCell>
                  <Badge className={cn(
                    "rounded-md border-none",
                    notif.type === "Absent" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                  )}>{notif.type}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    {notif.method === "SMS" && <Smartphone className="h-3 w-3" />}
                    {notif.method === "WhatsApp" && <MessageSquare className="h-3 w-3" />}
                    {notif.method === "Email" && <Mail className="h-3 w-3" />}
                    {notif.method}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <CheckCircle2 className="h-3 w-3" /> {notif.status}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-slate-600">{notif.sentBy}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
