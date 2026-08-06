import { createFileRoute } from "@tanstack/react-router";
import { AcademicKPIs } from "@/components/academic/academic-kpis";
import { AcademicCalendar } from "@/components/academic/academic-calendar";
import { ClassManagement } from "@/components/academic/class-management";
import { CurriculumManagement } from "@/components/academic/curriculum-management";
import { TeacherWorkload } from "@/components/academic/teacher-workload";
import { AcademicReports } from "@/components/academic/academic-reports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, LayoutDashboard, Calendar, Users, BookOpen, UserCheck, BarChart3, GraduationCap, Search, Filter, FileText } from "lucide-react";

export const Route = createFileRoute("/academic/")({
  component: AcademicManagementPage,
});

function AcademicManagementPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Academic Management</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Manage the school's academic structure and learning activities from one central dashboard.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <Download size={18} />
            Export Data
          </Button>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-schoolgate-green animate-pulse" />
            System Active
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search academic records..." className="pl-9 h-11 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-colors" />
        </div>
        
        <Select defaultValue="all-schools">
          <SelectTrigger className="w-[180px] h-11 rounded-xl border-slate-100 bg-slate-50/50">
            <SelectValue placeholder="All Schools" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-schools">All Schools</SelectItem>
            <SelectItem value="primary">Primary School</SelectItem>
            <SelectItem value="secondary">Secondary School</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="term2">
          <SelectTrigger className="w-[150px] h-11 rounded-xl border-slate-100 bg-slate-50/50">
            <SelectValue placeholder="Term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="term1">1st Term</SelectItem>
            <SelectItem value="term2">2nd Term</SelectItem>
            <SelectItem value="term3">3rd Term</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-classes">
          <SelectTrigger className="w-[150px] h-11 rounded-xl border-slate-100 bg-slate-50/50">
            <SelectValue placeholder="All Classes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-classes">All Classes</SelectItem>
            <SelectItem value="jss1">JSS 1</SelectItem>
            <SelectItem value="jss2">JSS 2</SelectItem>
            <SelectItem value="ss3">SS 3</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-100 text-slate-500 gap-2">
          <Filter size={16} />
          Advanced
        </Button>
      </div>

      <div className="mb-8">
        <AcademicKPIs />
      </div>

      <Tabs defaultValue="calendar" className="space-y-8">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="bg-white border border-slate-100 rounded-xl p-1 shadow-sm h-12 inline-flex min-w-max">
            <TabsTrigger value="calendar" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <Calendar className="w-4 h-4" /> Academic Calendar
            </TabsTrigger>
            <TabsTrigger value="classes" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <Users className="w-4 h-4" /> Class & Subjects
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <BookOpen className="w-4 h-4" /> Curriculum
            </TabsTrigger>
            <TabsTrigger value="workload" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <UserCheck className="w-4 h-4" /> Teacher Workload
            </TabsTrigger>
            <TabsTrigger value="lesson-notes" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <FileText className="w-4 h-4" /> Lesson Notes
            </TabsTrigger>
            <TabsTrigger value="reports" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <BarChart3 className="w-4 h-4" /> Academic Reports
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="calendar"><AcademicCalendar /></TabsContent>
        <TabsContent value="classes"><ClassManagement /></TabsContent>
        <TabsContent value="curriculum"><CurriculumManagement /></TabsContent>
        <TabsContent value="workload"><TeacherWorkload /></TabsContent>
        <TabsContent value="lesson-notes">
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 bg-schoolgate-green-light rounded-full flex items-center justify-center text-schoolgate-green">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Teacher Lesson Note Dashboard</h3>
              <p className="text-slate-500 max-w-md mx-auto mt-2">Create, manage and monitor lesson notes digitally for all classes and subjects.</p>
            </div>
            <Button 
              className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl px-8 h-12 font-bold shadow-lg shadow-schoolgate-green/20"
              onClick={() => window.location.href = '/academic/lesson-notes'}
            >
              Open Lesson Note Hub
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="reports"><AcademicReports /></TabsContent>
      </Tabs>
    </div>
  );
}
