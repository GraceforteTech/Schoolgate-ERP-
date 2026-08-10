import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  className?: string;
}

export function SummaryCard({
  title,
  value,
  description,
  icon,
  trend,
  isLoading,
  className
}: SummaryCardProps) {
  if (isLoading) {
    return (
      <Card className={cn("p-6 border-none shadow-sm rounded-[24px]", className)}>
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-12 w-12 rounded-2xl" />
        </div>
      </Card>
    );
  }

  return (
    <div className={cn(
      "p-6 bg-white dark:bg-slate-900 border-none shadow-sm rounded-[24px] hover:shadow-md transition-all duration-300 group relative overflow-hidden",
      className
    )}>
      <div className="flex justify-between items-start relative z-10">
        <div className="space-y-1">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h4>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
              {value || '0'}
            </span>
            {trend && (
              <span className={cn(
                "flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full",
                trend.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
              )}>
                {trend.isPositive ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                {trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-1 italic">{description}</p>
          )}
        </div>
        <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-schoolgate-green group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-slate-50 dark:bg-slate-800/50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 -z-0 opacity-50" />
    </div>
  );
}

function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white dark:bg-slate-900", className)}>
      {children}
    </div>
  );
}
