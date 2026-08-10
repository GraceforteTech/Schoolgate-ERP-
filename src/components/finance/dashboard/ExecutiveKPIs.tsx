import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getSchoolFinancialSummary } from "@/lib/expenses.functions";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function ExecutiveKPIs() {
  const fetchSummary = useServerFn(getSchoolFinancialSummary);
  
  const { data: summary, isLoading } = useQuery({
    queryKey: ['school-financial-summary'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase.from('memberships').select('tenant_id').eq('user_id', user?.id).single();
      if (!profile) throw new Error("Tenant not found");
      return fetchSummary({ data: { tenantId: profile.tenant_id } });
    }
  });

  const kpis = [
    { label: "Total Revenue", value: `₦${summary?.totalRevenue.toLocaleString() || '0'}`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Expenses", value: `₦${summary?.totalExpenses.toLocaleString() || '0'}`, icon: TrendingDown, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Net Position", value: `₦${((summary?.totalRevenue || 0) - (summary?.totalExpenses || 0)).toLocaleString()}`, icon: DollarSign, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Approvals", value: "₦0", icon: Wallet, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">{[1,2,3,4].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl"></div>)}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="p-6 rounded-2xl border-none shadow-sm bg-white hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{kpi.value}</h3>
            </div>
            <div className={`p-2 rounded-xl ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={20} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
