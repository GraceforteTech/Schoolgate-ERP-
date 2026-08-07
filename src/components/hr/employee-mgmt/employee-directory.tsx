import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Briefcase, 
  MapPin,
  CheckCircle2,
  XCircle,
  Edit,
  Trash,
  UserCheck,
  FileText,
  Lock,
  Archive,
  Printer,
  Download,
  Plus,
  Award
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const employees = [
  {
    id: "EMP/2024/001",
    name: "Adebayo Olawale",
    gender: "Male",
    dob: "1985-06-12",
    phone: "08012345678",
    email: "a.olawale@schoolgate.edu",
    department: "Science",
    designation: "Senior Mathematics Teacher",
    type: "Permanent",
    status: "Active",
    dateEmployed: "2018-09-01",
    yearsOfService: "6 Years",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo"
  },
  {
    id: "EMP/2024/002",
    name: "Sarah Johnson",
    gender: "Female",
    dob: "1992-02-24",
    phone: "08087654321",
    email: "s.johnson@schoolgate.edu",
    department: "Administration",
    designation: "Admin Officer",
    type: "Contract",
    status: "Active",
    dateEmployed: "2021-02-10",
    yearsOfService: "3 Years",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "EMP/2024/003",
    name: "Chinedu Okoro",
    gender: "Male",
    dob: "1988-11-05",
    phone: "07011223344",
    email: "c.okoro@schoolgate.edu",
    department: "Arts",
    designation: "English Teacher",
    type: "Permanent",
    status: "On Leave",
    dateEmployed: "2019-01-20",
    yearsOfService: "5 Years",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu"
  },
  {
    id: "EMP/2024/004",
    name: "Fatima Yusuf",
    gender: "Female",
    dob: "1990-08-15",
    phone: "09055667788",
    email: "f.yusuf@schoolgate.edu",
    department: "Primary School",
    designation: "Primary Lead",
    type: "Permanent",
    status: "Active",
    dateEmployed: "2022-08-01",
    yearsOfService: "2 Years",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima"
  }
];

export const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-4">
      {/* Action and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-[14px] shadow-sm border border-slate-200/60">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, ID, or department..." 
            className="pl-9 h-10 border-slate-200 rounded-lg focus-visible:ring-schoolgate-green"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="h-10 gap-2 bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg shadow-sm">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-slate-200/60">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px]">Photo</TableHead>
                <TableHead className="whitespace-nowrap">Employee Details</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Professional</TableHead>
                <TableHead>Lifecycle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id} className="group hover:bg-slate-50/80 transition-colors">
                  <TableCell>
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-1 ring-slate-100">
                      <AvatarImage src={emp.avatar} alt={emp.name} />
                      <AvatarFallback className="bg-schoolgate-green-light text-schoolgate-green font-extrabold text-xs">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 group-hover:text-schoolgate-green transition-colors">
                        {emp.name}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{emp.id}</span>
                      <div className="flex items-center gap-2 mt-1">
                         <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-medium">{emp.gender}</span>
                         <span className="text-[10px] text-muted-foreground">{new Date(emp.dob).toLocaleDateString('en-GB')}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {emp.phone}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {emp.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{emp.designation}</span>
                      <span className="text-xs text-muted-foreground">{emp.department}</span>
                      <span className="text-[10px] font-medium text-schoolgate-green mt-1">{emp.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "w-fit rounded-full text-[10px] font-bold px-2 py-0",
                          emp.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-orange-50 text-orange-700 border-orange-200"
                        )}
                      >
                        {emp.status}
                      </Badge>
                      <div className="text-[10px] text-muted-foreground">
                        <span className="font-semibold text-slate-500">Service:</span> {emp.yearsOfService}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-200 rounded-full transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-slate-200 p-2">
                        <DropdownMenuLabel className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider px-2 py-1.5">Employee Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2.5 rounded-lg py-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                          <User className="h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2.5 rounded-lg py-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                          <Edit className="h-4 w-4" /> Edit Employee
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2.5 rounded-lg py-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                          <Award className="h-4 w-4" /> Awards & Promotions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2.5 rounded-lg py-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                          <Calendar className="h-4 w-4" /> Leave History
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2.5 rounded-lg py-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                          <FileText className="h-4 w-4" /> Upload Documents
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2.5 rounded-lg py-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                          <Lock className="h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2.5 rounded-lg py-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green cursor-pointer">
                          <Archive className="h-4 w-4" /> Archive Record
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 bg-slate-100" />
                        <DropdownMenuItem className="gap-2.5 rounded-lg py-2 text-red-600 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                          <XCircle className="h-4 w-4" /> Deactivate
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
};
