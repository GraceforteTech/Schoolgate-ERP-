import { createFileRoute } from "@tanstack/react-router";
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Banknote, 
  LayoutDashboard, 
  ArrowRight,
  Printer,
  FileText,
  Download,
  Lock,
  RotateCcw,
  Play,
  Eye,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/finance/hr-payroll/processing")({
  component: PayrollProcessingCentre,
});

const processingSteps = [
  { id: 1, name: "Load Employees", status: "Completed", icon: Play },
  { id: 2, name: "Calculate Salaries", status: "Completed", icon: Banknote },
  { id: 3, name: "Apply Allowances", status: "Completed", icon: Plus },
  { id: 4, name: "Apply Deductions", status: "Completed", icon: Filter },
  { id: 5, name: "Validate Payroll", status: "In Progress", icon: ShieldCheck },
  { id: 6, name: "Preview Payroll", status: "Pending", icon: Eye },
  { id: 7, name: "Submit for Approval", status: "Pending", icon: FileText },
  { id: 8, name: "Approve Payroll", status: "Pending", icon: CheckCircle2 },
  { id: 9, name: "Lock Payroll", status: "Pending", icon: Lock },
  { id: 10, name: "Generate Payslips", status: "Pending", icon: Printer },
];

function PayrollProcessingCentre() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-12">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="px-6 py-6 max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
              <Play size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Payroll Processing Engine</h1>
              <p className="text-sm text-muted-foreground mt-1">Generate, review and approve payroll before salary payment.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg">
                <RotateCcw className="h-4 w-4" />
                Re-open Payroll
             </Button>
             <Button className="h-10 gap-2 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg shadow-sm">
                <Play className="h-4 w-4" />
                Start Processing
             </Button>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 max-w-[1600px] mx-auto space-y-6">
        {/* Payroll Info and Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
           <Card className="border-none shadow-sm rounded-[14px]">
              <CardHeader className="border-b border-slate-100 pb-4">
                 <CardTitle className="text-base font-bold">Payroll Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                 <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div className="text-muted-foreground">Academic Session</div>
                    <div className="font-bold text-slate-800">2024/2025</div>
                    <div className="text-muted-foreground">Payroll Month</div>
                    <div className="font-bold text-slate-800">August</div>
                    <div className="text-muted-foreground">Payroll Year</div>
                    <div className="font-bold text-slate-800">2024</div>
                    <div className="text-muted-foreground">Batch Number</div>
                    <div className="font-bold text-slate-800">#PAY-2024-08-01</div>
                    <div className="text-muted-foreground">Payroll Status</div>
                    <Badge className="w-fit bg-amber-50 text-amber-700 border-amber-200 rounded-full font-bold text-[10px]">Processing</Badge>
                    <div className="text-muted-foreground">Processing Date</div>
                    <div className="font-bold text-slate-800">18 Aug, 2024</div>
                 </div>
              </CardContent>
           </Card>

           <Card className="xl:col-span-2 border-none shadow-sm rounded-[14px]">
              <CardHeader className="border-b border-slate-100 pb-4">
                 <CardTitle className="text-base font-bold">Payroll Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Total Employees</p>
                       <p className="text-xl font-extrabold text-slate-900">142</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Gross Salary</p>
                       <p className="text-xl font-extrabold text-slate-900">₦22,540,000</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Total Allowances</p>
                       <p className="text-xl font-extrabold text-slate-900">₦4,250,000</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase">Net Payroll</p>
                       <p className="text-xl font-extrabold text-schoolgate-green">₦18,450,000</p>
                    </div>
                 </div>
                 <div className="mt-8">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-slate-600">Processing Progress</span>
                       <span className="text-xs font-bold text-schoolgate-green">50% Complete</span>
                    </div>
                    <Progress value={50} className="h-2 bg-slate-100 rounded-full overflow-hidden [&>div]:bg-schoolgate-green transition-all" />
                 </div>
              </CardContent>
           </Card>
        </div>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <div className="lg:col-span-3">
              <Card className="border-none shadow-sm rounded-[14px]">
                 <CardHeader className="border-b border-slate-100 pb-4">
                    <CardTitle className="text-base font-bold">Payroll Processing Workflow</CardTitle>
                 </CardHeader>
                 <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {processingSteps.map((step) => (
                         <div 
                           key={step.id} 
                           className={cn(
                             "flex items-center justify-between p-4 rounded-xl border transition-all group cursor-pointer",
                             step.status === "Completed" ? "bg-green-50/50 border-green-100" : 
                             step.status === "In Progress" ? "bg-schoolgate-green-light border-schoolgate-green/30 ring-1 ring-schoolgate-green/10" : 
                             "bg-white border-slate-100"
                           )}
                         >
                            <div className="flex items-center gap-4">
                               <div className={cn(
                                 "h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs",
                                 step.status === "Completed" ? "bg-green-500 text-white" : 
                                 step.status === "In Progress" ? "bg-schoolgate-green text-white animate-pulse" : 
                                 "bg-slate-100 text-slate-400"
                               )}>
                                  {step.status === "Completed" ? <CheckCircle2 className="h-5 w-5" /> : step.id}
                               </div>
                               <div>
                                  <p className={cn("text-sm font-bold", step.status === "Pending" ? "text-slate-400" : "text-slate-800")}>{step.name}</p>
                                  <p className={cn("text-[10px] font-bold uppercase tracking-wider", step.status === "Completed" ? "text-green-600" : step.status === "In Progress" ? "text-schoolgate-green" : "text-slate-400")}>
                                     {step.status}
                                  </p>
                               </div>
                            </div>
                            <step.icon className={cn("h-5 w-5 opacity-40 group-hover:opacity-100 transition-opacity", step.status === "Pending" ? "text-slate-300" : "text-schoolgate-green")} />
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
           </div>

           {/* Sticky Action Panel */}
           <div className="lg:col-span-1">
              <Card className="border-none shadow-sm rounded-[14px] bg-slate-900 text-white sticky top-28 overflow-hidden">
                 <div className="h-1 bg-schoolgate-green"></div>
                 <CardHeader>
                    <CardTitle className="text-base font-bold">Quick Actions</CardTitle>
                    <CardDescription className="text-slate-400 text-xs italic">Step 5: Validate Payroll</CardDescription>
                 </CardHeader>
                 <CardContent className="p-6 space-y-3">
                    <Button className="w-full h-11 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-xl gap-2 font-bold transition-all hover:scale-[1.02]">
                       <ShieldCheck className="h-4 w-4" />
                       Validate Payroll
                    </Button>
                    <Button variant="outline" className="w-full h-11 bg-transparent border-slate-700 hover:bg-slate-800 text-white rounded-xl gap-2 font-bold">
                       <Eye className="h-4 w-4" />
                       Preview Current
                    </Button>
                    <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
                       <p className="text-[10px] text-slate-500 font-bold uppercase">Reports & Export</p>
                       <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" className="h-10 bg-transparent border-slate-800 hover:bg-slate-800 text-white rounded-lg p-0 text-xs">
                             <Printer className="h-3 w-3 mr-1" /> Print Summary
                          </Button>
                          <Button variant="outline" className="h-10 bg-transparent border-slate-800 hover:bg-slate-800 text-white rounded-lg p-0 text-xs">
                             <Download className="h-3 w-3 mr-1" /> Export Excel
                          </Button>
                       </div>
                    </div>
                    <div className="mt-6 p-3 bg-slate-800/50 rounded-xl border border-slate-700 flex gap-3">
                       <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                       <p className="text-[10px] text-slate-400 leading-relaxed">Ensure all allowances and deductions are verified before validation.</p>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}
