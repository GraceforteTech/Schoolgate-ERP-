import { useState } from "react";
import { PlaceholderForm } from "@/components/ui/placeholder-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, BookOpen, GraduationCap, Award, CheckCircle2, 
  Clock, AlertTriangle, Zap, ArrowUpRight, FileText, 
  Printer, Save, ClipboardList, Lock, Globe, Download,
  BarChart3, LayoutDashboard, Search, MessageSquare, ShieldAlert,
  Star, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAcademicResultsDashboardStats } from "@/lib/academic.functions";
import { useSearch } from "@tanstack/react-router";
import { useTenant } from "@/hooks/use-tenant";

export function ExecutiveAcademicDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formConfig, setFormConfig] = useState({ title: '', description: '', icon: Save });
  
  const search: any = useSearch({ from: '/finance/results/' });
  const { tenantId } = useTenant();
  const getStats = useServerFn(getAcademicResultsDashboardStats);
  
  const { data: stats } = useSuspenseQuery({
    queryKey: ['academicResultsStats', tenantId, search.session, search.term],
    queryFn: () => getStats({ 
      data: {
        tenantId, 
        session: search.session, 
        term: search.term 
      }
    })
  });

  const openForm = (title: string, description: string, icon: any) => {
    setFormConfig({ title, description, icon });
    setIsFormOpen(true);
  };

  const academicKPIs = [
    { title: "Total Students", value: stats.totalStudents, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Subjects", value: stats.totalSubjects, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
    { title: "Total Classes", value: stats.totalClasses, icon: LayoutDashboard, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Results Generated", value: stats.resultsGenerated, icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Results Approved", value: stats.resultsApproved, icon: CheckCircle2, color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
    { title: "Results Published", value: stats.resultsPublished, icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50" },
    { title: "Pass Rate", value: `${stats.passRate}%`, icon: TrendingUp, color: "text-schoolgate-green", bg: "bg-emerald-50" },
    { title: "Distinction Rate", value: `${stats.distinctionRate}%`, icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-schoolgate-green-light rounded-lg">
            <Zap size={20} className="text-schoolgate-green" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Executive Results Command Center</h2>
            <p className="text-sm font-medium text-slate-500 italic">Live-wired dashboard monitoring academic performance and submission workflows.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => openForm("Post Scores", "Record academic assessments.", Save)} className="bg-schoolgate-green hover:bg-schoolgate-green/90 h-10 rounded-xl px-4 gap-2 font-bold shadow-sm">
          <Save size={16} /> Post Scores
        </Button>
        <Button onClick={() => openForm("Compute Results", "Calculate final grades.", Zap)} variant="outline" className="h-10 rounded-xl px-4 gap-2 font-bold bg-white border-slate-200 shadow-sm">
          <Zap size={16} /> Compute Results
        </Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Academic KPIs</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
          {academicKPIs.map((kpi, i) => (
            <Card key={i} className="rounded-[14px] border-none shadow-sm bg-white p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className={cn("p-2 rounded-lg w-fit mb-3 transition-colors", kpi.bg)}>
                <kpi.icon size={18} className={kpi.color} />
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">{kpi.value}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.title}</p>
            </Card>
          ))}
        </div>
      </div>

      <PlaceholderForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        title={formConfig.title} 
        description={formConfig.description} 
        icon={formConfig.icon} 
      />
    </div>
  );
}
