import { createFileRoute } from "@tanstack/react-router";
import { 
  Users, 
  Search, 
  TrendingUp, 
  Activity, 
  LayoutDashboard,
  UserPlus,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExecutiveKpiCards } from "@/components/students/executive-kpi-cards";
import { StudentDirectory } from "@/components/students/student-directory";
import { Student360Profile } from "@/components/students/student-360-profile";
import { StudentAnalytics } from "@/components/students/student-analytics";

export const Route = createFileRoute("/students")({
  component: StudentInformationPage,
});

function StudentInformationPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Information Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage student records, profiles and academic information from one central location.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Card className="flex items-center gap-3 py-2 px-4 border-slate-200 rounded-xl shadow-sm bg-white">
            <div className="flex flex-col items-end">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Global Capacity</p>
              <p className="text-xs font-bold text-slate-700 mt-1">2,450 / 3,000 Students</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-schoolgate-green-light grid place-items-center text-schoolgate-green font-bold text-xs">
              82%
            </div>
          </Card>
        </div>
      </div>

      {/* KPI Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800 font-bold">
          <LayoutDashboard className="h-5 w-5 text-schoolgate-green" />
          <span>Executive Student KPIs</span>
        </div>
        <ExecutiveKpiCards />
      </div>

      {/* Main Tabs Workspace */}
      <Tabs defaultValue="directory" className="space-y-6">
        <TabsList className="bg-white border border-slate-200 p-1 rounded-xl w-fit">
          <TabsTrigger value="directory" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6">
            Student Directory
          </TabsTrigger>
          <TabsTrigger value="profile" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6">
            Student 360° Profile
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6">
            Analytics & Reports
          </TabsTrigger>
          <TabsTrigger value="alumni" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6">
            Alumni Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-9">
              <Card className="p-6 bg-white border-slate-100 shadow-sm rounded-[14px]">
                <StudentDirectory />
              </Card>
            </div>
            
            <div className="xl:col-span-3 space-y-6">
              <Card className="p-5 bg-schoolgate-green text-white rounded-[14px] shadow-lg shadow-schoolgate-green/20 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-bold text-lg">Enrol New Student</h3>
                  <p className="text-xs text-white/80 mt-1 mb-4">Add a new student to the school register.</p>
                  <Button className="w-full bg-white text-schoolgate-green hover:bg-slate-50 font-bold rounded-lg h-10 group">
                    Get Started <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <UserPlus className="absolute -right-4 -bottom-4 h-24 w-24 text-white/10 rotate-12" />
              </Card>

              <Card className="p-5 border-slate-100 rounded-[14px] shadow-sm bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-schoolgate-green" /> Recent Activities
                  </h3>
                  <Badge variant="outline" className="text-[9px] border-slate-100 text-slate-400">View All</Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { user: "Admin", action: "Promoted JSS 2 Alpha", time: "12m ago" },
                    { user: "Accountant", action: "Cleared Fee - 2024/001", time: "1h ago" },
                    { user: "Registrar", action: "Updated Profile - 2024/042", time: "3h ago" },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-50 grid place-items-center text-[10px] font-bold text-slate-400">
                        {act.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold text-slate-700">{act.action}</p>
                        <p className="text-[10px] text-slate-400">{act.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <Student360Profile />
        </TabsContent>

        <TabsContent value="analytics">
          <StudentAnalytics />
        </TabsContent>

        <TabsContent value="alumni">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Alumni Directory</h3>
                <p className="text-sm text-slate-500">View and manage graduated students.</p>
              </div>
              <Button className="bg-schoolgate-green text-white hover:bg-schoolgate-green/90 rounded-lg font-bold">
                Export Alumni Records
              </Button>
            </div>
            <Card className="p-6 bg-white border-slate-100 shadow-sm rounded-[14px]">
              <StudentDirectory forcedStatus="Graduated" />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
