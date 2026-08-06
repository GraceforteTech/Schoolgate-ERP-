import { Card } from "@/components/ui/card";
import { 
  Users, 
  UserPlus, 
  ClipboardCheck, 
  Calendar, 
  GraduationCap, 
  Send, 
  CheckCircle, 
  XCircle, 
  UserCheck, 
  TrendingUp 
} from "lucide-react";

export function ExecutiveKpiCards() {
  const kpis = [
    { label: "Total Applications", value: "1,245", icon: Users },
    { label: "Received Today", value: "24", icon: UserPlus },
    { label: "Under Review", value: "156", icon: ClipboardCheck },
    { label: "Exams Scheduled", value: "48", icon: Calendar },
    { label: "Awaiting Interview", value: "32", icon: GraduationCap },
    { label: "Offers Sent", value: "85", icon: Send },
    { label: "Accepted", value: "64", icon: CheckCircle },
    { label: "Declined", value: "12", icon: XCircle },
    { label: "Enrolled", value: "58", icon: UserCheck },
    { label: "Conversion Rate", value: "75%", icon: TrendingUp },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="p-4 hover:shadow-lg transition-all cursor-pointer border-slate-100 rounded-[14px] group" onClick={() => alert(`Drill-down for ${kpi.label}`)}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-schoolgate-green-light rounded-lg text-schoolgate-green">
              <kpi.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{kpi.label}</p>
              <p className="text-lg font-bold text-slate-800">{kpi.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
