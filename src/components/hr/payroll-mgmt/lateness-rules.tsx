import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { 
  Clock, 
  Settings2, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Gavel,
  ShieldCheck
} from "lucide-react";

export function LatenessRules() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-900 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Gavel className="h-6 w-6 text-schoolgate-green" />
                    Automated Lateness Policy
                  </CardTitle>
                  <CardDescription className="text-slate-400">Configure how the system automatically penalizes lateness registered via biometrics.</CardDescription>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-schoolgate-green" />
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Rule 1: Thresholds */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="h-4 w-4 text-schoolgate-green" /> Time Thresholds
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Official Resumption Time</label>
                    <Input type="time" defaultValue="08:00" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Grace Period (Minutes)</label>
                    <Input type="number" defaultValue="15" className="rounded-xl border-slate-200" />
                  </div>
                </div>
              </div>

              {/* Rule 2: Deductions */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" /> Deduction Formula
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Penalty Type</label>
                    <select className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:ring-1 focus:ring-schoolgate-green focus:outline-none">
                      <option>Fixed Amount (Flat Fee)</option>
                      <option>Percentage of Basic Salary</option>
                      <option>Percentage of Total Gross</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500">Amount per Lateness Incident (₦)</label>
                    <Input type="number" defaultValue="500" className="rounded-xl border-slate-200" />
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0" />
                  <p className="text-xs text-orange-700 font-medium leading-relaxed">
                    Example: A staff arriving at 08:31 AM (beyond 15m grace) will be penalized ₦500. Deductions will be automatically applied to the next payroll cycle.
                  </p>
                </div>
              </div>

              {/* Rule 3: Progressive Lateness */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-500" /> Progressive Penalties
                  </h4>
                  <Switch />
                </div>
                <p className="text-xs text-slate-500">Increase deduction for every additional 30 minutes of lateness.</p>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-xl px-8 font-bold">
                  Update Policy Rules
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm bg-white p-6">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-6">Recent Automated Actions</h4>
            <div className="space-y-6">
              {[
                { staff: "Adewale Joseph", late: "24 mins", deduction: "₦500", date: "Today" },
                { staff: "Sarah Ahmed", late: "18 mins", deduction: "₦500", date: "Today" },
                { staff: "Chidi Okafor", late: "42 mins", deduction: "₦1,000", date: "Yesterday" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-bold text-slate-400 text-xs">
                      {item.staff.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-schoolgate-green transition-colors">{item.staff}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.late} late • {item.date}</p>
                    </div>
                  </div>
                  <Badge className="bg-rose-50 text-rose-700 border-none font-black text-xs">-{item.deduction}</Badge>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-schoolgate-green font-bold text-xs uppercase tracking-widest hover:bg-emerald-50">
              View Detailed Log
            </Button>
          </Card>

          <Card className="rounded-[14px] border-none shadow-sm bg-slate-900 text-white p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={100} />
            </div>
            <h4 className="text-lg font-black mb-2 relative z-10">Automatic Enforcement</h4>
            <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6 relative z-10">
              Once enabled, the system monitors biometric logs every 5 minutes and marks deductions. No manual entry required from HR.
            </p>
            <div className="flex items-center gap-2 text-schoolgate-green font-bold text-xs uppercase tracking-tighter relative z-10">
              <CheckCircle2 size={14} /> System Health: Operational
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
