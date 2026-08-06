import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  BookOpen, 
  GraduationCap, 
  Printer, 
  IdCard, 
  FileSpreadsheet,
  Zap
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const teachers = [
  {
    id: "TCH-001",
    name: "Dr. Sarah Adebayo",
    dept: "Science",
    subjects: "Physics, Further Maths",
    classes: "SS3 A, SS3 B",
    phone: "08012345678",
    date: "2018-09-12",
    status: "Active",
    productivity: 94,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "TCH-002",
    name: "Mr. Johnson Okeke",
    dept: "Arts",
    subjects: "English Literature",
    classes: "SS2 A, SS2 C",
    phone: "08087654321",
    date: "2019-01-05",
    status: "Active",
    productivity: 88,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Johnson"
  },
  {
    id: "TCH-003",
    name: "Mrs. Fatima Ibrahim",
    dept: "Languages",
    subjects: "French, Arabic",
    classes: "JSS1 A, JSS2 B",
    phone: "08099887766",
    date: "2020-08-20",
    status: "On Leave",
    productivity: 91,
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima"
  }
];

export function TeacherDirectory() {
  return (
    <Card className="rounded-[14px] border-slate-100 shadow-sm overflow-hidden bg-white">
      <div className="p-6 border-b border-slate-100 space-y-6">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search teacher by name or ID..." 
              className="pl-10 h-11 rounded-xl border-slate-200 focus:ring-schoolgate-green/20"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Select>
              <SelectTrigger className="h-11 w-[140px] rounded-xl border-slate-200">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="arts">Arts</SelectItem>
                <SelectItem value="languages">Languages</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="h-11 w-[140px] rounded-xl border-slate-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-11 rounded-xl border-slate-200 gap-2 text-slate-600 font-bold">
              <Filter size={18} />
              More Filters
            </Button>
            <Button variant="outline" className="h-11 rounded-xl border-slate-200 gap-2 text-slate-600 font-bold">
               <FileSpreadsheet size={18} />
               Export Excel
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-black text-[10px] uppercase tracking-widest py-4">Photo</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Employee ID</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Teacher Name</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Department</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Subjects</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Prod. Score</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id} className="hover:bg-slate-50/50 transition-colors group">
                <TableCell>
                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-slate-100">
                    <AvatarImage src={teacher.photo} />
                    <AvatarFallback>{teacher.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-bold text-slate-500 text-sm">{teacher.id}</TableCell>
                <TableCell className="font-bold text-slate-800 text-sm">{teacher.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-bold text-[10px] uppercase">
                    {teacher.dept}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-slate-500 font-medium max-w-[200px] truncate">{teacher.subjects}</TableCell>
                <TableCell className="text-center">
                  <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700">
                    <Zap size={12} className="fill-emerald-700" />
                    <span className="text-xs font-black">{teacher.productivity}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={
                    teacher.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-700 border-none font-bold text-[10px] uppercase'
                      : 'bg-amber-100 text-amber-700 border-none font-bold text-[10px] uppercase'
                  }>
                    {teacher.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-xl border-slate-100">
                      <DropdownMenuItem className="rounded-lg gap-2 font-black text-[10px] uppercase py-2.5">
                        <Eye size={14} className="text-blue-500" /> View 360° Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 font-black text-[10px] uppercase py-2.5">
                        <Edit size={14} className="text-slate-400" /> Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem className="rounded-lg gap-2 font-black text-[10px] uppercase py-2.5">
                        <BookOpen size={14} className="text-schoolgate-green" /> Assign Subjects
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 font-black text-[10px] uppercase py-2.5">
                        <GraduationCap size={14} className="text-purple-500" /> Assign Classes
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1" />
                      <DropdownMenuItem className="rounded-lg gap-2 font-black text-[10px] uppercase py-2.5">
                        <Printer size={14} className="text-slate-400" /> Print Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="rounded-lg gap-2 font-black text-[10px] uppercase py-2.5">
                        <IdCard size={14} className="text-slate-400" /> Generate ID Card
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
