import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Download } from "lucide-react";

export function SavingsManagement() {
  const data = [
    { name: "John Doe", dept: "Science", contrib: 20000, school: 20000, total: 40000, balance: 450000 },
    { name: "Jane Smith", dept: "Arts", contrib: 15000, school: 15000, total: 30000, balance: 320000 },
  ];
  return (
    <div className="bg-white rounded-[14px] border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Dept</TableHead><TableHead>Staff Contrib</TableHead><TableHead>School</TableHead><TableHead>Balance</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
        <TableBody>
          {data.map((r, i) => (
            <TableRow key={i}>
              <TableCell className="font-bold">{r.name}</TableCell>
              <TableCell>{r.dept}</TableCell>
              <TableCell>₦{r.contrib.toLocaleString()}</TableCell>
              <TableCell>₦{r.school.toLocaleString()}</TableCell>
              <TableCell className="font-bold text-schoolgate-green">₦{r.balance.toLocaleString()}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
