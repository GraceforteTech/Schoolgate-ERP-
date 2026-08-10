import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download, CheckCircle2 } from "lucide-react";

export function ReceiptDialog({ open, onOpenChange, transaction }: { open: boolean, onOpenChange: (open: boolean) => void, transaction: any }) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 border-none rounded-3xl overflow-hidden bg-slate-50">
        <div className="bg-schoolgate-green p-8 text-white text-center">
          <CheckCircle2 size={48} className="mx-auto mb-4 opacity-50" />
          <h2 className="text-2xl font-black tracking-tight">Official Payment Receipt</h2>
          <p className="text-emerald-100 font-medium italic">Transaction successfully processed and verified.</p>
        </div>
        
        <div className="p-8 space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
            <div className="flex justify-between border-b border-dashed pb-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Receipt To</p>
                <p className="font-bold text-slate-800">{transaction.profiles?.full_name || 'Student'}</p>
                <p className="text-xs text-slate-500">{transaction.student_id}</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Receipt No.</p>
                <p className="font-bold text-schoolgate-green">{transaction.reference || transaction.id.slice(0, 8)}</p>
                <p className="text-xs text-slate-500">{new Date(transaction.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Payment Method</span>
                <span className="font-bold text-slate-800 uppercase">{transaction.method}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Transaction Type</span>
                <span className="font-bold text-slate-800 uppercase">{transaction.type}</span>
              </div>
              <div className="pt-4 border-t flex justify-between items-center">
                <span className="text-lg font-black text-slate-800">Total Amount</span>
                <span className="text-2xl font-black text-schoolgate-green">₦{transaction.amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 gap-2 font-bold shadow-lg">
              <Printer size={18} /> Print Receipt
            </Button>
            <Button variant="outline" className="flex-1 h-12 rounded-xl border-slate-200 gap-2 font-bold hover:bg-white shadow-sm text-slate-600">
              <Download size={18} /> Download PDF
            </Button>
          </div>
          
          <p className="text-[9px] text-center text-slate-400 font-medium uppercase tracking-tighter">
            This is a computer generated receipt and requires no signature. | Schoolgate ERP Transaction ID: {transaction.id}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
