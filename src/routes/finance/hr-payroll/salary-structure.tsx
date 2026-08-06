import { createFileRoute } from "@tanstack/react-router";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash, 
  Copy, 
  Eye, 
  Save,
  CreditCard,
  Banknote,
  GraduationCap,
  Briefcase,
  TrendingUp,
  Clock,
  ShieldCheck,
  Gift
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

export const Route = createFileRoute("/finance/hr-payroll/salary-structure")({
  component: SalaryStructurePage,
});

const structures = [
  { id: "STR001", name: "Senior Academic Grade A", basic: "₦150,000", total: "₦285,000", status: "Active" },
  { id: "STR002", name: "Senior Academic Grade B", basic: "₦140,000", total: "₦265,000", status: "Active" },
  { id: "STR003", name: "Junior Academic Grade A", basic: "₦110,000", total: "₦210,000", status: "Active" },
  { id: "STR004", name: "Admin Lead Grade 1", basic: "₦120,000", total: "₦230,000", status: "Active" },
  { id: "STR005", name: "Maintenance Staff Grade 2", basic: "₦45,000", total: "₦85,000", status: "Active" },
];

const earnings = [
  { name: "Basic Salary", amount: "₦150,000", icon: Banknote, color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Housing Allowance", amount: "₦45,000", icon: CreditCard, color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
  { name: "Transport Allowance", amount: "₦30,000", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  { name: "Meal Allowance", amount: "₦15,000", icon: Gift, color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Responsibility Allowance", amount: "₦25,000", icon: ShieldCheck, color: "text-red-600", bg: "bg-red-50" },
  { name: "Teaching Allowance", amount: "₦20,000", icon: GraduationCap, color: "text-indigo-600", bg: "bg-indigo-50" },
];

function SalaryStructurePage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-12">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="px-6 py-6 max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Salary Structure Management</h1>
            <p className="text-sm text-muted-foreground mt-1">Configure earnings, allowances and salary grades for staff members.</p>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg">
                <Search className="h-4 w-4" />
                Find Grade
             </Button>
             <Button className="h-10 gap-2 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg shadow-sm">
                <Plus className="h-4 w-4" />
                Add New Grade
             </Button>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Grade List */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-none shadow-sm rounded-[14px]">
            <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
               <div>
                  <CardTitle className="text-lg font-bold">Salary Grades</CardTitle>
                  <CardDescription>Select a grade to edit its structure</CardDescription>
               </div>
               <div className="flex items-center gap-2">
                  <Input placeholder="Search grades..." className="h-9 w-48 text-xs border-slate-200 rounded-lg" />
                  <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                     <Filter className="h-4 w-4" />
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Grade Name</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Gross Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {structures.map((str) => (
                      <TableRow key={str.id} className="cursor-pointer hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-0">
                        <TableCell className="font-bold text-slate-900 py-4">{str.name}</TableCell>
                        <TableCell className="text-slate-600 font-medium">{str.basic}</TableCell>
                        <TableCell className="text-schoolgate-green font-extrabold">{str.total}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-50 text-green-700 border-green-200 rounded-full font-bold text-[10px]">Active</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-schoolgate-green"><Edit className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-500"><Copy className="h-4 w-4" /></Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500"><Trash className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
               </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right: Structure Editor (Live Preview of selected grade) */}
        <div className="space-y-6">
           <Card className="border-none shadow-sm rounded-[14px] bg-white sticky top-28">
              <CardHeader className="bg-slate-900 rounded-t-[14px] text-white">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                   <Edit className="h-4 w-4 text-schoolgate-green" />
                   Edit Salary Structure
                </CardTitle>
                <CardDescription className="text-slate-400 text-xs">Senior Academic Grade A</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Earnings & Allowances</span>
                      <Button variant="link" className="text-schoolgate-green text-[10px] font-bold p-0">+ Add Component</Button>
                   </div>
                   
                   <div className="space-y-3">
                      {earnings.map((earning, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-schoolgate-green/30 transition-all bg-slate-50/30 group">
                           <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-lg ${earning.bg} flex items-center justify-center ${earning.color}`}>
                                 <earning.icon className="h-4 w-4" />
                              </div>
                              <span className="text-xs font-bold text-slate-700">{earning.name}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-slate-900">{earning.amount}</span>
                              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"><Edit className="h-3 w-3" /></Button>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
                      <div className="flex items-center justify-between">
                         <span className="text-sm font-bold text-slate-500">Gross Monthly Total</span>
                         <span className="text-xl font-black text-schoolgate-green">₦285,000</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <Button variant="outline" className="h-10 rounded-xl gap-2 font-bold border-slate-200">
                            <Eye className="h-4 w-4" />
                            Preview
                         </Button>
                         <Button className="h-10 rounded-xl gap-2 font-bold bg-schoolgate-green hover:bg-schoolgate-green/90 text-white">
                            <Save className="h-4 w-4" />
                            Save
                         </Button>
                      </div>
                   </div>
                </div>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
