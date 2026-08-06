import React from "react";
import { 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX, 
  Calendar, 
  Clock, 
  Briefcase, 
  GraduationCap,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const employeeKPIs = [
  { title: "Total Employees", value: "142", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Teaching Staff", value: "85", icon: GraduationCap, color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
  { title: "Non-Teaching", value: "57", icon: Briefcase, color: "text-orange-600", bg: "bg-orange-50" },
  { title: "Active Staff", value: "138", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "New Employees", value: "4", icon: UserPlus, color: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "Staff on Leave", value: "3", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
  { title: "Probation Staff", value: "12", icon: ShieldCheck, color: "text-yellow-600", bg: "bg-yellow-50" },
  { title: "Retired Staff", value: "8", icon: Calendar, color: "text-slate-600", bg: "bg-slate-100" },
  { title: "Resigned Staff", value: "2", icon: UserX, color: "text-red-600", bg: "bg-red-50" },
  { title: "Contract Staff", value: "15", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
];

export const EmployeeKPIs = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
      {employeeKPIs.map((kpi, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer border-none shadow-sm rounded-[14px] bg-white"
        >
          <div className="flex flex-col gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl transition-colors group-hover:bg-opacity-80", kpi.bg)}>
              <kpi.icon className={cn("h-5 w-5", kpi.color)} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate">
                {kpi.title}
              </p>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">{kpi.value}</h3>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-schoolgate-green transition-all duration-300 group-hover:w-full" />
        </Card>
      ))}
    </div>
  );
};
