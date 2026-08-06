import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, DollarSign, Wallet } from "lucide-react";

export function ProprietorDashboard() {
  const stats = [
    { label: "Payroll vs Revenue", val: "32%", trend: "healthy", icon: DollarSign },
    { label: "Pension Liability", val: "₦2.4M", trend: "warning", icon: AlertCircle },
    { label: "Loan Recovery (Mth)", val: "₦310K", trend: "up", icon: TrendingUp },
    { label: "Staff Cost %", val: "45%", trend: "neutral", icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i} className="p-6 rounded-[14px] border-slate-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg"><s.icon className="h-5 w-5 text-slate-400" /></div>
              <Badge variant={s.trend === "healthy" ? "outline" : s.trend === "warning" ? "destructive" : "secondary"}>
                {s.trend.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs font-medium text-slate-500 mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-slate-800">{s.val}</p>
          </Card>
        ))}
      </div>

      <Card className="p-8 border-emerald-100 bg-emerald-50/30 rounded-[14px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-900">Financial Sustainability: HIGH</h3>
              <p className="text-emerald-700 max-w-md">Your current payroll obligations are well within safe thresholds relative to projected monthly revenue.</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-2">Sustainable Payroll Limit</p>
            <p className="text-3xl font-bold text-emerald-800">₦18.5M</p>
            <p className="text-xs text-emerald-600 mt-1 italic">based on current enrollment</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4">Highest Paid Departments</h4>
          <div className="space-y-4">
            {[
              { dept: "Secondary Science", count: 12, cost: "₦2.8M" },
              { dept: "Administrative", count: 8, cost: "₦2.1M" },
              { dept: "Primary English", count: 10, cost: "₦1.9M" },
            ].map((d, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-bold text-sm text-slate-800">{d.dept}</p>
                  <p className="text-xs text-slate-500">{d.count} Staff Members</p>
                </div>
                <p className="font-bold text-slate-800">{d.cost}</p>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm flex flex-col justify-center items-center text-center">
          <TrendingUp className="h-12 w-12 text-emerald-500 mb-4" />
          <h4 className="font-bold text-slate-800 mb-2 text-lg">Payroll Growth Trend</h4>
          <p className="text-sm text-slate-500 max-w-xs mb-6">Staff costs have increased by 4.2% over the last quarter due to new faculty hiring.</p>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[65%]" />
          </div>
          <div className="flex justify-between w-full mt-2 text-[10px] font-bold text-slate-400">
            <span>PREVIOUS QTR</span>
            <span>CURRENT QTR</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
