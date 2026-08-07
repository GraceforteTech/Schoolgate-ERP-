import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimetableKPIs } from '@/components/timetable/timetable-kpis';
import { SmartTimetableBuilder } from '@/components/timetable/smart-timetable-builder';
import { TimetableViews } from '@/components/timetable/timetable-views';
import { TimetableAnalytics } from '@/components/timetable/timetable-analytics';
import { PublishingCentre } from '@/components/timetable/publishing-centre';
import { PrincipalTimetableDashboard } from '@/components/timetable/principal-dashboard';
import { AIGenerator } from '@/components/timetable/ai-generator';
import { TopNav } from '@/components/top-nav';
import { Calendar, Layout, Search, Settings2, BarChart3, Bell, Bot, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export const Route = createFileRoute('/timetable/')({
  component: TimetableManagement,
});

function TimetableManagement() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <TopNav />
      <main className="p-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Timetable Management</h1>
            <p className="text-sm text-gray-500">Create and manage class, teacher and examination timetables with conflict detection.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search timetables..." className="w-[200px] pl-9 md:w-[250px]" />
            </div>
            <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90">
              <Settings2 className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 gap-4 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-5">
          <Select defaultValue="2023-2024">
            <SelectTrigger>
              <SelectValue placeholder="Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023/2024 Session</SelectItem>
              <SelectItem value="2024-2025">2024/2025 Session</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="term1">
            <SelectTrigger>
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="term1">First Term</SelectItem>
              <SelectItem value="term2">Second Term</SelectItem>
              <SelectItem value="term3">Third Term</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-schools">
            <SelectTrigger>
              <SelectValue placeholder="School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-schools">All Schools</SelectItem>
              <SelectItem value="primary">Primary School</SelectItem>
              <SelectItem value="secondary">Secondary School</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="active">
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full">Clear Filters</Button>
        </div>

        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="overflow-x-auto pb-2">
            <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="dashboard" className="gap-2">
                <Layout className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="builder" className="gap-2">
                <Settings2 className="h-4 w-4" />
                Builder
              </TabsTrigger>
              <TabsTrigger value="views" className="gap-2">
                <Calendar className="h-4 w-4" />
                Timetables
              </TabsTrigger>
              <TabsTrigger value="ai" className="gap-2">
                <Bot className="h-4 w-4 text-schoolgate-green" />
                AI Generator
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="publishing" className="gap-2">
                <Bell className="h-4 w-4" />
                Publishing
              </TabsTrigger>
              <TabsTrigger value="principal" className="gap-2">
                <GraduationCap className="h-4 w-4" />
                Executive
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dashboard" className="space-y-6 outline-none">
            <TimetableKPIs />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
               <div className="lg:col-span-2 space-y-6">
                  <TimetableViews mini />
               </div>
               <div className="space-y-6">
                  <RecentActivities />
               </div>
            </div>
          </TabsContent>

          <TabsContent value="builder" className="outline-none">
            <SmartTimetableBuilder />
          </TabsContent>

          <TabsContent value="views" className="outline-none">
            <TimetableViews />
          </TabsContent>

          <TabsContent value="ai" className="outline-none">
            <AIGenerator />
          </TabsContent>

          <TabsContent value="analytics" className="outline-none">
            <TimetableAnalytics />
          </TabsContent>

          <TabsContent value="publishing" className="outline-none">
            <PublishingCentre />
          </TabsContent>

          <TabsContent value="principal" className="outline-none">
            <PrincipalTimetableDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function RecentActivities() {
  const activities = [
    { title: "Timetable Published", description: "JS3 Gold timetable published by Admin", time: "2 hours ago", type: "success" },
    { title: "Conflict Overridden", description: "Admin overrode SS1 Math slot (Dr. Adebayo)", time: "3 hours ago", type: "warning" },
    { title: "Conflict Detected", description: "Teacher conflict in SS1 Science (Mrs. Okoro)", time: "5 hours ago", type: "error" },
    { title: "Draft Saved", description: "Primary 4 Blue draft saved by Mr. Yusuf", time: "1 day ago", type: "info" },
    { title: "AI Generation Complete", description: "Secondary school block generated", time: "2 days ago", type: "success" },
  ];

  return (
    <div className="rounded-[14px] border bg-white p-6 shadow-sm">
      <h3 className="mb-4 font-semibold text-gray-900">Recent Activities</h3>
      <div className="space-y-4">
        {activities.map((item, index) => (
          <div key={index} className="flex gap-3 text-sm">
            <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
              item.type === 'success' ? 'bg-green-500' : 
              item.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
            }`} />
            <div>
              <p className="font-medium text-gray-900">{item.title}</p>
              <p className="text-gray-500">{item.description}</p>
              <p className="mt-1 text-xs text-gray-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
      <Button variant="link" className="mt-4 h-auto p-0 text-schoolgate-green hover:no-underline">
        View all activities
      </Button>
    </div>
  );
}
