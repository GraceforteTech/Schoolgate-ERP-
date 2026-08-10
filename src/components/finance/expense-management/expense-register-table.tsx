import React from 'react';
import { 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Paperclip,
  Trash2
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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { approveExpense } from "@/lib/expenses.functions";
import { toast } from "sonner";

export function ExpenseRegisterTable() {
  const queryClient = useQueryClient();
  const approveExpenseFn = useServerFn(approveExpense);

  const { data: expenses, isLoading } = useQuery({
    queryKey: ['expenses-register'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: 'approved' | 'rejected' }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      return approveExpenseFn({ data: { expenseId: id, adminId: user.id, status } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses-register'] });
      queryClient.invalidateQueries({ queryKey: ['financial-summary-detailed'] });
      queryClient.invalidateQueries({ queryKey: ['school-financial-summary'] });
      toast.success("Expense status updated successfully");
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    }
  });

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

  if (isLoading) return <div className="h-64 bg-slate-50 animate-pulse rounded-[14px]" />;

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
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Vendor</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Amount</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</TableHead>
              <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses?.map((expense, index) => (
              <TableRow key={expense.id} className={cn(
                "hover:bg-slate-50/50 transition-colors border-slate-50",
                index % 2 === 1 ? "bg-slate-50/30" : "bg-white"
              )}>
                <TableCell className="text-center">
                  <Checkbox className="rounded-md border-slate-300 data-[state=checked]:bg-schoolgate-green data-[state=checked]:border-schoolgate-green" />
                </TableCell>
                <TableCell className="font-bold text-slate-700 text-sm">{expense.id.slice(0, 8)}</TableCell>
                <TableCell className="text-slate-500 text-xs">{expense.created_at ? new Date(expense.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {expense.category}
                  </span>
                </TableCell>
                <TableCell className="text-slate-600 text-sm font-medium py-4">
                  {expense.description}
                </TableCell>
                <TableCell className="text-slate-700 text-xs font-semibold">{expense.vendor_payee || 'N/A'}</TableCell>
                <TableCell className="font-bold text-slate-800 text-sm">
                  {formatCurrency(Number(expense.amount || 0))}
                </TableCell>
                <TableCell>{getStatusBadge(expense.status)}</TableCell>
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
                      <DropdownMenuSeparator className="bg-slate-50" />
                      {expense.status === 'pending' && (
                        <>
                          <DropdownMenuItem 
                            onClick={() => updateStatusMutation.mutate({ id: expense.id, status: 'approved' })}
                            className="rounded-lg gap-2 text-sm font-medium focus:bg-emerald-50 focus:text-emerald-600 cursor-pointer"
                          >
                            <CheckCircle size={16} /> Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateStatusMutation.mutate({ id: expense.id, status: 'rejected' })}
                            className="rounded-lg gap-2 text-sm font-medium focus:bg-rose-50 focus:text-rose-600 cursor-pointer"
                          >
                            <XCircle size={16} /> Reject
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-50" />
                        </>
                      )}
                      <DropdownMenuItem className="rounded-lg gap-2 text-sm font-medium focus:bg-slate-50 cursor-pointer text-rose-500 focus:text-rose-600">
                        <Trash2 size={16} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {(!expenses || expenses.length === 0) && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-slate-400 italic">No expenses recorded yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
