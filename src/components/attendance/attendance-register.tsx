import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const students = [
  { id: "S001", name: "Adebayo Tunde", admissionNo: "SCH/2024/001", class: "JSS 1A", status: "Present" },
  { id: "S002", name: "Chukwuma Ifeanyi", admissionNo: "SCH/2024/002", class: "JSS 1A", status: "Absent" },
  { id: "S003", name: "Fatima Yusuf", admissionNo: "SCH/2024/003", class: "JSS 1A", status: "Late" },
  { id: "S004", name: "Grace Okon", admissionNo: "SCH/2024/004", class: "JSS 1A", status: "Excused" },
  { id: "S005", name: "Ibrahim Musa", admissionNo: "SCH/2024/005", class: "JSS 1A", status: "Present" },
];

export function AttendanceRegister() {
  return (
    <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border-none">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">Student Attendance List</h3>
        <div className="text-sm text-muted-foreground">Class: JSS 1A | Date: 06 Aug 2026</div>
      </div>
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox className="rounded" />
            </TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Admission No</TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Present</TableHead>
            <TableHead>Absent</TableHead>
            <TableHead>Late</TableHead>
            <TableHead>Excused</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="hover:bg-slate-50/50 transition-colors">
              <TableCell>
                <Checkbox className="rounded" />
              </TableCell>
              <TableCell>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-slate-600">{student.admissionNo}</TableCell>
              <TableCell className="font-semibold text-slate-900">{student.name}</TableCell>
              <TableCell>
                <Checkbox className="h-5 w-5 rounded-full border-2 border-emerald-500 data-[state=checked]:bg-emerald-500" checked={student.status === "Present"} />
              </TableCell>
              <TableCell>
                <Checkbox className="h-5 w-5 rounded-full border-2 border-rose-500 data-[state=checked]:bg-rose-500" checked={student.status === "Absent"} />
              </TableCell>
              <TableCell>
                <Checkbox className="h-5 w-5 rounded-full border-2 border-amber-500 data-[state=checked]:bg-amber-500" checked={student.status === "Late"} />
              </TableCell>
              <TableCell>
                <Checkbox className="h-5 w-5 rounded-full border-2 border-blue-500 data-[state=checked]:bg-blue-500" checked={student.status === "Excused"} />
              </TableCell>
              <TableCell>
                <Input placeholder="Add remark..." className="h-8 text-xs bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-schoolgate-green" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
