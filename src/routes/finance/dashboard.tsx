import React, { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ExecutiveKPIs } from '@/components/finance/dashboard/ExecutiveKPIs';
import { TodayCollections } from '@/components/finance/dashboard/TodayCollections';
import { FinanceAnalytics } from '@/components/finance/dashboard/FinanceAnalytics';
import { RecentActivities } from '@/components/finance/dashboard/RecentActivities';
import { QuickActions } from '@/components/finance/dashboard/QuickActions';
import { ExecutiveInsights } from '@/components/finance/dashboard/ExecutiveInsights';
import { FinancialVisibilityReport } from '@/components/finance/dashboard/FinancialVisibilityReport';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getExecutiveDashboardStats } from "@/lib/onboarding.functions";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

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
  const fetchStats = useServerFn(getExecutiveDashboardStats);
  
  const { data: stats, isLoading } = useQuery({
    queryKey: ['executive-dashboard-stats'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return null;
      return fetchStats({ data: { tenantId: membership.tenant_id } });
    }
  });

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-[#F5F7FA] min-h-screen">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Finance Dashboard</h1>
            <p className="text-slate-500 mt-1 font-medium italic">Monitor the financial health of your school in real time.</p>
          </div>
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
      <Tabs defaultValue="overview" className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center justify-between">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm border-none h-12">
            <TabsTrigger value="overview" className="rounded-lg px-6 font-bold data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all">
              Executive Overview
            </TabsTrigger>
            <TabsTrigger value="visibility" className="rounded-lg px-6 font-bold data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all">
              Financial Visibility
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-8 mt-0 outline-none">
          {/* Executive Overview */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-schoolgate-green-light rounded-lg">
                <LayoutDashboard size={20} className="text-schoolgate-green" />
              </div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight">Executive Overview</h2>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-32 rounded-2xl bg-white shadow-sm border-none" />
                ))}
              </div>
            ) : (
              <ExecutiveKPIs />
            )}
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
        </TabsContent>

        <TabsContent value="visibility" className="mt-0 outline-none">
          <FinancialVisibilityReport />
        </TabsContent>
      </Tabs>

    </div>
  );
}
