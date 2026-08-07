import { useState } from "react";
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
  MoreVertical, 
  Eye, 
  FileText, 
  CheckCircle2, 
  PauseCircle, 
  AlertTriangle,
  ShoppingCart,
  ArrowUpRight,
  History,
  Calendar,
  Layers
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PostSalesDialog } from "./post-sales-dialog";

const dailySalesData = [
  { 
    id: "DS-001", 
    date: "2026-08-07", 
    type: "daily",
    item: "English Textbook (JSS1)", 
    category: "Books",
    collected: 100, 
    sold: 85, 
    unsold: 10, 
    returns: 5, 
    revenue: 255000, 
    status: "Posted" 
  },
  { 
    id: "WS-001", 
    date: "Aug 01 - Aug 07", 
    type: "weekly",
    item: "Office A4 Paper", 
    category: "Stationery",
    collected: 250, 
    sold: 180, 
    unsold: 70, 
    returns: 0, 
    revenue: 810000, 
    status: "Posted" 
  },
  { 
    id: "DS-002", 
    date: "2026-08-07", 
    type: "daily",
    item: "Office A4 Paper", 
    category: "Stationery",
    collected: 50, 
    sold: 30, 
    unsold: 20, 
    returns: 0, 
    revenue: 135000, 
    status: "Draft" 
  },
  { 
    id: "DS-003", 
    date: "2026-08-06", 
    item: "School Uniform (Primary)", 
    category: "Uniforms",
    collected: 200, 
    sold: 195, 
    unsold: 0, 
    returns: 5, 
    revenue: 2925000, 
    status: "Posted" 
  },
];

export function DailySalesLog() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Sales Posting & Inventory Returns</h3>
          <p className="text-xs text-slate-500 font-medium">Record daily collections or weekly summaries for sales audit tracking.</p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-xl font-bold text-xs h-10 shadow-lg shadow-schoolgate-green/20"
        >
          Post Sales Amount
        </Button>
      </div>
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Entry / Period</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Mode</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Collected</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Sold</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Left Unsold</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4 text-rose-500">Returns</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Revenue</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Status</TableHead>
            <TableHead className="text-right text-[10px] font-black uppercase tracking-wider text-slate-500 py-4">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dailySalesData.map((row, i) => (
            <TableRow key={row.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
              <TableCell className="py-4">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{row.item}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{row.date}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={`
                  ${row.type === 'daily' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'} 
                  font-black text-[9px] uppercase px-2 py-0.5 rounded-lg flex items-center gap-1 w-fit
                `}>
                  {row.type === 'daily' ? <Calendar className="h-2.5 w-2.5" /> : <Layers className="h-2.5 w-2.5" />}
                  {row.type}
                </Badge>
              </TableCell>
              <TableCell className="font-bold text-slate-700">{row.collected}</TableCell>
              <TableCell className="font-bold text-emerald-600">{row.sold}</TableCell>
              <TableCell className="font-bold text-slate-400">{row.unsold}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1 font-bold text-rose-500">
                  {row.returns}
                  {row.returns > 0 && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <History className="h-3 w-3 text-rose-400" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-900 text-white border-none rounded-lg p-3 shadow-xl">
                          <p className="text-[10px] font-bold">Returned to Supplier</p>
                          <p className="text-[9px] text-slate-400 font-medium">Logged for credit note generation.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-black text-schoolgate-green">₦{row.revenue.toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={`${row.status === 'Posted' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'} border-none font-black text-[10px] px-2 py-0.5 rounded-full`}>
                  {row.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100">
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-slate-100 shadow-xl">
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-slate-600 cursor-pointer">
                      <Eye size={16} /> View Audit Trail
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-slate-600 cursor-pointer">
                      <FileText size={16} /> Print Receipt
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-xl gap-2 font-bold text-rose-600 cursor-pointer hover:bg-rose-50">
                      <ArrowUpRight size={16} /> Reverse Entry
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <PostSalesDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
