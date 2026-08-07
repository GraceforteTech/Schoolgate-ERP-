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
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { PlaceholderForm } from "@/components/ui/placeholder-form";

export function QuickActions() {
  const actions = [
    { label: "New Enquiry", icon: UserPlus, variant: "outline" as const, url: "#" },
    { label: "New Application", icon: FilePlus, variant: "default" as const, url: "#" },
    { label: "Schedule Exam", icon: Calendar, variant: "outline" as const, url: "/finance/admissions/exams" },
    { label: "Schedule Interview", icon: GraduationCap, variant: "outline" as const, url: "/finance/admissions/decisions" },
    { label: "Approve Admission", icon: CheckCircle, variant: "outline" as const, url: "/finance/admissions/decisions" },
    { label: "Generate Letter", icon: Mail, variant: "outline" as const, url: "#" },
    { label: "Print Letter", icon: Printer, variant: "outline" as const, url: "#" },
    { label: "Enroll Student", icon: UserCheck, variant: "outline" as const, url: "/finance/admissions/enrolment" },
    { label: "Export Apps", icon: Download, variant: "outline" as const, url: "#" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {actions.map((action, i) => (
        <Button
          key={i}
          variant={action.variant === "default" ? "default" : "outline"}
          asChild
          className={`h-auto py-4 px-4 flex flex-col items-center gap-2 rounded-[14px] transition-all hover:shadow-md ${
            action.variant === "default" ? "bg-schoolgate-green hover:bg-schoolgate-green/90" : "border-slate-200"
          }`}
        >
          <Link to={action.url}>
            <action.icon className={`h-5 w-5 ${action.variant === "default" ? "text-white" : "text-schoolgate-green"}`} />
            <span className="text-xs font-semibold">{action.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}