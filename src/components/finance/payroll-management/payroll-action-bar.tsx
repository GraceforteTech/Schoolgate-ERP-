import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, FileSpreadsheet, FileText, Printer, RefreshCw } from "lucide-react";

export function PayrollActionBar() {
  return (
    <div className="bg-white p-4 rounded-[14px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="flex flex-wrap gap-2 flex-1">
        <Select>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Session" /></SelectTrigger>
          <SelectContent><SelectItem value="2025/26">2025/26</SelectItem></SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Month" /></SelectTrigger>
          <SelectContent><SelectItem value="aug">August</SelectItem></SelectContent>
        </Select>
        <div className="relative w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input className="pl-9" placeholder="Search Staff..." />
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" className="bg-schoolgate-green"><Plus className="mr-2 h-4 w-4" /> Generate Payroll</Button>
        <Button size="sm" variant="outline"><FileSpreadsheet className="h-4 w-4" /></Button>
        <Button size="sm" variant="outline"><Printer className="h-4 w-4" /></Button>
        <Button size="sm" variant="ghost"><RefreshCw className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
