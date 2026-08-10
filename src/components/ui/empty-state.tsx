import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  } | null;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 rounded-[32px] border-2 border-dashed border-slate-100 dark:border-slate-800/50",
      className
    )}>
      <div className="h-24 w-24 rounded-[32px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600 mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed italic">
        {description}
      </p>
      {action && (
        <Button 
          onClick={action.onClick}
          className="h-12 px-8 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 font-black uppercase text-[10px] tracking-widest text-white shadow-lg shadow-schoolgate-green/20 flex items-center gap-2"
        >
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
}
