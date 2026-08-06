import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CreditCard,
  Plus,
  Search,
  LayoutGrid,
  TrendingUp,
  Users,
  AlertCircle,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/fee-types-overview")({
  head: () => ({
    meta: [
      { title: "Fee Types Overview — Schoolgate ERP" },
      { name: "description", content: "Overview of all fee categories and structures." },
    ],
  }),
  component: FeeTypesOverviewPage,
});

const feeCategories = [
  {
    id: "tuition",
    name: "Tuition Fees",
    description: "Core academic instruction fees per term.",
    count: 12,
    active: 10,
    totalValue: "₦85.4M",
    growth: "+12.5%",
    status: "Active",
    icon: CreditCard,
    color: "blue",
  },
  {
    id: "boarding",
    name: "Boarding & Feeding",
    description: "Residential and meal plan charges.",
    count: 4,
    active: 4,
    totalValue: "₦42.1M",
    growth: "+5.2%",
    status: "Active",
    icon: LayoutGrid,
    color: "emerald",
  },
  {
    id: "transport",
    name: "Transport Services",
    description: "School bus and logistics fees.",
    count: 8,
    active: 6,
    totalValue: "₦12.8M",
    growth: "-2.1%",
    status: "Active",
    icon: TrendingUp,
    color: "amber",
  },
  {
    id: "facility",
    name: "Facility Levies",
    description: "Library, Lab, and Sports infrastructure fees.",
    count: 15,
    active: 12,
    totalValue: "₦8.5M",
    growth: "+8.0%",
    status: "Active",
    icon: AlertCircle,
    color: "indigo",
  },
];

function FeeTypesOverviewPage() {
  return (
    <div className="flex-1 p-4 md:p-6 bg-page-background min-h-screen">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Fee Types Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Preview all fee categories with quick actions and live statistics.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="h-9 gap-2 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg">
              <Plus className="h-4 w-4" /> New Fee Type
            </Button>
          </div>
        </div>

        {/* Action Bar */}
        <Card className="rounded-[14px] border-0 shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search categories, fee names or classes..." 
                className="h-10 pl-10 rounded-xl border-slate-200"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="h-10 gap-2 rounded-xl border-slate-200">
                <Filter className="h-4 w-4" /> Filters
              </Button>
              <Link to="/fee-types">
                <Button variant="ghost" className="h-10 gap-2 rounded-xl text-schoolgate-green">
                  View Detailed Table <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {feeCategories.map((category) => (
            <Card key={category.id} className="group rounded-[14px] border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center",
                  category.color === "blue" ? "bg-blue-50 text-blue-600" :
                  category.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                  category.color === "amber" ? "bg-amber-50 text-amber-600" :
                  "bg-indigo-50 text-indigo-600"
                )}>
                  <category.icon className="h-5 w-5" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl border-slate-200">
                    <DropdownMenuItem className="gap-2 text-xs">View Details</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-xs">Edit Category</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-xs">Configure Rules</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900">{category.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{category.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Fee Types</p>
                    <p className="text-lg font-bold text-slate-800">{category.count}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Revenue</p>
                    <p className="text-lg font-bold text-schoolgate-green">{category.totalValue}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{category.active} Active Structures</span>
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-[10px] rounded-full px-2 py-0 border-0",
                    category.growth.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {category.growth}
                  </Badge>
                </div>

                <Button className="w-full h-9 rounded-lg border-slate-200 group-hover:bg-schoolgate-green group-hover:text-white group-hover:border-schoolgate-green transition-colors" variant="outline">
                  Manage Fees
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Insights Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-[14px] border-0 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b py-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-schoolgate-green" /> Revenue Contribution by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { name: "Tuition Fees", percentage: 65, value: "₦85.4M", color: "bg-blue-500" },
                  { name: "Boarding & Feeding", percentage: 22, value: "₦42.1M", color: "bg-emerald-500" },
                  { name: "Transport Services", percentage: 8, value: "₦12.8M", color: "bg-amber-500" },
                  { name: "Other Levies", percentage: 5, value: "₦8.5M", color: "bg-indigo-500" },
                ].map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-700">{item.name}</span>
                      <span className="text-muted-foreground">{item.value} ({item.percentage}%)</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[14px] border-0 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b py-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-schoolgate-green" /> Quick Setup Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {[
                  { title: "Clone Previous Session Structure", desc: "Copy all fee types from 2024/2025 to current session.", action: "Start Sync" },
                  { title: "Bulk Update Tuition Rates", desc: "Apply percentage increase across all school sections.", action: "Configure" },
                  { title: "Define Scholarship Rules", desc: "Set automatic discount triggers for tuition fees.", action: "Manage" },
                  { title: "Generate Fee Schedule", desc: "Create a PDF overview of all fees for the new term.", action: "Generate" },
                ].map((action) => (
                  <div key={action.title} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{action.title}</h4>
                      <p className="text-xs text-muted-foreground">{action.desc}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-schoolgate-green text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {action.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
