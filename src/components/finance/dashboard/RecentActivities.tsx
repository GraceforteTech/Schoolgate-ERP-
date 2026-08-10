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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export function RecentActivities() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['recent-financial-activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*, profiles!student_id(full_name)')
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) return <div className="h-48 bg-slate-50 animate-pulse rounded-2xl" />;

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
            {transactions?.map((t: any, i: number) => (
              <TableRow key={t.id} className="hover:bg-schoolgate-green-light/20">
                <TableCell className="font-medium text-slate-500 text-xs">
                  {new Date(t.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </TableCell>
                <TableCell className="font-bold text-slate-900">{t.reference || t.id.slice(0, 8)}</TableCell>
                <TableCell>{t.profiles?.full_name || 'N/A'}</TableCell>
                <TableCell>{t.description || t.type}</TableCell>
                <TableCell className="font-bold">₦{t.amount.toLocaleString()}</TableCell>
                <TableCell>{t.method}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn(
                    "border-0 px-2 py-0.5 rounded-full",
                    t.status === "approved" ? "bg-emerald-50 text-emerald-600" : 
                    t.status === "pending" ? "bg-amber-50 text-amber-600" : 
                    "bg-rose-50 text-rose-600"
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

