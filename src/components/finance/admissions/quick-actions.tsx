import { 
  UserPlus, 
  FilePlus, 
  Calendar, 
  GraduationCap, 
  CheckCircle, 
  Mail, 
  Printer, 
  UserCheck, 
  Download 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function QuickActions() {
  const actions = [
    { label: "New Enquiry", icon: UserPlus, variant: "outline" as const },
    { label: "New Application", icon: FilePlus, variant: "default" as const },
    { label: "Schedule Exam", icon: Calendar, variant: "outline" as const },
    { label: "Schedule Interview", icon: GraduationCap, variant: "outline" as const },
    { label: "Approve Admission", icon: CheckCircle, variant: "outline" as const },
    { label: "Generate Letter", icon: Mail, variant: "outline" as const },
    { label: "Print Letter", icon: Printer, variant: "outline" as const },
    { label: "Enroll Student", icon: UserCheck, variant: "outline" as const },
    { label: "Export Apps", icon: Download, variant: "outline" as const },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {actions.map((action, i) => (
        <Button
          key={i}
          variant={action.variant === "default" ? "default" : "outline"}
          className={`h-auto py-4 px-4 flex flex-col items-center gap-2 rounded-[14px] transition-all hover:shadow-md ${
            action.variant === "default" ? "bg-schoolgate-green hover:bg-schoolgate-green/90" : "border-slate-200"
          }`}
        >
          <action.icon className={`h-5 w-5 ${action.variant === "default" ? "text-white" : "text-schoolgate-green"}`} />
          <span className="text-xs font-semibold">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
