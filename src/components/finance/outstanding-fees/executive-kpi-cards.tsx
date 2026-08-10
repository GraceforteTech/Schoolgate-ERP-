import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  Users, 
  DollarSign, 
  Percent, 
  Clock, 
  TrendingUp,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getFeeSummaryStats } from "@/lib/fee-summary.functions";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  onClick?: () => void;
  className?: string;
  loading?: boolean;
}

const KPICard = ({ title, value, subtitle, icon: Icon, trend, trendType = 'neutral', onClick, className, loading }: KPICardProps) => (
  <Card 
    onClick={onClick}
    className={cn(
      "p-5 flex flex-col gap-3 transition-all duration-200 border-none bg-white rounded-[14px] shadow-sm",
      onClick && "cursor-pointer hover:-translate-y-1 hover:shadow-lg",
      className
    )}
  >
    <div className="flex items-center justify-between">
      <div className="p-2.5 rounded-xl bg-schoolgate-green-light/50 text-schoolgate-green">
        <Icon size={20} />
      </div>
      {trend && !loading && (
        <span className={cn(
          "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tight",
          trendType === 'positive' ? "bg-emerald-50 text-emerald-600" : 
          trendType === 'negative' ? "bg-rose-50 text-rose-600" : 
          "bg-slate-50 text-slate-600"
        )}>
          {trend}
        </span>
      )}
    </div>
    <div>
      {loading ? (
        <Skeleton className="h-8 w-24 mb-1" />
      ) : (
        <p className="text-2xl font-black text-slate-900 tracking-tight">{value}</p>
      )}
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{title}</p>
      {subtitle && <p className="text-[10px] text-slate-400 mt-1 font-medium">{subtitle}</p>}
    </div>
  </Card>
);

export function ExecutiveKPICards({ filters }: { filters?: any }) {
  const fetchStats = useServerFn(getFeeSummaryStats);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['fee-summary-stats', filters],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return null;
      
      return fetchStats({ 
        data: { 
          tenantId: membership.tenant_id,
          academicSession: filters?.session,
          term: filters?.term,
          classId: filters?.classId
        } 
      });
    }
  });

  const formatNaira = (val: number) => `₦${(val || 0).toLocaleString()}`;

  const kpis = [
    { title: "Total Billed", value: formatNaira(stats?.totalFeesBilled || 0), icon: DollarSign, trend: "Revenue Source" },
    { title: "Total Collected", value: formatNaira(stats?.totalCollected || 0), icon: CheckCircle2, trend: "Actual Income", trendType: 'positive' as const },
    { title: "Total Outstanding", value: formatNaira(stats?.totalOutstanding || 0), icon: AlertCircle, trend: "Awaiting", trendType: 'negative' as const },
    { title: "Payment Rate", value: `${(stats?.paymentRate || 0).toFixed(1)}%`, icon: Percent, trend: "Efficiency" },
    { title: "Pending Approvals", value: formatNaira(stats?.pendingPaymentsValue || 0), icon: Clock, trend: "In Pipeline" },
    { title: "Paid Students", value: stats?.paidStudents || 0, icon: Users, subtitle: "Full payment", trend: "Success" },
    { title: "Partially Paid", value: stats?.partiallyPaidStudents || 0, icon: Users, subtitle: "Balance remaining", trend: "Follow-up" },
    { title: "Unpaid Students", value: stats?.unpaidStudents || 0, icon: Users, subtitle: "No payment yet", trend: "Critical", trendType: 'negative' as const },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} loading={isLoading} />
      ))}
    </div>
  );
}

