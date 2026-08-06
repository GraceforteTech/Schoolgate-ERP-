import { 
  Users, 
  CreditCard, 
  Wallet, 
  MinusCircle, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  TrendingUp,
  Receipt,
  AlertCircle,
  Search,
  Filter,
  Printer,
  Download,
  FileSpreadsheet,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const stats = [
  { 
    label: "Students Posted", 
    value: "2,450", 
    subValue: "92% of Enrollment",
    icon: Users, 
    color: "emerald",
    trend: "+5.2%"
  },
  { 
    label: "Total School Fees", 
    value: "₦98,000,000", 
    subValue: "Projected Revenue",
    icon: CreditCard, 
    color: "blue",
    trend: "+2.1%"
  },
  { 
    label: "Total B/F", 
    value: "₦12,500,000", 
    subValue: "Debt from Prev Terms",
    icon: HistoryIcon, 
    color: "amber",
    trend: "-8.4%"
  },
  { 
    label: "Total Discounts", 
    value: "₦4,200,000", 
    subValue: "Scholarships & Waivers",
    icon: MinusCircle, 
    color: "rose",
    trend: "+12%"
  },
  { 
    label: "Total Amount Payable", 
    value: "₦106,300,000", 
    subValue: "Fees + B/F - Discounts",
    icon: Wallet, 
    color: "indigo",
    trend: "+1.5%"
  },
  { 
    label: "Amount Collected", 
    value: "₦72,400,000", 
    subValue: "68% Collection Rate",
    icon: Receipt, 
    color: "teal",
    trend: "+15.8%"
  },
  { 
    label: "Outstanding Revenue", 
    value: "₦33,900,000", 
    subValue: "Awaiting Payment",
    icon: AlertCircle, 
    color: "orange",
    trend: "-3.2%"
  },
  { 
    label: "Students on Scholarship", 
    value: "142", 
    subValue: "5.8% of Students",
    icon: CheckCircle2, 
    color: "sky",
    trend: "+2"
  }
];

export function FeePostingKPIs({ isLoading = false }: { isLoading?: boolean }) {
  const [selectedStat, setSelectedStat] = useState<typeof stats[0] | null>(null);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden p-5 space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-3 w-40" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card 
          key={i} 
          className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-all duration-300 cursor-pointer"
          onClick={() => setSelectedStat(stat)}
        >
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={cn(
                "p-3 rounded-2xl",
                stat.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
                stat.color === "blue" ? "bg-blue-50 text-blue-600" :
                stat.color === "amber" ? "bg-amber-50 text-amber-600" :
                stat.color === "rose" ? "bg-rose-50 text-rose-600" :
                stat.color === "indigo" ? "bg-indigo-50 text-indigo-600" :
                stat.color === "teal" ? "bg-teal-50 text-teal-600" :
                stat.color === "orange" ? "bg-orange-50 text-orange-600" :
                "bg-sky-50 text-sky-600"
              )}>
                <stat.icon size={22} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full",
                stat.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {stat.trend.startsWith("+") ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mb-1">{stat.value}</h3>
              <p className="text-[11px] font-medium text-slate-500 opacity-80">{stat.subValue}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    
    <Sheet open={!!selectedStat} onOpenChange={(open) => !open && setSelectedStat(null)}>
      <SheetContent className="w-full sm:max-w-md border-none p-0 bg-slate-50">
        <SheetHeader className="p-6 bg-white border-b border-slate-100 flex flex-row items-center justify-between">
          <div>
            <SheetTitle className="text-xl font-bold text-slate-900">{selectedStat?.label}</SheetTitle>
            <p className="text-xs font-medium text-slate-500 mt-1">{selectedStat?.subValue}</p>
          </div>
        </SheetHeader>
        
        <div className="p-6 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
             <div className={cn(
               "p-4 rounded-[20px] mb-4",
               selectedStat?.color === "emerald" ? "bg-emerald-50 text-emerald-600" :
               selectedStat?.color === "blue" ? "bg-blue-50 text-blue-600" :
               selectedStat?.color === "amber" ? "bg-amber-50 text-amber-600" :
               selectedStat?.color === "rose" ? "bg-rose-50 text-rose-600" :
               selectedStat?.color === "indigo" ? "bg-indigo-50 text-indigo-600" :
               selectedStat?.color === "teal" ? "bg-teal-50 text-teal-600" :
               selectedStat?.color === "orange" ? "bg-orange-50 text-orange-600" :
               "bg-sky-50 text-sky-600"
             )}>
               {selectedStat && <selectedStat.icon size={32} />}
             </div>
             <h2 className="text-4xl font-black tracking-tight text-slate-900">{selectedStat?.value}</h2>
             <div className={cn(
               "mt-2 flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full",
               selectedStat?.trend.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
             )}>
               {selectedStat?.trend.startsWith("+") ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
               {selectedStat?.trend} Growth
             </div>
          </div>

          <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Search</h3>
                <Filter size={14} className="text-slate-300" />
             </div>
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <Input placeholder="Search records..." className="h-10 pl-9 rounded-xl border-slate-200 text-xs" />
             </div>
          </div>

          <div className="space-y-3">
             <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 h-12 rounded-xl font-bold gap-2">
                <Printer size={18} /> Print Category Report
             </Button>
             <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="rounded-xl h-11 font-bold gap-2 border-slate-200">
                   <Download size={16} /> Excel
                </Button>
                <Button variant="outline" className="rounded-xl h-11 font-bold gap-2 border-slate-200">
                   <Download size={16} /> PDF
                </Button>
             </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function HistoryIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

function TrendingDown(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}
