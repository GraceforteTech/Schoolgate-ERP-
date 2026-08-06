import { createFileRoute } from "@tanstack/react-router";
import { 
  Calendar, Clock, UserPlus, Search, Filter, MoreVertical, CheckCircle, XCircle, FileText, Printer, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const Route = createFileRoute("/finance/admissions/exams")({
  component: EntranceExamPage,
});

function EntranceExamPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Entrance Examination Management</h1>
          <p className="text-sm text-slate-500 mt-1">Schedule and manage entrance exams for all school sections.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export Results</Button>
          <Button className="bg-schoolgate-green gap-2"><Calendar className="h-4 w-4" /> Schedule Exam</Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Scheduled Exams", value: "12", color: "blue" },
          { label: "Passed Applicants", value: "45", color: "emerald" },
          { label: "Failed Applicants", value: "8", color: "rose" },
          { label: "Absent", value: "4", color: "orange" },
        ].map((stat, i) => (
          <Card key={i} className="p-4 border-slate-100 shadow-sm rounded-xl">
            <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-white border-slate-100 shadow-sm rounded-[14px]">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search Applicant or Date..." className="pl-9 h-10 rounded-lg" />
          </div>
          <Button variant="outline" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Exam Date</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "Aug 15, 2026", applicant: "Adebayo Olawale", class: "JSS 1", type: "Computer Based", score: "85/100", grade: "A", status: "Passed" },
                { date: "Aug 15, 2026", applicant: "Chiamaka Okoro", class: "Primary 4", type: "Written", score: "72/100", grade: "B", status: "Passed" },
              ].map((exam, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{exam.date}</TableCell>
                  <TableCell className="font-medium text-slate-700">{exam.applicant}</TableCell>
                  <TableCell>{exam.class}</TableCell>
                  <TableCell>{exam.type}</TableCell>
                  <TableCell className="text-center font-bold text-schoolgate-green">{exam.score}</TableCell>
                  <TableCell className="text-center font-bold">{exam.grade}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100">{exam.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
