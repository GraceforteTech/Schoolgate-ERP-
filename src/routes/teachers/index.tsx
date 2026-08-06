import { createFileRoute } from "@tanstack/react-router";
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  Briefcase, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  Award, 
  GraduationCap, 
  LineChart,
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Mail,
  Phone,
  FileText,
  Calendar,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TeacherKpis } from "@/components/teachers/teacher-kpis";
import { TeacherDirectory } from "@/components/teachers/teacher-directory";
import { TeacherWorkload } from "@/components/teachers/teacher-workload";
import { TeacherPerformance } from "@/components/teachers/teacher-performance";
import { TeacherAnalytics } from "@/components/teachers/teacher-analytics";
import { PrincipalStaffDashboard } from "@/components/teachers/principal-staff-dashboard";

export const Route = createFileRoute("/teachers/")({
  component: TeacherManagementPage,
});

function TeacherManagementPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-8 pb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Teacher Management</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Manage teaching staff, assignments and performance from one central platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600 hover:bg-slate-50">
            <Download size={18} />
            Export Staff Data
          </Button>
          <Button className="h-11 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 font-black gap-2 shadow-lg shadow-schoolgate-green/20">
            <Plus size={18} />
            Add New Teacher
          </Button>
        </div>
      </div>

      {/* Executive KPI Cards */}
      <div className="mb-8">
        <TeacherKpis />
      </div>

      <Tabs defaultValue="directory" className="space-y-8">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide bg-white/50 p-1 rounded-2xl backdrop-blur-sm border border-white/20 shadow-sm">
          <TabsList className="bg-transparent h-12 inline-flex min-w-max gap-1">
            <TabsTrigger value="directory" className="px-6 rounded-xl text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2 transition-all">
              <Users className="w-4 h-4" /> Directory
            </TabsTrigger>
            <TabsTrigger value="workload" className="px-6 rounded-xl text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2 transition-all">
              <Briefcase className="w-4 h-4" /> Workload
            </TabsTrigger>
            <TabsTrigger value="performance" className="px-6 rounded-xl text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2 transition-all">
              <TrendingUp className="w-4 h-4" /> Performance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="px-6 rounded-xl text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2 transition-all">
              <LineChart className="w-4 h-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="executive" className="px-6 rounded-xl text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2 transition-all">
              <ShieldCheck className="w-4 h-4" /> Principal Dashboard
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="directory" className="space-y-6 focus-visible:outline-none">
          <TeacherDirectory />
        </TabsContent>

        <TabsContent value="workload" className="space-y-6 focus-visible:outline-none">
          <TeacherWorkload />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6 focus-visible:outline-none">
          <TeacherPerformance />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6 focus-visible:outline-none">
          <TeacherAnalytics />
        </TabsContent>

        <TabsContent value="executive" className="space-y-6 focus-visible:outline-none">
          <PrincipalStaffDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
