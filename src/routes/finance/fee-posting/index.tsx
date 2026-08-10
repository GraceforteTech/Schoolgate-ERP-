import { useState, useEffect } from "react";
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  LayoutDashboard, 
  CreditCard, 
  User, 
  ShieldCheck,
  History,
  TrendingUp,
  Download,
  Printer,
  ChevronDown,
  Info,
  Clock,
  Plus,
  AlertTriangle

} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNav } from "@/components/top-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FeePostingKPIs } from "@/components/finance/fee-posting/fee-posting-kpis";
import { ManualFeePosting } from "@/components/finance/fee-posting/manual-posting";
import { FeePostingSpreadsheet } from "@/components/finance/fee-posting-spreadsheet";
import { EnhancedAuditTrail } from "@/components/finance/enhanced-audit-trail";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { exportToCSV } from "@/lib/csv-export";
import { toast } from "sonner";
import { cn } from "@/lib/utils";



export const Route = createFileRoute("/finance/fee-posting/")({
  head: () => ({
    meta: [
      { title: "School Fee Posting & B/F Management — Schoolgate ERP" },
      { name: "description", content: "Premium enterprise-grade fee posting module for bulk and individual student financial management." },
    ],
  }),
  component: FeePostingPage,
});

function FeePostingPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F5F7FA]">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopNav />
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-slate-900">School Fee Posting</h1>
                  <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-schoolgate-green" />
                    Manage term fees, B/F debts, scholarships and financial adjustments.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="h-10 rounded-xl bg-white border-slate-200 font-bold gap-2 text-slate-600"
                    onClick={() => {
                      // Logic for exporting general fee posting reports
                      toast.info("Generating full financial report...");
                    }}
                  >
                    <Download size={16} /> Export Reports
                  </Button>

                  <Button variant="outline" className="h-10 rounded-xl bg-white border-slate-200 font-bold gap-2 text-slate-600">
                    <Printer size={16} /> Batch Statement
                  </Button>
                  <Button className="h-10 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-xl font-black gap-2 shadow-lg shadow-schoolgate-green/20">
                    <TrendingUp size={18} /> New Fee Schedule
                  </Button>
                </div>
              </div>

              {/* Tabs Layout */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                  <TabsList className="bg-transparent h-auto p-0 gap-1 flex-wrap justify-start">
                    <TabButton value="dashboard" icon={LayoutDashboard} label="Overview" />
                    <TabButton value="spreadsheet" icon={FileSpreadsheet} label="Spreadsheet Posting" />
                    <TabButton value="manual" icon={User} label="Manual Posting" />
                    <TabButton value="audit" icon={History} label="Audit Trail" />
                  </TabsList>
                  
                  {/* Global Filters Context */}
                  <div className="flex flex-wrap items-center gap-2 pr-2 border-t lg:border-t-0 pt-2 lg:pt-0">
                    <Select defaultValue="2024">
                      <SelectTrigger className="w-[110px] h-9 rounded-xl border-slate-200 text-xs font-bold">
                        <SelectValue placeholder="Session" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100">
                        <SelectItem value="2024">2024/2025</SelectItem>
                        <SelectItem value="2023">2023/2024</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-[90px] h-9 rounded-xl border-slate-200 text-xs font-bold">
                        <SelectValue placeholder="Term" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-slate-100">
                        <SelectItem value="1">1st Term</SelectItem>
                        <SelectItem value="2">2nd Term</SelectItem>
                        <SelectItem value="3">3rd Term</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="dashboard" className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                  <FeePostingKPIs isLoading={isLoading} />
                  
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-6">
                       <Alert className="bg-emerald-50 border-emerald-100 text-emerald-800 rounded-[20px] p-5">
                         <div className="flex gap-4">
                           <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-schoolgate-green shrink-0 shadow-sm">
                             <TrendingUp size={20} />
                           </div>
                           <div>
                             <AlertTitle className="text-base font-black mb-1">Fee Posting Accuracy: 98.4%</AlertTitle>
                             <AlertDescription className="text-sm font-medium opacity-80 leading-relaxed">
                               Excellent! Most students in JSS 1 and SS 3 have already been posted. Check the <strong>Bulk Posting Worksheet</strong> to finalize the remaining 142 students.
                             </AlertDescription>
                             <Button variant="link" className="p-0 h-auto text-emerald-900 font-bold mt-2 hover:no-underline flex items-center gap-1 group">
                               Jump to Spreadsheet <ChevronDown size={14} className="-rotate-90 group-hover:translate-x-0.5 transition-transform" />
                             </Button>
                           </div>
                         </div>
                       </Alert>

                       <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 overflow-hidden relative">
                          <div className="absolute top-0 right-0 p-8 opacity-5">
                            <CreditCard size={120} />
                          </div>
                          <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                             Quick Student Search & Edit
                          </h3>
                          <div className="flex gap-3 mb-8">
                             <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <Input 
                                   placeholder="Search by name, admission no, or parent..." 
                                   className="h-12 pl-12 rounded-xl border-slate-200 text-sm font-medium bg-slate-50/30" 
                                />
                             </div>
                             <Button className="h-12 px-6 bg-slate-900 text-white rounded-xl font-bold">Search</Button>
                          </div>
                          
                          <div className="space-y-4">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Suggested Recent Adjustments</p>
                             {[
                                { name: "Adebayo Tunde", class: "JSS 1A", type: "Scholarship", amount: "-₦40,000" },
                                { name: "Ibrahim Musa", class: "SS 2B", type: "Staff Child", amount: "-₦15,000" },
                                { name: "Grace Okon", class: "Primary 4", type: "Sibling Disc", amount: "-₦5,000" }
                             ].map((student, i) => (
                               <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200 transition-all cursor-pointer group">
                                 <div className="flex items-center gap-4">
                                   <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-slate-400 border border-slate-100 font-bold text-xs uppercase">
                                     {student.name.split(' ').map(n => n[0]).join('')}
                                   </div>
                                   <div>
                                     <p className="text-sm font-bold text-slate-900">{student.name}</p>
                                     <p className="text-[11px] font-medium text-slate-500">{student.class} • {student.type}</p>
                                   </div>
                                 </div>
                                 <div className="text-right">
                                   <p className="text-sm font-black text-emerald-600">{student.amount}</p>
                                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter group-hover:text-schoolgate-green transition-colors">Edit Adjustment</p>
                                 </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>

                    <div className="lg:col-span-4 space-y-6">
                       <Card className="rounded-[24px] border-none shadow-sm bg-slate-900 text-white overflow-hidden p-6 relative group">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-schoolgate-green/20 rounded-full -mr-16 -mt-16 blur-3xl transition-all duration-700 group-hover:bg-schoolgate-green/30" />
                          <h3 className="text-base font-black mb-1 flex items-center gap-2">
                             <Info size={18} className="text-schoolgate-green" />
                             Bursar's Pro Tip
                          </h3>
                          <p className="text-xs font-medium text-slate-400 leading-relaxed mb-6">
                             Use the <strong>Spreadsheet Posting</strong> mode to quickly apply B/F balances from previous session reports. It's 4x faster than manual entry.
                          </p>
                          <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl h-11 font-black gap-2" onClick={() => setActiveTab('spreadsheet')}>
                             <FileSpreadsheet size={18} /> Open Spreadsheet
                          </Button>
                       </Card>

                       <Card className="rounded-[24px] border-none shadow-sm bg-white overflow-hidden">
                          <CardHeader className="p-6 border-b border-slate-100">
                             <CardTitle className="text-sm font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                                <History size={16} className="text-slate-400" />
                                Recent Activity Log
                             </CardTitle>
                          </CardHeader>
                          <CardContent className="p-6">
                             <div className="space-y-6 relative before:absolute before:inset-0 before:left-3 before:w-px before:bg-slate-100">
                                {[
                                  { user: "Adaeze O.", action: "Posted JSS 1 Fees", time: "10 mins ago" },
                                  { user: "System", action: "Auto-calculated B/F", time: "2 hours ago" },
                                  { user: "Ibrahim B.", action: "Approved Discount", time: "Yesterday" }
                                ].map((log, i) => (
                                  <div key={i} className="flex gap-4 relative">
                                    <div className="h-6 w-6 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center shrink-0 z-10">
                                      <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                    </div>
                                    <div className="pt-0.5">
                                      <p className="text-xs font-bold text-slate-800">{log.action}</p>
                                      <p className="text-[10px] font-medium text-slate-400">{log.user} • {log.time}</p>
                                    </div>
                                  </div>
                                ))}
                             </div>
                             <Button variant="ghost" className="w-full mt-6 text-[11px] font-black uppercase text-slate-400 hover:text-schoolgate-green tracking-widest">
                                View Full Audit Trail
                             </Button>
                          </CardContent>
                       </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="spreadsheet" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="space-y-6">
                     <Alert className="bg-slate-900 text-slate-300 border-none rounded-[20px] p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded-xl bg-white/10 text-schoolgate-green">
                              <Info size={20} />
                           </div>
                           <p className="text-sm font-medium">
                              <strong className="text-white">Keyboard Power:</strong> Use Arrow Keys to navigate, Tab for next cell, Enter to edit, and Ctrl+C/V to copy values.
                           </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-slate-500 hover:text-white h-8 text-[10px] font-black uppercase tracking-widest">Dismiss</Button>
                     </Alert>
                     <FeePostingSpreadsheet isLoading={isLoading} />
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="animate-in fade-in slide-in-from-right-4 duration-500">
                   <ManualFeePosting />
                </TabsContent>

                <TabsContent value="audit" className="animate-in fade-in slide-in-from-left-4 duration-500">
                   <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm">
                         <div className="flex flex-wrap items-center gap-3">
                            <div className="relative">
                               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                               <Input placeholder="Filter by user or action..." className="h-9 w-64 pl-10 rounded-xl border-slate-200 text-xs font-medium" />
                            </div>
                            <Button variant="outline" className="h-9 rounded-xl border-slate-200 gap-2 text-xs font-bold px-4">
                               <Filter size={14} /> All Roles
                            </Button>
                            <Button variant="outline" className="h-9 rounded-xl border-slate-200 gap-2 text-xs font-bold px-4">
                               <Clock size={14} /> Today
                            </Button>
                         </div>
                         <Button 
                           variant="ghost" 
                           className="h-9 text-schoolgate-green text-xs font-black uppercase tracking-widest gap-2"
                           onClick={() => {
                             toast.info("Navigating to full audit log for advanced export...");
                           }}
                         >
                            <Download size={14} /> Export Audit CSV
                         </Button>

                      </div>
                      <EnhancedAuditTrail />
                   </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function TabButton({ value, icon: Icon, label }: { value: string; icon: any; label: string }) {
  return (
    <TabsTrigger 
      value={value}
      className={cn(
        "h-10 px-6 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all duration-300",
        "data-[state=active]:bg-schoolgate-green data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-schoolgate-green/20",
        "data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:bg-slate-50 data-[state=inactive]:hover:text-slate-600"
      )}
    >
      <Icon size={16} />
      {label}
    </TabsTrigger>
  );
}
