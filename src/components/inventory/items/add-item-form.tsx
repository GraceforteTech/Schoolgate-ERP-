import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Package, 
  Barcode, 
  Tag, 
  Layers, 
  Warehouse, 
  DollarSign, 
  ShieldAlert,
  Save,
  X
} from "lucide-react";

interface AddItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddItemForm({ open, onOpenChange }: AddItemFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[24px]">
        <div className="bg-schoolgate-green p-6 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center backdrop-blur-sm">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight">Add New Inventory Item</DialogTitle>
                <DialogDescription className="text-white/70 font-medium">
                  Define a new stock item with pricing, tracking, and threshold rules.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-8 bg-white grid grid-cols-2 gap-6">
          {/* General Information */}
          <div className="space-y-4 col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Tag size={14} className="text-schoolgate-green" /> General Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-name" className="text-xs font-bold text-slate-700">Item Name</Label>
                <Input id="item-name" placeholder="e.g. Office A4 Paper" className="h-11 rounded-xl border-slate-200 focus:border-schoolgate-green" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-code" className="text-xs font-bold text-slate-700">Item Code / SKU</Label>
                <div className="relative">
                  <Input id="item-code" placeholder="INV-001" className="h-11 rounded-xl border-slate-200 pl-10" />
                  <Barcode className="absolute left-3 top-3 text-slate-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Layers size={14} className="text-schoolgate-green" /> Classification
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">Category</Label>
                <Select>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="stationery">Stationery</SelectItem>
                    <SelectItem value="lab">Laboratory</SelectItem>
                    <SelectItem value="ict">ICT Equipment</SelectItem>
                    <SelectItem value="uniforms">Uniforms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-700">Unit of Measurement</Label>
                <Select>
                  <SelectTrigger className="h-11 rounded-xl border-slate-200">
                    <SelectValue placeholder="Select Unit" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="ream">Ream</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="bottle">Bottle</SelectItem>
                    <SelectItem value="pack">Pack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Financials */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <DollarSign size={14} className="text-schoolgate-green" /> Financials
            </h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cost-price" className="text-xs font-bold text-slate-700">Cost Price (₦)</Label>
                <Input id="cost-price" type="number" placeholder="0.00" className="h-11 rounded-xl border-slate-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="selling-price" className="text-xs font-bold text-slate-700">Selling Price (₦)</Label>
                <Input id="selling-price" type="number" placeholder="0.00" className="h-11 rounded-xl border-slate-200" />
              </div>
            </div>
          </div>

          {/* Storage & Alerts */}
          <div className="space-y-4 col-span-2 bg-slate-50 p-4 rounded-[20px] border border-slate-100">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Warehouse size={14} className="text-schoolgate-green" /> Storage & Inventory Controls
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="opening-stock" className="text-xs font-bold text-slate-700">Opening Stock</Label>
                <Input id="opening-stock" type="number" placeholder="0" className="h-11 rounded-xl border-white bg-white shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-stock" className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  Reorder Level <ShieldAlert size={12} className="text-amber-500" />
                </Label>
                <Input id="min-stock" type="number" placeholder="5" className="h-11 rounded-xl border-white bg-white shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-xs font-bold text-slate-700">Storage Location</Label>
                <Input id="location" placeholder="e.g. Aisle 4" className="h-11 rounded-xl border-white bg-white shadow-sm" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 sm:justify-between items-center">
          <p className="text-[10px] text-slate-400 font-bold max-w-[200px]">
            * Fields are required for proper ledger integration.
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-11 px-6 rounded-xl font-bold text-slate-600">
              <X size={18} className="mr-2" /> Cancel
            </Button>
            <Button className="h-11 px-8 rounded-xl bg-schoolgate-green text-white font-black shadow-lg shadow-schoolgate-green/20 hover:bg-schoolgate-green/90">
              <Save size={18} className="mr-2" /> Save Item to Registry
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}