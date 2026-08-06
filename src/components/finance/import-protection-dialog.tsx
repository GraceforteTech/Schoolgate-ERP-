import { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  AlertCircle, 
  FileSpreadsheet, 
  ArrowRight,
  ShieldCheck,
  XCircle,
  Clock
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ImportProtectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (option: "skip" | "blank" | "overwrite") => void;
  stats: {
    total: number;
    existing: number;
    new: number;
    conflicts: number;
  };
}

export function ImportProtectionDialog({ 
  open, 
  onOpenChange, 
  onConfirm, 
  stats 
}: ImportProtectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-[20px] border-none shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">Import Conflict Protection</DialogTitle>
              <DialogDescription className="text-slate-500 font-medium">
                System detected existing student fee records. How would you like to proceed?
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatBox label="To Import" value={stats.total} icon={FileSpreadsheet} color="blue" />
            <StatBox label="New Records" value={stats.new} icon={PlusIcon} color="green" />
            <StatBox label="Existing" value={stats.existing} icon={Clock} color="amber" />
            <StatBox label="Conflicts" value={stats.conflicts} icon={AlertCircle} color="rose" />
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Choose Import Strategy</h4>
            
            <StrategyButton 
              id="skip"
              title="Skip Existing Records"
              description="Keep customized student records. Only import students who don't have this fee assigned yet."
              icon={XCircle}
              color="text-slate-600"
              bgColor="bg-slate-50"
              onSelect={() => onConfirm("skip")}
            />

            <StrategyButton 
              id="blank"
              title="Update Blank Records Only"
              description="Only update amounts and details for students with empty or zero values."
              icon={CheckCircle2}
              color="text-amber-600"
              bgColor="bg-amber-50"
              onSelect={() => onConfirm("blank")}
            />

            <StrategyButton 
              id="overwrite"
              title="Overwrite Existing Records"
              description="Apply import values to all students. This will replace any manual customizations."
              icon={ShieldCheck}
              color="text-rose-600"
              bgColor="bg-rose-50"
              danger
              onSelect={() => onConfirm("overwrite")}
            />
          </div>
        </div>

        <DialogFooter className="p-4 bg-slate-50 border-t border-slate-100">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl font-bold">
            Cancel Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatBox({ label, value, icon: Icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className={cn("p-3 rounded-2xl border flex flex-col items-center text-center", colors[color])}>
      <Icon size={16} className="mb-1" />
      <p className="text-lg font-bold tabular-nums">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-tight opacity-70">{label}</p>
    </div>
  );
}

function StrategyButton({ title, description, icon: Icon, color, bgColor, danger, onSelect }: any) {
  return (
    <button 
      onClick={onSelect}
      className="w-full p-4 rounded-2xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-md transition-all text-left group flex items-start gap-4"
    >
      <div className={cn("p-3 rounded-xl shrink-0 transition-colors", bgColor, color)}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className={cn("font-bold text-sm", danger ? "text-rose-600" : "text-slate-900")}>{title}</h5>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{description}</p>
      </div>
      <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight size={16} className="text-slate-300" />
      </div>
    </button>
  );
}

function PlusIcon(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
