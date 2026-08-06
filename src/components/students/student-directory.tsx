import React from "react";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  TrendingUp, 
  ArrowRightLeft, 
  UserMinus, 
  UserX, 
  Contact, 
  FileText,
  Download,
  Printer,
  FileSpreadsheet
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockStudents = [
  {
    id: "2024/001",
    name: "Olawale Adebayo",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olawale",
    school: "Secondary",
    class: "SS 1",
    arm: "Alpha",
    gender: "Male",
    parent: "Mr. Adebayo",
    phone: "08012345678",
    status: "Active",
  },
  {
    id: "2024/042",
    name: "Chiamaka Okoro",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chiamaka",
    school: "Primary",
    class: "Primary 4",
    arm: "Gold",
    gender: "Female",
    parent: "Mrs. Okoro",
    phone: "08098765432",
    status: "Active",
  },
  {
    id: "2023/115",
    name: "Fatima Yusuf",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    school: "Secondary",
    class: "JSS 2",
    arm: "Blue",
    gender: "Female",
    parent: "Alhaji Yusuf",
    phone: "07011223344",
    status: "Suspended",
  },
];

export function StudentDirectory() {
  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search Student or Admission No..." className="pl-9 h-10 rounded-lg" />
        </div>
        
        <Select defaultValue="2024/2025">
          <SelectTrigger className="w-[140px] h-10 rounded-lg">
            <SelectValue placeholder="Session" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024/2025">2024/2025</SelectItem>
            <SelectItem value="2023/2024">2023/2024</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[130px] h-10 rounded-lg">
            <SelectValue placeholder="School" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[120px] h-10 rounded-lg">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p1">Primary 1</SelectItem>
            <SelectItem value="p4">Primary 4</SelectItem>
            <SelectItem value="j1">JSS 1</SelectItem>
            <SelectItem value="s1">SS 1</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[100px] h-10 rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="graduated">Graduated</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 text-emerald-600 border-emerald-100">
            <FileSpreadsheet className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[80px]">Photo</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Adm Number</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Student Name</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">School</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Class & Arm</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Gender</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Parent</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Phone</TableHead>
                <TableHead className="font-semibold text-slate-700 text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStudents.map((student, i) => (
                <TableRow key={student.id} className={i % 2 === 1 ? "bg-slate-50/50" : ""}>
                  <TableCell>
                    <Avatar className="h-8 w-8 border border-slate-200">
                      <AvatarImage src={student.photo} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{student.id}</TableCell>
                  <TableCell className="font-semibold text-slate-800">{student.name}</TableCell>
                  <TableCell className="text-slate-600">{student.school}</TableCell>
                  <TableCell className="text-slate-600">
                    {student.class} ({student.arm})
                  </TableCell>
                  <TableCell className="text-slate-600">{student.gender}</TableCell>
                  <TableCell className="text-slate-600">{student.parent}</TableCell>
                  <TableCell className="text-slate-600 text-xs">{student.phone}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={
                      student.status === "Active" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-orange-50 text-orange-700 border-orange-100"
                    }>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem className="gap-2">
                          <Eye className="h-4 w-4 text-slate-500" /> View 360° Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Edit className="h-4 w-4 text-slate-500" /> Edit Record
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-500" /> Promote Student
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <ArrowRightLeft className="h-4 w-4 text-violet-500" /> Transfer Class
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-orange-600">
                          <UserMinus className="h-4 w-4" /> Suspend Student
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-rose-600">
                          <UserX className="h-4 w-4" /> Withdraw Student
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2">
                          <Contact className="h-4 w-4 text-slate-500" /> Print ID Card
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <FileText className="h-4 w-4 text-slate-500" /> Print Profile
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
