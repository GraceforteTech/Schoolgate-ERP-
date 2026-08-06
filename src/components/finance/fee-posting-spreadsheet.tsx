import { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  Cloud, 
  RefreshCcw, 
  FileSpreadsheet,
  Sparkles,
  Search,
  Download,
  Upload,
  Undo2,
  Redo2,
  Trash2,
  Check,
  X,
  History,
  ShieldCheck,
  CreditCard,
  User,
  Info
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImportProtectionDialog } from "./import-protection-dialog";
import { Progress } from "@/components/ui/progress";

interface CellPosition {
  r: number;
  c: number;
}

interface SelectionRange {
  start: CellPosition;
  end: CellPosition;
}

interface Column {
  key: string;
  label: string;
  width: string;
  type: "text" | "currency" | "badge";
  readOnly?: boolean;
}

const COLUMNS: Column[] = [
  { key: "admNo", label: "Admission No", width: "w-40", type: "text", readOnly: true },
  { key: "name", label: "Student Name", width: "w-64", type: "text", readOnly: true },
  { key: "class", label: "Class", width: "w-32", type: "text", readOnly: true },
  { key: "fees", label: "School Fees", width: "w-40", type: "currency" },
  { key: "bf", label: "B/F Debt", width: "w-40", type: "currency" },
  { key: "discount", label: "Discount", width: "w-40", type: "currency" },
  { key: "totalPayable", label: "Total Payable", width: "w-40", type: "currency", readOnly: true },
  { key: "paid", label: "Amount Paid", width: "w-40", type: "currency", readOnly: true },
  { key: "outstanding", label: "Outstanding", width: "w-40", type: "currency", readOnly: true },
  { key: "status", label: "Status", width: "w-32", type: "badge", readOnly: true },
];

const INITIAL_DATA = [
  { id: 1, admNo: "SCH/2024/001", name: "Adebayo Tunde", class: "JSS 1A", fees: 40000, bf: 8500, discount: 5000, totalPayable: 43500, paid: 20000, outstanding: 23500, status: "Active" },
  { id: 2, admNo: "SCH/2024/002", name: "Chukwuma Ifeanyi", class: "JSS 1A", fees: 40000, bf: 0, discount: 0, totalPayable: 40000, paid: 40000, outstanding: 0, status: "Active" },
  { id: 3, admNo: "SCH/2024/003", name: "Fatima Yusuf", class: "JSS 1A", fees: 40000, bf: 12500, discount: 4000, totalPayable: 48500, paid: 10000, outstanding: 38500, status: "Active" },
  { id: 4, admNo: "SCH/2024/004", name: "Grace Okon", class: "JSS 1A", fees: 40000, bf: 0, discount: 2000, totalPayable: 38000, paid: 0, outstanding: 38000, status: "Pending" },
  { id: 5, admNo: "SCH/2024/005", name: "Ibrahim Musa", class: "JSS 1A", fees: 40000, bf: 5000, discount: 0, totalPayable: 45000, paid: 45000, outstanding: 0, status: "Active" },
  { id: 6, admNo: "SCH/2024/006", name: "John Doe", class: "JSS 1B", fees: 40000, bf: 0, discount: 0, totalPayable: 40000, paid: 15000, outstanding: 25000, status: "Active" },
  { id: 7, admNo: "SCH/2024/007", name: "Jane Doe", class: "JSS 1B", fees: 40000, bf: 0, discount: 0, totalPayable: 40000, paid: 40000, outstanding: 0, status: "Active" },
  { id: 8, admNo: "SCH/2024/008", name: "Sam Smith", class: "JSS 1B", fees: 40000, bf: 2000, discount: 0, totalPayable: 42000, paid: 42000, outstanding: 0, status: "Active" },
  { id: 9, admNo: "SCH/2024/009", name: "Alex Jones", class: "JSS 1B", fees: 40000, bf: 0, discount: 10000, totalPayable: 30000, paid: 30000, outstanding: 0, status: "Active" },
  { id: 10, admNo: "SCH/2024/010", name: "Chris Evans", class: "JSS 1B", fees: 40000, bf: 0, discount: 0, totalPayable: 40000, paid: 0, outstanding: 40000, status: "Active" },
];

export function FeePostingSpreadsheet({ isLoading = false }: { isLoading?: boolean }) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [data, setData] = useState(INITIAL_DATA);
  const [selection, setSelection] = useState<SelectionRange | null>(null);
  const [editing, setEditing] = useState<CellPosition | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "idle">("idle");
  const [isPostingDialogOpen, setIsPostingDialogOpen] = useState(false);
  const [isImportProtectionOpen, setIsImportProtectionOpen] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [postingProgress, setPostingProgress] = useState(0);
  const [modifiedRows, setModifiedRows] = useState<Set<number>>(new Set());
  const tableRef = useRef<HTMLTableElement>(null);

  // Calculations for dialog
  const totalAmount = data.reduce((acc, curr) => acc + (curr.fees || 0), 0);
  const totalBf = data.reduce((acc, curr) => acc + (curr.bf || 0), 0);
  const totalDiscount = data.reduce((acc, curr) => acc + (curr.discount || 0), 0);
  const finalAmount = totalAmount + totalBf - totalDiscount;

  const handlePostFees = async () => {
    setIsPosting(true);
    setPostingProgress(0);
    
    // Simulate multi-step processing
    for (let i = 1; i <= 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setPostingProgress(i * 10);
    }
    
    setIsPosting(false);
    setIsPostingDialogOpen(false);
    setModifiedRows(new Set()); // Reset modifications after posting
    
    toast.success("School Fees Posted Successfully", {
      description: `Processed ${data.length} student records.`,
      className: "bg-emerald-50 border-emerald-100 text-emerald-900",
    });
  };

  const handleImport = () => {
    // Show protection dialog
    setIsImportProtectionOpen(true);
  };

  const handleConfirmImport = (strategy: string) => {
    setIsImportProtectionOpen(false);
    toast.info(`Importing using ${strategy} strategy...`, {
      description: "Data is being synchronized with the spreadsheet.",
    });
    // In a real app, this would merge imported data based on strategy
  };

  if (!selectedClass && !isLoading) {
    return (
      <Card className="rounded-[24px] border-none shadow-sm bg-white overflow-hidden p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95">
        <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
           <FileSpreadsheet size={80} className="text-slate-200" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">No class selected</h3>
        <p className="text-slate-500 font-medium max-w-sm mb-8">
           Choose a class from the options below to begin posting and managing school fees for the current term.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
           {["JSS 1A", "JSS 1B", "SS 1A", "SS 3B"].map((cls) => (
             <Button 
               key={cls}
               variant="outline" 
               className="h-11 px-6 rounded-xl font-bold border-slate-200 hover:border-schoolgate-green hover:text-schoolgate-green transition-all"
               onClick={() => setSelectedClass(cls)}
             >
               Select {cls}
             </Button>
           ))}
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-8 w-64 rounded-xl" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl" />
          </div>
        </div>
        <div className="space-y-2">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
      </Card>
    );
  }

  useEffect(() => {
    let timer: any;
    if (saveStatus === "saving") {
      timer = setTimeout(() => setSaveStatus("saved"), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [saveStatus]);


  const handleCellClick = (r: number, c: number, shiftKey: boolean) => {
    if (shiftKey && selection) {
      setSelection({ ...selection, end: { r, c } });
    } else {
      setSelection({ start: { r, c }, end: { r, c } });
      setEditing(null);
    }
  };

  const handleCellDoubleClick = (r: number, c: number) => {
    const col = COLUMNS[c];
    if (col && !col.readOnly) {
      setEditing({ r, c });
    }
  };

  const updateCellValue = (r: number, c: number, value: any) => {
    const col = COLUMNS[c];
    if (!col) return;
    
    const key = col.key;
    const newData = [...data];
    const numValue = col.type === "currency" ? parseFloat(value.toString().replace(/[^0-9.-]+/g, "")) : value;
    
    if (col.type === "currency" && isNaN(numValue)) return;
    
    const row = { ...newData[r] } as any;
    row[key] = numValue;

    // Auto-calculate Total Payable and Outstanding
    if (["fees", "bf", "discount"].includes(key)) {
      row.totalPayable = (row.fees || 0) + (row.bf || 0) - (row.discount || 0);
      row.outstanding = row.totalPayable - (row.paid || 0);
    }
    
    newData[r] = row;
    setData(newData);
    setSaveStatus("saving");
    
    // Track modification
    setModifiedRows(prev => {
      const next = new Set(prev);
      next.add(r);
      return next;
    });
  };

  const isSelected = (r: number, c: number) => {
    if (!selection) return false;
    const { start, end } = selection;
    const minR = Math.min(start.r, end.r);
    const maxR = Math.max(start.r, end.r);
    const minC = Math.min(start.c, end.c);
    const maxC = Math.max(start.c, end.c);
    return r >= minR && r <= maxR && c >= minC && c <= maxC;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!selection) return;

    const { end } = selection;
    const current = end;

    if (editing) {
      if (e.key === "Enter") {
        setEditing(null);
        e.preventDefault();
      }
      return;
    }

    if (e.key.startsWith("Arrow")) {
      let { r, c } = current;
      if (e.key === "ArrowUp") r = Math.max(0, r - 1);
      if (e.key === "ArrowDown") r = Math.min(data.length - 1, r + 1);
      if (e.key === "ArrowLeft") c = Math.max(0, c - 1);
      if (e.key === "ArrowRight") c = Math.min(COLUMNS.length - 1, c + 1);

      if (e.shiftKey) {
        setSelection({ ...selection, end: { r, c } });
      } else {
        setSelection({ start: { r, c }, end: { r, c } });
      }
      e.preventDefault();
    }

    if (e.key === "Tab") {
      let { r, c } = current;
      if (e.shiftKey) {
        if (c > 0) c--;
        else if (r > 0) { r--; c = COLUMNS.length - 1; }
      } else {
        if (c < COLUMNS.length - 1) c++;
        else if (r < data.length - 1) { r++; c = 0; }
      }
      setSelection({ start: { r, c }, end: { r, c } });
      e.preventDefault();
    }

    if (e.key === "Enter") {
      const col = COLUMNS[current.c];
      if (col && !col.readOnly) {
        setEditing({ r: current.r, c: current.c });
      } else {
        const r = Math.min(data.length - 1, current.r + 1);
        setSelection({ start: { r, c: current.c }, end: { r, c: current.c } });
      }
      e.preventDefault();
    }

    if (e.ctrlKey && e.key === "c") {
      const { start, end } = selection;
      const minR = Math.min(start.r, end.r);
      const maxR = Math.max(start.r, end.r);
      const minC = Math.min(start.c, end.c);
      const maxC = Math.max(start.c, end.c);
      
      let copyText = "";
      for (let r = minR; r <= maxR; r++) {
        for (let c = minC; c <= maxC; c++) {
          const col = COLUMNS[c];
          if (col) {
            copyText += (data[r] as any)[col.key] + (c === maxC ? "" : "\t");
          }
        }
        copyText += (r === maxR ? "" : "\n");
      }

      navigator.clipboard.writeText(copyText);
      e.preventDefault();
    }

    if (e.ctrlKey && e.key === "v") {
      navigator.clipboard.readText().then(text => {
        if (!selection) return;
        const rows = text.split("\n").map(r => r.split("\t"));
        const newData = [...data];
        const { r: startR, c: startC } = selection.start;

        rows.forEach((row, i) => {
          if (startR + i >= data.length) return;
          row.forEach((cell, j) => {
            if (startC + j >= COLUMNS.length) return;
            const col = COLUMNS[startC + j];
            if (col && !col.readOnly) {
              const key = col.key;
              let val: any = cell;
              if (col.type === "currency") {
                val = parseFloat(cell.replace(/[^0-9.-]+/g, ""));
                if (isNaN(val)) return;
              }
              (newData[startR + i] as any)[key] = val;
            }
          });
        });
        setData(newData);
        setSaveStatus("saving");
      });
      e.preventDefault();
    }
  };

  const handleAutoFill = () => {
    if (!selection) return;
    const { start, end } = selection;
    if (start.r !== end.r || start.c !== end.c) return;

    const col = COLUMNS[start.c];
    if (!col) return;
    
    const sourceVal = (data[start.r] as any)[col.key];
    const newData = [...data];
    for (let r = start.r + 1; r < data.length; r++) {
      (newData[r] as any)[col.key] = sourceVal;
    }
    setData(newData);
    setSaveStatus("saving");
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Bulk Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-[18px] border border-slate-100 shadow-sm">
         <div className="flex items-center gap-1">
            <ToolbarButton icon={Check} label="Select All" />
            <ToolbarButton icon={X} label="Deselect" />
            <div className="h-5 w-px bg-slate-100 mx-1" />
            <ToolbarButton icon={Undo2} label="Undo" />
            <ToolbarButton icon={Redo2} label="Redo" />
            <div className="h-5 w-px bg-slate-100 mx-1" />
            <ToolbarButton icon={Trash2} label="Clear Entries" variant="danger" />
         </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 rounded-xl gap-2 font-bold border-slate-200 text-slate-600" onClick={() => toast.info("Downloading Template...")}>
               <Download size={14} /> Template
            </Button>
            <Button variant="outline" size="sm" className="h-9 rounded-xl gap-2 font-bold border-slate-200 text-slate-600" onClick={handleImport}>
               <Upload size={14} /> Import Excel
            </Button>
            <Button variant="ghost" size="sm" className="h-9 rounded-xl gap-2 font-bold text-schoolgate-green hover:bg-schoolgate-green-light" onClick={() => toast.info("Data Refreshed", { className: "bg-blue-50 border-blue-100 text-blue-900" })}>
               <RefreshCcw size={14} /> Refresh
            </Button>
         </div>
      </div>

      <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <FileSpreadsheet size={18} className="text-schoolgate-green" />
              Bulk Fee Posting Worksheet
            </h2>
            <div className="flex items-center gap-2 border-l pl-4 border-slate-200">
               {saveStatus === "saving" ? (
                 <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100 animate-pulse gap-1.5 py-1 px-3">
                   <RefreshCcw size={12} className="animate-spin" /> Saving...
                 </Badge>
               ) : saveStatus === "saved" ? (
                 <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 gap-1.5 py-1 px-3">
                   <CheckCircle2 size={12} /> Changes Saved
                 </Badge>
               ) : (
                 <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-100 gap-1.5 py-1 px-3">
                   <Cloud size={12} /> Cloud Synced
                 </Badge>
               )}
            </div>
          </div>
          <div className="flex items-center gap-2">
             <Button variant="outline" size="sm" className="h-9 rounded-xl gap-2 font-bold" onClick={handleAutoFill}>
                <Sparkles size={14} className="text-amber-500" /> Auto-Fill Down
             </Button>
             <div className="h-6 w-px bg-slate-200 mx-2" />
             <Button className="h-9 bg-schoolgate-green text-white hover:bg-schoolgate-green/90 rounded-xl font-bold px-6" onClick={() => setIsPostingDialogOpen(true)}>Apply & Post Fees</Button>
          </div>
        </div>
        
        <div className="p-0 overflow-x-auto relative" onKeyDown={handleKeyDown} tabIndex={0}>
          <table className="w-full border-separate border-spacing-0 text-sm select-none" ref={tableRef}>
            <thead className="sticky top-0 z-30">
              <tr className="bg-white">
                <th className="w-10 bg-slate-50 border-b border-r border-slate-100 sticky left-0 z-40" />
                {COLUMNS.map((col, idx) => (
                  <th 
                    key={col.key} 
                    className={cn(
                      "px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider text-[11px] border-b border-r border-slate-100 last:border-r-0 bg-white",
                      col.width,
                      idx < 2 && "sticky z-40",
                      idx === 0 && "left-10 border-r-slate-200",
                      idx === 1 && "left-50 border-r-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, r) => (
                <tr key={row.id} className={cn("group transition-colors", r % 2 === 0 ? "bg-white" : "bg-slate-50/30", "hover:bg-schoolgate-green/5")}>
                  <td className="bg-slate-50 border-r border-b border-slate-100 text-center text-[10px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors sticky left-0 z-20">
                    {r + 1}
                  </td>
                  {COLUMNS.map((col, c) => {
                    const value = (row as any)[col.key];
                    const selected = isSelected(r, c);
                    const isEditing = editing?.r === r && editing?.c === c;

                    return (
                      <td 
                        key={col.key}
                        className={cn(
                          "relative h-12 border-r border-b border-slate-50 last:border-r-0 transition-all",
                          selected && "bg-schoolgate-green/10 ring-2 ring-inset ring-schoolgate-green z-10",
                          col.key === "bf" && !selected && "bg-amber-50/30",
                          col.readOnly && "bg-slate-50/30 cursor-not-allowed",
                          c < 2 && "sticky z-20 bg-inherit",
                          c === 0 && "left-10 border-r-slate-200",
                          c === 1 && "left-50 border-r-slate-200 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]"
                        )}
                        onClick={(e) => handleCellClick(r, c, e.shiftKey)}
                        onDoubleClick={() => handleCellDoubleClick(r, c)}
                      >
                        {isEditing ? (
                          <input 
                            autoFocus
                            className="absolute inset-0 w-full h-full px-4 outline-none border-2 border-schoolgate-green font-bold tabular-nums bg-white z-20"
                            value={value}
                            onChange={(e) => {
                              const val = e.target.value;
                              const currentCol = COLUMNS[c];
                              if (currentCol?.type === "currency" && val !== "" && !/^-?\d*\.?\d*$/.test(val)) return;
                              updateCellValue(r, c, val);
                            }}
                            onBlur={() => setEditing(null)}
                          />
                        ) : (
                          <div className={cn(
                            "px-4 truncate font-medium",
                            col.type === "currency" && "tabular-nums font-bold text-slate-900",
                            col.key === "status" && value === "Active" ? "text-emerald-600" : 
                            col.key === "status" && value === "Pending" ? "text-amber-600" : ""
                          )}>
                            {col.type === "currency" ? `₦${value.toLocaleString()}` : value}
                          </div>
                        )}
                        {selected && r === (selection?.end.r ?? -1) && c === (selection?.end.c ?? -1) && (
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-schoolgate-green border border-white cursor-crosshair z-30" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Total Students: {data.length}</div>
           <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Modified Rows: {modifiedRows.size}</div>
           <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Pending Approval: 0</div>
        </div>
        <div className="flex items-center gap-4">
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cell selection: {selection ? `${selection.start.r + 1}:${selection.start.c + 1}` : 'None'}</p>
        </div>
      </div>

      <Dialog open={isPostingDialogOpen} onOpenChange={setIsPostingDialogOpen}>
        <DialogContent className="max-w-md rounded-[24px] border-none shadow-2xl p-0 overflow-hidden">
          <DialogHeader className="p-8 bg-slate-900 text-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldCheck size={120} />
            </div>
            <DialogTitle className="text-2xl font-black tracking-tight mb-2">Confirm Fee Posting</DialogTitle>
            <DialogDescription className="text-slate-400 font-medium">
              You are about to batch post financial records for the current term. Please review the summary below.
            </DialogDescription>
          </DialogHeader>

          <div className="p-8 space-y-6 bg-white">
            <div className="grid grid-cols-2 gap-4">
              <SummaryItem label="Students" value={data.length} icon={User} />
              <SummaryItem label="Base Fees" value={`₦${totalAmount.toLocaleString()}`} icon={CreditCard} />
              <SummaryItem label="B/F Debt" value={`₦${totalBf.toLocaleString()}`} icon={History} />
              <SummaryItem label="Discounts" value={`₦${totalDiscount.toLocaleString()}`} icon={Sparkles} color="text-emerald-600" />
            </div>

            <div className="p-6 rounded-[20px] bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Final Amount To Post</p>
                <p className="text-2xl font-black text-slate-900">₦{finalAmount.toLocaleString()}</p>
                {isPosting && (
                  <div className="mt-4 space-y-1.5 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Processing Batch...</span>
                      <span>{postingProgress}%</span>
                    </div>
                    <Progress value={postingProgress} className="h-1.5 bg-slate-200" />
                  </div>
                )}
              </div>
              {!isPosting && (
                <div className="h-12 w-12 rounded-full bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
                  <Check size={24} />
                </div>
              )}
            </div>

            <DialogFooter className="flex gap-3 sm:justify-between pt-2">
              <Button variant="ghost" onClick={() => setIsPostingDialogOpen(false)} className="rounded-xl h-12 px-6 font-bold text-slate-500">
                Cancel
              </Button>
              <Button 
                onClick={handlePostFees} 
                disabled={isPosting}
                className="bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-xl h-12 px-8 font-black flex-1 shadow-lg shadow-schoolgate-green/20"
              >
                {isPosting ? <RefreshCcw className="animate-spin mr-2" size={20} /> : <CheckCircle2 className="mr-2" size={20} />}
                {isPosting ? "Posting..." : "Confirm Posting"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ToolbarButton({ icon: Icon, label, variant }: { icon: any; label: string; variant?: "danger" }) {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={cn(
        "h-9 rounded-lg gap-2 text-[11px] font-bold uppercase tracking-wider px-3",
        variant === "danger" ? "text-rose-500 hover:text-rose-600 hover:bg-rose-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
      )}
    >
      <Icon size={14} />
      {label}
    </Button>
  );
}

function SummaryItem({ label, value, icon: Icon, color }: any) {
  return (
    <div className="p-4 rounded-[18px] bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-slate-400" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <p className={cn("text-base font-black text-slate-900", color)}>{value}</p>
    </div>
  );
}

