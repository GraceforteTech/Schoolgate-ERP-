import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Users, 
  ClipboardCheck,
  Trash2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const classes = [
  {
    id: "1",
    name: "JSS 1A",
    level: "Junior Secondary",
    category: "Secondary",
    teacher: "Mr. Yusuf Bello",
    capacity: 40,
    enrolled: 38,
    status: "Active",
  },
  {
    id: "2",
    name: "JSS 1B",
    level: "Junior Secondary",
    category: "Secondary",
    teacher: "Mrs. Sarah Okon",
    capacity: 40,
    enrolled: 35,
    status: "Active",
  },
  {
    id: "3",
    name: "Primary 4 Blue",
    level: "Lower Primary",
    category: "Primary",
    teacher: "Miss Chiamaka Obi",
    capacity: 30,
    enrolled: 30,
    status: "Full",
  },
  {
    id: "4",
    name: "SS 3G",
    level: "Senior Secondary",
    category: "Secondary",
    teacher: "Mr. David Segun",
    capacity: 35,
    enrolled: 28,
    status: "Active",
  },
  {
    id: "5",
    name: "Nursery 2",
    level: "Early Years",
    category: "Primary",
    teacher: "Mrs. Fatima Ahmed",
    capacity: 25,
    enrolled: 22,
    status: "Active",
  },
];

export function ClassRegistryTable() {
  return (
    <div className="rounded-xl border border-slate-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="border-slate-100 hover:bg-transparent">
            <TableHead className="font-bold text-slate-700">Class Name</TableHead>
            <TableHead className="font-bold text-slate-700">Level</TableHead>
            <TableHead className="font-bold text-slate-700">Category</TableHead>
            <TableHead className="font-bold text-slate-700">Class Teacher</TableHead>
            <TableHead className="font-bold text-slate-700 text-center">Enrollment</TableHead>
            <TableHead className="font-bold text-slate-700">Status</TableHead>
            <TableHead className="font-bold text-slate-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((item) => (
            <TableRow key={item.id} className="border-slate-100 hover:bg-slate-50/30 transition-colors group">
              <TableCell className="font-bold text-slate-900">{item.name}</TableCell>
              <TableCell className="text-slate-600">{item.level}</TableCell>
              <TableCell>
                <Badge variant="outline" className="rounded-md font-medium bg-slate-50 border-slate-200">
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-600">{item.teacher}</TableCell>
              <TableCell>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-bold text-slate-700">
                    {item.enrolled} / {item.capacity}
                  </span>
                  <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        (item.enrolled / item.capacity) >= 1 
                          ? 'bg-orange-500' 
                          : 'bg-schoolgate-green'
                      }`}
                      style={{ width: `${(item.enrolled / item.capacity) * 100}%` }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider border-none ${
                    item.status === 'Active' 
                      ? 'bg-schoolgate-green-light text-schoolgate-green' 
                      : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-100 shadow-xl">
                    <DropdownMenuItem className="gap-2 font-medium cursor-pointer rounded-lg py-2">
                      <Eye className="h-4 w-4 text-slate-400" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 font-medium cursor-pointer rounded-lg py-2">
                      <Edit className="h-4 w-4 text-slate-400" /> Edit Class
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 font-medium cursor-pointer rounded-lg py-2">
                      <Users className="h-4 w-4 text-slate-400" /> Manage Students
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 font-medium cursor-pointer rounded-lg py-2">
                      <ClipboardCheck className="h-4 w-4 text-slate-400" /> Attendance History
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 font-medium cursor-pointer rounded-lg py-2 text-rose-600 focus:text-rose-600 focus:bg-rose-50">
                      <Trash2 className="h-4 w-4" /> Delete Class
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
