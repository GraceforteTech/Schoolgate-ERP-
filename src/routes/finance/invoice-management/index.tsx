import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Search,
  Plus,
  Layers,
  FileSpreadsheet,
  Printer,
  RefreshCw,
  MoreVertical,
  Eye,
  Edit,
  Download,
  Mail,
  MessageSquare,
  XCircle,
  History,
  TrendingUp,
  Filter,
  ArrowLeft
} from "lucide-react";
import { ComponentType, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNav } from "@/components/top-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/finance/invoice-management/")({
  head: () => ({
    meta: [
      { title: "Invoice Management — Schoolgate ERP" },
      { name: "description", content: "Generate, monitor and manage student fee invoices efficiently." },
    ],
  }),
  component: InvoiceManagementPage,
});

function InvoiceManagementPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<any>(mockInvoices[0]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-page-background">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopNav />
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-[1600px] space-y-6">
              {/* Page Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
                  <FileText size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Invoice Management
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Generate, monitor and manage student fee invoices efficiently.
                  </p>
                </div>
              </div>

              {/* Module 2: Executive Invoice KPI Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
                <KPICard label="Total Invoices" value="1,284" icon={FileText} color="blue" />
                <KPICard label="Total Value" value="₦42.5M" icon={DollarSign} color="green" />
                <KPICard label="Paid Invoices" value="842" icon={CheckCircle2} color="green" />
                <KPICard label="Partially Paid" value="156" icon={Clock} color="amber" />
                <KPICard label="Unpaid Invoices" value="212" icon={AlertCircle} color="rose" />
                <KPICard label="Overdue" value="74" icon={XCircle} color="rose" />
                <KPICard label="Today's Invoices" value="12" icon={Calendar} color="indigo" />
                <KPICard label="Today's Value" value="₦1.2M" icon={TrendingUp} color="indigo" />
              </div>

              {/* Module 3: Professional Action Bar */}
              <Card className="rounded-[14px] border-0 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <FilterSelect placeholder="Session" options={[{ label: "2023/2024", value: "23-24" }]} />
                      <FilterSelect placeholder="Term" options={[{ label: "First Term", value: "1st" }]} />
                      <FilterSelect placeholder="School" options={[{ label: "Secondary", value: "sec" }]} />
                      <FilterSelect placeholder="Class" options={[{ label: "JSS 1", value: "jss1" }]} />
                      <FilterSelect placeholder="Invoice Status" options={[{ label: "Active", value: "active" }]} />
                      <FilterSelect placeholder="Payment Status" options={[{ label: "Paid", value: "paid" }]} />
                      
                      <div className="relative w-full sm:w-48">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search Student..." className="h-9 pl-9 text-xs" />
                      </div>
                      <div className="relative w-full sm:w-48">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Invoice No..." className="h-9 pl-9 text-xs" />
                      </div>
                      <Input type="date" className="h-9 w-full sm:w-40 text-xs" />
                    </div>

                    <div className="flex flex-wrap items-center justify-between border-t pt-4">
                      <div className="flex gap-2">
                        <Button className="h-9 gap-2 rounded-lg bg-schoolgate-green hover:bg-schoolgate-green/90">
                          <Plus className="h-4 w-4" /> Generate Invoice
                        </Button>
                        <Button variant="outline" className="h-9 gap-2">
                          <Layers className="h-4 w-4" /> Bulk Generate
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-9 gap-2">
                          <FileSpreadsheet className="h-4 w-4 text-emerald-600" /> Export Excel
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 gap-2">
                          <FileText className="h-4 w-4 text-rose-600" /> Export PDF
                        </Button>
                        <Button variant="ghost" size="sm" className="h-9 gap-2">
                          <Printer className="h-4 w-4" /> Print
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 xl:grid-cols-12">
                {/* Module 4: Invoice Table */}
                <div className="xl:col-span-8 space-y-6">
                  <Card className="rounded-[14px] border-0 bg-white shadow-sm overflow-hidden">
                    <CardHeader className="border-b py-4">
                      <CardTitle className="text-base font-semibold">Invoices List</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-page-background/50 text-left text-xs font-medium uppercase text-muted-foreground">
                              <th className="px-6 py-4">Invoice No</th>
                              <th className="px-6 py-4">Student Name</th>
                              <th className="px-6 py-4">Class</th>
                              <th className="px-6 py-4">Date</th>
                              <th className="px-6 py-4 text-right">Amount</th>
                              <th className="px-6 py-4 text-center">Status</th>
                              <th className="px-6 py-4"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {mockInvoices.map((invoice) => (
                              <tr 
                                key={invoice.number} 
                                className="group cursor-pointer hover:bg-schoolgate-green/5 transition-colors"
                                onClick={() => setSelectedInvoice(invoice)}
                              >
                                <td className="px-6 py-4 font-medium text-schoolgate-green">{invoice.number}</td>
                                <td className="px-6 py-4">
                                  <div className="font-medium">{invoice.student}</div>
                                  <div className="text-[10px] text-muted-foreground">{invoice.admissionNo}</div>
                                </td>
                                <td className="px-6 py-4 text-xs">{invoice.class}</td>
                                <td className="px-6 py-4 text-xs text-muted-foreground">{invoice.date}</td>
                                <td className="px-6 py-4 text-right font-semibold tabular-nums">₦{invoice.totalAmount.toLocaleString()}</td>
                                <td className="px-6 py-4 text-center">
                                  <Badge className={cn("rounded-full font-medium text-[10px]", getStatusStyles(invoice.paymentStatus))}>
                                    {invoice.paymentStatus}
                                  </Badge>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem className="gap-2 text-xs"><Eye className="h-3.5 w-3.5" /> View</DropdownMenuItem>
                                      <DropdownMenuItem className="gap-2 text-xs"><Edit className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                                      <DropdownMenuItem className="gap-2 text-xs text-rose-600"><XCircle className="h-3.5 w-3.5" /> Cancel</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Module 6: Invoice Analytics (Compact Charts Placeholders) */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Card className="rounded-[14px] border-0 bg-white shadow-sm">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-semibold">Payment Status Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="flex h-48 items-center justify-center">
                         <div className="relative h-32 w-32 rounded-full border-[12px] border-emerald-500 border-l-rose-500 border-b-amber-500">
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-xl font-bold">84%</span>
                                <span className="text-[10px] text-muted-foreground uppercase">Paid</span>
                            </div>
                         </div>
                      </CardContent>
                    </Card>
                    <Card className="rounded-[14px] border-0 bg-white shadow-sm">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-semibold">Average Payment Time</CardTitle>
                      </CardHeader>
                      <CardContent className="flex h-48 flex-col items-center justify-center space-y-2">
                         <span className="text-4xl font-bold text-schoolgate-green">4.2 Days</span>
                         <span className="text-xs text-muted-foreground">Average time from invoice to full payment</span>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Module 5: Invoice Preview Panel */}
                <div className="xl:col-span-4 space-y-6">
                  {selectedInvoice && (
                    <Card className="rounded-[14px] border-0 bg-white shadow-lg overflow-hidden sticky top-6">
                      <CardContent className="p-0">
                        {/* Preview Header Actions */}
                        <div className="flex items-center justify-between border-b bg-page-background/50 px-6 py-3">
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Invoice Preview</span>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Printer className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-schoolgate-green"><Mail className="h-4 w-4" /></Button>
                          </div>
                        </div>

                        {/* Invoice Content */}
                        <div className="p-8 space-y-8 bg-white min-h-[600px]">
                           {/* School Info */}
                           <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                 <div className="h-12 w-12 rounded-lg bg-schoolgate-green flex items-center justify-center text-white">
                                    <FileText className="h-6 w-6" />
                                 </div>
                                 <div>
                                    <h2 className="font-bold text-lg leading-tight">Schoolgate International</h2>
                                    <p className="text-[10px] text-muted-foreground">Premium Education Excellence</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <h3 className="font-bold text-schoolgate-green text-xl">{selectedInvoice.number}</h3>
                                 <p className="text-[10px] text-muted-foreground">Date: {selectedInvoice.date}</p>
                              </div>
                           </div>

                           {/* Student Info */}
                           <div className="grid grid-cols-2 gap-8 py-6 border-y border-dashed">
                              <div className="space-y-1">
                                 <p className="text-[10px] uppercase font-bold text-muted-foreground">Bill To:</p>
                                 <p className="font-bold">{selectedInvoice.student}</p>
                                 <p className="text-xs text-muted-foreground">{selectedInvoice.class} | {selectedInvoice.admissionNo}</p>
                              </div>
                              <div className="space-y-1 text-right">
                                 <p className="text-[10px] uppercase font-bold text-muted-foreground">Parent Info:</p>
                                 <p className="font-bold">John Doe</p>
                                 <p className="text-xs text-muted-foreground">+234 812 345 6789</p>
                              </div>
                           </div>

                           {/* Fee Breakdown */}
                           <div className="space-y-4">
                              <table className="w-full text-xs">
                                 <thead>
                                    <tr className="border-b text-muted-foreground">
                                       <th className="text-left py-2 font-medium">Description</th>
                                       <th className="text-right py-2 font-medium">Amount</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y">
                                    <tr>
                                       <td className="py-3">Tuition Fees - 2024 First Term</td>
                                       <td className="py-3 text-right">₦120,000</td>
                                    </tr>
                                    <tr>
                                       <td className="py-3">Sports & Facilities</td>
                                       <td className="py-3 text-right">₦15,000</td>
                                    </tr>
                                    <tr>
                                       <td className="py-3 text-emerald-600 italic">Sibling Discount (10%)</td>
                                       <td className="py-3 text-right text-emerald-600">-₦12,000</td>
                                    </tr>
                                 </tbody>
                                 <tfoot>
                                    <tr className="border-t font-bold">
                                       <td className="py-4">Total Amount Due</td>
                                       <td className="py-4 text-right text-lg text-schoolgate-green">₦123,000</td>
                                    </tr>
                                 </tfoot>
                              </table>
                           </div>

                           {/* Module 7: Timeline & Audit Trail (Integrated in Preview) */}
                           <div className="pt-8 space-y-4">
                              <h4 className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                                 <History className="h-3 w-3" /> Activity History
                              </h4>
                              <div className="space-y-3">
                                 <ActivityItem time="Today, 09:12" action="Invoice Generated" user="Ada O." />
                                 <ActivityItem time="Today, 09:15" action="WhatsApp Sent" user="System" />
                                 <ActivityItem time="Yesterday, 14:20" action="Viewed by Parent" user="Web Portal" />
                              </div>
                           </div>

                           {/* QR & Payment */}
                           <div className="pt-8 flex items-center justify-between">
                              <div className="flex flex-col gap-1">
                                 <p className="text-[10px] font-bold text-muted-foreground uppercase">Scan to Pay</p>
                                 <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                    <div className="h-12 w-12 border-2 border-slate-300 border-dashed" />
                                 </div>
                              </div>
                              <div className="text-right space-y-1">
                                 <Button size="sm" className="h-8 gap-2 bg-emerald-600 hover:bg-emerald-700">
                                    <MessageSquare className="h-3 w-3" /> WhatsApp Parent
                                 </Button>
                                 <p className="text-[9px] text-muted-foreground">Generated by Schoolgate ERP v2.4</p>
                              </div>
                           </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 p-4 bg-page-background/30 border-t">
                           <Button variant="outline" className="h-9 gap-2 text-xs"><Printer className="h-3.5 w-3.5" /> Print A4</Button>
                           <Button variant="outline" className="h-9 gap-2 text-xs"><Printer className="h-3.5 w-3.5" /> Thermal</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function KPICard({ 
  label, 
  value, 
  icon: Icon, 
  color 
}: { 
  label: string; 
  value: string; 
  icon: ComponentType<{ className?: string }>; 
  color: string 
}) {
  const colorStyles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <Card className="group cursor-pointer rounded-[14px] border-0 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl", colorStyles[color])}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-lg font-bold text-foreground">{value}</p>
          <p className="text-[10px] font-medium uppercase text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FilterSelect({ placeholder, options }: { placeholder: string; options: { label: string; value: string }[] }) {
  return (
    <Select>
      <SelectTrigger className="h-9 w-[130px] rounded-lg border-border bg-white text-xs">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ActivityItem({ time, action, user }: { time: string; action: string; user: string }) {
  return (
    <div className="flex gap-3 text-[11px]">
      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-schoolgate-green" />
      <div className="flex-1 space-y-0.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-foreground">{action}</span>
          <span className="text-muted-foreground">{time}</span>
        </div>
        <div className="text-muted-foreground">Performed by {user}</div>
      </div>
    </div>
  );
}

function getStatusStyles(status: string) {
  switch (status) {
    case "Paid":
      return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "Partially Paid":
      return "bg-amber-50 text-amber-700 border-amber-100";
    case "Unpaid":
      return "bg-slate-100 text-slate-700 border-slate-200";
    case "Overdue":
      return "bg-rose-50 text-rose-700 border-rose-100";
    default:
      return "bg-slate-50 text-slate-600";
  }
}

const mockInvoices = [
  {
    number: "INV-2024-001",
    student: "Adeyemi, Tunde",
    admissionNo: "SCH/2022/104",
    school: "Secondary",
    class: "SS 1B",
    date: "06 Aug 2024",
    totalAmount: 123000,
    paymentStatus: "Paid",
  },
  {
    number: "INV-2024-002",
    student: "Obi, Chinedu",
    admissionNo: "SCH/2021/452",
    school: "Secondary",
    class: "JSS 2A",
    date: "06 Aug 2024",
    totalAmount: 115000,
    paymentStatus: "Partially Paid",
  },
  {
    number: "INV-2024-003",
    student: "Ibrahim, Aisha",
    admissionNo: "SCH/2023/089",
    school: "Primary",
    class: "Primary 4",
    date: "05 Aug 2024",
    totalAmount: 85000,
    paymentStatus: "Unpaid",
  },
  {
    number: "INV-2024-004",
    student: "Smith, John",
    admissionNo: "SCH/2020/221",
    school: "Secondary",
    class: "SS 3C",
    date: "01 Aug 2024",
    totalAmount: 145000,
    paymentStatus: "Overdue",
  },
];
