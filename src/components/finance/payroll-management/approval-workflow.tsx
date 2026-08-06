import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Undo2, Printer, Clock } from "lucide-react";

const timeline = [
  { user: "Accountant A.", action: "Generated Payroll", date: "Aug 06, 2026", time: "09:30 AM", remarks: "Standard monthly payroll." },
  { user: "Principal B.", action: "Reviewed", date: "Aug 06, 2026", time: "11:15 AM", remarks: "Verified all bonuses." },
];

export function PayrollApprovalWorkflow() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 p-6 rounded-[14px] border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          Approval Timeline
        </h3>
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-4 relative">
              <div className="z-10 bg-emerald-100 p-2 rounded-full h-fit border-2 border-white shadow-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              {i < timeline.length - 1 && <div className="absolute left-[18px] top-10 w-0.5 h-full bg-slate-100" />}
              <div className="flex-1 pb-6">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800">{item.action}</h4>
                  <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" /> {item.date} {item.time}</span>
                </div>
                <p className="text-sm text-slate-500 mb-2">by {item.user}</p>
                <div className="bg-slate-50 p-3 rounded-lg text-xs italic text-slate-600 border border-slate-100">
                  "{item.remarks}"
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-4">
            <div className="z-10 bg-amber-100 p-2 rounded-full h-fit border-2 border-white shadow-sm">
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-amber-600 mb-2 italic">Awaiting Proprietor Approval...</h4>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="space-y-4">
        <Card className="p-6 bg-slate-50 border-slate-100 rounded-[14px] shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-wider">Review Actions</h4>
          <div className="grid grid-cols-1 gap-3">
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full font-bold h-12">
              <CheckCircle2 className="mr-2 h-5 w-5" /> APPROVE PAYROLL
            </Button>
            <Button variant="outline" className="w-full text-rose-600 hover:bg-rose-50 border-rose-100 h-12">
              <XCircle className="mr-2 h-5 w-5" /> REJECT
            </Button>
            <Button variant="outline" className="w-full text-amber-600 hover:bg-amber-50 border-amber-100 h-12">
              <Undo2 className="mr-2 h-5 w-5" /> RETURN FOR CORRECTION
            </Button>
          </div>
        </Card>
        <Button variant="ghost" className="w-full text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
          <Printer className="mr-2 h-4 w-4" /> Print Approval Report
        </Button>
      </div>
    </div>
  );
}
