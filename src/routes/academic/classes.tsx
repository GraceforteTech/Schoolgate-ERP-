import { createFileRoute, Link } from "@tanstack/react-router";
import { ClassKpiCards } from "@/components/academic/classes/class-kpi-cards";
import { ClassRegistryTable } from "@/components/academic/classes/class-registry-table";
import { ClassSearchCenter } from "@/components/academic/classes/class-search-center";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  PieChart
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PlaceholderForm } from "@/components/ui/placeholder-form";

export const Route = createFileRoute("/academic/classes")({
  component: ClassInformationPage,
});

function ClassInformationPage() {
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl bg-white border-none shadow-sm" asChild>
            <Link to="/academic">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Class Information</h1>
            <p className="text-slate-500 font-medium italic mt-1">
              Organize academic groups, manage class teachers, and monitor enrollment levels.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Card className="flex items-center gap-4 py-3 px-5 border-none rounded-2xl shadow-sm bg-white">
            <div className="flex flex-col items-end">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Global Occupancy</p>
              <p className="text-sm font-black text-slate-800 mt-1.5">1,240 / 1,500</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-schoolgate-green-light grid place-items-center text-schoolgate-green font-bold text-xs border-2 border-schoolgate-green/20">
              83%
            </div>
          </Card>
        </div>
      </div>

      {/* KPI Section */}
      <ClassKpiCards />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-9 space-y-6">
          <ClassSearchCenter />
          
          <Card className="p-6 border-none shadow-sm rounded-[20px] bg-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-schoolgate-green" />
                <h3 className="text-lg font-bold text-slate-900">Class Registry</h3>
              </div>
              <Badge variant="outline" className="rounded-lg border-slate-100 text-slate-400 font-bold px-3">
                Academic Year 2024/2025
              </Badge>
            </div>
            <ClassRegistryTable />
          </Card>
        </div>

        {/* Sidebar Insights */}
        <div className="xl:col-span-3 space-y-6">
          <Card className="p-6 bg-gradient-to-br from-schoolgate-green to-emerald-700 text-white rounded-[24px] shadow-xl shadow-schoolgate-green/20 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-md grid place-items-center mb-6">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-xl leading-tight">AI Smart Scheduler</h3>
              <p className="text-sm text-white/80 mt-2 mb-6">
                Automatically resolve class conflicts and optimize teacher workload distribution.
              </p>
              <Button 
                onClick={() => setIsOptimizerOpen(true)}
                className="w-full bg-white text-schoolgate-green hover:bg-slate-50 font-bold rounded-xl h-12 shadow-md"
              >
                Launch Optimizer
              </Button>
            </div>
            <GraduationCap className="absolute -right-6 -bottom-6 h-32 w-32 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
          </Card>

          <Card className="p-6 border-none rounded-[20px] shadow-sm bg-white space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <PieChart className="h-4 w-4 text-schoolgate-green" /> Capacity Insights
              </h3>
            </div>
            
            <div className="space-y-5">
              {[
                { label: "Secondary School", value: 85, color: "bg-schoolgate-green" },
                { label: "Primary School", value: 92, color: "bg-blue-500" },
                { label: "Early Years", value: 64, color: "bg-orange-500" },
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">{stat.label}</span>
                    <span className="text-slate-900">{stat.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${stat.color} transition-all duration-1000`} 
                      style={{ width: `${stat.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-50">
              <Button variant="ghost" className="w-full justify-between text-slate-500 hover:text-schoolgate-green font-bold text-xs group p-0">
                View Detailed Analytics <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-none rounded-[20px] shadow-sm bg-white overflow-hidden relative">
            <div className="relative z-10 flex flex-col items-center text-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-50 grid place-items-center text-orange-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Growth Forecast</h4>
                <p className="text-[10px] text-slate-500 mt-1 font-medium">Estimated 15% increase in enrollment for next term.</p>
              </div>
              <Badge className="bg-orange-50 text-orange-600 border-none rounded-full text-[9px] font-bold px-2 py-0.5">
                Strategic Alert
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>

      <PlaceholderForm 
        open={isOptimizerOpen} 
        onOpenChange={setIsOptimizerOpen} 
        title="AI Smart Scheduler"
        description="Optimize teacher workloads and resolve timetable conflicts automatically."
        icon={Sparkles}
      />
    </div>
  );
}
