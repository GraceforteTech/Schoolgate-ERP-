import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Banknote,
  DollarSign,
  Calendar,
  Clock,
  LayoutDashboard
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: string;
  trendLabel?: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive';
}

function StatCard({ title, value, icon: Icon, trend, trendLabel, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'bg-schoolgate-green-light text-schoolgate-green',
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    destructive: 'bg-rose-50 text-rose-600',
  };

  return (
    <Card className="rounded-[14px] border-none shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group animate-in fade-in slide-in-from-bottom-2">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300", variantStyles[variant])}>
            <Icon size={22} strokeWidth={2.5} />
          </div>
          {trend && (
            <div className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
              trend.startsWith('+') ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
            )}>
              {trend} {trendLabel}
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">{title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ExecutiveKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard 
        title="Today's Expenses" 
        value="₦45,200" 
        icon={Clock} 
        trend="+12%" 
        trendLabel="vs yest"
      />
      <StatCard 
        title="This Week's" 
        value="₦285,000" 
        icon={Calendar} 
      />
      <StatCard 
        title="This Month's" 
        value="₦1,250,000" 
        icon={Banknote} 
        variant="success"
      />
      <StatCard 
        title="Budget Utilized" 
        value="65.4%" 
        icon={TrendingUp} 
        variant="warning"
      />
      <StatCard 
        title="Pending Approvals" 
        value="12" 
        icon={AlertCircle} 
        variant="warning"
      />
      <StatCard 
        title="Approved" 
        value="48" 
        icon={CheckCircle2} 
        variant="success"
      />
      <StatCard 
        title="Rejected" 
        value="3" 
        icon={XCircle} 
        variant="destructive"
      />
      <StatCard 
        title="Budget Remaining" 
        value="₦840,000" 
        icon={DollarSign} 
        variant="success"
      />
      <StatCard 
        title="Avg. Daily Exp." 
        value="₦32,400" 
        icon={LayoutDashboard} 
      />
      <StatCard 
        title="This Session's" 
        value="₦8,450,000" 
        icon={Banknote} 
      />
    </div>
  );
}
