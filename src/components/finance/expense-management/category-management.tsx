import React from 'react';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  Settings2,
  PieChart,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  {
    id: "CAT001",
    name: "Staff Salaries",
    code: "SAL-01",
    budget: 15000000,
    spent: 12500000,
    status: "Active",
    items: 142,
    lastUpdate: "2 days ago",
    priority: "Critical"
  },
  {
    id: "CAT002",
    name: "Utilities & Bills",
    code: "UTL-02",
    budget: 2500000,
    spent: 2100000,
    status: "Active",
    items: 12,
    lastUpdate: "5 hours ago",
    priority: "High"
  },
  {
    id: "CAT003",
    name: "Laboratory Supplies",
    code: "SUP-03",
    budget: 5000000,
    spent: 4800000,
    status: "Active",
    items: 45,
    lastUpdate: "Yesterday",
    priority: "Medium"
  },
  {
    id: "CAT004",
    name: "School Marketing",
    code: "MKT-04",
    budget: 1200000,
    spent: 1350000,
    status: "Over-Budget",
    items: 8,
    lastUpdate: "1 week ago",
    priority: "Low"
  },
  {
    id: "CAT005",
    name: "Infrastructure Repairs",
    code: "MNT-05",
    budget: 3500000,
    spent: 850000,
    status: "Active",
    items: 5,
    lastUpdate: "3 days ago",
    priority: "High"
  }
];

export function CategoryManagement() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getPercentage = (spent: number, budget: number) => {
    return Math.round((spent / budget) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Category Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Categories</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">24</h3>
                <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> +2 added recently
                </p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-blue-50 grid place-items-center text-blue-600 group-hover:scale-110 transition-transform">
                <BarChart3 size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Budget Utilization</p>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">84.2%</h3>
                <p className="text-xs text-slate-500 font-bold mt-1">Average across all sectors</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-amber-50 grid place-items-center text-amber-600 group-hover:scale-110 transition-transform">
                <PieChart size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden group">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Over-Budget Alerts</p>
                <h3 className="text-2xl font-black text-rose-600 tracking-tight">3 Categories</h3>
                <p className="text-xs text-rose-500 font-bold mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> Requires immediate review
                </p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-rose-50 grid place-items-center text-rose-600 group-hover:scale-110 transition-transform">
                <TrendingDown size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Registry Card */}
      <Card className="border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-slate-50 px-6 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-black text-slate-900 tracking-tight">Expense Category Registry</CardTitle>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Define and monitor departmental spending limits</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <Input placeholder="Search categories..." className="pl-9 h-10 rounded-xl bg-slate-50 border-none text-xs" />
              </div>
              <Button className="h-10 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold rounded-xl gap-2 px-5 transition-all">
                <Plus size={16} /> New Category
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-50 hover:bg-transparent">
                <TableHead className="w-[300px] text-[11px] font-black text-slate-400 uppercase tracking-widest py-4 pl-6">Category Details</TableHead>
                <TableHead className="text-[11px] font-black text-slate-400 uppercase tracking-widest py-4">Budget Utilization</TableHead>
                <TableHead className="text-[11px] font-black text-slate-400 uppercase tracking-widest py-4">Status</TableHead>
                <TableHead className="text-[11px] font-black text-slate-400 uppercase tracking-widest py-4 text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="border-slate-50 group hover:bg-slate-50/30 transition-colors">
                  <TableCell className="py-5 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs group-hover:bg-schoolgate-green-light group-hover:text-schoolgate-green transition-colors">
                        {category.code.split('-')[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 tracking-tight">{category.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{category.code} • {category.items} Transactions</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="w-full max-w-[200px] space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-500">{formatCurrency(category.spent)}</span>
                        <span className={category.spent > category.budget ? "text-rose-500" : "text-schoolgate-green"}>
                          {getPercentage(category.spent, category.budget)}%
                        </span>
                      </div>
                      <Progress 
                        value={getPercentage(category.spent, category.budget)} 
                        className="h-1.5 bg-slate-100"
                        indicatorClassName={category.spent > category.budget ? "bg-rose-500" : "bg-schoolgate-green"}
                      />
                      <p className="text-[9px] font-medium text-slate-400 italic">Total Budget: {formatCurrency(category.budget)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-5">
                    <Badge className={`rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                      category.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-none' 
                        : 'bg-rose-50 text-rose-600 border-rose-100 shadow-none'
                    }`}>
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5 text-right pr-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white hover:shadow-sm">
                        <Settings2 size={14} className="text-slate-400" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white hover:shadow-sm">
                            <MoreHorizontal size={14} className="text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-100 shadow-lg">
                          <DropdownMenuItem className="font-bold text-xs p-3">Edit Category</DropdownMenuItem>
                          <DropdownMenuItem className="font-bold text-xs p-3">View Detailed Report</DropdownMenuItem>
                          <DropdownMenuItem className="font-bold text-xs p-3">Adjust Budget</DropdownMenuItem>
                          <DropdownMenuItem className="font-bold text-xs p-3 text-rose-600 focus:text-rose-600">Archive Category</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
