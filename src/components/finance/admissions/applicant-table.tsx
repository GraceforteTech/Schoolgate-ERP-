import React from "react";
import { Link } from "@tanstack/react-router";

import { 
  Search, 
  Eye, 
  Edit, 
  CheckCircle, 
  XCircle, 
  Printer, 
  Download,
  MoreVertical,
  Filter
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

const applicants = [
  {
    id: "APP/2026/001",
    name: "Adebayo Olawale",
    gender: "Male",
    applyingFor: "JSS 1",
    previousSchool: "St. John's Academy",
    parentName: "Mr. Olawale",
    phone: "08012345678",
    status: "Under Review",
    examStatus: "Passed",
    interviewStatus: "Scheduled",
    decision: "Pending",
  },
  {
    id: "APP/2026/002",
    name: "Chiamaka Okoro",
    gender: "Female",
    applyingFor: "Primary 4",
    previousSchool: "Lakeside Primary",
    parentName: "Mrs. Okoro",
    phone: "08087654321",
    status: "Approved",
    examStatus: "Passed",
    interviewStatus: "Completed",
    decision: "Offered",
  },
  {
    id: "APP/2026/003",
    name: "Fatima Yusuf",
    gender: "Female",
    applyingFor: "SS 1",
    previousSchool: "Federal Girls College",
    parentName: "Alhaji Yusuf",
    phone: "07011223344",
    status: "Application Submitted",
    examStatus: "Scheduled",
    interviewStatus: "Pending",
    decision: "Pending",
  },
];

export function ApplicantTable() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search Applicant..." className="pl-9 h-10 rounded-lg" />
        </div>
        
        <Select defaultValue="2025/2026">
          <SelectTrigger className="w-[140px] h-10 rounded-lg">
            <SelectValue placeholder="Session" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025/2026">2025/2026</SelectItem>
            <SelectItem value="2024/2025">2024/2025</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[160px] h-10 rounded-lg">
            <SelectValue placeholder="Admission Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jss1">JSS 1</SelectItem>
            <SelectItem value="jss2">JSS 2</SelectItem>
            <SelectItem value="ss1">SS 1</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[150px] h-10 rounded-lg">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="icon" className="h-10 w-10">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">App Number</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Applicant Name</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Gender</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Applying For</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Previous School</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap">Parent Name</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap text-center">Status</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap text-center">Exam</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap text-center">Interview</TableHead>
                <TableHead className="font-semibold text-slate-700 whitespace-nowrap text-center text-schoolgate-green">Decision</TableHead>
                <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant, i) => (
                <TableRow key={applicant.id} className={i % 2 === 1 ? "bg-slate-50/50" : ""}>
                  <TableCell className="font-medium text-slate-900">{applicant.id}</TableCell>
                  <TableCell className="text-slate-700 font-medium">{applicant.name}</TableCell>
                  <TableCell className="text-slate-600">{applicant.gender}</TableCell>
                  <TableCell className="text-slate-600">{applicant.applyingFor}</TableCell>
                  <TableCell className="text-slate-600 truncate max-w-[150px]">{applicant.previousSchool}</TableCell>
                  <TableCell className="text-slate-600">{applicant.parentName}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 whitespace-nowrap">
                      {applicant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={applicant.examStatus === "Passed" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-orange-50 text-orange-700 border-orange-100"}>
                      {applicant.examStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={applicant.interviewStatus === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-700 border-slate-100"}>
                      {applicant.interviewStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={applicant.decision === "Offered" ? "bg-schoolgate-green text-white" : "bg-slate-200 text-slate-700"}>
                      {applicant.decision}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
                          <Link to="/finance/admissions/applicant-profile">
                            <Eye className="h-4 w-4 text-slate-500" /> View
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Edit className="h-4 w-4 text-slate-500" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-schoolgate-green">
                          <CheckCircle className="h-4 w-4" /> Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
                          <XCircle className="h-4 w-4" /> Reject
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Printer className="h-4 w-4 text-slate-500" /> Print
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 cursor-pointer">
                          <Download className="h-4 w-4 text-slate-500" /> Download
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
