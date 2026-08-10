import { createFileRoute } from "@tanstack/react-router";
import {
  Users,
  AlertCircle,
  CreditCard,
  Clock,
  CheckCircle2,
  RotateCcw,
  ArrowUpRight,
  Wallet,
  FileSpreadsheet,
  FileText,
  Printer,
  History,
  Filter,
  Search,
  ChevronRight,
  Plus,
} from "lucide-react";
import { ComponentType } from "react";

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

export const Route = createFileRoute("/finance/adjustment-management")({
  head: () => ({
    meta: [
      { title: "Adjustment & Outstanding Management — Schoolgate ERP" },
      { name: "description", content: "Accountant Financial Adjustment & Outstanding Management module." },
    ],
  }),
  component: AdjustmentManagementPage,
});

function AdjustmentManagementPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-page-background">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopNav />
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Page Header */}
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
                  <Banknote size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Individual Fee Adjustment
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Manage student balances, manual adjustments, and financial history with full auditability.
                  </p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                  label="Students with B/F"
                  value="42"
                  icon={Users}
                  onClick={() => console.log("Filter: Students with B/F")}
                />
                <SummaryCard
                  label="Outstanding Balance"
                  value="₦4,250,000"
                  icon={AlertCircle}
                  variant="warning"
                  onClick={() => console.log("Filter: Outstanding")}
                />
                <SummaryCard
                  label="Credit Balance"
                  value="₦850,000"
                  icon={CreditCard}
                  variant="success"
                  onClick={() => console.log("Filter: Credit")}
                />
                <SummaryCard
                  label="Pending Adjustments"
                  value="5"
                  icon={Clock}
                  onClick={() => console.log("Filter: Pending")}
                />
                <SummaryCard
                  label="Approved Adjustments"
                  value="128"
                  icon={CheckCircle2}
                  onClick={() => console.log("Filter: Approved")}
                />
                <SummaryCard
                  label="Reversed Adjustments"
                  value="2"
                  icon={RotateCcw}
                  onClick={() => console.log("Filter: Reversed")}
                />
                <SummaryCard
                  label="Total Outstanding"
                  value="₦12,450,000"
                  icon={ArrowUpRight}
                  onClick={() => console.log("Filter: Total Outstanding")}
                />
                <SummaryCard
                  label="Total Student Credits"
                  value="₦2,100,000"
                  icon={Wallet}
                  onClick={() => console.log("Filter: Total Credits")}
                />
              </div>

              {/* Action Bar */}
              <Card className="rounded-[14px] border-0 bg-white shadow-sm">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search student or transaction..."
                          className="h-9 rounded-lg border-border pl-9 pr-4 text-sm"
                        />
                      </div>
                      <FilterSelect
                        placeholder="Transaction Type"
                        options={[
                          { label: "All Types", value: "all" },
                          { label: "B/F Posting", value: "bf" },
                          { label: "Adjustment", value: "adjustment" },
                          { label: "Payment", value: "payment" },
                        ]}
                      />
                      <FilterSelect
                        placeholder="Status"
                        options={[
                          { label: "All Status", value: "all" },
                          { label: "Pending", value: "pending" },
                          { label: "Approved", value: "approved" },
                          { label: "Rejected", value: "rejected" },
                        ]}
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button className="h-9 gap-2 rounded-lg bg-schoolgate-green hover:bg-schoolgate-green/90">
                        <Plus className="h-4 w-4" />
                        New Adjustment
                      </Button>
                      <Button variant="outline" className="h-9 gap-2 rounded-lg">
                        <FileSpreadsheet className="h-4 w-4" />
                        Import B/F
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg">
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main Sections */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Outstanding Breakdown & Student Context (Mock) */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="rounded-[14px] border-0 bg-white shadow-sm overflow-hidden">
                    <CardHeader className="bg-schoolgate-green/5 border-b py-4">
                      <CardTitle className="text-sm font-semibold text-schoolgate-green">
                        Outstanding Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        <BreakdownItem label="Expected School Fees" value="₦150,000" />
                        <BreakdownItem label="Previous Balance (B/F)" value="₦25,000" />
                        <BreakdownItem label="Current Charges" value="₦175,000" />
                        <BreakdownItem label="Extra Charges" value="₦5,000" />
                        <BreakdownItem label="Discounts" value="-₦10,000" color="text-schoolgate-green" />
                        <BreakdownItem label="Scholarships" value="₦0" />
                        <div className="bg-page-background/50 px-5 py-3">
                          <BreakdownItem label="Total Due" value="₦195,000" isBold />
                          <BreakdownItem label="Total Paid" value="₦100,000" isBold color="text-schoolgate-green" />
                          <BreakdownItem 
                            label="Outstanding Balance" 
                            value="₦95,000" 
                            isBold 
                            color="text-destructive" 
                            className="mt-2 pt-2 border-t border-dashed border-border"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-[14px] border-0 bg-white shadow-sm">
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2 p-4 pt-0">
                      <Button variant="outline" className="w-full justify-start gap-2 rounded-lg text-xs">
                        <Plus className="h-3 w-3" /> Add Previous Balance
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 rounded-lg text-xs">
                        <RotateCcw className="h-3 w-3" /> Manual Outstanding Posting
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-2 rounded-lg text-xs">
                        <CreditCard className="h-3 w-3" /> Manage Credits
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Audit Trail & History */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="rounded-[14px] border-0 bg-white shadow-sm">
                    <CardHeader className="border-b px-6 py-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">Audit Trail & Transaction History</CardTitle>
                        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-muted-foreground">
                          <History className="h-3.5 w-3.5" /> View Full Logs
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-page-background/50 text-left text-xs font-medium uppercase text-muted-foreground">
                              <th className="px-6 py-3">Date/Time</th>
                              <th className="px-6 py-3">Student</th>
                              <th className="px-6 py-3">Action</th>
                              <th className="px-6 py-3">Amount</th>
                              <th className="px-6 py-3">Status</th>
                              <th className="px-6 py-3">Performed By</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <AuditRow 
                              date="06 Aug 2026, 09:12"
                              student="Obi, Chinedu (JSS 2A)"
                              action="Fee Adjustment"
                              amount="+₦5,000"
                              status="Approved"
                              user="Ada Okonkwo"
                              details={{ prev: "₦75,000", next: "₦80,000", reason: "Late Enrollment" }}
                            />
                            <AuditRow 
                              date="05 Aug 2026, 14:45"
                              student="Adeyemi, Tunde (SS 1B)"
                              action="B/F Migration"
                              amount="₦12,500"
                              status="Approved"
                              user="System"
                            />
                            <AuditRow 
                              date="05 Aug 2026, 10:20"
                              student="Ibrahim, Aisha (Primary 4)"
                              action="Discount Applied"
                              amount="-₦2,500"
                              status="Pending"
                              user="Bello Ibrahim"
                            />
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  variant = "default",
  onClick,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  variant?: "default" | "warning" | "success";
  onClick?: () => void;
}) {
  const variantStyles = {
    default: "bg-schoolgate-green-light text-schoolgate-green",
    warning: "bg-amber-50 text-amber-600",
    success: "bg-emerald-50 text-emerald-600",
  };

  return (
    <Card 
      className="group cursor-pointer rounded-[14px] border-0 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="flex flex-col gap-3 p-5">
        <div className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl transition-colors group-hover:bg-opacity-80",
          variantStyles[variant]
        )}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xl font-bold tracking-tight text-foreground">{value}</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function BreakdownItem({ 
  label, 
  value, 
  color, 
  isBold, 
  className 
}: { 
  label: string; 
  value: string; 
  color?: string; 
  isBold?: boolean; 
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between px-5 py-2.5", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn(
        "text-sm tabular-nums", 
        isBold ? "font-bold" : "font-medium",
        color || "text-foreground"
      )}>
        {value}
      </span>
    </div>
  );
}

function AuditRow({ 
  date, 
  student, 
  action, 
  amount, 
  status, 
  user,
  details
}: { 
  date: string; 
  student: string; 
  action: string; 
  amount: string; 
  status: string; 
  user: string;
  details?: { prev: string; next: string; reason: string };
}) {
  const statusColors = {
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Reversed: "bg-rose-50 text-rose-700 border-rose-100",
    Rejected: "bg-slate-50 text-slate-700 border-slate-100",
  };

  return (
    <tr className="hover:bg-page-background/30 transition-colors group">
      <td className="whitespace-nowrap px-6 py-4 text-xs text-muted-foreground">{date}</td>
      <td className="px-6 py-4">
        <div className="font-medium text-foreground">{student}</div>
        {details && (
          <div className="mt-1 text-[10px] text-slate-400 font-medium">
            {details.reason}
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <Badge variant="outline" className="rounded-md border-border font-normal text-[10px] uppercase">
          {action}
        </Badge>
        {details && (
          <div className="mt-1 text-[9px] text-slate-400">
            {details.prev} → {details.next}
          </div>
        )}
      </td>
      <td className={cn(
        "px-6 py-4 font-semibold tabular-nums text-sm",
        amount.startsWith("+") ? "text-destructive" : amount.startsWith("-") ? "text-schoolgate-green" : "text-foreground"
      )}>
        {amount}
      </td>
      <td className="px-6 py-4">
        <Badge className={cn("rounded-full border px-2 py-0 font-medium text-[10px]", statusColors[status as keyof typeof statusColors])}>
          {status}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <div className="text-xs text-muted-foreground font-medium">{user}</div>
        <div className="text-[9px] text-slate-400">IP: 192.168.1.XX</div>
      </td>
    </tr>
  );
}

function FilterSelect({ placeholder, options }: { placeholder: string; options: { label: string; value: string }[] }) {
  return (
    <Select>
      <SelectTrigger className="h-9 w-[160px] rounded-lg border-border bg-white text-sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
