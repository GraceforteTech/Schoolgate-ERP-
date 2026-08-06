import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  School,
  PieChart,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    isUp: boolean;
  };
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  onClick?: () => void;
}

const KPICard = ({ title, value, subtitle, trend, icon: Icon, iconBg, iconColor, onClick }: KPICardProps) => (
  <Card 
    className="border-none shadow-sm rounded-[14px] hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1"
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-xl", iconBg)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center text-xs font-bold px-2 py-1 rounded-full",
            trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trend.isUp ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
            {trend.value}
          </div>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-black text-slate-900">{value}</h3>
        {subtitle && <p className="text-slate-400 text-xs mt-1">{subtitle}</p>}
      </div>
    </CardContent>
  </Card>
);

export function ExecutiveKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {/* Revenue Section */}
      <KPICard 
        title="Total Expected Revenue"
        value="₦45,250,000"
        subtitle="Current Session"
        icon={TrendingUp}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />
      <KPICard 
        title="Total Revenue Collected"
        value="₦32,180,500"
        trend={{ value: "12.5%", isUp: true }}
        icon={CreditCard}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <KPICard 
        title="Outstanding Revenue"
        value="₦13,069,500"
        trend={{ value: "5.2%", isUp: false }}
        icon={Wallet}
        iconBg="bg-rose-50"
        iconColor="text-rose-600"
      />

      {/* Collection Rates */}
      <KPICard 
        title="Overall Collection Rate"
        value="71.1%"
        subtitle="Goal: 95%"
        icon={PieChart}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
      />
      <KPICard 
        title="Net Cash Position"
        value="₦28,450,200"
        icon={BarChart3}
        iconBg="bg-schoolgate-green-light"
        iconColor="text-schoolgate-green"
      />

      {/* School Specific */}
      <KPICard 
        title="Primary Expected"
        value="₦18,500,000"
        icon={School}
        iconBg="bg-indigo-50"
        iconColor="text-indigo-600"
      />
      <KPICard 
        title="Secondary Expected"
        value="₦26,750,000"
        icon={School}
        iconBg="bg-purple-50"
        iconColor="text-purple-600"
      />
      
      {/* Expenses */}
      <KPICard 
        title="Total Expenses"
        value="₦3,730,300"
        trend={{ value: "8.4%", isUp: true }}
        icon={TrendingDown}
        iconBg="bg-slate-50"
        iconColor="text-slate-600"
      />
      
      <KPICard 
        title="Primary Collection"
        value="68.4%"
        icon={Users}
        iconBg="bg-cyan-50"
        iconColor="text-cyan-600"
      />
      <KPICard 
        title="Secondary Collection"
        value="73.2%"
        icon={Users}
        iconBg="bg-violet-50"
        iconColor="text-violet-600"
      />
    </div>
  );
}
