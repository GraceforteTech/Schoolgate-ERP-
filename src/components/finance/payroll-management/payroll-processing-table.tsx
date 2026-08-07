import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Edit, FileText, Printer, CheckCircle2, PauseCircle, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const staffPayroll = [
  { id: "ST001", name: "John Doe", dept: "Science", school: "Secondary", basic: 150000, allowance: 45000, gross: 195000, pension: 15000, tax: 12000, lateness: 500, net: 167500, status: "Paid" },
  { id: "ST002", name: "Jane Smith", dept: "Arts", school: "Primary", basic: 140000, allowance: 35000, gross: 175000, pension: 14000, tax: 10000, lateness: 0, net: 151000, status: "Pending" },
  { id: "ST003", name: "Bob Wilson", dept: "Admin", school: "Main", basic: 120000, allowance: 25000, gross: 145000, pension: 12000, tax: 8000, lateness: 1000, net: 124000, status: "On Hold" },
];

export function PayrollProcessingTable() {
  return (
    <div className="bg-white rounded-[14px] border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 sticky top-0">
          <TableRow>
            <TableHead className="font-bold">Staff ID</TableHead>
            <TableHead className="font-bold">Staff Name</TableHead>
            <TableHead className="font-bold">Gross</TableHead>
            <TableHead className="font-bold">Deductions</TableHead>
            <TableHead className="font-bold text-schoolgate-green">Net Salary</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="text-right font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffPayroll.map((row, i) => (
            <TableRow key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>₦{row.gross.toLocaleString()}</TableCell>
              <TableCell>₦{(row.gross - row.net).toLocaleString()}</TableCell>
              <TableCell className="font-bold text-schoolgate-green">₦{row.net.toLocaleString()}</TableCell>
              <TableCell>
                <Badge variant={row.status === "Paid" ? "default" : row.status === "Pending" ? "outline" : "destructive"}>
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Eye className="mr-2 h-4 w-4" /> View Breakdown</DropdownMenuItem>
                    <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> Payslip</DropdownMenuItem>
                    <DropdownMenuItem><CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> Approve</DropdownMenuItem>
                    <DropdownMenuItem className="text-rose-500"><PauseCircle className="mr-2 h-4 w-4" /> Hold</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
