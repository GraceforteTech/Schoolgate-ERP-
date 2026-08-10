import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getSchoolFinancialSummary } from "@/lib/expenses.functions";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SummaryCard } from "@/components/ui/summary-card";

export function ExecutiveKPIs() {
  const fetchSummary = useServerFn(getSchoolFinancialSummary);
  
  const { data: summary, isLoading } = useQuery({
    queryKey: ['school-financial-summary'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data: profile } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!profile) throw new Error("Tenant not found");
      return fetchSummary({ data: { tenantId: profile.tenant_id } });
    }
  });

  const netPosition = (summary?.totalRevenue || 0) - (summary?.totalExpenses || 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Total Revenue"
        value={`₦${summary?.totalRevenue.toLocaleString() || '0'}`}
        icon={<TrendingUp size={20} />}
        isLoading={isLoading}
        description="Term-to-date income"
        trend={{ value: 12, isPositive: true }}
      />
      <SummaryCard
        title="Total Expenses"
        value={`₦${summary?.totalExpenses.toLocaleString() || '0'}`}
        icon={<TrendingDown size={20} />}
        isLoading={isLoading}
        description="Operating expenditures"
        trend={{ value: 5, isPositive: false }}
      />
      <SummaryCard
        title="Net Position"
        value={`₦${netPosition.toLocaleString()}`}
        icon={<DollarSign size={20} />}
        isLoading={isLoading}
        description="Current school surplus"
      />
      <SummaryCard
        title="Pending Approvals"
        value="₦0"
        icon={<Wallet size={20} />}
        isLoading={isLoading}
        description="Finance requests in queue"
      />
    </div>
  );
}
