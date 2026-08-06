import { Card, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle2, Clock, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Total Documents", value: "124", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Syllabuses", value: "86", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Pending Updates", value: "12", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Total Downloads", value: "1.2k", icon: Download, color: "text-[#0B6E3C]", bg: "bg-schoolgate-green-light" },
];

export function SyllabusKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <Card key={i} className="border-none shadow-sm rounded-[14px] hover:shadow-md transition-shadow cursor-pointer group">
          <CardContent className="p-5">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-xl transition-colors group-hover:scale-110", kpi.bg)}>
                <kpi.icon className={cn("h-6 w-6", kpi.color)} />
              </div>
              <div>
                <p className="text-2xl font-black tracking-tight text-slate-800">{kpi.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
