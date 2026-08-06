import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

export function LoanManagement() {
  const data = [
    { name: "John Doe", amount: 500000, outstanding: 300000, status: "Active" },
    { name: "Bob Wilson", amount: 200000, outstanding: 200000, status: "Pending" },
  ];
  return (
    <div className="bg-white rounded-[14px] border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Requested</TableHead><TableHead>Outstanding</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {data.map((r, i) => (
            <TableRow key={i}>
              <TableCell className="font-bold">{r.name}</TableCell>
              <TableCell>₦{r.amount.toLocaleString()}</TableCell>
              <TableCell>₦{r.outstanding.toLocaleString()}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm"><CheckCircle2 className="h-4 w-4 text-emerald-500" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
