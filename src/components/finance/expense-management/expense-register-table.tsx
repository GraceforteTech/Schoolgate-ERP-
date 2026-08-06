import React from 'react';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Printer, 
  FileText, 
  Paperclip,
  Trash2,
  Copy
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const expenses = [
  {
    id: "EXP-001",
    date: "2024-05-20",
    category: "Academic Supplies",
    description: "Purchase of whiteboard markers and stationery",
    department: "Academic",
    vendor: "OfficeMax Supplies",
    paymentMethod: "Bank Transfer",
    amount: 150000,
    approvedBy: "Principal (Review)",
    status: "pending",
    receipt: true,
    recordedBy: "Admin Accountant",
  },
  {
    id: "EXP-002",
    date: "2024-05-19",
    category: "Utilities",
    description: "May Electricity Bill (AEDC)",
    department: "Administration",
    vendor: "AEDC",
    paymentMethod: "Direct Debit",
    amount: 450000,
    approvedBy: "Proprietor",
    status: "approved",
    receipt: true,
    recordedBy: "Bursar",
  },
  {
    id: "EXP-003",
    date: "2024-05-18",
    category: "Salaries",
    description: "Staff May Salaries (Security Dept)",
    department: "Security",
    vendor: "Multiple Staff",
    paymentMethod: "Bank Transfer",
    amount: 1200000,
    approvedBy: "Proprietor",
    status: "approved",
    receipt: false,
    recordedBy: "Bursar",
  },
  {
    id: "EXP-004",
    date: "2024-05-17",
    category: "Maintenance",
    description: "Generator Repair and Servicing",
    department: "General Maintenance",
    vendor: "Mikano Engineering",
    paymentMethod: "Bank Transfer",
    amount: 85000,
    approvedBy: "Principal",
    status: "rejected",
    receipt: true,
    recordedBy: "Admin Accountant",
  },
];

export function ExpenseRegisterTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none shadow-none rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-50 border-none shadow-none rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-rose-50 text-rose-600 hover:bg-rose-50 border-none shadow-none rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">Rejected</Badge>;
      default:
        return <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount).replace('NGN', '₦');
  };

  return (
    <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-slate-100">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="w-12 text-center">
                <Checkbox className="rounded-md border-slate-300 data-[state=checked]:bg-schoolgate-green data-[state=checked]:border-schoolgate-green" />
              </TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider py-4">Expense No.</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider w-[250px]">Description</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Department</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vendor</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Receipt</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={expense.id} className={cn(
                "hover:bg-slate-50/50 transition-colors border-slate-50",
                index % 2 === 1 ? "bg-slate-50/30" : "bg-white"
              )}>
                <TableCell className="text-center">
                  <Checkbox className="rounded-md border-slate-300 data-[state=checked]:bg-schoolgate-green data-[state=checked]:border-schoolgate-green" />
                </TableCell>
                <TableCell className="font-bold text-slate-700 text-sm">{expense.id}</TableCell>
                <TableCell className="text-slate-500 text-xs">{expense.date}</TableCell>
                <TableCell>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {expense.category}
                  </span>
                </TableCell>
                <TableCell className="text-slate-600 text-sm font-medium line-clamp-1 py-4">
                  {expense.description}
                </TableCell>
                <TableCell className="text-slate-500 text-xs">{expense.department}</TableCell>
                <TableCell className="text-slate-700 text-xs font-semibold">{expense.vendor}</TableCell>
                <TableCell className="font-bold text-slate-800 text-sm">
                  {formatCurrency(expense.amount)}
                </TableCell>
                <TableCell>{getStatusBadge(expense.status)}</TableCell>
                <TableCell className="text-center">
                  {expense.receipt ? (
                    <div className="flex justify-center">
                      <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Paperclip size={14} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <div className="p-1.5 bg-slate-50 text-slate-300 rounded-lg">
                        <Paperclip size={14} />
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-schoolgate-green">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl p-1.5 border-slate-100 shadow-xl">
                      <DropdownMenuLabel className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1.5">Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="rounded-lg gap-2 text-sm font-medium focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                        <Eye size={16} /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 text-sm font-medium focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                        <Edit size={16} /> Edit Expense
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-50" />
                      <DropdownMenuItem className="rounded-lg gap-2 text-sm font-medium focus:bg-emerald-50 focus:text-emerald-600 cursor-pointer">
                        <CheckCircle size={16} /> Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 text-sm font-medium focus:bg-rose-50 focus:text-rose-600 cursor-pointer">
                        <XCircle size={16} /> Reject
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-50" />
                      <DropdownMenuItem className="rounded-lg gap-2 text-sm font-medium focus:bg-slate-50 cursor-pointer">
                        <Printer size={16} /> Print Voucher
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 text-sm font-medium focus:bg-slate-50 cursor-pointer text-rose-500 focus:text-rose-600">
                        <Trash2 size={16} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <p className="text-xs text-slate-400 font-medium tracking-tight">Showing 4 of 128 expenses</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold border-slate-200">Previous</Button>
          <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold border-slate-200">Next</Button>
        </div>
      </div>
    </div>
  );
}
