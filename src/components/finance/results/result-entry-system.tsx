import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Upload, Download, Save, Send, Printer } from "lucide-react";

const mockStudents = [
  { id: "STU001", name: "Ahmed Musa", ca1: 8, ca2: 7, ca3: 9, project: 8, exam: 42, total: 74, grade: "B2", remark: "Very Good", position: "4th" },
  { id: "STU002", name: "Blessing Okoro", ca1: 9, ca2: 8, ca3: 9, project: 9, exam: 48, total: 83, grade: "A1", remark: "Excellent", position: "1st" },
  { id: "STU003", name: "Chidi Eze", ca1: 6, ca2: 5, ca3: 7, project: 6, exam: 35, total: 59, grade: "C5", remark: "Credit", position: "12th" },
  { id: "STU004", name: "David Adeleke", ca1: 7, ca2: 6, ca3: 8, project: 7, exam: 38, total: 66, grade: "B3", remark: "Good", position: "8th" },
  { id: "STU005", name: "Esther William", ca1: 4, ca2: 5, ca3: 4, project: 5, exam: 22, total: 40, grade: "E8", remark: "Pass", position: "28th" },
];

export function ResultEntrySystem() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <Card className="rounded-[14px] border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            <Select defaultValue="2023-2024">
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023-2024">2023/2024</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="term2">
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="term2">Second Term</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="primary">
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="School" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary School</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="grade4">
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade4">Grade 4</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="blue">
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Arm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="math">
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="yusuf">
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yusuf">Mr. Yusuf Bello</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search student..." 
                className="pl-9 h-10 rounded-lg border-slate-200" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-schoolgate-green-light text-schoolgate-green border-none hover:bg-schoolgate-green-light px-3 py-1 font-bold">
            Mathematics • Grade 4 Blue • 32 Students
          </Badge>
          <span className="text-xs font-bold text-slate-400 uppercase animate-pulse">Auto-saving...</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10 rounded-lg gap-2 border-slate-200 text-slate-600">
            <Upload size={16} /> Bulk Upload
          </Button>
          <Button variant="outline" className="h-10 rounded-lg gap-2 border-slate-200 text-slate-600">
            <Download size={16} /> Import Scores
          </Button>
          <Button variant="outline" className="h-10 rounded-lg gap-2 border-slate-200 text-slate-600 px-3">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <Card className="rounded-[14px] border-none shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow className="hover:bg-transparent border-slate-100">
              <TableHead className="w-[120px] font-black text-slate-800 uppercase text-[10px] tracking-wider">Adm. No</TableHead>
              <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider">Student Name</TableHead>
              <TableHead className="w-[80px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">CA1 (10)</TableHead>
              <TableHead className="w-[80px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">CA2 (10)</TableHead>
              <TableHead className="w-[80px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">CA3 (10)</TableHead>
              <TableHead className="w-[80px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Proj (10)</TableHead>
              <TableHead className="w-[80px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Exam (60)</TableHead>
              <TableHead className="w-[80px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Total</TableHead>
              <TableHead className="w-[80px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Grade</TableHead>
              <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider">Remark</TableHead>
              <TableHead className="w-[80px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Pos.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockStudents.map((student) => (
              <TableRow key={student.id} className="hover:bg-slate-50/50 border-slate-50 transition-colors">
                <TableCell className="font-bold text-slate-600">{student.id}</TableCell>
                <TableCell className="font-black text-slate-900">{student.name}</TableCell>
                <TableCell>
                  <Input type="number" defaultValue={student.ca1} className="h-9 rounded-md border-slate-200 text-center font-bold" max={10} min={0} />
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={student.ca2} className="h-9 rounded-md border-slate-200 text-center font-bold" max={10} min={0} />
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={student.ca3} className="h-9 rounded-md border-slate-200 text-center font-bold" max={10} min={0} />
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={student.project} className="h-9 rounded-md border-slate-200 text-center font-bold" max={10} min={0} />
                </TableCell>
                <TableCell>
                  <Input type="number" defaultValue={student.exam} className="h-9 rounded-md border-slate-200 text-center font-bold" max={60} min={0} />
                </TableCell>
                <TableCell className="text-center font-black text-schoolgate-green text-lg">{student.total}</TableCell>
                <TableCell className="text-center font-bold text-slate-700">{student.grade}</TableCell>
                <TableCell className="text-slate-500 italic text-xs font-medium">{student.remark}</TableCell>
                <TableCell className="text-center font-bold text-blue-600">{student.position}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Footer Actions */}
      <div className="flex items-center justify-between p-6 bg-white rounded-[14px] shadow-sm border border-slate-100">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Class Average</span>
            <span className="text-2xl font-black text-slate-800 tracking-tight">64.4</span>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Highest Score</span>
            <span className="text-2xl font-black text-emerald-600 tracking-tight">98</span>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lowest Score</span>
            <span className="text-2xl font-black text-rose-600 tracking-tight">12</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl px-6 gap-2 border-slate-200 text-slate-600">
            <Printer size={18} /> Print Draft
          </Button>
          <Button variant="outline" className="h-11 rounded-xl px-6 gap-2 border-slate-200 text-slate-600">
            <Download size={18} /> Export Excel
          </Button>
          <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 h-11 rounded-xl px-8 gap-2 shadow-lg shadow-schoolgate-green/20">
            <Send size={18} /> Submit for Approval
          </Button>
        </div>
      </div>
    </div>
  );
}
