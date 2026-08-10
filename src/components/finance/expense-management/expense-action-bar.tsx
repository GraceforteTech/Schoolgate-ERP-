import React from 'react';
import { 
  Search, 
  Plus, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  RefreshCw,
  Filter,
  Calendar,
  X,
  Settings2,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { exportToCSV } from "@/lib/csv-export";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RecordExpenseDialog } from "./record-expense-dialog";

export function ExpenseActionBar() {
  const queryClient = useQueryClient();
  const [isRecordOpen, setIsRecordOpen] = React.useState(false);
  const { data: expenses } = useQuery({
    queryKey: ['expenses-register'],
    queryFn: async () => {
      const { data, error } = await supabase.from('expenses').select('*');
      if (error) throw error;
      return data;
    }
  });

  const handleExport = () => {
    if (!expenses || expenses.length === 0) {
      toast.error("No data to export");
      return;
    }
    exportToCSV(
      expenses.map((e: any) => ({
        Date: new Date(e.created_at).toLocaleDateString(),
        Category: e.category,
        Vendor: e.vendor_payee || 'N/A',
        Amount: e.amount,
        Status: e.status
      })),
      `schoolgate_expenses_${new Date().toISOString().split('T')[0]}.csv`
    );
    toast.success("Expense register exported successfully");
  };

  return (
    <>
    <RecordExpenseDialog open={isRecordOpen} onOpenChange={setIsRecordOpen} />
    <Card className="p-4 border-none bg-white rounded-[14px] shadow-sm flex flex-col gap-4">
      {/* Top row: Multi-filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-3">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Session</label>
          <Select defaultValue="2023/2024">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023/2024">2023/2024</SelectItem>
              <SelectItem value="2022/2023">2022/2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Term</label>
          <Select defaultValue="first">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first">First Term</SelectItem>
              <SelectItem value="second">Second Term</SelectItem>
              <SelectItem value="third">Third Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">School</label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="all">All Schools</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Department</label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Administration</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="all">All Depts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Category</label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salaries">Salaries</SelectItem>
              <SelectItem value="utilities">Utilities</SelectItem>
              <SelectItem value="supplies">Supplies</SelectItem>
              <SelectItem value="all">All Categories</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Status</label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="all">All Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Payment</label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="transfer">Bank Transfer</SelectItem>
              <SelectItem value="cheque">Cheque</SelectItem>
              <SelectItem value="all">All Methods</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Vendor</label>
          <Select defaultValue="all">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vendors</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bottom row: Search & Actions */}
      <div className="flex flex-col lg:flex-row gap-3 items-end">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-schoolgate-green transition-colors" size={16} />
            <Input 
              placeholder="Search Expense / No / Description..." 
              className="pl-10 h-10 bg-slate-50 border-slate-100 rounded-xl focus-visible:ring-schoolgate-green" 
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Date Range" 
              className="pl-10 h-10 bg-slate-50 border-slate-100 rounded-xl focus-visible:ring-schoolgate-green" 
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-end w-full lg:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="h-10 rounded-xl border-slate-200 text-slate-600 font-semibold gap-2"
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ['expenses-register'] });
              toast.success("Expense register refreshed");
            }}
          >
            <RefreshCw size={16} />
            Refresh
          </Button>
          <div className="h-8 w-[1px] bg-slate-200 self-center mx-1 hidden sm:block" />
          <Button 
            variant="outline" 
            size="sm" 
            className="h-10 rounded-xl border-slate-200 text-slate-600 font-semibold gap-2"
            onClick={handleExport}
          >
            <FileSpreadsheet size={16} />
            Excel
          </Button>
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-slate-600 font-semibold gap-2">
            <FileText size={16} />
            PDF
          </Button>
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-slate-600 font-semibold gap-2">
            <Printer size={16} />
            Print
          </Button>
          <Button
            className="h-10 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-semibold gap-2 px-6"
            onClick={() => setIsRecordOpen(true)}
          >
            <Plus size={16} />
            Record Expense
          </Button>
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-schoolgate-green/20 text-schoolgate-green font-bold bg-schoolgate-green-light/30 hover:bg-schoolgate-green-light/50 transition-all gap-2 px-4 group">
            <Settings2 size={16} className="group-hover:rotate-45 transition-transform" />
            Categories
          </Button>
        </div>
      </div>
    </Card>
    </>
  );
}
