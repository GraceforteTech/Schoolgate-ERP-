import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { processPayment } from "@/lib/finance.functions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Banknote, Plus } from "lucide-react";

export function OfflinePaymentDialog({ studentId, tenantId, onSuccess }: { studentId: string; tenantId: string; onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<any>("cash");
  const [reference, setReference] = useState("");
  const pay = useServerFn(processPayment);

  const handleSubmit = async () => {
    try {
      await pay({
        data: {
          studentId,
          tenantId,
          amount: parseFloat(amount),
          method,
          reference,
          description: `Offline payment recorded by Bursar`,
          type: 'fee_payment'
        }
      });
      toast.success("Offline payment recorded. Awaiting approval.");
      setOpen(false);
      onSuccess?.();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 gap-2 font-bold rounded-xl shadow-lg">
          <Plus size={18} /> Record Offline Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl border-none p-8 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Banknote className="text-schoolgate-green" /> Record Payment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Amount (₦)</label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="h-12 rounded-xl font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Payment Method</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="h-12 rounded-xl font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="cheque">Cheque</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Reference/Cheque No.</label>
            <Input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="REF-12345" className="h-12 rounded-xl font-bold" />
          </div>
          <Button onClick={handleSubmit} className="w-full h-14 bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl font-bold text-lg shadow-xl shadow-schoolgate-green/20">
            Submit for Approval
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
