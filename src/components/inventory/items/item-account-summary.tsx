import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BookOpen, 
  Package, 
  PenTool, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  PieChart
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const itemAccounts = [
  {
    id: 1,
    name: "English Textbook (JSS1)",
    category: "Books",
    icon: BookOpen,
    collected: 500,
    sold: 420,
    unsold: 60,
    returns: 20,
    revenue: 1260000,
    cost: 840000,
    profit: 420000,
    trend: "up",
    percentage: "+12%"
  },
  {
    id: 2,
    name: "Mathematics Textbook (JSS1)",
    category: "Books",
    icon: BookOpen,
    collected: 450,
    sold: 380,
    unsold: 50,
    returns: 20,
    revenue: 1140000,
    cost: 760000,
    profit: 380000,
    trend: "up",
    percentage: "+8%"
  },
  {
    id: 3,
    name: "HB Pencils (Box of 12)",
    category: "Stationery",
    icon: PenTool,
    collected: 1000,
    sold: 850,
    unsold: 150,
    returns: 0,
    revenue: 425000,
    cost: 300000,
    profit: 125000,
    trend: "down",
    percentage: "-3%"
  },
  {
    id: 4,
    name: "Blue Ink Pens (Carton)",
    category: "Stationery",
    icon: PenTool,
    collected: 200,
    sold: 140,
    unsold: 60,
    returns: 0,
    revenue: 280000,
    cost: 200000,
    profit: 80000,
    trend: "up",
    percentage: "+5%"
  }
];

export function ItemAccountSummary() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = itemAccounts.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search item accounts..." 
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl focus:ring-schoolgate-green/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="h-11 rounded-xl bg-white border-slate-200 font-bold gap-2 text-slate-600">
                <PieChart size={18} /> Detailed Report
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredAccounts.map((item) => (
          <Card key={item.id} className="p-6 bg-white border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-[24px] relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 grid place-items-center text-slate-600 group-hover:bg-schoolgate-green-light group-hover:text-schoolgate-green transition-colors">
                  <item.icon size={24} />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">
                      <MoreVertical size={16} className="text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl">
                    <DropdownMenuItem className="rounded-xl font-bold text-slate-600">View Full Ledger</DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl font-bold text-slate-600">Download Statement</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div>
                <h4 className="font-black text-slate-900 leading-tight mb-1">{item.name}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">{item.category} Account Summary</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-400 font-black uppercase">Collected</p>
                    <p className="text-sm font-bold text-slate-700">{item.collected}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-400 font-black uppercase">Sold</p>
                    <p className="text-sm font-bold text-emerald-600">{item.sold}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-slate-400 font-black uppercase">Unsold</p>
                    <p className="text-sm font-bold text-slate-400">{item.unsold}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-rose-400 font-black uppercase">Returns</p>
                    <p className="text-sm font-bold text-rose-500">{item.returns}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500">Revenue:</span>
                        <span className="text-xs font-black text-slate-900">₦{item.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-200/50 pt-2">
                        <span className="text-[10px] font-bold text-slate-500">Profit:</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-black text-schoolgate-green">₦{item.profit.toLocaleString()}</span>
                            <Badge className={`${item.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} border-none text-[8px] font-black h-4 px-1 rounded`}>
                                {item.percentage}
                            </Badge>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            {item.trend === 'up' ? (
                <TrendingUp className="absolute -right-4 -top-4 h-24 w-24 text-emerald-500/5 -rotate-12 group-hover:scale-110 transition-transform" />
            ) : (
                <TrendingDown className="absolute -right-4 -top-4 h-24 w-24 text-rose-500/5 -rotate-12 group-hover:scale-110 transition-transform" />
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}