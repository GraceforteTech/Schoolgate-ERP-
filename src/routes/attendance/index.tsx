import { createFileRoute } from '@tanstack/react-router';
import { ExecutiveKPICards } from "@/components/attendance/executive-kpi-cards";
import { Button } from "@/components/ui/button";
import { Plus, Search, FileDown, Printer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute('/attendance/')({
  component: AttendancePage,
});

function AttendancePage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Attendance Management</h1>
        <p className="text-muted-foreground">Track daily attendance, punctuality and absenteeism in real time.</p>
      </div>

      <ExecutiveKPICards />

      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-[14px] shadow-sm">
        <div className="flex gap-2 flex-wrap">
          {["Session", "Term", "School", "Class", "Arm"].map((f) => (
            <Button key={f} variant="outline" className="rounded-lg">{f}</Button>
          ))}
          <Button variant="outline" className="rounded-lg"><Search className="h-4 w-4 mr-2" /> Search</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FileDown className="h-4 w-4 mr-2" /> Export</Button>
          <Button variant="outline"><Printer className="h-4 w-4 mr-2" /> Print</Button>
          <Button className="bg-schoolgate-green text-white hover:bg-schoolgate-green/90"><Plus className="h-4 w-4 mr-2" /> Quick Attendance</Button>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-[14px] shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Attendance Register</h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-[14px] text-muted-foreground">
              Table Placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[14px] shadow-sm">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Attendance Analytics</h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-[14px] text-muted-foreground">
              Charts Placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
