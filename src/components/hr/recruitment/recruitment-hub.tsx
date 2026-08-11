import React, { useState } from "react";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ArrowRight,
  UserCheck,
  FileText,
  Clock,
  CheckCircle2,
  Mail,
  Phone
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { PlaceholderForm } from "@/components/ui/placeholder-form";

const jobs = [
  { id: "JOB-001", title: "Senior Mathematics Teacher", department: "Science", type: "Full-time", applicants: 12, status: "Active", posted: "2024-08-01" },
  { id: "JOB-002", title: "School Librarian", department: "Library", type: "Full-time", applicants: 8, status: "Active", posted: "2024-08-03" },
  { id: "JOB-003", title: "Accounts Officer", department: "Finance", type: "Contract", applicants: 15, status: "Closed", posted: "2024-07-25" },
];

const applicants = [
  { 
    id: "APP-001", 
    name: "John Maxwell", 
    job: "Senior Mathematics Teacher", 
    stage: "Interview", 
    rating: 4.5, 
    date: "2024-08-05",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  { 
    id: "APP-002", 
    name: "Amina Yusuf", 
    job: "Senior Mathematics Teacher", 
    stage: "Screening", 
    rating: 4.2, 
    date: "2024-08-06",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina"
  },
  { 
    id: "APP-003", 
    name: "Robert Smith", 
    job: "Accounts Officer", 
    stage: "Offered", 
    rating: 4.8, 
    date: "2024-08-04",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert"
  },
];

export const RecruitmentHub = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formIcon, setFormIcon] = useState<any>(Plus);

  const handleNewPosting = () => {
    setFormTitle("Create Job Posting");
    setFormIcon(Briefcase);
    setIsFormOpen(true);
  };

  const handleAddCandidate = () => {
    setFormTitle("Add New Candidate");
    setFormIcon(UserPlus);
    setIsFormOpen(true);
  };

  const UserPlus = Users; // Alias for consistency if icon not imported

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Open Positions", value: "8", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Applicants", value: "42", icon: Users, color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
          { label: "Interviews Today", value: "3", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
          { label: "Time to Hire", value: "18 Days", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-xl">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pipeline" className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-slate-200/60 w-fit">
            <TabsTrigger value="pipeline" className="rounded-lg text-xs font-bold data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green">Applicant Pipeline</TabsTrigger>
            <TabsTrigger value="jobs" className="rounded-lg text-xs font-bold data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green">Job Vacancies</TabsTrigger>
            <TabsTrigger value="interviews" className="rounded-lg text-xs font-bold data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green">Interview Schedule</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg h-9 border-slate-200">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button 
              onClick={handleNewPosting}
              size="sm" className="rounded-lg h-9 bg-schoolgate-green hover:bg-schoolgate-green/90 shadow-sm text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> New Posting
            </Button>
          </div>
        </div>

        <TabsContent value="pipeline" className="space-y-4 outline-none">
          {/* Horizontal Pipeline View */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {["Applied", "Screening", "Interview", "Offered", "Hired"].map((stage) => (
              <div key={stage} className="min-w-[280px] flex-1">
                <div className="flex items-center justify-between mb-3 px-2">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    {stage}
                    <Badge variant="secondary" className="rounded-full px-1.5 py-0 text-[10px] bg-slate-100 text-slate-600">
                      {applicants.filter(a => a.stage === stage).length}
                    </Badge>
                  </h3>
                </div>
                <div className="space-y-3">
                  {applicants.filter(a => a.stage === stage).map((applicant) => (
                    <Card key={applicant.id} className="border-slate-200 shadow-sm hover:border-schoolgate-green transition-colors cursor-pointer rounded-xl overflow-hidden">
                      <CardContent className="p-3 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 ring-2 ring-slate-50">
                              <AvatarImage src={applicant.avatar} />
                              <AvatarFallback>{applicant.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{applicant.name}</p>
                              <p className="text-[10px] text-muted-foreground">{applicant.job}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-50 pt-2">
                          <span className="text-[10px] text-muted-foreground">{applicant.date}</span>
                          <div className="flex items-center gap-1 text-[10px] font-bold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">
                            ⭐ {applicant.rating}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button 
                    onClick={handleAddCandidate}
                    variant="ghost" className="w-full border border-dashed border-slate-200 rounded-xl h-12 text-slate-400 hover:text-schoolgate-green hover:border-schoolgate-green hover:bg-schoolgate-green-light/20"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Candidate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="outline-none">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="text-xs font-bold uppercase">Position Title</TableHead>
                  <TableHead className="text-xs font-bold uppercase">Department</TableHead>
                  <TableHead className="text-xs font-bold uppercase">Type</TableHead>
                  <TableHead className="text-xs font-bold uppercase">Applicants</TableHead>
                  <TableHead className="text-xs font-bold uppercase">Posted Date</TableHead>
                  <TableHead className="text-xs font-bold uppercase text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{job.title}</p>
                        <p className="text-[10px] text-muted-foreground">{job.id}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-slate-600">{job.department}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[10px] rounded-full border-slate-200 text-slate-600">{job.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs font-bold text-slate-700">{job.applicants}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{job.posted}</TableCell>
                    <TableCell className="text-right">
                      <Badge className={cn(
                        "rounded-full text-[10px] font-bold px-2 py-0",
                        job.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-100 text-slate-600 border-slate-200"
                      )}>
                        {job.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      <PlaceholderForm 
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        title={formTitle}
        description="Standardized recruitment and hiring workflow."
        icon={formIcon}
      />
    </div>
  );
};
