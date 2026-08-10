import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  TrendingDown,
  Scale,
  Briefcase,
  PieChart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getSchoolFinancialSummary } from "@/lib/expenses.functions";
import { supabase } from "@/integrations/supabase/client";

export function FinancialVisibilityReport() {
  const fetchSummary = useServerFn(getSchoolFinancialSummary);
  
  const { data: summary, isLoading } = useQuery({
    queryKey: ['financial-summary-detailed'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data: profile } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!profile) throw new Error("Tenant not found");
      return fetchSummary({ data: { tenantId: profile.tenant_id } });
    }
  });

  const financialMetrics = [
    { label: "Gross Revenue", value: `₦${(summary?.totalRevenue || 0).toLocaleString()}`, change: "+12%", type: "income" },
    { label: "Operating Expenses", value: `₦${(summary?.totalExpenses || 0).toLocaleString()}`, change: "-4%", type: "expense" },
    { label: "Net Margin", value: `₦${((summary?.totalRevenue || 0) - (summary?.totalExpenses || 0)).toLocaleString()}`, change: "+15%", type: "profit" },
    { label: "Efficiency Score", value: "92%", change: "+2%", type: "profit" },
  ];

  const categories = summary?.expenseBreakdown || [];
  const PLData = [
    { category: "Tuition Revenue", current: `₦${(summary?.totalRevenue || 0).toLocaleString()}`, previous: "₦0", variance: "+100%" },
    ...categories.map((e: any) => ({
      category: e.category,
      current: `(₦${e.amount.toLocaleString()})`,
      previous: "₦0",
      variance: "N/A"
    }))
  ];

  if (isLoading) return <div className="h-[400px] bg-slate-50 animate-pulse rounded-[14px]" />;

  return (
    <Card className="border-none shadow-sm rounded-[14px] overflow-hidden bg-white">
      <CardHeader className="border-b border-slate-50 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Institutional Financial Visibility</CardTitle>
            <p className="text-slate-500 text-sm mt-1">Comprehensive breakdown of income, expenditure, and institutional profitability.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
            <Scale size={18} className="text-blue-600" />
            <span className="text-sm font-bold text-blue-700 font-mono">Real-time Visibility: ON</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {financialMetrics.map((metric, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-schoolgate-green/20 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{metric.label}</p>
                <div className={cn(
                  "p-1.5 rounded-lg",
                  metric.type === 'income' || metric.type === 'profit' ? "bg-emerald-50" : "bg-rose-50"
                )}>
                  {metric.change.startsWith('+') ? 
                    <ArrowUpRight size={14} className={metric.type === 'income' || metric.type === 'profit' ? "text-emerald-600" : "text-rose-600"} /> : 
                    <ArrowDownRight size={14} className={metric.type === 'income' || metric.type === 'profit' ? "text-emerald-600" : "text-rose-600"} />
                  }
                </div>
              </div>
              <h4 className="text-2xl font-black text-slate-900">{metric.value}</h4>
              <p className={cn(
                "text-[10px] font-bold mt-1",
                metric.change.startsWith('+') && (metric.type === 'income' || metric.type === 'profit') ? "text-emerald-600" : 
                metric.change.startsWith('-') && metric.type === 'expense' ? "text-emerald-600" : "text-rose-600"
              )}>
                {metric.change} vs Previous Term
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Briefcase size={20} className="text-schoolgate-green" />
                Statement of Profit or Loss (Summary)
              </h3>
              <span className="text-xs font-bold text-slate-400">TERM 2, 2024</span>
            </div>
            
            <div className="rounded-2xl border border-slate-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Revenue/Expense Category</TableHead>
                    <TableHead className="text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest">Current (₦)</TableHead>
                    <TableHead className="text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest">Previous (₦)</TableHead>
                    <TableHead className="text-right font-bold text-slate-500 uppercase text-[10px] tracking-widest">Variance (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PLData.map((row, i) => (
                    <TableRow key={i} className="border-slate-50 hover:bg-slate-50/30">
                      <TableCell className="font-medium text-slate-700">{row.category}</TableCell>
                      <TableCell className={cn(
                        "text-right font-bold",
                        row.current.includes('(') ? "text-rose-600" : "text-slate-900"
                      )}>
                        {row.current}
                      </TableCell>
                      <TableCell className="text-right font-medium text-slate-500">{row.previous}</TableCell>
                      <TableCell className={cn(
                        "text-right font-bold text-xs",
                        row.variance.startsWith('+') ? "text-emerald-600" : "text-rose-600"
                      )}>
                        {row.variance}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-slate-50/50 border-none">
                    <TableCell className="font-black text-slate-900">Total Net Operating Income</TableCell>
                    <TableCell className="text-right font-black text-emerald-600">
                      ₦{((summary?.totalRevenue || 0) - (summary?.totalExpenses || 0)).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-bold text-slate-400">₦0</TableCell>
                    <TableCell className="text-right font-black text-emerald-600 text-xs">+100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <PieChart size={20} className="text-indigo-500" />
              Allocation Strategy
            </h3>
            <div className="p-6 rounded-2xl bg-indigo-50/30 border border-indigo-100 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-indigo-600">
                  <span>Payroll Burden</span>
                  <span>0%</span>
                </div>
                <div className="h-2 w-full bg-indigo-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '0%' }} />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Optimal range: 35-45%</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-emerald-600">
                  <span>Profit Margin</span>
                  <span>{Math.round(((summary?.totalRevenue || 0) - (summary?.totalExpenses || 0)) / (summary?.totalRevenue || 1) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.round(((summary?.totalRevenue || 0) - (summary?.totalExpenses || 0)) / (summary?.totalRevenue || 1) * 100)}%` }} />
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Industry Benchmark: 25%</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <TrendingUp size={18} className="text-schoolgate-green" />
                </div>
                <h4 className="font-bold">Financial Verdict</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Instituion is currently <span className="text-emerald-400 font-bold">Highly Liquid</span>. 
                Collection efficiency is strong. Recommend allocating profit to the Schoolgate Wealth Scheme.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
