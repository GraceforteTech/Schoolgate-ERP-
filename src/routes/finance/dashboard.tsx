import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ExecutiveKPIs } from '@/components/finance/dashboard/ExecutiveKPIs';
import { TodayCollections } from '@/components/finance/dashboard/TodayCollections';
import { FinanceAnalytics } from '@/components/finance/dashboard/FinanceAnalytics';
import { RecentActivities } from '@/components/finance/dashboard/RecentActivities';
import { QuickActions } from '@/components/finance/dashboard/QuickActions';
import { ExecutiveInsights } from '@/components/finance/dashboard/ExecutiveInsights';
import { FinancialVisibilityReport } from '@/components/finance/dashboard/FinancialVisibilityReport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  LayoutDashboard, 
  Calendar, 
  Download, 
  Filter,
  RefreshCw,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute('/finance/dashboard')({
  component: FinanceDashboard,
});

function FinanceDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-[#F5F7FA] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Finance Dashboard</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitor the financial health of your school in real time.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-schoolgate-green transition-colors" size={16} />
            <Input 
              placeholder="Search financials..." 
              className="pl-10 h-11 w-[280px] bg-white border-none shadow-sm rounded-xl focus-visible:ring-schoolgate-green font-medium" 
            />
          </div>
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <Calendar size={18} />
            Term 2, 2024
          </Button>
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600 px-4">
            <RefreshCw size={18} />
          </Button>
          <Button className="h-11 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold gap-2 px-6 shadow-lg shadow-schoolgate-green/20">
            <Download size={18} />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Executive Overview */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-schoolgate-green-light rounded-lg">
              <LayoutDashboard size={20} className="text-schoolgate-green" />
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Executive Overview</h2>
          </div>
          <ExecutiveKPIs />
        </section>

        {/* Analytics & Today's Performance */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8 space-y-6">
            <FinanceAnalytics />
            <RecentActivities />
          </div>
          <div className="xl:col-span-4 space-y-6">
            <TodayCollections />
            <QuickActions />
            <ExecutiveInsights />
          </div>
        </div>

      </div>
    </div>
  );
}
