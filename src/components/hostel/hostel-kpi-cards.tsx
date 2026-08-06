import React from "react";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  Users, 
  Bed, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Building2,
  Calendar,
  Tool,
  Info
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const kpis = [
  {
    label: "Total Capacity",
    value: "850",
    subtext: "Total Beds Available",
    icon: Home,
    color: "text-blue-600",
    bg: "bg-blue-50",
    trend: "+20 new beds",
    tooltip: "Maximum number of students the hostels can accommodate."
  },
  {
    label: "Current Occupancy",
    value: "742",
    subtext: "87.3% Occupied",
    icon: Users,
    color: "text-schoolgate-green",
    bg: "bg-schoolgate-green-light",
    trend: "+5 this week",
    tooltip: "Number of students currently allocated to rooms."
  },
  {
    label: "Available Beds",
    value: "108",
    subtext: "Ready for Allocation",
    icon: Bed,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    trend: "12 pending",
    tooltip: "Vacant beds that can be assigned to new boarders."
  },
  {
    label: "Active Hostels",
    value: "8",
    subtext: "4 Boys, 4 Girls",
    icon: Building2,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    trend: "All operational",
    tooltip: "Total number of functional hostel buildings."
  },
  {
    label: "Maintenance Alerts",
    value: "14",
    subtext: "3 Urgent Requests",
    icon: AlertTriangle,
    color: "text-rose-600",
    bg: "bg-rose-50",
    trend: "+2 today",
    tooltip: "Open maintenance issues requiring attention."
  },
  {
    label: "Boarding Revenue",
    value: "₦18.4M",
    subtext: "Current Session",
    icon: DollarSign,
    color: "text-amber-600",
    bg: "bg-amber-50",
    trend: "92% Collected",
    tooltip: "Total revenue generated from boarding fees."
  },
  {
    label: "Exits & Passes",
    value: "42",
    subtext: "Approved Today",
    icon: Clock,
    color: "text-violet-600",
    bg: "bg-violet-50",
    trend: "15 pending",
    tooltip: "Active or pending weekend/holiday passes."
  },
  {
    label: "Inventory Value",
    value: "₦4.2M",
    subtext: "Hostel Assets",
    icon: CheckCircle2,
    color: "text-teal-600",
    bg: "bg-teal-50",
    trend: "Audited 2d ago",
    tooltip: "Estimated value of beds, mattresses, and furniture."
  }
];

export function HostelKpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TooltipProvider>
        {kpis.map((kpi, i) => (
          <Card key={i} className="p-5 border-none shadow-sm rounded-[14px] bg-white hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex items-start justify-between relative z-10">
              <div className={`h-12 w-12 rounded-2xl ${kpi.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-slate-300 hover:text-slate-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-slate-900 text-white text-[10px] border-none px-3 py-1.5 rounded-lg max-w-[200px]">
                  {kpi.tooltip}
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="mt-4 relative z-10">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
                <span className="text-[10px] font-bold text-emerald-600">{kpi.trend}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">{kpi.subtext}</p>
            </div>

            {/* Decorative background element */}
            <div className={`absolute -right-4 -bottom-4 h-24 w-24 ${kpi.bg} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`} />
          </Card>
        ))}
      </TooltipProvider>
    </div>
  );
}