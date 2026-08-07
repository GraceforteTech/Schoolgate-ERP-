import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { ItemRegistry } from "@/components/inventory/items/item-registry";
import { CategoryGrid } from "@/components/inventory/items/category-grid";
import { SupplierDirectory } from "@/components/inventory/suppliers/supplier-directory";
import { InventorySearchCenter } from "@/components/inventory/items/inventory-search-center";
import { DailySalesLog } from "@/components/inventory/sales/daily-sales-log";
import { ItemAccountSummary } from "@/components/inventory/items/item-account-summary";

export const Route = createFileRoute("/inventory/")({
  head: () => ({
    title: "Inventory & Store Management | Schoolgate ERP",
    meta: [
      { name: "description", content: "Comprehensive school inventory and store management system. Track stock levels, suppliers, and procurement." },
      { property: "og:title", content: "Inventory & Store Management | Schoolgate ERP" },
      { property: "og:description", content: "Manage supplies, stock levels, and procurement operations with AI-powered forecasting." },
      { name: "twitter:card", content: "summary_large_image" }
    ],
  }),
  component: InventoryManagementPage,
});

function InventoryManagementPage() {
  const [activeTab, setActiveTab] = useState("items");

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
          {activeTab === "items" && (
            <Button className="h-11 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
              <Plus size={18} /> New Item
            </Button>
          )}
          {activeTab === "suppliers" && (
            <Button className="h-11 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
              <Plus size={18} /> Add Supplier
            </Button>
          )}
          {activeTab === "orders" && (
            <Button className="h-11 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
              <Plus size={18} /> Create PO
            </Button>
          )}
          {activeTab === "received" && (
            <Button className="h-11 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
              <Plus size={18} /> New GRN
            </Button>
          )}
          {activeTab === "issued" && (
            <Button className="h-11 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
              <Plus size={18} /> Issue Items
            </Button>
          )}
        </div>
      </div>

      {/* KPI Dashboard */}
      <InventoryKpiCards />

      {/* Main Workspace */}
      <Tabs defaultValue="items" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
            <TabsTrigger value="sales" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Daily Sales
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Purchase Orders
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Suppliers
            </TabsTrigger>
            <TabsTrigger value="valuation" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Item Accounts
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="items" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <InventorySearchCenter />
          <Card className="p-0 bg-white border-none shadow-sm rounded-[20px] overflow-hidden">
            <ItemRegistry />
          </Card>
        </TabsContent>
        
        {/* Other TabsContent placeholders */}
        <TabsContent value="categories">
           <CategoryGrid />
        </TabsContent>

        <TabsContent value="received">
           <Card className="p-12 text-center bg-white border-none shadow-sm rounded-[20px]">
             <div className="h-20 w-20 bg-emerald-50 rounded-2xl grid place-items-center text-emerald-600 mx-auto mb-6">
               <ArrowDownLeft className="h-10 w-10" />
             </div>
             <h3 className="text-xl font-bold text-slate-900">Goods Received (Stock-In)</h3>
             <p className="text-slate-500 mt-2 max-w-md mx-auto">Generate Goods Received Notes (GRN) and update inventory automatically from supplier deliveries.</p>
             <Button className="mt-8 bg-schoolgate-green text-white font-bold px-8 rounded-xl h-11 shadow-lg shadow-schoolgate-green/20">
               New GRN Entry
             </Button>
           </Card>
        </TabsContent>
        
        <TabsContent value="sales">
          <DailySalesLog />
        </TabsContent>

        <TabsContent value="issued">
           <Card className="p-12 text-center bg-white border-none shadow-sm rounded-[20px]">
             <div className="h-20 w-20 bg-orange-50 rounded-2xl grid place-items-center text-orange-600 mx-auto mb-6">
               <ArrowUpRight className="h-10 w-10" />
             </div>
             <h3 className="text-xl font-bold text-slate-900">Goods Issued (Stock-Out)</h3>
             <p className="text-slate-500 mt-2 max-w-md mx-auto">Record inventory consumption by departments, staff, or specialized units with signature tracking.</p>
             <Button className="mt-8 bg-schoolgate-green text-white font-bold px-8 rounded-xl h-11 shadow-lg shadow-schoolgate-green/20">
               Issue New Items
             </Button>
           </Card>
        </TabsContent>

        <TabsContent value="orders">
           <Card className="p-12 text-center bg-white border-none shadow-sm rounded-[20px]">
             <div className="h-20 w-20 bg-blue-50 rounded-2xl grid place-items-center text-blue-600 mx-auto mb-6">
               <ShoppingCart className="h-10 w-10" />
             </div>
             <h3 className="text-xl font-bold text-slate-900">Purchase Order Management</h3>
             <p className="text-slate-500 mt-2 max-w-md mx-auto">Manage the full procurement lifecycle from request to final stock update.</p>
             <Button className="mt-8 bg-schoolgate-green text-white font-bold px-8 rounded-xl h-11 shadow-lg shadow-schoolgate-green/20">
               Create Purchase Order
             </Button>
           </Card>
        </TabsContent>

        <TabsContent value="suppliers">
           <SupplierDirectory />
        </TabsContent>

        <TabsContent value="valuation" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <ItemAccountSummary />
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
