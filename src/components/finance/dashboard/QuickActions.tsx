import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { 
  CreditCard, 
  FileSpreadsheet, 
  FileText, 
  Calculator, 
  Briefcase, 
  Printer, 
  LayoutList,
  Download
} from "lucide-react";

const actions = [
  { label: "Collect Fees", icon: CreditCard, url: "/finance/invoice-management" },
  { label: "Bulk Fee Posting", icon: FileSpreadsheet, url: "/finance/fee-posting" },
  { label: "Create Invoice", icon: FileText, url: "/finance/invoice-management" },
  { label: "Record Expense", icon: Calculator, url: "/finance/expense-management" },
  { label: "Payroll", icon: Briefcase, url: "/finance/hr-payroll" },
  { label: "Print Daily Report", icon: Printer, url: "#" },
  { label: "Outstanding Fees", icon: LayoutList, url: "/finance/outstanding-fees" },
  { label: "Student Statement", icon: FileText, url: "/finance/invoice-management" },
  { label: "Export Report", icon: Download, url: "#" },
];

export function QuickActions() {
  return (
    <Card className="p-6 border-none shadow-sm rounded-[14px]">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, i) => (
          <Button 
            key={i} 
            variant="outline" 
            asChild
            className="flex flex-col items-center justify-center h-24 gap-3 rounded-xl border-slate-100 hover:border-schoolgate-green hover:bg-schoolgate-green-light hover:text-schoolgate-green transition-all group"
          >
            <Link to={action.url}>
              <action.icon size={24} className="opacity-70 group-hover:opacity-100" />
              <span className="text-[11px] font-bold uppercase tracking-wide">{action.label}</span>
            </Link>
          </Button>
        ))}
      </div>
    </Card>
  );
}