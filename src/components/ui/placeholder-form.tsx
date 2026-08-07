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
  Plus,
  Save,
  X,
  ClipboardList,
  GraduationCap,
  Users,
  Wallet,
  Bus,
  FileText,
  AlertCircle
} from "lucide-react";

interface PlaceholderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  icon: any;
}

export function PlaceholderForm({ open, onOpenChange, title, description, icon: Icon }: PlaceholderFormProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-[24px]">
        <div className="bg-schoolgate-green p-6 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center backdrop-blur-sm">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight">{title}</DialogTitle>
                <DialogDescription className="text-white/70 font-medium">
                  {description}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-8 bg-white space-y-6">
          <div className="flex flex-col items-center text-center p-8 border-2 border-dashed border-slate-100 rounded-3xl">
            <div className="h-16 w-16 rounded-full bg-slate-50 grid place-items-center text-slate-300 mb-4">
              <Icon size={32} />
            </div>
            <h4 className="font-bold text-slate-800 italic">Configuration Form Placeholder</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              This form module is ready for backend integration. All data captured here will be validated against school policies before processing.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">Reference Name/ID</Label>
              <Input placeholder="Enter reference..." className="h-11 rounded-xl border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-700">Notes & Comments</Label>
              <Input placeholder="Optional details..." className="h-11 rounded-xl border-slate-200" />
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 sm:justify-between items-center">
          <div className="flex items-center gap-2 text-amber-600">
             <AlertCircle size={14} />
             <p className="text-[10px] font-bold uppercase tracking-wider">Draft Mode</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => onOpenChange(false)} className="h-11 px-6 rounded-xl font-bold text-slate-600">
              Cancel
            </Button>
            <Button className="h-11 px-8 rounded-xl bg-schoolgate-green text-white font-black shadow-lg shadow-schoolgate-green/20 hover:bg-schoolgate-green/90">
              <Save size={18} className="mr-2" /> Save & Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
