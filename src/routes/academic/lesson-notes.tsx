import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  FileText, 
  AlertCircle, 
  TrendingUp, 
  Calendar,
  Users,
  Search,
  Plus,
  ArrowRight,
  Filter,
  Target,
  Zap
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
import { TeacherLessonNoteDashboard } from '@/components/lesson-notes/teacher-lesson-note-dashboard';
import { MyLessonNotesList } from '@/components/lesson-notes/my-lesson-notes-list';
import { 
  Sparkles, 
  Wand2, 
  Settings, 
  Archive, 
  Trash, 
  Share2, 
  FileDown, 
  Layout, 
  Clock as ClockIcon,
  Save,
  Eye,
  Send,
  Printer,
  Copy,
  Plus as PlusIcon
} from "lucide-react";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';

export const Route = createFileRoute('/academic/lesson-notes')({
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

      <Tabs defaultValue="overview" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-white p-1 rounded-[14px] shadow-sm overflow-x-auto max-w-full">
            <TabsTrigger value="overview" className="rounded-[10px]">Overview</TabsTrigger>
            <TabsTrigger value="my-notes" className="rounded-[10px]">My Lesson Notes</TabsTrigger>
            <TabsTrigger value="builder" className="rounded-[10px]">Note Builder</TabsTrigger>
            <TabsTrigger value="planner" className="rounded-[10px]">Weekly Planner</TabsTrigger>
            <TabsTrigger value="approval" className="rounded-[10px]">Approval Centre</TabsTrigger>
            <TabsTrigger value="curriculum" className="rounded-[10px]">Curriculum</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-[10px]">Analytics</TabsTrigger>
            <TabsTrigger value="executive" className="rounded-[10px]">Principal Hub</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6">
          <TeacherLessonNoteDashboard onNewLesson={() => setActiveTab("builder")} />
        </TabsContent>

        <TabsContent value="my-notes">
          <MyLessonNotesList />
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
      {/* Floating AI Assistant (Module 6) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 hidden md:flex flex-col gap-2 animate-in slide-in-from-right-10">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-indigo-600 hover:bg-indigo-50" title="Generate Objectives"><Target className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-indigo-600 hover:bg-indigo-50" title="Generate Activities"><Zap className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-indigo-600 hover:bg-indigo-50" title="Improve Writing"><Wand2 className="h-5 w-5" /></Button>
        </div>
        <AILessonGenerator />
      </div>

      {/* Sticky Action Toolbar (Module 8) - Visible only on Builder tab */}
      {activeTab === "builder" && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-40 flex items-center justify-center gap-2 animate-in slide-in-from-bottom-10">
          <div className="max-w-[1200px] w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-lg h-10 px-4 font-bold border-slate-200">
                <Save className="mr-2 h-4 w-4" /> Save Draft
              </Button>
              <Button variant="outline" className="rounded-lg h-10 px-4 font-bold border-slate-200">
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-lg h-10 w-10 p-0 border-slate-200">
                <Printer className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-lg h-10 w-10 p-0 border-slate-200">
                <FileDown className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-lg h-10 w-10 p-0 border-slate-200">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button className="bg-[#0B6E3C] hover:bg-[#0B6E3C]/90 text-white rounded-lg h-10 px-6 font-bold shadow-lg shadow-schoolgate-green/20">
                <Send className="mr-2 h-4 w-4" /> Submit Note
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
