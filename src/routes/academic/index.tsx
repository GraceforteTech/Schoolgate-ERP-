import { createFileRoute } from "@tanstack/react-router";
import { AcademicKPIs } from "@/components/academic/academic-kpis";
import { AcademicCalendar } from "@/components/academic/academic-calendar";
import { ClassManagement } from "@/components/academic/class-management";
import { CurriculumManagement } from "@/components/academic/curriculum-management";
import { TeacherWorkload } from "@/components/academic/teacher-workload";
import { AcademicReports } from "@/components/academic/academic-reports";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, LayoutDashboard, Calendar, Users, BookOpen, UserCheck, BarChart3, GraduationCap } from "lucide-react";

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
            <TabsTrigger value="reports" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <BarChart3 className="w-4 h-4" /> Academic Reports
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="calendar"><AcademicCalendar /></TabsContent>
        <TabsContent value="classes"><ClassManagement /></TabsContent>
        <TabsContent value="curriculum"><CurriculumManagement /></TabsContent>
        <TabsContent value="workload"><TeacherWorkload /></TabsContent>
        <TabsContent value="reports"><AcademicReports /></TabsContent>
      </Tabs>
    </div>
  );
}
