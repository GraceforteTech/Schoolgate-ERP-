import { 
  Users, 
  UserCircle,
  Shield, 
  History, 
  Filter, 
  Search, 
  FileSpreadsheet,
  Calendar,
  Monitor,
  Globe,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const auditLogs = [
  {
    id: 1,
    user: "Adaeze Okonkwo",
    role: "Senior Accountant",
    device: "MacBook Pro",
    browser: "Chrome",
    ip: "192.168.1.45",
    date: "06 Aug 2026",
    time: "11:42 AM",
    action: "Fee Adjustment",
    student: "Adebayo Tunde",
    previousValue: "₦75,000",
    newValue: "₦80,000",
    reason: "Late Enrollment Surcharge",
    status: "Approved",
    remarks: "Manual override per Principal directive"
  },
  {
    id: 2,
    user: "System",
    role: "Automated Task",
    device: "Cloud Server",
    browser: "Edge Engine",
    ip: "10.0.0.1",
    date: "06 Aug 2026",
    time: "09:00 AM",
    action: "Bulk Posting",
    student: "Multiple Students (42)",
    previousValue: "N/A",
    newValue: "₦15,000",
    reason: "Term 3 Transport Fee Generation",
    status: "Approved",
    remarks: "Automatic recurring charge"
  },
  {
    id: 3,
    user: "Ibrahim Bello",
    role: "Accountant",
    device: "Dell Latitude",
    browser: "Firefox",
    ip: "192.168.1.12",
    date: "05 Aug 2026",
    time: "03:15 PM",
    action: "Discount Applied",
    student: "Fatima Yusuf",
    previousValue: "₦75,000",
    newValue: "₦67,500",
    reason: "Sibling Discount (10%)",
    status: "Pending",
    remarks: "Awaiting final confirmation from HOD"
  },
  {
    id: 4,
    user: "HR Manager",
    role: "Admin",
    device: "iPad Air",
    browser: "Safari",
    ip: "192.168.1.88",
    date: "07 Aug 2026",
    time: "08:20 AM",
    action: "Staff Archiving",
    student: "EMP/2024/015 (Former Staff)",
    previousValue: "Active",
    newValue: "Archived",
    reason: "Resignation - Relocated",
    status: "Approved",
    remarks: "All clearance forms verified"
  }
];

export function EnhancedAuditTrail() {
  return (
    <Card className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden">
      <CardHeader className="p-6 bg-slate-50/50 border-b flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <History className="h-5 w-5 text-schoolgate-green" />
            Enterprise Audit Log & Trail
          </CardTitle>
          <p className="text-xs text-slate-500 font-medium mt-1">Immutable record of all financial modifications and system actions.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-lg py-1">
             <Filter size={12} className="mr-1.5" /> Filter Logs
           </Badge>
           <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-lg py-1">
             <Calendar size={12} className="mr-1.5" /> Date Range
           </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Actor Details</th>
                <th className="px-6 py-4">Action & Student</th>
                <th className="px-6 py-4">Change Log</th>
                <th className="px-6 py-4">Status & Reason</th>
                <th className="px-6 py-4">Environmental Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-schoolgate-green-light text-schoolgate-green flex items-center justify-center">
                        <UserCircle size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{log.user}</p>
                        <p className="text-[10px] font-bold text-schoolgate-green uppercase tracking-tight">{log.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div>
                      <Badge variant="outline" className="mb-1.5 rounded-md border-slate-200 text-slate-600 font-bold text-[9px] uppercase tracking-wider">
                        {log.action}
                      </Badge>
                      <p className="text-sm font-bold text-slate-700">{log.student}</p>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                        <Clock size={10} /> {log.date} • {log.time}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className="text-right">
                         <p className="text-[10px] font-bold text-slate-400 uppercase">Old</p>
                         <p className="text-xs font-bold text-slate-500 line-through decoration-slate-300">{log.previousValue}</p>
                       </div>
                       <ArrowRightIcon className="text-slate-300 h-4 w-4" />
                       <div>
                         <p className="text-[10px] font-bold text-schoolgate-green uppercase">New</p>
                         <p className="text-sm font-extrabold text-slate-900">{log.newValue}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 max-w-[240px]">
                    <div className="space-y-2">
                       <Badge className={cn(
                         "rounded-full px-3 py-0 text-[10px] font-bold",
                         log.status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                       )}>
                         {log.status}
                       </Badge>
                       <p className="text-xs text-slate-600 font-medium leading-relaxed">{log.reason}</p>
                       {log.remarks && (
                         <p className="text-[10px] italic text-slate-400 font-medium">Ref: {log.remarks}</p>
                       )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1.5">
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                         <Monitor size={12} className="text-slate-400" /> {log.device} • {log.browser}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                         <Globe size={12} className="text-slate-400" /> IP: {log.ip}
                       </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function ArrowRightIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
