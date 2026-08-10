import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Globe, 
  Users, 
  BarChart, 
  TrendingUp, 
  Star, 
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAcademicResultsDashboardStats } from "@/lib/academic.functions";
import { useSearch } from "@tanstack/react-router";
import { useTenant } from "@/hooks/use-tenant";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  color: string;
  onClick?: () => void;
}

function KPICard({ title, value, subtitle, icon: Icon, trend, trendUp, color, onClick }: KPICardProps) {
  return (
    <div 
      onClick={onClick}
      className="group relative overflow-hidden bg-white p-6 rounded-[14px] shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-150", color)} />
      
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl transition-colors", color.split(' ')[0].replace('bg-', 'bg-') + "/10")}>
          <Icon className={cn("w-6 h-6", color.split(' ')[1])} />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
            trendUp ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          )}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
            {trend}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-xs text-slate-500 font-medium italic mt-2">{subtitle}</p>
      </div>
    </div>
  );
}

export function ResultKPIs() {
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

  const kpis = [
    { title: "Subjects Offered", value: stats.totalSubjects, subtitle: "Across all sections", icon: BookOpen, color: "bg-blue-600 text-blue-600" },
    { title: "Results Pending", value: stats.resultsPending, subtitle: "Needs processing", icon: Clock, color: "bg-amber-600 text-amber-600" },
    { title: "Results Approved", value: stats.resultsApproved, subtitle: "Authorized records", icon: CheckCircle2, color: "bg-emerald-600 text-emerald-600" },
    { title: "Results Published", value: stats.resultsPublished, subtitle: "Live on portal", icon: Globe, color: "bg-schoolgate-green text-schoolgate-green" },
    { title: "Students Assessed", value: stats.totalStudents, subtitle: "Current enrollment", icon: Users, color: "bg-indigo-600 text-indigo-600" },
    { title: "Average Score", value: stats.averageScore, subtitle: "Total school mean", icon: BarChart, color: "bg-violet-600 text-violet-600" },
    { title: "Pass Rate", value: `${stats.passRate}%`, subtitle: "Excluding absences", icon: TrendingUp, color: "bg-teal-600 text-teal-600" },
    { title: "Distinction Rate", value: `${stats.distinctionRate}%`, subtitle: "Top performance", icon: Star, color: "bg-yellow-500 text-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {kpis.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
}
