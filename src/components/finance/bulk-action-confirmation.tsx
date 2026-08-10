import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface BulkActionConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (reason: string, adjustmentAmount?: number) => void;
  action: {
    type: 'waiver' | 'adjustment' | 'assign' | 'remove';
    count: number;
    feeType?: string;
    amount?: number;
    totalImpact?: number;
  };
}

export function BulkActionConfirmation({ 
  open, 
  onOpenChange, 
  onConfirm,
  action 
}: BulkActionConfirmationProps) {
  const [reason, setReason] = useState("");
  const [adjustmentAmount, setAdjustmentAmount] = useState<number | undefined>(action.amount);
  
  const isWaiverOrAdjustment = action.type === 'waiver' || action.type === 'adjustment';

  const handleConfirm = () => {
    onConfirm(reason, adjustmentAmount);
    setReason("");
  };

  const getActionTitle = () => {
    switch(action.type) {
      case 'waiver': return "Bulk Fee Waiver";
      case 'adjustment': return "Bulk Fee Adjustment";
      case 'assign': return "Bulk Fee Assignment";
      case 'remove': return "Bulk Fee Removal";
      default: return "Bulk Action";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rounded-[24px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-slate-900">{getActionTitle()}</DialogTitle>
          <DialogDescription className="font-medium text-slate-500">
            Please confirm the details of this bulk operation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
             <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Affected Records</span>
                <span className="text-slate-900 font-black">{action.count} Students</span>
             </div>
             {action.feeType && (
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Fee Type</span>
                  <span className="text-slate-900 font-black">{action.feeType}</span>
               </div>
             )}
             {action.amount !== undefined && (
               <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Amount Per Student</span>
                  <span className="text-slate-900 font-black">₦{action.amount.toLocaleString()}</span>
               </div>
             )}
             {action.totalImpact !== undefined && (
               <div className="flex justify-between text-sm border-t border-slate-200 pt-2">
                  <span className="text-schoolgate-green font-bold uppercase text-[10px] tracking-wider">Total Financial Impact</span>
                  <span className="text-schoolgate-green font-black text-base">₦{action.totalImpact.toLocaleString()}</span>
               </div>
             )}
          </div>

          {action.type === 'adjustment' && (
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">New Adjustment Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                <Input 
                  type="number"
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(Number(e.target.value))}
                  className="pl-8 rounded-xl font-bold h-11 border-slate-200"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label className="text-xs font-bold text-slate-500 uppercase">Reason for Action {isWaiverOrAdjustment && "(Required)"}</Label>
            <Textarea 
              placeholder="Provide a justification for this bulk action..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="rounded-xl min-h-[100px] border-slate-200"
            />
          </div>

          <Alert className="bg-amber-50 border-amber-100 text-amber-800 rounded-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-xs font-bold uppercase tracking-tight">Financial Safeguard</AlertTitle>
            <AlertDescription className="text-[11px] font-medium leading-relaxed">
              Historical records with payments cannot be destructive updated. Waivers will be recorded as separate adjustments.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="rounded-xl h-11 font-bold border-slate-200"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={isWaiverOrAdjustment && reason.length < 3}
            className="rounded-xl h-11 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-black px-8 shadow-lg shadow-schoolgate-green/20"
          >
            Confirm & Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
