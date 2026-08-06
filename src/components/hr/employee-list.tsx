import React, { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  ExternalLink,
  Edit,
  Trash,
  UserCheck,
  Filter,
  ArrowUpDown
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

const employees = [
  {
    id: "EMP001",
    name: "Adebayo Olawale",
    email: "a.olawale@schoolgate.edu",
    phone: "08012345678",
    role: "Senior Mathematics Teacher",
    department: "Science",
    status: "Active",
    joiningDate: "2020-09-15",
    salary: "₦250,000",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo"
  },
  {
    id: "EMP002",
    name: "Sarah Johnson",
    email: "s.johnson@schoolgate.edu",
    phone: "08087654321",
    role: "Admin Officer",
    department: "Administration",
    status: "Active",
    joiningDate: "2021-02-10",
    salary: "₦180,000",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "EMP003",
    name: "Chinedu Okoro",
    email: "c.okoro@schoolgate.edu",
    phone: "07011223344",
    role: "English Teacher",
    department: "Arts",
    status: "On Leave",
    joiningDate: "2019-01-20",
    salary: "₦220,000",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chinedu"
  },
  {
    id: "EMP004",
    name: "Fatima Yusuf",
    email: "f.yusuf@schoolgate.edu",
    phone: "09055667788",
    role: "Primary Lead",
    department: "Primary School",
    status: "Active",
    joiningDate: "2022-08-01",
    salary: "₦210,000",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima"
  },
  {
    id: "EMP005",
    name: "James Peters",
    email: "j.peters@schoolgate.edu",
    phone: "08199887766",
    role: "IT Specialist",
    department: "Technical",
    status: "Active",
    joiningDate: "2023-03-12",
    salary: "₦240,000",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
  },
  {
    id: "EMP006",
    name: "Blessing Eze",
    email: "b.eze@schoolgate.edu",
    phone: "08044332211",
    role: "Nurse",
    department: "Medical",
    status: "Resigned",
    joiningDate: "2021-11-05",
    salary: "₦150,000",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing"
  }
];

export const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[14px] shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, ID, role..." 
            className="pl-9 h-10 border-slate-200 rounded-lg focus-visible:ring-schoolgate-green"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg flex-1 sm:flex-none">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg flex-1 sm:flex-none">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-slate-200/60">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Department & Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joining Date</TableHead>
              <TableHead className="text-right">Salary</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="group hover:bg-slate-50 transition-colors">
                  <TableCell className="font-medium text-slate-500 text-xs">
                    {emp.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={emp.avatar} alt={emp.name} />
                        <AvatarFallback className="bg-schoolgate-green-light text-schoolgate-green font-bold">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-schoolgate-green transition-colors">
                          {emp.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {emp.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-700">{emp.role}</span>
                      <span className="text-xs text-muted-foreground italic">{emp.department}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded-full text-[10px] font-bold px-2 py-0",
                        emp.status === "Active" ? "bg-green-50 text-green-700 border-green-200" :
                        emp.status === "On Leave" ? "bg-orange-50 text-orange-700 border-orange-200" :
                        "bg-slate-50 text-slate-600 border-slate-200"
                      )}
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {new Date(emp.joiningDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-slate-900 text-sm">
                    {emp.salary}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-200 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-slate-200">
                        <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green">
                          <ExternalLink className="h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green">
                          <Edit className="h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green">
                          <UserCheck className="h-4 w-4" /> Update Status
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-red-600 focus:bg-red-50 focus:text-red-600">
                          <Trash className="h-4 w-4" /> Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <User className="h-10 w-10 mb-2 opacity-20" />
                    <p className="font-medium italic">No employees found matching your search</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Simple helper to match the cn usage in the previous components
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
