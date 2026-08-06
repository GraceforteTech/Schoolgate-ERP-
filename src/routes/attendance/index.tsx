import { createFileRoute } from '@tanstack/react-router';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Printer, FileDown, Search } from "lucide-react";

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {["Students Present", "Students Absent", "Students Late", "Attendance Rate", "Staff Attendance"].map((stat) => (
          <Card key={stat} className="p-4 rounded-[14px] shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-sm text-muted-foreground">{stat}</div>
            <div className="text-2xl font-bold text-schoolgate-green">0</div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between p-4 bg-white rounded-[14px] shadow-sm">
        <div className="flex gap-2 flex-wrap">
          {["Session", "Term", "School", "Class", "Arm"].map((filter) => (
            <Button key={filter} variant="outline" className="rounded-lg">{filter}</Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Search className="h-4 w-4 mr-2" /> Search</Button>
          <Button className="bg-schoolgate-green text-white"><Plus className="h-4 w-4 mr-2" /> Quick Attendance</Button>
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
