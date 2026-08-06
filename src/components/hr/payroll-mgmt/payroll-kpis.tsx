import React from "react";
import { 
  Users, 
  Banknote, 
  CreditCard, 
  PieChart, 
  TrendingDown, 
  Wallet,
  CalendarCheck,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const payrollKPIs = [
  { title: "Total Employees", value: "142", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Gross Payroll", value: "₦22.5M", icon: Banknote, color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
  { title: "Net Payroll", value: "₦18.4M", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "PAYE Deductions", value: "₦2.8M", icon: PieChart, color: "text-orange-600", bg: "bg-orange-50" },
  { title: "Pension Pool", value: "₦1.2M", icon: CreditCard, color: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "NHF Contribution", value: "₦450k", icon: ShieldCheck, color: "text-teal-600", bg: "bg-teal-50" },
  { title: "Salary Advances", value: "₦1.8M", icon: TrendingDown, color: "text-red-600", bg: "bg-red-50" },
  { title: "Loan Deductions", value: "₦850k", icon: AlertCircle, color: "text-purple-600", bg: "bg-purple-50" },
  { title: "Payroll Processed", value: "128", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
  { title: "Pending Payroll", value: "14", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
];

export const PayrollKPIs = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {payrollKPIs.map((kpi, index) => (
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

// Helper for shield icon which I forgot to import or might not exist exactly in this name
const ShieldCheck = (props: any) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
