import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  History,
  TrendingUp,
  UserCheck,
  Plus
} from "lucide-react";

const suppliers = [
  {
    name: "Supreme Stationery Ltd",
    contact: "Mr. Kunle Adeyemi",
    phone: "+234 802 123 4567",
    email: "info@supremestationery.ng",
    address: "Mushin Industrial Estate, Lagos",
    performance: 4.8,
    status: "Active",
    categories: ["Stationery", "Books"],
    lastDelivery: "12 hours ago"
  },
  {
    name: "Global ICT Solutions",
    contact: "Sarah Johnson",
    phone: "+234 803 987 6543",
    email: "sales@globalict.com",
    address: "Computer Village, Ikeja",
    performance: 4.5,
    status: "Active",
    categories: ["ICT Equipment"],
    lastDelivery: "3 days ago"
  },
  {
    name: "Apex Lab Supplies",
    contact: "Dr. Ibrahim Musa",
    phone: "+234 805 555 1234",
    email: "procurement@apexlabs.com",
    address: "Victoria Island, Lagos",
    performance: 4.9,
    status: "Preferred",
    categories: ["Laboratory"],
    lastDelivery: "1 week ago"
  }
];

export function SupplierDirectory() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Supplier Network</h2>
          <p className="text-sm text-slate-500">Manage vendor relationships and delivery performance.</p>
        </div>
        <Button className="h-10 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
          <Plus size={18} /> Add Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((sup) => (
          <Card key={sup.name} className="p-6 border-none shadow-sm bg-white rounded-[24px] space-y-6 group hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-slate-50 grid place-items-center text-slate-400 group-hover:bg-schoolgate-green-light group-hover:text-schoolgate-green transition-colors">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{sup.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-black text-slate-700">{sup.performance} Rating</span>
                  </div>
                </div>
              </div>
              <Badge className={`
                ${sup.status === 'Preferred' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'} 
                border-none font-black text-[9px] px-2 py-0.5 rounded-full
              `}>
                {sup.status.toUpperCase()}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                <UserCheck size={14} className="text-slate-400" /> {sup.contact}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                <Phone size={14} className="text-slate-400" /> {sup.phone}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                <Mail size={14} className="text-slate-400" /> {sup.email}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                <MapPin size={14} className="text-slate-400" /> {sup.address}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {sup.categories.map(cat => (
                <Badge key={cat} variant="outline" className="bg-slate-50 text-slate-500 border-none text-[9px] font-bold px-2 py-0.5">
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
               <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                  <History size={12} /> Last: {sup.lastDelivery}
               </div>
               <Button variant="ghost" className="h-8 rounded-lg text-xs font-bold text-schoolgate-green hover:bg-schoolgate-green-light group">
                  Purchase History <ChevronRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
               </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ChevronRight({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
