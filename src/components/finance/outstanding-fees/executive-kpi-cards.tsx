import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  Percent, 
  Clock, 
  TrendingUp,
  School,
  GraduationCap,
  CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  onClick?: () => void;
  className?: string;
}

const KPICard = ({ title, value, subtitle, icon: Icon, trend, trendType = 'neutral', onClick, className }: KPICardProps) => (
  <Card 
    onClick={onClick}
    className={cn(
      "p-5 flex flex-col gap-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border-none bg-white rounded-[14px]",
      className
    )}
  >
    <div className="flex items-center justify-between">
      <div className="p-2.5 rounded-xl bg-schoolgate-green-light/50 text-schoolgate-green">
        <Icon size={20} />
      </div>
      {trend && (
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          trendType === 'positive' ? "bg-green-100 text-green-700" : 
          trendType === 'negative' ? "bg-red-100 text-red-700" : 
          "bg-gray-100 text-gray-700"
        )}>
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm font-medium text-slate-500 mt-0.5">{title}</p>
      {subtitle && <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">{subtitle}</p>}
    </div>
  </Card>
);

export function ExecutiveKPICards() {
  const kpis: KPICardProps[] = [
    { title: "Total Outstanding", value: "₦145.2M", subtitle: "All Schools", icon: DollarSign, trend: "+5.2%", trendType: 'negative' },
    { title: "Primary Outstanding", value: "₦62.8M", subtitle: "Primary Section", icon: School, trend: "-2.1%", trendType: 'positive' },
    { title: "Secondary Outstanding", value: "₦82.4M", subtitle: "Secondary Section", icon: GraduationCap, trend: "+8.4%", trendType: 'negative' },
    { title: "Total Students Owing", value: "1,240", subtitle: "42% of Population", icon: Users, trend: "+12", trendType: 'negative' },
    { title: "Primary Students Owing", value: "542", subtitle: "Junior School", icon: Users, trend: "-4", trendType: 'positive' },
    { title: "Secondary Students Owing", value: "698", subtitle: "Senior School", icon: Users, trend: "+16", trendType: 'negative' },
    { title: "Collection Rate", value: "58.4%", subtitle: "Current Session", icon: Percent, trend: "+2.5%", trendType: 'positive' },
    { title: "Avg. Outstanding", value: "₦117k", subtitle: "Per Student", icon: TrendingUp, trend: "+₦12k", trendType: 'negative' },
    { title: "Longest Debt", value: "482 Days", subtitle: "Archive Record", icon: Clock, trend: "Overdue", trendType: 'negative' },
    { title: "Today's Recovery", value: "₦4.8M", subtitle: "Active Recovery", icon: CalendarDays, trend: "Target: ₦10M", trendType: 'neutral' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
}
