import { createFileRoute } from "@tanstack/react-router";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  LayoutGrid, 
  Table as TableIcon,
  ChevronRight,
  ShoppingCart,
  ArrowDownLeft,
  ArrowUpRight,
  Settings,
  History,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryKpiCards } from "@/components/inventory/inventory-kpi-cards";

export const Route = createFileRoute("/inventory/")({
  component: InventoryManagementPage,
});

function InventoryManagementPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col lg:row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-schoolgate-green grid place-items-center text-white shadow-lg shadow-schoolgate-green/20">
            <Package className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory & Store</h1>
            <p className="text-slate-500 font-medium italic mt-1">Manage supplies, stock levels, and procurement operations.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <Download size={18} /> Export
          </Button>
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <History size={18} /> Audit Logs
          </Button>
          <Button className="h-11 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
            <Plus size={18} /> New Item
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <InventoryKpiCards />

      {/* Main Workspace */}
      <Tabs defaultValue="items" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl w-full flex flex-wrap h-auto overflow-hidden">
            <TabsTrigger value="items" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Stock Registry
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Categories
            </TabsTrigger>
            <TabsTrigger value="received" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Stock-In (GRN)
            </TabsTrigger>
            <TabsTrigger value="issued" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Stock-Out
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Suppliers
            </TabsTrigger>
            <TabsTrigger value="valuation" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Valuation
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="items" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search items by name, code or category..." className="pl-10 h-11 bg-white border-none shadow-sm rounded-xl" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm px-4 text-slate-600 font-bold gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <div className="flex p-1 bg-white rounded-xl shadow-sm border border-slate-200">
                <Button variant="ghost" className="h-9 w-9 p-0 rounded-lg bg-schoolgate-green-light text-schoolgate-green">
                  <TableIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="h-9 w-9 p-0 rounded-lg text-slate-400">
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Card className="p-0 bg-white border-none shadow-sm rounded-[20px] overflow-hidden">
             {/* Table implementation would go here */}
             <div className="p-20 text-center">
                <Package className="h-16 w-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900">Stock Registry Loading...</h3>
                <p className="text-slate-500 max-w-xs mx-auto mt-2">Connecting to secure store server to retrieve live inventory levels.</p>
             </div>
          </Card>
        </TabsContent>
        
        {/* Other TabsContent placeholders */}
        <TabsContent value="categories">
           <Card className="p-12 text-center bg-white border-none shadow-sm rounded-[20px]">
             <h3 className="text-lg font-bold">Category Management Hub</h3>
             <p className="text-slate-500 mt-1">Define item classifications, storage rules and reorder policies.</p>
           </Card>
        </TabsContent>
      </Tabs>

      {/* Low Stock Alerts Banner */}
      <Card className="p-6 bg-amber-50 border border-amber-100 rounded-[20px] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 grid place-items-center">
            <AlertCircle size={24} />
          </div>
          <div>
            <h4 className="font-black text-slate-900 leading-tight">12 Items Below Minimum Stock Level</h4>
            <p className="text-sm text-slate-600 font-medium">Auto-generate purchase orders to replenish essential supplies.</p>
          </div>
        </div>
        <Button className="bg-amber-600 text-white hover:bg-amber-700 font-bold rounded-xl h-11 px-6 shadow-lg shadow-amber-600/20">
          Review Low Stock
        </Button>
      </Card>

      {/* AI Forecasting Sidebar/Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-white border-none shadow-sm rounded-[24px]">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
             <Settings className="h-5 w-5 text-schoolgate-green" /> Recent Stock Movements
          </h3>
          <div className="space-y-4">
             {[
               { type: 'issue', item: 'Office A4 Paper (Ream)', qty: '12', entity: 'Accounts Dept', time: '14:20 PM' },
               { type: 'receive', item: 'Floor Cleaner (5L)', qty: '20', entity: 'Cleaners Ltd', time: '11:05 AM' },
               { type: 'issue', item: 'Volleyball (Standard)', qty: '2', entity: 'Sports Unit', time: '09:30 AM' },
             ].map((move, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                 <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-xl grid place-items-center ${move.type === 'issue' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {move.type === 'issue' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{move.item}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase">{move.type === 'issue' ? 'Issued to' : 'Received from'} {move.entity}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className={`text-sm font-black ${move.type === 'issue' ? 'text-orange-600' : 'text-emerald-600'}`}>{move.type === 'issue' ? '-' : '+'}{move.qty}</p>
                    <p className="text-[10px] text-slate-400 font-bold">{move.time}</p>
                 </div>
               </div>
             ))}
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 text-white rounded-[24px] relative overflow-hidden">
           <div className="relative z-10">
              <Badge className="bg-schoolgate-green text-white border-none mb-4 text-[10px] font-black tracking-widest uppercase">Schoolgate AI Insights</Badge>
              <h3 className="text-xl font-bold mb-2">Inventory Forecasting</h3>
              <p className="text-xs text-white/50 mb-6 leading-relaxed">Based on historical usage, we predict a shortage of <strong>Science Lab Chemicals</strong> by next week.</p>
              
              <div className="space-y-4 mb-8">
                 <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[10px] text-white/40 uppercase font-black">Recommended Action</p>
                    <p className="text-xs font-bold mt-1">Initiate PO for 50L Distilled Water</p>
                 </div>
                 <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-[10px] text-white/40 uppercase font-black">Savings Opportunity</p>
                    <p className="text-xs font-bold mt-1">Switch to Bulk Stationery Supplier (Save 12%)</p>
                 </div>
              </div>

              <Button className="w-full bg-schoolgate-green text-white font-bold rounded-xl h-11 group">
                 Apply AI Recommendations <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
           <Package className="absolute -right-10 -bottom-10 h-48 w-48 text-white/5 rotate-12" />
        </Card>
      </div>
    </div>
  );
}
