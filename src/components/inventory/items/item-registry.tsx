import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowDownCircle, 
  ArrowUpCircle,
  QrCode,
  AlertTriangle,
  Loader2,
  Package
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getInventoryItems } from "@/lib/inventory.functions";
import { supabase } from "@/integrations/supabase/client";
import { EmptyState } from "@/components/ui/empty-state";

export function ItemRegistry() {
  const fetchItems = useServerFn(getInventoryItems);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['inventory-items'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return [];
      return fetchItems({ data: { tenantId: membership.tenant_id } });
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-schoolgate-green" />
        <p className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-widest">Accessing Store Ledger...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState 
        title="Inventory Empty"
        description="No items have been registered in the school store yet."
        icon={<Package className="h-10 w-10" />}
      />
    );
  }

  return (
    <div className="bg-white rounded-[20px] overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Item Details</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Category</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Quantity</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Unit Cost</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Stock Value</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Status</TableHead>
            <TableHead className="text-right text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item: any) => (
            <TableRow key={item.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
              <TableCell className="py-4">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.code || item.id.slice(0, 8)}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-slate-50 text-slate-600 border-none font-bold text-[10px] rounded-lg">
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-700">{item.quantity} {item.unit || 'pcs'}</span>
                  <span className="text-[9px] text-slate-400 font-medium">Min: {item.min_stock || 0}</span>
                </div>
              </TableCell>
              <TableCell className="font-bold text-slate-700">₦{(item.unit_price || 0).toLocaleString()}</TableCell>
              <TableCell className="font-black text-schoolgate-green">₦{(item.quantity * item.unit_price || 0).toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={`
                  ${item.status === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 
                    item.status === 'Low Stock' ? 'bg-amber-50 text-amber-600' : 
                    'bg-rose-50 text-rose-600'} 
                  border-none font-black text-[10px] px-3 py-1 rounded-full
                `}>
                  {item.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100">
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl border-slate-100 shadow-xl">
                    <DropdownMenuLabel className="text-[10px] uppercase font-black text-slate-400 px-3 py-2">Item Management</DropdownMenuLabel>
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-slate-600 cursor-pointer">
                      <Eye size={16} /> View Stock Ledger
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-slate-600 cursor-pointer">
                      <Edit size={16} /> Edit Item Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-slate-600 cursor-pointer">
                      <QrCode size={16} /> Print QR Labels
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-[10px] uppercase font-black text-slate-400 px-3 py-2">Quick Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-emerald-600 cursor-pointer hover:bg-emerald-50">
                      <ArrowDownCircle size={16} /> Receive Stock (In)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-orange-600 cursor-pointer hover:bg-orange-50">
                      <ArrowUpCircle size={16} /> Issue Stock (Out)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-amber-600 cursor-pointer hover:bg-amber-50">
                      <AlertTriangle size={16} /> Stock Adjustment
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-rose-600 cursor-pointer hover:bg-rose-50">
                      <Trash2 size={16} /> Delete Item
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
