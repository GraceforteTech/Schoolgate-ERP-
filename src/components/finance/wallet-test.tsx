import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { processPayment } from "@/lib/finance.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function WalletTest({ studentId, tenantId }: { studentId: string; tenantId: string }) {
  const [amount, setAmount] = useState("");
  const pay = useServerFn(processPayment);

  const handleDeposit = async () => {
    try {
      await pay({
        data: {
          studentId,
          tenantId,
          amount: parseFloat(amount),
          method: 'bank_transfer',
          description: 'Wallet Deposit Test'
        }
      });
      toast.success("Payment recorded as pending");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm space-y-4">
      <h3 className="font-bold">Test Wallet Deposit</h3>
      <Input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        placeholder="Enter Amount" 
      />
      <Button onClick={handleDeposit} className="w-full bg-schoolgate-green">
        Initiate Deposit
      </Button>
    </div>
  );
}
