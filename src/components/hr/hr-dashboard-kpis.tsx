import React from "react";
import { 
  Users, 
  Wallet, 
  CalendarCheck, 
  Clock, 
  TrendingUp, 
  Award,
  ArrowUpRight,
  UserCheck,
  UserX,
  Briefcase,
  FileText,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const hrKPIs = [
  {
    title: "Total Staff",
    value: "142",
    change: "+4 this month",
    icon: Users,
    trend: "up",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Monthly Payroll",
    value: "₦18.4M",
    change: "Next: Aug 25",
    icon: Wallet,
    trend: "stable",
    color: "text-schoolgate-green",
    bg: "bg-schoolgate-green-light",
  },
  {
    title: "Attendance Rate",
    value: "94.2%",
    change: "Today",
    icon: CalendarCheck,
    trend: "up",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    title: "Pending Leave",
    value: "12",
    change: "Requires action",
    icon: Clock,
    trend: "neutral",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    title: "Avg Performance",
    value: "4.8/5",
    change: "+0.2 from Q1",
    icon: Award,
    trend: "up",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    title: "Wealth Scheme",
    value: "₦42.1M",
    change: "Total Pool",
    icon: TrendingUp,
    trend: "up",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Active Loans",
    value: "28",
    change: "₦4.2M Outstanding",
    icon: Briefcase,
    trend: "neutral",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    title: "Onboarding",
    value: "5",
    change: "Joining next week",
    icon: UserCheck,
    trend: "up",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    title: "Resignations",
    value: "1",
    change: "Exit interview pending",
    icon: UserX,
    trend: "down",
    color: "text-slate-600",
    bg: "bg-slate-100",
  },
  {
    title: "Compliance Score",
    value: "98%",
    change: "Statutory updates",
    icon: AlertCircle,
    trend: "up",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
];

export const HRDashboardKPIs = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {hrKPIs.map((kpi, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer border-none shadow-sm rounded-[14px]"
        >
          <div className="flex flex-col gap-3">
            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", kpi.bg)}>
              <kpi.icon className={cn("h-5 w-5", kpi.color)} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {kpi.title}
              </p>
              <div className="mt-1 flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-foreground">{kpi.value}</h3>
                <div className="flex items-center text-[10px] font-medium text-schoolgate-green">
                  <ArrowUpRight className="h-3 w-3" />
                </div>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                {kpi.change}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-schoolgate-green transition-all duration-300 group-hover:w-full" />
        </Card>
      ))}
    </div>
  );
};
