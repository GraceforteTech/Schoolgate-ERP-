import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export function InventorySearchCenter() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6 border-none shadow-sm bg-white rounded-[20px] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-schoolgate-green-light text-schoolgate-green">
            <Search size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-none">Inventory Search Center</h3>
            <p className="text-xs text-slate-500 mt-1">Search through 2,480+ inventory SKUs</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-schoolgate-green hover:bg-schoolgate-green-light font-bold"
        >
          {isExpanded ? (
            <>Less Filters <ChevronUp className="ml-2 h-4 w-4" /></>
          ) : (
            <>Advanced Filters <ChevronDown className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Item Name / Code</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Enter name or SKU..." className="pl-9 h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</Label>
          <Select>
            <SelectTrigger className="h-10 bg-slate-50 border-none rounded-xl text-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stationery">Stationery</SelectItem>
              <SelectItem value="lab">Laboratory</SelectItem>
              <SelectItem value="ict">ICT Equipment</SelectItem>
              <SelectItem value="uniforms">Uniforms</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Stock Status</Label>
          <Select>
            <SelectTrigger className="h-10 bg-slate-50 border-none rounded-xl text-sm">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in">In Stock</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="out">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2">
          <Button className="flex-1 h-10 bg-schoolgate-green text-white font-bold rounded-xl hover:bg-schoolgate-green/90 shadow-md shadow-schoolgate-green/20">
            Apply Filters
          </Button>
          <Button variant="outline" className="h-10 w-10 p-0 border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50">
            <X size={18} />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Storage Location</Label>
            <Input placeholder="e.g. Aisle 2" className="h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Default Supplier</Label>
            <Input placeholder="Search supplier..." className="h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Price Range (Min)</Label>
            <Input type="number" placeholder="Min ₦" className="h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Price Range (Max)</Label>
            <Input type="number" placeholder="Max ₦" className="h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
        </div>
      )}
    </Card>
  );
}
