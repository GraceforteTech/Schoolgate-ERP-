import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Eye, Printer, FileText, Undo2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const transactions = [
  { time: "10:30 AM", receipt: "REC-2024-001", student: "Chukwuemeka Okoro", desc: "School Fees", amount: "₦150,000", method: "Transfer", user: "Bursar (Ade)", status: "Completed" },
  { time: "09:15 AM", receipt: "REC-2024-002", student: "Aisha Bello", desc: "Uniform Fees", amount: "₦25,000", method: "Cash", user: "Admin (Sarah)", status: "Completed" },
  { time: "08:45 AM", receipt: "REC-2024-003", student: "Tunde Yusuf", desc: "Boarding Fee", amount: "₦300,000", method: "POS", user: "Accountant (John)", status: "Pending" },
];

export function RecentActivities() {
  return (
    <Card className="border-none shadow-sm rounded-[14px] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-bold text-slate-900">Recent Financial Activities</CardTitle>
        <Button variant="outline" size="sm" className="rounded-xl font-bold border-slate-200">View All</Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent">
              <TableHead>Time</TableHead>
              <TableHead>Receipt</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t, i) => (
              <TableRow key={i} className="hover:bg-schoolgate-green-light/20">
                <TableCell className="font-medium text-slate-500 text-xs">{t.time}</TableCell>
                <TableCell className="font-bold text-slate-900">{t.receipt}</TableCell>
                <TableCell>{t.student}</TableCell>
                <TableCell>{t.desc}</TableCell>
                <TableCell className="font-bold">{t.amount}</TableCell>
                <TableCell>{t.method}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    "border-0 px-2 py-0.5 rounded-full",
                    t.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                  )}>
                    {t.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon"><MoreHorizontal size={16} /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye size={14} className="mr-2" /> View</DropdownMenuItem>
                      <DropdownMenuItem><Printer size={14} className="mr-2" /> Print</DropdownMenuItem>
                      <DropdownMenuItem><FileText size={14} className="mr-2" /> Student Account</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-rose-600"><Undo2 size={14} className="mr-2" /> Reverse</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
