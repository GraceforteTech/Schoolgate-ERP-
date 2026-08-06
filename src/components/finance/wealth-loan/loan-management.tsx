import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, HandCoins, Eye, MoreVertical } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type LoanStatus = "Pending" | "Approved" | "Disbursed" | "Active" | "Rejected";

interface Loan {
  id: string;
  name: string;
  amount: number;
  outstanding: number;
  status: LoanStatus;
  date: string;
}

const initialLoans: Loan[] = [
  { id: "L001", name: "John Doe", amount: 500000, outstanding: 300000, status: "Active", date: "2026-05-15" },
  { id: "L002", name: "Bob Wilson", amount: 200000, outstanding: 200000, status: "Pending", date: "2026-08-01" },
  { id: "L003", name: "Alice Johnson", amount: 350000, outstanding: 350000, status: "Approved", date: "2026-08-04" },
  { id: "L004", name: "Sarah Parker", amount: 150000, outstanding: 150000, status: "Rejected", date: "2026-07-20" },
];

export function LoanManagement() {
  const [loans, setLoans] = useState<Loan[]>(initialLoans);

  const handleDisburse = (id: string) => {
    setLoans(prev => prev.map(loan => 
      loan.id === id ? { ...loan, status: "Disbursed" } : loan
    ));
    toast.success("Loan disbursed successfully");
  };

  const getStatusBadge = (status: LoanStatus) => {
    switch (status) {
      case "Active": return <Badge className="bg-emerald-500">Active</Badge>;
      case "Pending": return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Pending</Badge>;
      case "Approved": return <Badge className="bg-schoolgate-green">Approved</Badge>;
      case "Disbursed": return <Badge className="bg-blue-500">Disbursed</Badge>;
      case "Rejected": return <Badge variant="destructive">Rejected</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-[14px] border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="font-bold">Staff Name</TableHead>
            <TableHead className="font-bold">Date Requested</TableHead>
            <TableHead className="font-bold">Loan Amount</TableHead>
            <TableHead className="font-bold">Outstanding</TableHead>
            <TableHead className="font-bold text-center">Status</TableHead>
            <TableHead className="text-right font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.id} className="hover:bg-slate-50/50 transition-colors">
              <TableCell className="font-bold text-slate-700">{loan.name}</TableCell>
              <TableCell className="text-slate-500 text-sm">{loan.date}</TableCell>
              <TableCell className="font-semibold">₦{loan.amount.toLocaleString()}</TableCell>
              <TableCell className="text-slate-600 font-medium">₦{loan.outstanding.toLocaleString()}</TableCell>
              <TableCell className="text-center">
                {getStatusBadge(loan.status)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {loan.status === "Approved" && (
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 h-8 gap-1"
                      onClick={() => handleDisburse(loan.id)}
                    >
                      <HandCoins className="h-3.5 w-3.5" />
                      Disburse
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      {loan.status === "Pending" && (
                        <DropdownMenuItem className="gap-2 text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" /> Approve Loan
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
