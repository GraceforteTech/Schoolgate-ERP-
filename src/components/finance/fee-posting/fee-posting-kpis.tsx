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
  AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

export function FeePostingKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i} className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-all duration-300">
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
