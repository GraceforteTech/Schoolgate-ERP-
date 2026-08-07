import { createFileRoute } from '@tanstack/react-router';
import { ExecutiveKPICards } from "@/components/attendance/executive-kpi-cards";
import { AttendanceRegister } from "@/components/attendance/attendance-register";
import { AttendanceAnalytics } from "@/components/attendance/attendance-analytics";
import { StudentAttendanceProfile } from "@/components/attendance/student-attendance-profile";
import { ParentNotificationCentre } from "@/components/attendance/parent-notification-centre";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  FileDown, 
  Printer, 
  CalendarCheck, 
  BarChart3, 
  User, 
  Bell, 
  FileText,
  Smartphone,
  QrCode,
  Fingerprint,
  Cpu
} from "lucide-react";
import { BiometricIntegration } from "@/components/attendance/biometric-integration";

export const Route = createFileRoute('/attendance/')({
  component: AttendancePage,
});


function AttendancePage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Attendance Management</h1>
          <p className="text-muted-foreground">Track daily attendance, punctuality and absenteeism in real time.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex rounded-xl border-slate-200">
            <QrCode className="mr-2 h-4 w-4" /> QR Check-in
          </Button>
          <Button variant="outline" className="hidden md:flex rounded-xl border-slate-200">
            <Fingerprint className="mr-2 h-4 w-4" /> Biometric
          </Button>
          <Button className="bg-schoolgate-green text-white hover:bg-schoolgate-green/90 rounded-xl shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> New Attendance
          </Button>
        </div>
      </div>

      <ExecutiveKPICards />

      <Tabs defaultValue="register" className="w-full">
        <TabsList className="bg-white p-1 rounded-xl shadow-sm mb-6 h-12 inline-flex border border-slate-100">
          <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green px-6">
            <CalendarCheck className="h-4 w-4 mr-2" /> Attendance Register
          </TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green px-6">
            <BarChart3 className="h-4 w-4 mr-2" /> Analytics
          </TabsTrigger>
          <TabsTrigger value="biometrics" className="rounded-lg data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green px-6">
            <Fingerprint className="h-4 w-4 mr-2" /> Biometric Sync
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green px-6">
            <User className="h-4 w-4 mr-2" /> Student Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green px-6">
            <Bell className="h-4 w-4 mr-2" /> Notification Centre
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-lg data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green px-6">
            <FileText className="h-4 w-4 mr-2" /> Reports
          </TabsTrigger>
        </TabsList>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-[14px] shadow-sm border border-slate-100">
          <div className="flex gap-2 flex-wrap">
            {["Session", "Term", "School", "Class", "Arm"].map((f) => (
              <Button key={f} variant="outline" className="rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50">{f}</Button>
            ))}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                placeholder="Search..." 
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-schoolgate-green w-48" 
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-lg border-slate-200 text-slate-600">
              <FileDown className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button variant="outline" className="rounded-lg border-slate-200 text-slate-600">
              <Printer className="h-4 w-4 mr-2" /> Print
            </Button>
          </div>
        </div>

        <TabsContent value="register">
          <AttendanceRegister />
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" className="rounded-xl px-8 border-slate-200">Mark All Present</Button>
            <Button className="bg-schoolgate-green text-white hover:bg-schoolgate-green/90 rounded-xl px-8">Save Attendance</Button>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <AttendanceAnalytics />
        </TabsContent>

        <TabsContent value="biometrics">
          <BiometricIntegration />
        </TabsContent>

        <TabsContent value="profile">
          <StudentAttendanceProfile />
        </TabsContent>

        <TabsContent value="notifications">
          <ParentNotificationCentre />
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Daily Attendance Report",
              "Weekly Summary",
              "Monthly Analytics",
              "Term Attendance Overview",
              "Class-wise Performance",
              "Student Detailed History",
              "Staff Attendance Log",
              "Perfect Attendance Awards",
              "Chronic Absenteeism Tracker"
            ].map((report) => (
              <Card key={report} className="rounded-[14px] border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group bg-white">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-schoolgate-green-light text-schoolgate-green group-hover:bg-schoolgate-green group-hover:text-white transition-colors">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-slate-700">{report}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-schoolgate-green">
                    <Printer className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { cn } from "@/lib/utils";
