import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Package, 
  Hash, 
  Banknote, 
  Info,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface PostSalesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockInventoryItems = [
  { id: "1", name: "English Textbook (JSS1)", price: 3000, category: "Books" },
  { id: "2", name: "Office A4 Paper", price: 4500, category: "Stationery" },
  { id: "3", name: "School Uniform (Primary)", price: 15000, category: "Uniforms" },
  { id: "4", name: "Sulphuric Acid (1L)", price: 12000, category: "Laboratory" },
];

export function PostSalesDialog({ open, onOpenChange }: PostSalesDialogProps) {
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [selectedItemId, setSelectedItemId] = useState("");
  const [quantity, setQuantity] = useState("0");
  const [revenue, setRevenue] = useState("0");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState("");

  const selectedItem = mockInventoryItems.find(item => item.id === selectedItemId);

  useEffect(() => {
    if (selectedItem && quantity) {
      const calculated = selectedItem.price * parseInt(quantity || "0");
      setRevenue(calculated.toString());
    }
  }, [selectedItem, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    toast.success("Sales record posted successfully!", {
      description: `${selectedItem?.name} - ${quantity} units sold for ₦${parseInt(revenue).toLocaleString()}`,
      icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    });
    
    onOpenChange(false);
    // Reset form
    setSelectedItemId("");
    setQuantity("0");
    setRevenue("0");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-[24px] border-none shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="bg-slate-900 text-white p-6">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Banknote className="h-6 w-6 text-schoolgate-green" />
            Post Sales Amount
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Record sales quantity and revenue for inventory audit.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-500 uppercase tracking-wider">Frequency</Label>
              <Tabs 
                value={frequency} 
                onValueChange={(v) => setFrequency(v as "daily" | "weekly")} 
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl h-11">
                  <TabsTrigger value="daily" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-schoolgate-green data-[state=active]:shadow-sm">
                    Daily Posting
                  </TabsTrigger>
                  <TabsTrigger value="weekly" className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-schoolgate-green data-[state=active]:shadow-sm">
                    Weekly Summary
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  {frequency === "daily" ? "Date" : "Start Date"}
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    className="pl-10 rounded-xl border-slate-200 h-11 focus:ring-schoolgate-green/20" 
                  />
                </div>
              </div>
              
              {frequency === "weekly" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-left-2">
                  <Label className="text-xs font-black text-slate-500 uppercase tracking-wider">End Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="pl-10 rounded-xl border-slate-200 h-11 focus:ring-schoolgate-green/20" 
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-500 uppercase tracking-wider">Select Item</Label>
              <Select value={selectedItemId} onValueChange={setSelectedItemId}>
                <SelectTrigger className="rounded-xl border-slate-200 h-11 bg-white focus:ring-schoolgate-green/20">
                  <SelectValue placeholder="Search for item..." />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-xl p-2">
                  {mockInventoryItems.map(item => (
                    <SelectItem key={item.id} value={item.id} className="rounded-lg font-medium text-slate-600">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-slate-400" />
                        <span>{item.name}</span>
                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 ml-auto">
                          ₦{item.price.toLocaleString()}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-500 uppercase tracking-wider">Quantity Sold</Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)}
                    className="pl-10 rounded-xl border-slate-200 h-11 focus:ring-schoolgate-green/20" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black text-slate-500 uppercase tracking-wider">Total Revenue (₦)</Label>
                <div className="relative">
                  <Banknote className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input 
                    type="number" 
                    value={revenue} 
                    onChange={(e) => setRevenue(e.target.value)}
                    className="pl-10 rounded-xl border-slate-200 h-11 focus:ring-schoolgate-green/20 font-bold text-schoolgate-green" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 flex items-start gap-3 border border-emerald-100">
            <Info className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div className="text-xs text-emerald-800 font-medium leading-relaxed">
              Posting this will update the Stock Registry and Goods Issued (Stock-Out) ledgers automatically for the selected period.
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 mt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="rounded-xl h-12 flex-1 font-bold text-slate-600 border-slate-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="rounded-xl h-12 flex-1 font-bold bg-schoolgate-green hover:bg-schoolgate-green/90 text-white shadow-lg shadow-schoolgate-green/20"
              disabled={!selectedItemId || parseInt(quantity) <= 0}
            >
              Confirm Posting
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
