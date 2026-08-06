import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Eye, 
  CreditCard, 
  Printer, 
  MessageSquare, 
  Mail, 
  FileText 
} from "lucide-react";

export function OutstandingStudentsTable({ onSelectStudent }: { onSelectStudent?: (student: any) => void }) {
  const students = [
    {
      id: 1,
      name: "Chukwuemeka Okoro",
      admNo: "2024/001",
      school: "Secondary",
      class: "JSS 2 Gold",
      parent: "Mr. Okoro",
      phone: "08012345678",
      prevBalance: "₦50,000",
      charges: "₦120,000",
      totalDue: "₦170,000",
      paid: "₦100,000",
      outstanding: "₦70,000",
      percentage: "58.8%",
      debtAge: "45 Days",
      lastPayment: "2024-05-12",
      status: "Overdue"
    },
    // ... more mock data
  ];

  return (
    <div className="rounded-[14px] border border-slate-100 overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-12"><Checkbox /></TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Adm No</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Parent Name</TableHead>
            <TableHead>Prev Balance</TableHead>
            <TableHead>Total Due</TableHead>
            <TableHead>Outstanding</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="hover:bg-schoolgate-green-light/20 transition-colors cursor-pointer" onClick={() => onSelectStudent?.(student)}>
              <TableCell><Checkbox /></TableCell>
              <TableCell className="font-semibold text-slate-900">{student.name}</TableCell>
              <TableCell>{student.admNo}</TableCell>
              <TableCell>{student.school}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.parent}</TableCell>
              <TableCell>{student.prevBalance}</TableCell>
              <TableCell>{student.totalDue}</TableCell>
              <TableCell className="font-bold text-schoolgate-green">{student.outstanding}</TableCell>
              <TableCell>{student.debtAge}</TableCell>
              <TableCell>
                <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                  {student.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onSelectStudent?.(student)}><Eye size={14} className="mr-2" /> View Account</DropdownMenuItem>
                    <DropdownMenuItem><CreditCard size={14} className="mr-2" /> Collect Payment</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><MessageSquare size={14} className="mr-2" /> WhatsApp Reminder</DropdownMenuItem>
                    <DropdownMenuItem><Mail size={14} className="mr-2" /> Email Parent</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Printer size={14} className="mr-2" /> Print Statement</DropdownMenuItem>
                    <DropdownMenuItem><FileText size={14} className="mr-2" /> Download PDF</DropdownMenuItem>
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
