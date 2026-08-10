import { useState } from "react";
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter, 
  RefreshCw, 
  MoreVertical, 
  Lock, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Calendar,
  Layers,
  Activity,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Mock Data
const mockPins = [
  { id: "1", student: "Blessing Okoro", admissionNo: "SG-2024-002", pin: "483921", session: "2023/2024", term: "Second Term", uses: "1 / 5", status: "Active", expiry: "None" },
  { id: "2", student: "John Doe", admissionNo: "SG-2024-005", pin: "928374", session: "2023/2024", term: "Second Term", uses: "5 / 5", status: "Exhausted", expiry: "None" },
  { id: "3", student: "Chidi Eze", admissionNo: "SG-2024-012", pin: "102938", session: "2023/2024", term: "Second Term", uses: "0 / 3", status: "Deactivated", expiry: "None" },
  { id: "4", student: "Amaka Okafor", admissionNo: "SG-2024-022", pin: "554433", session: "2023/2024", term: "Second Term", uses: "2 / 5", status: "Expired", expiry: "10 Aug 2026" },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active": return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50 rounded-lg">Active</Badge>;
    case "Exhausted": return <Badge className="bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-50 rounded-lg">Exhausted</Badge>;
    case "Deactivated": return <Badge className="bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-50 rounded-lg">Deactivated</Badge>;
    case "Expired": return <Badge className="bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-50 rounded-lg">Expired</Badge>;
    default: return <Badge variant="outline">{status}</Badge>;
  }
};

export function PinManagementSystem() {
  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm rounded-[14px]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Total Active PINs</p>
              <h3 className="text-2xl font-black text-slate-900">842</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm rounded-[14px]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Successful Access</p>
              <h3 className="text-2xl font-black text-slate-900">1,240</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm rounded-[14px]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Exhausted PINs</p>
              <h3 className="text-2xl font-black text-slate-900">156</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm rounded-[14px]">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Failed Attempts</p>
              <h3 className="text-2xl font-black text-slate-900">42</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
        <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Select defaultValue="2023/2024">
              <SelectTrigger className="h-10 w-[140px] rounded-xl border-slate-200 font-bold text-xs">
                <SelectValue placeholder="Session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="Second Term">
              <SelectTrigger className="h-10 w-[140px] rounded-xl border-slate-200 font-bold text-xs">
                <SelectValue placeholder="Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Second Term">Second Term</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="JSS 2A">
              <SelectTrigger className="h-10 w-[140px] rounded-xl border-slate-200 font-bold text-xs">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JSS 2A">JSS 2A</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative group w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-schoolgate-green transition-colors" size={14} />
              <Input 
                placeholder="Search Student or Admission No..." 
                className="pl-9 h-10 text-xs rounded-xl border-slate-200 focus-visible:ring-schoolgate-green font-medium" 
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button className="h-10 bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl px-6 font-bold shadow-lg shadow-schoolgate-green/20 gap-2">
              <Plus size={16} /> Generate PINs
            </Button>
            <Button variant="outline" className="h-10 rounded-xl font-bold border-slate-200 gap-2 text-slate-600 px-4">
              <RefreshCw size={16} />
            </Button>
            <Button variant="outline" className="h-10 rounded-xl font-bold border-slate-200 gap-2 text-slate-600 px-4">
              <Download size={16} /> Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PIN Table */}
      <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">Student & Adm No</th>
                <th className="px-6 py-4">Secure PIN</th>
                <th className="px-6 py-4">Session/Term</th>
                <th className="px-6 py-4">Uses</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockPins.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{item.student}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.admissionNo}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 bg-slate-100/50 border border-slate-200 px-3 py-1.5 rounded-lg w-fit">
                      <Lock size={12} className="text-slate-400" />
                      <span className="font-mono font-bold text-slate-700 tracking-widest">{item.pin}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-600">{item.session}</div>
                    <div className="text-[10px] font-bold text-slate-400 italic">{item.term}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-black text-slate-900">{item.uses}</div>
                      <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        {(() => {
                          const parts = item.uses.split(' / ').map(Number);
                          const current = parts[0] || 0;
                          const max = parts[1] || 1;
                          const percentage = (current / max) * 100;
                          return (
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                item.status === "Exhausted" ? "bg-amber-500" : "bg-emerald-500"
                              )} 
                              style={{ width: `${percentage}%` }}
                            />
                          );
                        })()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-100 shadow-xl">
                        <DropdownMenuItem className="gap-2 font-bold text-xs"><Eye size={14} /> View Audit History</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 font-bold text-xs"><RefreshCw size={14} /> Regenerate PIN</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 font-bold text-xs text-amber-600"><XCircle size={14} /> Deactivate PIN</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 font-bold text-xs text-rose-600"><Trash2 size={14} /> Delete Record</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
