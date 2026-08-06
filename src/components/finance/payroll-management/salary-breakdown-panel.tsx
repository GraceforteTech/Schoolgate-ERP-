import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { FileText, Printer, Save, X } from "lucide-react";

export function SalaryBreakdownPanel({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold flex items-center justify-between">
            Staff Salary Breakdown
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Earnings</h4>
            {[
              { label: "Basic Salary", val: "₦150,000" },
              { label: "Housing", val: "₦20,000" },
              { label: "Transport", val: "₦15,000" },
              { label: "Meal", val: "₦10,000" },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-slate-500">{item.label}</span>
                <span className="font-semibold text-slate-800">{item.val}</span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 uppercase text-xs tracking-wider">Deductions</h4>
            {[
              { label: "Pension (8%)", val: "₦12,000" },
              { label: "Wealth Fund", val: "₦5,000" },
              { label: "Tax (PAYE)", val: "₦10,000" },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-slate-500">{item.label}</span>
                <span className="font-semibold text-rose-600">{item.val}</span>
              </div>
            ))}
            
            <div className="pt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Deduction Ratio</span>
                <span className="text-slate-600 font-bold">14%</span>
              </div>
              <Progress value={14} className="h-1.5" />
            </div>
          </div>

          <div className="bg-schoolgate-green-light p-4 rounded-xl mt-8">
            <div className="flex justify-between items-center">
              <span className="font-bold text-schoolgate-green">NET SALARY</span>
              <span className="text-2xl font-bold text-schoolgate-green">₦168,000</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
          <Button className="bg-schoolgate-green w-full"><Save className="mr-2 h-4 w-4" /> Save</Button>
          <Button variant="outline" className="w-full"><FileText className="mr-2 h-4 w-4" /> Payslip</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
