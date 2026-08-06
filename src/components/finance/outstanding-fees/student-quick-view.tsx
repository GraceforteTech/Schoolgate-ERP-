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
  User,
  History,
  FileText,
  FileDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface QuickViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: any;
  isLoading?: boolean;
}

export function StudentQuickView({ open, onOpenChange, student, isLoading = false }: QuickViewProps) {
  if (!student && !isLoading) return null;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="p-6 space-y-6">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-32 w-full rounded-2xl" />
          <div className="space-y-3">
             <Skeleton className="h-12 w-full rounded-xl" />
             <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-11 w-full rounded-xl" />
                <Skeleton className="h-11 w-full rounded-xl" />
             </div>
          </div>
        </div>
      );
    }

    if (!student) return null;

    return (
      <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Profile Header */}
        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <User size={64} />
          </div>
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border-2 border-white shadow-sm">
            <User size={32} />
          </div>
          <div className="z-10">
            <h4 className="text-lg font-black text-slate-900 leading-tight">{student.name}</h4>
            <div className="flex items-center gap-2 mt-1">
               <Badge variant="outline" className="bg-schoolgate-green-light/30 text-schoolgate-green border-schoolgate-green/10 text-[10px] font-bold">
                 {student.admNo}
               </Badge>
               <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{student.class}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Payment Breakdown */}
        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <CreditCard size={12} />
              Term Financial Snapshot
            </h5>
            <Badge variant="outline" className="text-[9px] font-black uppercase text-slate-400">Current Term</Badge>
          </div>
          <div className="space-y-3">
            <BreakdownRow label="Base School Fees" value={student.charges} icon={FileText} />
            <BreakdownRow label="Balance B/F (Debt)" value={student.prevBalance} icon={History} color="text-amber-600" />
            <BreakdownRow label="Discount / Scholarship" value="-₦10,000" icon={Calendar} color="text-emerald-600" />
            
            <div className="h-px bg-slate-50 my-1" />
            
            <div className="flex justify-between items-center py-1">
              <span className="text-xs font-black text-slate-400 uppercase tracking-tight">Total Amount Payable</span>
              <span className="text-lg font-black text-slate-900 tabular-nums">₦195,000</span>
            </div>
            
            <BreakdownRow label="Amount Already Paid" value={student.paid} icon={CheckCircle2Icon} color="text-emerald-600" />
            
            <div className="h-px bg-slate-50 my-1" />
            
            <div className="flex justify-between items-end bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div>
                <p className="text-[10px] font-black text-schoolgate-green uppercase tracking-tighter mb-1">Outstanding Balance</p>
                <p className="text-2xl font-black text-schoolgate-green tracking-tight">{student.outstanding}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Payment Status</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-slate-900">65%</span>
                  <div className="w-20 h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                    <div className="h-full bg-schoolgate-green" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger & Timeline Preview */}
        <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xs font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
              <History size={16} className="text-schoolgate-green" />
              Receipt History
            </h5>
            <Button variant="link" className="p-0 h-auto text-[10px] font-black uppercase text-schoolgate-green hover:no-underline">Full Ledger</Button>
          </div>
          <div className="space-y-4">
            {[
              { date: 'May 12, 2024', label: 'Partial Payment', amount: '₦100,000', ref: 'RCP-8821' },
              { date: 'Apr 20, 2024', label: 'Term Fees Invoiced', amount: '₦120,000', ref: 'INV-4410' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-l-2 border-slate-100 pl-4 relative py-1">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-slate-300" />
                <div>
                  <p className="font-bold text-slate-800 leading-tight">{item.label}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{item.date} • {item.ref}</p>
                </div>
                <p className={cn("font-black text-slate-900", item.amount.startsWith('-') ? "text-emerald-600" : "")}>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="flex flex-col gap-3 pt-2">
          <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-black gap-2 shadow-lg shadow-slate-900/10">
            <DollarSign size={18} />
            Receive Fee Payment
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="rounded-xl h-12 font-bold gap-2 border-slate-200">
              <Printer size={16} /> Statement
            </Button>
            <Button variant="outline" className="rounded-xl h-12 font-bold gap-2 border-slate-200">
              <Download size={16} /> Receipt
            </Button>
          </div>
          <Button variant="ghost" className="w-full text-schoolgate-green font-black h-11 hover:bg-schoolgate-green-light tracking-wide">
            <Eye size={18} className="mr-2" />
            View Full Student Profile
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md border-none p-0 bg-slate-50 shadow-2xl">
        <SheetHeader className="p-6 bg-white border-b border-slate-100">
          <SheetTitle className="text-xl font-black text-slate-900 tracking-tight">Student Financial 360°</SheetTitle>
        </SheetHeader>
        
        {renderContent()}
      </SheetContent>
    </Sheet>
  );
}

function BreakdownRow({ label, value, color, isBold, icon: Icon }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2">
        {Icon && <Icon size={12} className="text-slate-300" />}
        <span className="text-slate-500 font-bold">{label}</span>
      </div>
      <span className={cn("font-black tabular-nums", color || "text-slate-900", isBold && "text-base")}>{value}</span>
    </div>
  );
}

function CheckCircle2Icon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
