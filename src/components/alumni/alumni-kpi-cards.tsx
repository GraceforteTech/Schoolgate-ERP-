import { Card } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  Heart, 
  TrendingUp, 
  Globe, 
  Briefcase, 
  Award, 
  Gift, 
  Calendar, 
  UserPlus, 
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AlumniKpiCards() {
  const kpis = [
    {
      label: "Total Alumni",
      value: "4,850",
      change: "+12.5%",
      isPositive: true,
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      tooltip: "Total number of graduated students in the system."
    },
    {
      label: "New Alumni (2026)",
      value: "412",
      change: "+5.2%",
      isPositive: true,
      icon: UserPlus,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      tooltip: "Students graduated in the current academic year."
    },
    {
      label: "Verified Contacts",
      value: "3,920",
      change: "81%",
      isPositive: true,
      icon: UserCheck,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      tooltip: "Alumni with confirmed email or phone numbers."
    },
    {
      label: "Active Members",
      value: "1,245",
      change: "+8.4%",
      isPositive: true,
      icon: Users,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      tooltip: "Alumni who engaged in the last 6 months."
    },
    {
      label: "Association Members",
      value: "840",
      change: "-2.1%",
      isPositive: false,
      icon: ShieldCheck,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      tooltip: "Paid or registered Alumni Association members."
    },
    {
      label: "Countries Represented",
      value: "14",
      change: "+2",
      isPositive: true,
      icon: Globe,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      tooltip: "Number of countries where alumni currently reside."
    },
    {
      label: "Alumni Businesses",
      value: "312",
      change: "+12",
      isPositive: true,
      icon: Briefcase,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      tooltip: "Verified businesses owned by alumni."
    },
    {
      label: "Mentorship Participants",
      value: "156",
      change: "+24",
      isPositive: true,
      icon: GraduationCap,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      tooltip: "Alumni actively mentoring current students."
    },
    {
      label: "Scholarships Awarded",
      value: "42",
      change: "₦4.5M",
      isPositive: true,
      icon: Award,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      tooltip: "Number of scholarships sponsored by alumni."
    },
    {
      label: "Donations (YTD)",
      value: "₦12.8M",
      change: "+15%",
      isPositive: true,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
      tooltip: "Total funds raised from alumni this year."
    },
    {
      label: "Upcoming Birthdays",
      value: "28",
      change: "This Week",
      isPositive: true,
      icon: Gift,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      tooltip: "Alumni celebrating birthdays in the next 7 days."
    },
    {
      label: "Upcoming Reunions",
      value: "3",
      change: "Next Month",
      isPositive: true,
      icon: Calendar,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      tooltip: "Scheduled reunion events in the coming month."
    }
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Card className="p-4 border-none shadow-sm bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-[14px] cursor-help">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-xl ${kpi.bgColor} ${kpi.color}`}>
                    <kpi.icon size={20} />
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${kpi.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {kpi.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{kpi.label}</p>
                  <div className="flex items-end justify-between">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
                    {/* Placeholder for mini-chart */}
                    <div className="flex items-end gap-[2px] h-6">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div 
                          key={i} 
                          className={`w-1 rounded-full ${kpi.bgColor.replace('bg-', 'bg-').replace('-50', '-200')} ${index % 2 === 0 ? 'h-3' : 'h-5'}`} 
                          style={{ height: `${Math.random() * 20 + 4}px` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 text-white border-none text-[11px] px-3 py-1.5 rounded-lg shadow-xl">
              {kpi.tooltip}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
