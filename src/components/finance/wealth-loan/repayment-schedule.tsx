import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function RepaymentSchedule() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1,2].map(i => (
        <Card key={i} className="p-6 rounded-[14px]">
          <h4 className="font-bold mb-4">Loan Repayment - Staff #{i}</h4>
          <Progress value={65} className="mb-2" />
          <div className="flex justify-between text-xs text-slate-500"><span>Paid ₦325k</span><span>Balance ₦175k</span></div>
        </Card>
      ))}
    </div>
  );
}
