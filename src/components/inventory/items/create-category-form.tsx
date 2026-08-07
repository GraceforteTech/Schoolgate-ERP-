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
import { Textarea } from "@/components/ui/textarea";
import { 
  Layers, 
  Save,
  X,
  Palette,
  Type
} from "lucide-react";

interface CreateCategoryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCategoryForm({ open, onOpenChange }: CreateCategoryFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-[24px]">
        <div className="bg-schoolgate-green p-6 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center backdrop-blur-sm">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight">Create Category</DialogTitle>
                <DialogDescription className="text-white/70 font-medium">
                  Organize your inventory with new classification groups.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-8 bg-white space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category-name" className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Type size={14} className="text-schoolgate-green" /> Category Name
              </Label>
              <Input id="category-name" placeholder="e.g. Science Lab Chemicals" className="h-11 rounded-xl border-slate-200 focus:border-schoolgate-green" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-desc" className="text-xs font-bold text-slate-700">Description (Optional)</Label>
              <Textarea id="category-desc" placeholder="Brief details about items in this category..." className="rounded-xl border-slate-200 focus:border-schoolgate-green min-h-[100px]" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <Palette size={14} className="text-schoolgate-green" /> Theme Color
              </Label>
              <div className="flex gap-3">
                {['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-indigo-500', 'bg-purple-500'].map((color) => (
                  <button key={color} className={`h-8 w-8 rounded-full ${color} cursor-pointer hover:ring-2 ring-offset-2 ring-slate-200 transition-all`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 sm:justify-between items-center">
          <p className="text-[10px] text-slate-400 font-bold">
            * Categories help in generating group-level financial reports.
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-11 px-6 rounded-xl font-bold text-slate-600">
              Cancel
            </Button>
            <Button className="h-11 px-8 rounded-xl bg-schoolgate-green text-white font-black shadow-lg shadow-schoolgate-green/20 hover:bg-schoolgate-green/90">
              <Save size={18} className="mr-2" /> Save Category
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}