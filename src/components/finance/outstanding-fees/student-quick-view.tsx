import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Printer, 
  Download, 
  Eye, 
  DollarSign, 
  Calendar, 
  User
} from "lucide-react";

interface QuickViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: any;
}

export function StudentQuickView({ open, onOpenChange, student }: QuickViewProps) {
  if (!student) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md border-none p-0 bg-slate-50">
        <SheetHeader className="p-6 bg-white border-b border-slate-100">
          <SheetTitle className="text-xl font-bold text-slate-900">Student Account Preview</SheetTitle>
        </SheetHeader>
        
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
          {/* Profile Header */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden">
              <User size={32} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">{student.name}</h4>
              <p className="text-sm text-slate-500">{student.admNo} • {student.class}</p>
            </div>
          </div>

          {/* Enhanced Payment Breakdown */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Payment Breakdown</h5>
            <div className="space-y-3">
              <BreakdownRow label="Current School Fees" value={student.charges} />
              <BreakdownRow label="Balance Brought Forward (B/F)" value={student.prevBalance} />
              <BreakdownRow label="Discount / Scholarship" value="-₦10,000" color="text-green-600" />
              <div className="h-px bg-slate-100 my-1" />
              <BreakdownRow label="Total Amount Payable" value="₦195,000" isBold />
              <BreakdownRow label="Amount Paid" value={student.paid} color="text-green-600" />
              <div className="h-px bg-slate-100 my-1" />
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-bold text-schoolgate-green uppercase tracking-tighter">Outstanding Balance</p>
                  <p className="text-xl font-black text-schoolgate-green">{student.outstanding}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Payment Status</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-700">65%</span>
                    <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-schoolgate-green" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Payment Timeline */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h5 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Calendar size={16} className="text-schoolgate-green" />
              Recent Timeline
            </h5>
            <div className="space-y-4">
              {[
                { date: 'May 12, 2024', label: 'Partial Payment', amount: '₦100,000' },
                { date: 'Apr 20, 2024', label: 'Term Fees Invoiced', amount: '₦120,000' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-l-2 border-slate-100 pl-4 relative">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-300" />
                  <div>
                    <p className="font-semibold text-slate-800">{item.label}</p>
                    <p className="text-[11px] text-slate-400">{item.date}</p>
                  </div>
                  <p className="font-bold text-slate-700">{item.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 h-12 rounded-xl font-bold gap-2">
              <DollarSign size={18} />
              Receive Payment
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-xl h-11 font-semibold gap-2">
                <Printer size={16} />
                Statement
              </Button>
              <Button variant="outline" className="rounded-xl h-11 font-semibold gap-2">
                <Download size={16} />
                Receipt
              </Button>
            </div>
            <Button variant="ghost" className="w-full text-schoolgate-green font-bold hover:bg-schoolgate-green-light">
              <Eye size={18} className="mr-2" />
              View Full Student Account
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
