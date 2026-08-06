import { createFileRoute } from "@tanstack/react-router";
import { 
  Plus, 
  FileText, 
  FileSpreadsheet, 
  Printer, 
  RefreshCcw, 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  Banknote,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/finance/expense-management/")({
  component: ExpenseManagementPage,
});

function KPIStatCard({ title, value, icon: Icon, trend, trendLabel }: { title: string, value: string, icon: any, trend?: string, trendLabel?: string }) {
  return (
    <Card className="rounded-[14px] hover:shadow-md transition-all duration-200 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-schoolgate-green-light rounded-xl group-hover:bg-schoolgate-green/10 transition-colors">
            <Icon className="h-6 w-6 text-schoolgate-green" />
          </div>
          {trend && (
            <span className={cn("text-xs font-medium px-2 py-1 rounded-full", trend.startsWith('+') ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
              {trend} {trendLabel}
            </span>
          )}
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-foreground">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function ExpenseManagementPage() {
  return (
    <div className="min-h-screen bg-page-background p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Expense Management</h1>
        <p className="text-muted-foreground mt-1">Record, approve and monitor all school expenditures.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <KPIStatCard title="Today's Expenses" value="₦45,200" icon={Banknote} />
        <KPIStatCard title="This Month's" value="₦1,250,000" icon={DollarSign} />
        <KPIStatCard title="Budget Utilized" value="65%" icon={TrendingUp} />
        <KPIStatCard title="Pending Approvals" value="12" icon={AlertCircle} />
        <KPIStatCard title="Approved" value="48" icon={CheckCircle2} />
      </div>

      {/* Action Bar */}
      <Card className="rounded-[14px] mb-8 p-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Input placeholder="Search Expense..." className="w-64" prefix={<Search className="h-4 w-4 text-muted-foreground" />} />
            {/* Filter Placeholders */}
            <Button variant="outline" size="sm">Filters</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-schoolgate-green hover:bg-schoolgate-green/90">
              <Plus className="h-4 w-4 mr-2" /> Record Expense
            </Button>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </div>
      </Card>

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-[14px] lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold mb-4">Expense Register</h2>
          <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl">Table Placeholder</div>
        </Card>
        <Card className="rounded-[14px] p-6">
          <h2 className="text-lg font-semibold mb-4">Analytics</h2>
          <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl">Chart Placeholder</div>
        </Card>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
