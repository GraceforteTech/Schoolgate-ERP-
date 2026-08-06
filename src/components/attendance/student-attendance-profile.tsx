import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  FileText, 
  User,
  ArrowUpRight,
  History
} from "lucide-react";

export function StudentAttendanceProfile() {
  const stats = [
    { label: "Present Days", value: "142", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Absent Days", value: "8", color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Late Days", value: "4", color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Attendance %", value: "94.6%", color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 rounded-[14px] border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4 ring-4 ring-schoolgate-green-light">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo" />
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-bold text-slate-900">Adebayo Tunde</h3>
          <p className="text-sm text-muted-foreground mb-4">Admission No: SCH/2024/001</p>
          <Badge className="bg-schoolgate-green hover:bg-schoolgate-green/90 mb-6 px-4 py-1">JSS 1A</Badge>
          
          <div className="w-full space-y-3">
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <User className="mr-2 h-4 w-4" /> View Student Profile
            </Button>
            <Button className="w-full justify-start rounded-xl bg-schoolgate-green text-white">
              <Smartphone className="mr-2 h-4 w-4" /> Send WhatsApp
            </Button>
            <Button variant="outline" className="w-full justify-start rounded-xl">
              <Mail className="mr-2 h-4 w-4" /> Email Parent
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm rounded-[14px] bg-white">
              <CardContent className="p-4">
                <p className="text-xs font-medium text-slate-500 mb-1">{stat.label}</p>
                <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-[14px] border-none shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Attendance Calendar
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="rounded-lg text-xs"><ArrowUpRight className="mr-1 h-3 w-3" /> Report</Button>
                <Button variant="outline" size="sm" className="rounded-lg text-xs"><FileText className="mr-1 h-3 w-3" /> PDF</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }).map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-10 rounded-lg flex items-center justify-center text-xs font-medium",
                    i === 0 || i === 7 || i === 14 || i === 21 || i === 28 ? "bg-slate-50 text-slate-400" :
                    i % 5 === 0 ? "bg-rose-50 text-rose-600" :
                    i % 12 === 0 ? "bg-amber-50 text-amber-600" :
                    "bg-emerald-50 text-emerald-600"
                  )}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm bg-white">
          <CardContent className="p-6">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <History className="h-4 w-4" /> Recent Attendance Timeline
            </h3>
            <div className="space-y-4">
              {[
                { date: "05 Aug 2026", status: "Present", remark: "In class early" },
                { date: "04 Aug 2026", status: "Late", remark: "Heavy traffic" },
                { date: "03 Aug 2026", status: "Present", remark: "Participated in lab" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div className="flex gap-3 items-center">
                    <div className={cn(
                      "h-2 w-2 rounded-full",
                      log.status === "Present" ? "bg-emerald-500" : "bg-amber-500"
                    )} />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{log.date}</p>
                      <p className="text-xs text-muted-foreground">{log.remark}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn(
                    "rounded-md",
                    log.status === "Present" ? "border-emerald-200 text-emerald-600" : "border-amber-200 text-amber-600"
                  )}>{log.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
