import { useState, useEffect, useRef } from "react";
import { 
  CheckCircle2, 
  Cloud, 
  RefreshCcw, 
  FileSpreadsheet,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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
  { key: "tuition", label: "Tuition Fee", width: "w-40", type: "currency" },
  { key: "transport", label: "Transport", width: "w-40", type: "currency" },
  { key: "boarding", label: "Boarding", width: "w-40", type: "currency" },
  { key: "facility", label: "Facility", width: "w-40", type: "currency" },
  { key: "status", label: "Status", width: "w-32", type: "badge", readOnly: true },
];

const INITIAL_DATA = [
  { id: 1, admNo: "SCH/2024/001", name: "Adebayo Tunde", class: "JSS 1A", tuition: 75000, transport: 15000, boarding: 0, facility: 5000, status: "Active" },
  { id: 2, admNo: "SCH/2024/002", name: "Chukwuma Ifeanyi", class: "JSS 1A", tuition: 75000, transport: 0, boarding: 120000, facility: 5000, status: "Active" },
  { id: 3, admNo: "SCH/2024/003", name: "Fatima Yusuf", class: "JSS 1A", tuition: 75000, transport: 15000, boarding: 0, facility: 5000, status: "Active" },
  { id: 4, admNo: "SCH/2024/004", name: "Grace Okon", class: "JSS 1A", tuition: 75000, transport: 15000, boarding: 0, facility: 5000, status: "Pending" },
  { id: 5, admNo: "SCH/2024/005", name: "Ibrahim Musa", class: "JSS 1A", tuition: 75000, transport: 0, boarding: 0, facility: 5000, status: "Active" },
  { id: 6, admNo: "SCH/2024/006", name: "John Doe", class: "JSS 1B", tuition: 75000, transport: 15000, boarding: 0, facility: 5000, status: "Active" },
  { id: 7, admNo: "SCH/2024/007", name: "Jane Doe", class: "JSS 1B", tuition: 75000, transport: 15000, boarding: 0, facility: 5000, status: "Active" },
  { id: 8, admNo: "SCH/2024/008", name: "Sam Smith", class: "JSS 1B", tuition: 75000, transport: 15000, boarding: 0, facility: 5000, status: "Active" },
  { id: 9, admNo: "SCH/2024/009", name: "Alex Jones", class: "JSS 1B", tuition: 75000, transport: 0, boarding: 120000, facility: 5000, status: "Active" },
  { id: 10, admNo: "SCH/2024/010", name: "Chris Evans", class: "JSS 1B", tuition: 75000, transport: 15000, boarding: 0, facility: 5000, status: "Active" },
];

export function FeePostingSpreadsheet() {
  const [data, setData] = useState(INITIAL_DATA);
  const [selection, setSelection] = useState<SelectionRange | null>(null);
  const [editing, setEditing] = useState<CellPosition | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "idle">("idle");
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (saveStatus === "saving") {
      const timer = setTimeout(() => setSaveStatus("saved"), 1000);
      return () => clearTimeout(timer);
    }
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
    
    (newData[r] as any)[key] = numValue;
    setData(newData);
    setSaveStatus("saving");
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
          copyText += (data[r] as any)[COLUMNS[c].key] + (c === maxC ? "" : "\t");
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
             <Button variant="outline" size="sm" className="h-9 rounded-xl font-bold">Import CSV</Button>
             <Button className="h-9 bg-schoolgate-green text-white hover:bg-schoolgate-green/90 rounded-xl font-bold">Apply Changes</Button>
          </div>
        </div>
        
        <div className="p-0 overflow-x-auto" onKeyDown={handleKeyDown} tabIndex={0}>
          <table className="w-full border-collapse text-sm select-none" ref={tableRef}>
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="w-10 bg-slate-50/50 border-r border-slate-100" />
                {COLUMNS.map((col) => (
                  <th key={col.key} className={cn("px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider text-[11px] border-r border-slate-100 last:border-r-0", col.width)}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, r) => (
                <tr key={row.id} className="group border-b border-slate-50 last:border-b-0">
                  <td className="bg-slate-50/50 border-r border-slate-100 text-center text-[10px] font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
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
                          "relative h-12 border-r border-slate-50 last:border-r-0 transition-all",
                          selected && "bg-schoolgate-green/5 ring-1 ring-inset ring-schoolgate-green/50 z-10",
                          col.readOnly && "bg-slate-50/30 cursor-not-allowed"
                        )}
                        onClick={(e) => handleCellClick(r, c, e.shiftKey)}
                        onDoubleClick={() => handleCellDoubleClick(r, c)}
                      >
                        {isEditing ? (
                          <input 
                            autoFocus
                            className="absolute inset-0 w-full h-full px-4 outline-none border-2 border-schoolgate-green font-bold tabular-nums bg-white z-20"
                            value={value}
                            onChange={(e) => updateCellValue(r, c, e.target.value)}
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
           <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-blue-500" /> Modified Rows: 0</div>
           <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Pending Approval: 0</div>
        </div>
        <div className="flex items-center gap-4">
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cell selection: {selection ? `${selection.start.r + 1}:${selection.start.c + 1}` : 'None'}</p>
        </div>
      </div>
    </div>
  );
}

