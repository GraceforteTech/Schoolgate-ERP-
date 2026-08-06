import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  FlaskConical, 
  Briefcase, 
  Monitor, 
  Shirt, 
  Utensils, 
  Stethoscope, 
  Zap,
  MoreVertical,
  ChevronRight
} from "lucide-react";

const categories = [
  { name: "Stationery", icon: Book, items: 420, value: "₦1.2M", color: "text-blue-600", bg: "bg-blue-50" },
  { name: "Laboratory", icon: FlaskConical, items: 156, value: "₦4.5M", color: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Office Supplies", icon: Briefcase, items: 84, value: "₦850k", color: "text-indigo-600", bg: "bg-indigo-50" },
  { name: "ICT Equipment", icon: Monitor, items: 312, value: "₦12.8M", color: "text-purple-600", bg: "bg-purple-50" },
  { name: "Uniforms", icon: Shirt, items: 850, value: "₦3.2M", color: "text-rose-600", bg: "bg-rose-50" },
  { name: "Kitchen", icon: Utensils, items: 210, value: "₦650k", color: "text-orange-600", bg: "bg-orange-50" },
  { name: "Medical", icon: Stethoscope, items: 45, value: "₦240k", color: "text-red-600", bg: "bg-red-50" },
  { name: "Electrical", icon: Zap, items: 128, value: "₦420k", color: "text-amber-600", bg: "bg-amber-50" }
];

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {categories.map((cat) => (
        <Card key={cat.name} className="p-6 border-none shadow-sm bg-white rounded-[24px] group hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className={`h-12 w-12 rounded-2xl ${cat.bg} ${cat.color} grid place-items-center transition-transform group-hover:scale-110`}>
              <cat.icon size={24} />
            </div>
            <Button variant="ghost" className="h-8 w-8 p-0 rounded-full hover:bg-slate-50">
              <MoreVertical size={16} className="text-slate-400" />
            </Button>
          </div>
          
          <div>
            <h3 className="text-lg font-black text-slate-900 group-hover:text-schoolgate-green transition-colors">{cat.name}</h3>
            <div className="flex items-center justify-between mt-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock Items</p>
                <p className="text-sm font-bold text-slate-700">{cat.items} SKUs</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Value</p>
                <p className="text-sm font-black text-schoolgate-green">{cat.value}</p>
              </div>
            </div>
          </div>

          <Button className="w-full mt-6 bg-slate-50 text-slate-600 group-hover:bg-schoolgate-green group-hover:text-white font-bold rounded-xl h-10 border-none transition-all">
            Manage Items <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Card>
      ))}
    </div>
  );
}
