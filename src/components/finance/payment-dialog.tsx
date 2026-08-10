import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { processPayment } from "@/lib/finance.functions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CreditCard, Wallet } from "lucide-react";

export function PaymentDialog({ studentId, tenantId, onSuccess }: { studentId: string; tenantId: string; onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<any>("card");
  const [isLoading, setIsLoading] = useState(false);
  const pay = useServerFn(processPayment);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await pay({
        data: {
          studentId,
          tenantId,
          amount: parseFloat(amount),
          method,
          description: `Fee payment via ${method}`,
          type: 'fee_payment'
        }
      });
      toast.success("Payment request submitted. Please wait for approval.");
      setOpen(false);
      onSuccess?.();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl font-bold py-6 shadow-lg shadow-schoolgate-green/20">
          Pay Now
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl border-none p-8 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <CreditCard className="text-schoolgate-green" /> Make a Payment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Amount to Pay (₦)</label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="h-12 rounded-xl font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Payment Method</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="h-12 rounded-xl font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="card">Debit/Credit Card</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="wallet">School Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
             <div className="flex items-center gap-3 text-slate-500">
                <Wallet size={16} />
                <span className="text-xs font-bold uppercase tracking-tighter">Your wallet balance will be checked during processing.</span>
             </div>
          </div>
          <Button onClick={handleSubmit} disabled={isLoading || !amount} className="w-full h-14 bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl font-bold text-lg shadow-xl shadow-schoolgate-green/20">
            {isLoading ? "Processing..." : "Complete Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
