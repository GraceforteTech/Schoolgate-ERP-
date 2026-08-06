import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  Send, 
  AlertCircle, 
  TrendingUp, 
  Calendar,
  Users,
  Search,
  Plus,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LessonNoteKPIs } from '@/components/lesson-notes/lesson-note-kpis';
import { LessonNoteBuilder } from '@/components/lesson-notes/lesson-note-builder';
import { WeeklyLessonPlanner } from '@/components/lesson-notes/weekly-lesson-planner';
import { LessonApprovalCentre } from '@/components/lesson-notes/lesson-approval-centre';
import { CurriculumCoverage } from '@/components/lesson-notes/curriculum-coverage';
import { LessonAnalytics } from '@/components/lesson-notes/lesson-analytics';
import { PrincipalLessonDashboard } from '@/components/lesson-notes/principal-lesson-dashboard';
import { AILessonGenerator } from '@/components/lesson-notes/ai-lesson-generator';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';

export const Route = createFileRoute('/academic/lesson-notes' as any)({
  component: LessonNoteManagement,
});

function LessonNoteManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex-1 space-y-6 p-8 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#0B6E3C]">Lesson Note & Lesson Plan Management</h1>
          <p className="text-muted-foreground">
            Create, review and monitor lesson notes and lesson plans efficiently.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-[10px]">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          <Button className="bg-[#0B6E3C] hover:bg-[#0B6E3C]/90 rounded-[10px]">
            <Plus className="mr-2 h-4 w-4" />
            New Lesson Note
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-[14px] shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Session:</span>
          <Select defaultValue="2023-2024">
            <SelectTrigger className="w-[140px] rounded-[10px]">
              <SelectValue placeholder="Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023/2024</SelectItem>
              <SelectItem value="2024-2025">2024/2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Term:</span>
          <Select defaultValue="first">
            <SelectTrigger className="w-[120px] rounded-[10px]">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first">First Term</SelectItem>
              <SelectItem value="second">Second Term</SelectItem>
              <SelectItem value="third">Third Term</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">School:</span>
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px] rounded-[10px]">
              <SelectValue placeholder="School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schools</SelectItem>
              <SelectItem value="primary">Primary School</SelectItem>
              <SelectItem value="secondary">Secondary School</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="ml-auto">
          <AILessonGenerator />
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-white p-1 rounded-[14px] shadow-sm">
            <TabsTrigger value="overview" className="rounded-[10px]">Overview</TabsTrigger>
            <TabsTrigger value="builder" className="rounded-[10px]">Builder</TabsTrigger>
            <TabsTrigger value="planner" className="rounded-[10px]">Weekly Planner</TabsTrigger>
            <TabsTrigger value="approval" className="rounded-[10px]">Approval Centre</TabsTrigger>
            <TabsTrigger value="curriculum" className="rounded-[10px]">Curriculum Progress</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-[10px]">Analytics</TabsTrigger>
            <TabsTrigger value="executive" className="rounded-[10px]">Principal Dashboard</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <LessonNoteKPIs />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 rounded-[14px] shadow-sm border-none">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Lesson Note Centre</h3>
                <Button variant="ghost" size="sm" className="text-[#0B6E3C]">View All <ArrowRight className="ml-1 h-4 w-4" /></Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-[12px] bg-[#F5F7FA] hover:bg-schoolgate-green-light/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white text-[#0B6E3C] shadow-sm">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Mathematics - Algebra Intro</p>
                        <p className="text-xs text-muted-foreground">Class: JSS 1 • Week 4 • Submitted by: Sarah Johnson</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-yellow-100 text-yellow-700">Pending HOD</span>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Preview</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 rounded-[14px] shadow-sm border-none">
              <h3 className="text-lg font-semibold mb-6">Recent Activities</h3>
              <div className="space-y-6">
                {[
                  { user: "Sarah Johnson", action: "submitted lesson note", time: "2 mins ago", subject: "Mathematics" },
                  { user: "HOD Academics", action: "approved lesson note", time: "1 hour ago", subject: "English Language" },
                  { user: "Principal", action: "returned for correction", time: "3 hours ago", subject: "Physics" },
                  { user: "System", action: "auto-generated weekly plan", time: "5 hours ago", subject: "All Classes" },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-schoolgate-green-light flex items-center justify-center shrink-0">
                      <Users className="h-4 w-4 text-[#0B6E3C]" />
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold">{activity.user}</span> {activity.action} for <span className="font-medium">{activity.subject}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="builder">
          <LessonNoteBuilder />
        </TabsContent>

        <TabsContent value="planner">
          <WeeklyLessonPlanner />
        </TabsContent>

        <TabsContent value="approval">
          <LessonApprovalCentre />
        </TabsContent>

        <TabsContent value="curriculum">
          <CurriculumCoverage />
        </TabsContent>

        <TabsContent value="analytics">
          <LessonAnalytics />
        </TabsContent>

        <TabsContent value="executive">
          <PrincipalLessonDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
