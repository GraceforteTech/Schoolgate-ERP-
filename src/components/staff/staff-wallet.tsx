import { Card } from "@/components/ui/card";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  History,
  Info,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function StaffWallet() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Wallet Balance */}
        <Card className="lg:col-span-2 p-8 rounded-[20px] bg-gradient-to-br from-schoolgate-green to-emerald-800 text-white border-none shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Wallet size={160} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/20 backdrop-blur-md">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-bold uppercase tracking-[2px] text-emerald-100">Staff Wallet Balance</span>
              </div>
              <Badge className="bg-emerald-400/20 text-emerald-100 border-emerald-400/30 font-bold px-3 py-1">
                July 2024 Released
              </Badge>
            </div>

            <div className="mb-10">
              <h2 className="text-5xl font-black tracking-tighter mb-2">₦485,250.00</h2>
              <div className="flex items-center gap-2 text-emerald-200">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-bold">+₦45,000 Bonus included</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-schoolgate-green hover:bg-emerald-50 font-black px-8 py-6 rounded-xl shadow-xl transition-all hover:-translate-y-1">
                Withdraw to Bank
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 font-black px-8 py-6 rounded-xl backdrop-blur-sm">
                View Ledger
              </Button>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Deductions</span>
            </div>
            <h3 className="text-2xl font-black text-slate-800">₦62,400.00</h3>
            <p className="text-xs text-slate-500 font-bold mt-1">Tax, Pension & Loans</p>
          </Card>

          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Gross Earnings</span>
            </div>
            <h3 className="text-2xl font-black text-slate-800">₦547,650.00</h3>
            <p className="text-xs text-slate-500 font-bold mt-1">Base + Allowances</p>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Salary Breakdown */}
        <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Info className="w-5 h-5 text-schoolgate-green" /> Salary Breakdown
            </h3>
            <Badge variant="outline" className="border-slate-200 text-slate-400 font-bold">Current Cycle</Badge>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500">Basic Salary</span>
                <span className="text-slate-800">₦350,000.00</span>
              </div>
              <Progress value={100} className="h-2 bg-slate-100" indicatorClassName="bg-schoolgate-green" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500">Housing & Transport</span>
                <span className="text-slate-800">₦120,000.00</span>
              </div>
              <Progress value={100} className="h-2 bg-slate-100" indicatorClassName="bg-blue-500" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-500">Deductions (Pension/Tax)</span>
                <span className="text-rose-500">-₦62,400.00</span>
              </div>
              <Progress value={15} className="h-2 bg-slate-100" indicatorClassName="bg-rose-500" />
            </div>
          </div>
        </Card>

        {/* Transaction History */}
        <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <History className="w-5 h-5 text-schoolgate-green" /> Recent Activities
            </h3>
            <Button variant="ghost" className="text-schoolgate-green font-bold text-xs hover:bg-emerald-50">View All</Button>
          </div>

          <div className="space-y-5">
            {[
              { label: "Salary Payment - July 2024", date: "July 28, 2024", amount: "+₦485,250.00", status: "Released", icon: CheckCircle2, color: "text-emerald-500" },
              { label: "Wealth Fund Contribution", date: "July 28, 2024", amount: "-₦25,000.00", status: "Automated", icon: Clock, color: "text-blue-500" },
              { label: "Loan Repayment (Installment 3)", date: "July 28, 2024", amount: "-₦15,000.00", status: "Automated", icon: Clock, color: "text-rose-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-100 hover:border-slate-200 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-50 ${item.color}`}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{item.label}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black ${item.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {item.amount}
                  </p>
                  <p className="text-[9px] font-black uppercase text-slate-300 tracking-tighter">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}