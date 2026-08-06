import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ExecutiveKPICards } from '@/components/finance/outstanding-fees/executive-kpi-cards';
import { SmartFilters } from '@/components/finance/outstanding-fees/smart-filters';
import { OutstandingStudentsTable } from '@/components/finance/outstanding-fees/outstanding-students-table';
import { CollectionAnalytics } from '@/components/finance/outstanding-fees/collection-analytics';
import { ReminderCentre } from '@/components/finance/outstanding-fees/reminder-centre';
import { StudentQuickView } from '@/components/finance/outstanding-fees/student-quick-view';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users as UsersIcon, Bell, LayoutDashboard } from "lucide-react";

export const Route = createFileRoute('/finance/outstanding-fees/')({
  component: OutstandingFeesPage,
});

function OutstandingFeesPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Outstanding Fees</h1>
          <p className="text-slate-500 mt-1">Track, analyse and recover outstanding school fees efficiently.</p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white p-1 rounded-xl shadow-sm border border-slate-100">
          <TabsList className="bg-transparent border-none">
            <TabsTrigger value="dashboard" className="rounded-lg data-[state=active]:bg-schoolgate-green data-[state=active]:text-white gap-2 font-semibold px-4">
              <LayoutDashboard size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="students" className="rounded-lg data-[state=active]:bg-schoolgate-green data-[state=active]:text-white gap-2 font-semibold px-4">
              <UsersIcon size={16} />
              Recovery
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-schoolgate-green data-[state=active]:text-white gap-2 font-semibold px-4">
              <BarChart3 size={16} />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reminders" className="rounded-lg data-[state=active]:bg-schoolgate-green data-[state=active]:text-white gap-2 font-semibold px-4">
              <Bell size={16} />
              Reminders
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="dashboard" className="space-y-8 mt-0 border-none outline-none">
          <ExecutiveKPICards />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-1">
              <CollectionAnalytics />
            </div>
            <div className="xl:col-span-2 space-y-8">
              <div className="bg-white p-6 rounded-[14px] shadow-sm border-none">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Debt Activity</h3>
                <OutstandingStudentsTable />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6 mt-0 border-none outline-none">
          <SmartFilters />
          <div className="bg-white p-6 rounded-[14px] shadow-sm border-none">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Debt Recovery Workspace</h3>
            <OutstandingStudentsTable />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 mt-0 border-none outline-none">
          <CollectionAnalytics />
        </TabsContent>

        <TabsContent value="reminders" className="space-y-6 mt-0 border-none outline-none">
          <ReminderCentre />
        </TabsContent>
      </Tabs>

      <StudentQuickView 
        open={quickViewOpen} 
        onOpenChange={setQuickViewOpen} 
        student={selectedStudent} 
      />
    </div>
  );
}
