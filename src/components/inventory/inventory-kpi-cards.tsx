import { Card } from "@/components/ui/card";
import { 
  Package, 
  Layers, 
  Banknote, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  AlertTriangle, 
  XCircle, 
  ShoppingCart, 
  Truck, 
  Receipt, 
  Hammer, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function InventoryKpiCards() {
  const kpis = [
    {
      label: "Total Items",
      value: "2,480",
      change: "+42",
      isPositive: true,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      tooltip: "Total unique inventory items registered."
    },
    {
      label: "Total Categories",
      value: "18",
      change: "+2",
      isPositive: true,
      icon: Layers,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      tooltip: "Number of active inventory categories."
    },
    {
      label: "Inventory Value",
      value: "₦24.5M",
      change: "+12.4%",
      isPositive: true,
      icon: Banknote,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      tooltip: "Total financial valuation of current stock."
    },
    {
      label: "Received Today",
      value: "145",
      change: "+12%",
      isPositive: true,
      icon: ArrowDownCircle,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      tooltip: "Items stock-in today."
    },
    {
      label: "Issued Today",
      value: "86",
      change: "-5%",
      isPositive: false,
      icon: ArrowUpCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      tooltip: "Items stock-out today."
    },
    {
      label: "Low Stock Items",
      value: "12",
      change: "-3",
      isPositive: true,
      icon: AlertTriangle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      tooltip: "Items at or below reorder level."
    },
    {
      label: "Out of Stock",
      value: "4",
      change: "+1",
      isPositive: false,
      icon: XCircle,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      tooltip: "Items with zero quantity available."
    },
    {
      label: "Pending POs",
      value: "8",
      change: "Active",
      isPositive: true,
      icon: ShoppingCart,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      tooltip: "Purchase orders awaiting approval."
    },
    {
      label: "Pending Deliveries",
      value: "5",
      change: "Inbound",
      isPositive: true,
      icon: Truck,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      tooltip: "Approved orders awaiting supplier delivery."
    },
    {
      label: "Monthly Expenses",
      value: "₦1.2M",
      change: "+8.2%",
      isPositive: false,
      icon: Receipt,
      color: "text-red-600",
      bgColor: "bg-red-50",
      tooltip: "Total store procurement cost this month."
    },
    {
      label: "Damaged Items",
      value: "24",
      change: "₦42k",
      isPositive: false,
      icon: Hammer,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      tooltip: "Items reported as damaged or unusable."
    },
    {
      label: "Expired Soon",
      value: "15",
      change: "30 Days",
      isPositive: false,
      icon: Clock,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      tooltip: "Items expiring within the next 30 days."
    }
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Card className="p-4 border-none shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-[14px] cursor-help">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl ${kpi.bgColor} ${kpi.color}`}>
                    <kpi.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${kpi.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {kpi.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{kpi.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
                    <div className="flex items-end gap-[2px] h-6">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div 
                          key={i} 
                          className={`w-1 rounded-full ${kpi.bgColor.replace('bg-', 'bg-').replace('-50', '-200')} ${index % 2 === 0 ? 'h-3' : 'h-5'}`} 
                          style={{ height: `${Math.random() * 20 + 4}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 text-white border-none text-[11px] px-3 py-1.5 rounded-lg shadow-xl">
              {kpi.tooltip}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
