import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Printer, 
  FileText, 
  Eye, 
  Edit, 
  Trash,
  UserCheck,
  CheckCircle2,
  XCircle,
  FileSpreadsheet
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/finance/hr-payroll/salary-table")({
  component: EmployeeSalaryTablePage,
});

const salaryData = [
  {
    id: "EMP/001",
    name: "Adebayo Olawale",
    department: "Science",
    designation: "Senior Teacher",
    type: "Permanent",
    grade: "Level 12 Step 4",
    basic: 150000,
    allowances: 45000,
    deductions: 12000,
    paye: 8500,
    pension: 7500,
    net: 167000,
    status: "Verified",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo"
  },
  {
    id: "EMP/002",
    name: "Sarah Johnson",
    department: "Admin",
    designation: "Admin Officer",
    type: "Permanent",
    grade: "Level 10 Step 2",
    basic: 120000,
    allowances: 35000,
    deductions: 8000,
    paye: 6000,
    pension: 6000,
    net: 135000,
    status: "Pending",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "EMP/003",
    name: "Chinedu Okoro",
    department: "Arts",
    designation: "Teacher",
    type: "Contract",
    grade: "L8 S1",
    basic: 95000,
    allowances: 25000,
    deductions: 5000,
    paye: 4500,
    pension: 4750,
    net: 105750,
    status: "Verified",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu"
  }
];

function EmployeeSalaryTablePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = salaryData.filter(row => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (val: number) => `₦${val.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-12">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="px-6 py-6 max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Employee Salary Table</h1>
            <p className="text-sm text-muted-foreground mt-1">Review and verify employee salaries before payroll approval.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg">
                <Printer className="h-4 w-4" />
                Print Table
             </Button>
             <Button className="h-10 gap-2 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg shadow-sm">
                <Download className="h-4 w-4" />
                Export Excel
             </Button>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 max-w-[1600px] mx-auto space-y-4">
        {/* Search & Filter Panel */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-[14px] shadow-sm border border-slate-200/60">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search employee name or ID..." 
              className="pl-9 h-10 border-slate-200 rounded-lg focus-visible:ring-schoolgate-green"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg text-xs font-bold">
              <Filter className="h-4 w-4" />
              Filter By Dept
            </Button>
            <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg text-xs font-bold">
              <CheckCircle2 className="h-4 w-4" />
              Payment Status
            </Button>
          </div>
        </div>

        {/* Master Salary Table */}
        <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-slate-200/60">
          <div className="overflow-x-auto max-h-[70vh]">
            <Table>
              <TableHeader className="bg-slate-50 sticky top-0 z-10 shadow-sm">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[280px]">Employee</TableHead>
                  <TableHead>Grade & Dept</TableHead>
                  <TableHead className="text-right">Basic</TableHead>
                  <TableHead className="text-right">Allowances</TableHead>
                  <TableHead className="text-right">PAYE</TableHead>
                  <TableHead className="text-right">Pension</TableHead>
                  <TableHead className="text-right">Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id} className="group hover:bg-slate-50/80 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-slate-100">
                          <AvatarImage src={row.avatar} />
                          <AvatarFallback className="bg-schoolgate-green-light text-schoolgate-green font-bold text-[10px]">{row.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 group-hover:text-schoolgate-green transition-colors leading-tight">{row.name}</span>
                          <span className="text-[10px] font-bold text-slate-500 uppercase">{row.id}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-slate-700">{row.grade}</span>
                        <span className="text-[10px] text-muted-foreground italic">{row.department}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs font-semibold text-slate-600">{formatCurrency(row.basic)}</TableCell>
                    <TableCell className="text-right text-xs font-semibold text-blue-600">+{formatCurrency(row.allowances)}</TableCell>
                    <TableCell className="text-right text-xs font-semibold text-red-500">-{formatCurrency(row.paye)}</TableCell>
                    <TableCell className="text-right text-xs font-semibold text-orange-600">-{formatCurrency(row.pension)}</TableCell>
                    <TableCell className="text-right">
                      <span className="text-sm font-black text-schoolgate-green">{formatCurrency(row.net)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "rounded-full text-[9px] font-black px-2 py-0 uppercase",
                        row.status === "Verified" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
                      )}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-slate-200"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200 shadow-xl">
                          <DropdownMenuItem className="gap-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green"><Edit className="h-4 w-4" /> Adjust Salary</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green"><FileText className="h-4 w-4" /> View Payslip</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
