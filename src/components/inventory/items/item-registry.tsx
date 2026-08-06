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
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockItems = [
  {
    code: "INV-STA-001",
    name: "Office A4 Paper",
    category: "Stationery",
    qty: 45,
    unit: "Ream",
    minStock: 20,
    rate: 4500,
    value: 202500,
    status: "In Stock",
    location: "Aisle 2, Shelf B"
  },
  {
    code: "INV-LAB-042",
    name: "Sulphuric Acid (1L)",
    category: "Laboratory",
    qty: 8,
    unit: "Bottle",
    minStock: 10,
    rate: 12000,
    value: 96000,
    status: "Low Stock",
    location: "Lab Store 1"
  },
  {
    code: "INV-ICT-012",
    name: "Logitech Wireless Mouse",
    category: "ICT Equipment",
    qty: 0,
    unit: "Piece",
    minStock: 5,
    rate: 8500,
    value: 0,
    status: "Out of Stock",
    location: "IT Room"
  },
  {
    code: "INV-UNI-105",
    name: "Senior Secondary Blazer (L)",
    category: "Uniforms",
    qty: 120,
    unit: "Piece",
    minStock: 30,
    rate: 15000,
    value: 1800000,
    status: "In Stock",
    location: "Main Store"
  }
];

export function ItemRegistry() {
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
          {mockItems.map((item) => (
            <TableRow key={item.code} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
              <TableCell className="py-4">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.code}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-slate-50 text-slate-600 border-none font-bold text-[10px] rounded-lg">
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-700">{item.qty} {item.unit}s</span>
                  <span className="text-[9px] text-slate-400 font-medium">Min: {item.minStock}</span>
                </div>
              </TableCell>
              <TableCell className="font-bold text-slate-700">₦{item.rate.toLocaleString()}</TableCell>
              <TableCell className="font-black text-schoolgate-green">₦{item.value.toLocaleString()}</TableCell>
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
