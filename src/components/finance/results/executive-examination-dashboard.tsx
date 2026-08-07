import { useState } from "react";
import { PlaceholderForm } from "@/components/ui/placeholder-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, BookOpen, GraduationCap, Award, CheckCircle2, 
  Clock, AlertTriangle, Zap, ArrowUpRight, FileText, 
  Printer, Save, ClipboardList, Lock, Globe, Download,
  BarChart3, LayoutDashboard, Search, MessageSquare, ShieldAlert,
  Star, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LineChart, Line } from 'recharts';

const academicKPIs = [
  { title: "Total Students", value: "1,240", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Total Subjects", value: "42", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "Total Classes", value: "24", icon: LayoutDashboard, color: "text-amber-600", bg: "bg-amber-50" },
  { title: "Total Teachers", value: "85", icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
  { title: "Results Generated", value: "982", icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
  { title: "Results Approved", value: "856", icon: CheckCircle2, color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
  { title: "Results Published", value: "720", icon: Globe, color: "text-cyan-600", bg: "bg-cyan-50" },
  { title: "Results Printed", value: "450", icon: Printer, color: "text-slate-600", bg: "bg-slate-50" },
];

const completionKPIs = [
  { title: "Completed Report Sheets", value: "856", color: "text-emerald-600" },
  { title: "Incomplete Report Sheets", value: "126", color: "text-rose-600" },
  { title: "Awaiting Score Entry", value: "45", color: "text-amber-600" },
  { title: "Awaiting CA Scores", value: "32", color: "text-orange-600" },
  { title: "Awaiting Exam Scores", value: "18", color: "text-red-600" },
  { title: "Awaiting Cognitive", value: "64", color: "text-blue-600" },
  { title: "Awaiting Psychomotor", value: "64", color: "text-indigo-600" },
  { title: "Awaiting Teacher Remarks", value: "92", color: "text-violet-600" },
  { title: "Awaiting Principal Remarks", value: "128", color: "text-purple-600" },
  { title: "Ready for Approval", value: "45", color: "text-schoolgate-green" },
  { title: "Ready for Printing", value: "812", color: "text-cyan-600" },
];

const teacherSubmissionKPIs = [
  { title: "Completed Entry", value: "78", total: "85", icon: CheckCircle2, color: "text-emerald-600" },
  { title: "Yet to Submit", value: "7", total: "85", icon: Clock, color: "text-amber-600" },
  { title: "Subjects Completed", value: "38", total: "42", icon: BookOpen, color: "text-blue-600" },
  { title: "Subjects Pending", value: "4", total: "42", icon: AlertTriangle, color: "text-rose-600" },
  { title: "Avg. Submission Time", value: "2.4 Days", icon: Zap, color: "text-indigo-600" },
];

const performanceKPIs = [
  { title: "School Average", value: "68.4%", icon: BarChart3, color: "text-slate-900" },
  { title: "Highest Average", value: "94.2%", icon: Star, color: "text-emerald-600" },
  { title: "Lowest Average", value: "24.5%", icon: AlertTriangle, color: "text-rose-600" },
  { title: "Pass Rate", value: "92%", icon: TrendingUp, color: "text-schoolgate-green" },
  { title: "Failure Rate", value: "8%", icon: ShieldAlert, color: "text-rose-600" },
  { title: "Distinction Rate", value: "24%", icon: Award, color: "text-amber-600" },
  { title: "Primary Performance", value: "72.4%", icon: GraduationCap, color: "text-blue-600" },
  { title: "Secondary Performance", value: "64.8%", icon: GraduationCap, color: "text-indigo-600" },
];

const recentActivities = [
  { type: "Score Posting", desc: "JSS 2 Mathematics scores posted by Mr. Yusuf", time: "10 mins ago" },
  { type: "Approval", desc: "Grade 4 English results approved by Principal", time: "45 mins ago" },
  { type: "Printing", desc: "124 report sheets printed for SS 3", time: "2 hours ago" },
  { type: "Correction", desc: "Biology CA scores updated for Amina Musa", time: "3 hours ago" },
];

const executiveAlerts = [
  { title: "Missing Scores", count: 124, icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50" },
  { title: "Missing CA", count: 42, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50" },
  { title: "Missing Exam", count: 18, icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
  { title: "Missing Remarks", count: 220, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Unapproved Results", count: 12, icon: Clock, color: "text-indigo-600", bg: "bg-indigo-50" },
];

const classCompletionData = [
  { class: "Grade 1 Blue", students: 32, completed: 32, incomplete: 0, percentage: 100, teacher: "Mrs. Okon", status: "Ready" },
  { class: "JSS 2 Green", students: 45, completed: 40, incomplete: 5, percentage: 88, teacher: "Mr. Yusuf", status: "Pending" },
  { class: "SS 3 Gold", students: 38, completed: 38, incomplete: 0, percentage: 100, teacher: "Mr. David", status: "Approved" },
];

const aiRecommendations = [
  "SS2A Mathematics still has 12 students without Examination scores.",
  "JSS1 English has missing Cognitive Assessment.",
  "5 teachers have not completed score posting.",
  "Report sheets for Primary 5 are ready for printing.",
  "SS3 results are awaiting approval.",
];

export function ExecutiveAcademicDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formConfig, setFormConfig] = useState({ title: '', description: '', icon: Save });

  const openForm = (title: string, description: string, icon: any) => {
    setFormConfig({ title, description, icon });
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Executive Overview Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-schoolgate-green-light rounded-lg">
            <Zap size={20} className="text-schoolgate-green" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Examination & Result Management Dashboard</h2>
            <p className="text-sm font-medium text-slate-500 italic">Monitor examination activities, score posting, report sheet completion and academic performance from one intelligent dashboard.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="h-10 rounded-lg gap-2 border-slate-200 text-slate-600 bg-white shadow-sm font-bold">
            <Download size={16} /> Export Excel
          </Button>
          <Button variant="outline" className="h-10 rounded-lg gap-2 border-slate-200 text-slate-600 bg-white shadow-sm font-bold">
            <Download size={16} /> Export PDF
          </Button>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 h-10 rounded-xl px-4 gap-2 font-bold shadow-sm">
          <Save size={16} /> Post Scores
        </Button>
        <Button variant="outline" className="h-10 rounded-xl px-4 gap-2 font-bold bg-white border-slate-200 text-slate-700 shadow-sm">
          <Zap size={16} /> Compute Results
        </Button>
        <Button variant="outline" className="h-10 rounded-xl px-4 gap-2 font-bold bg-white border-slate-200 text-slate-700 shadow-sm">
          <FileText size={16} /> Generate Report Sheets
        </Button>
        <Button variant="outline" className="h-10 rounded-xl px-4 gap-2 font-bold bg-white border-slate-200 text-slate-700 shadow-sm">
          <CheckCircle2 size={16} /> Approve Results
        </Button>
        <Button variant="outline" className="h-10 rounded-xl px-4 gap-2 font-bold bg-white border-slate-200 text-slate-700 shadow-sm">
          <Lock size={16} /> Lock Results
        </Button>
        <Button variant="outline" className="h-10 rounded-xl px-4 gap-2 font-bold bg-white border-slate-200 text-slate-700 shadow-sm">
          <Globe size={16} /> Publish Results
        </Button>
        <Button variant="outline" className="h-10 rounded-xl px-4 gap-2 font-bold bg-white border-slate-200 text-slate-700 shadow-sm">
          <Printer size={16} /> Print Report Sheets
        </Button>
      </div>

      {/* AI Assistant Section */}
      <Card className="rounded-[14px] border-none shadow-sm bg-slate-900 text-white overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <Zap className="text-yellow-400 w-6 h-6 animate-pulse" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-wider text-white/70">AI Executive Assistant Recommendations</h3>
                <Badge className="bg-white/10 text-white border-none hover:bg-white/20">5 Insights Today</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {aiRecommendations.map((rec, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                    <CheckCircle2 size={14} className="text-schoolgate-green shrink-0" />
                    <span className="text-xs font-medium text-white/90 leading-tight">{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic KPI Cards */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Academic KPIs</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
          {academicKPIs.map((kpi, i) => (
            <Card key={i} className="rounded-[14px] border-none shadow-sm bg-white p-4 hover:shadow-md transition-all cursor-pointer group">
              <div className={cn("p-2 rounded-lg w-fit mb-3 transition-colors", kpi.bg)}>
                <kpi.icon size={18} className={kpi.color} />
              </div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">{kpi.value}</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.title}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Result Completion KPIs */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Result Completion KPIs</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
           <Card className="rounded-[14px] border-none shadow-sm bg-schoolgate-green text-white p-6 md:col-span-2 xl:col-span-1 flex flex-col justify-center items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Overall Completion</span>
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/20" />
                <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset={226 * (1 - 0.82)} className="text-white" />
              </svg>
              <span className="absolute text-lg font-black tracking-tighter">82%</span>
            </div>
          </Card>
          {completionKPIs.map((kpi, i) => (
            <Card key={i} className="rounded-[14px] border-none shadow-sm bg-white p-4 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-center">
              <h4 className={cn("text-2xl font-black tracking-tight", kpi.color)}>{kpi.value}</h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tight leading-tight mt-1">{kpi.title}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Submission & Performance KPIs */}
        <div className="xl:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                <CardTitle className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Teacher Submission KPIs</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {teacherSubmissionKPIs.map((kpi, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg bg-slate-50", kpi.color)}>
                          <kpi.icon size={16} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">{kpi.title}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-black text-slate-900">{kpi.value}</span>
                        {kpi.total && <span className="text-[9px] font-bold text-slate-400">of {kpi.total}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                <CardTitle className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Performance KPIs</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  {performanceKPIs.map((kpi, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <kpi.icon size={14} className={kpi.color} />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{kpi.title}</span>
                      </div>
                      <span className={cn("text-xl font-black tracking-tight", kpi.color)}>{kpi.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Class Completion Status</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/30">
                  <TableRow className="hover:bg-transparent border-slate-50">
                    <TableHead className="font-black text-slate-800 uppercase text-[9px] tracking-widest px-6 h-10">Class</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[9px] tracking-widest h-10 text-center">Students</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[9px] tracking-widest h-10 text-center">Completed</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[9px] tracking-widest h-10 text-center">Completion %</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[9px] tracking-widest h-10">Teacher</TableHead>
                    <TableHead className="font-black text-slate-800 uppercase text-[9px] tracking-widest h-10 px-6 text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classCompletionData.map((row, i) => (
                    <TableRow key={i} className="hover:bg-slate-50/50 border-slate-50 transition-colors cursor-pointer group">
                      <TableCell className="px-6 font-bold text-slate-900 text-xs">{row.class}</TableCell>
                      <TableCell className="text-center font-bold text-slate-600 text-xs">{row.students}</TableCell>
                      <TableCell className="text-center font-bold text-slate-600 text-xs">{row.completed}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-schoolgate-green rounded-full" style={{ width: `${row.percentage}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-700">{row.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-slate-600">{row.teacher}</TableCell>
                      <TableCell className="px-6 text-right">
                        <Badge className={cn(
                          "rounded-full border-none px-2 py-0.5 text-[9px] font-black uppercase tracking-wider",
                          row.status === 'Ready' ? 'bg-emerald-100 text-emerald-600' : 
                          row.status === 'Approved' ? 'bg-blue-100 text-blue-600' : 
                          'bg-amber-100 text-amber-600'
                        )}>
                          {row.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Activities */}
        <div className="xl:col-span-4 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                Executive Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {executiveAlerts.map((alert, i) => (
                <div key={i} className={cn("flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-slate-100 transition-all cursor-pointer", alert.bg)}>
                  <div className="flex items-center gap-3">
                    <alert.icon size={16} className={alert.color} />
                    <span className="text-xs font-bold text-slate-700">{alert.title}</span>
                  </div>
                  <Badge variant="outline" className={cn("bg-white font-black text-sm", alert.color)}>{alert.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6 relative">
              <div className="absolute left-8 top-8 bottom-8 w-px bg-slate-100" />
              {recentActivities.map((act, i) => (
                <div key={i} className="relative z-10 flex gap-4">
                  <div className="w-4 h-4 rounded-full bg-white border-2 border-schoolgate-green mt-1 shadow-sm" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-black text-schoolgate-green uppercase tracking-wider">{act.type}</span>
                    <p className="text-xs font-bold text-slate-700 leading-tight">{act.desc}</p>
                    <span className="text-[9px] font-bold text-slate-400 mt-1">{act.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-schoolgate-green">View Audit Trail →</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}