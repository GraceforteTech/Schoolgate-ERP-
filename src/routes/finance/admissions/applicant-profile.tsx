import { createFileRoute } from "@tanstack/react-router";
import { 
  ArrowLeft, Printer, Download, UserPlus, CheckCircle2, XCircle, FileText, Clock, Mail, MessageSquare, Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/finance/admissions/applicant-profile")({
  component: ApplicantProfilePage,
});

function ApplicantProfilePage() {
  const applicant = {
    name: "Adebayo Olawale",
    id: "APP/2026/001",
    status: "Under Review",
    applyingFor: "JSS 1",
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full"><ArrowLeft className="h-5 w-5" /></Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{applicant.name}</h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>{applicant.id}</span>
              <span>•</span>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">{applicant.status}</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Printer className="h-4 w-4" /> Print</Button>
          <Button variant="outline" className="gap-2"><FileText className="h-4 w-4" /> Download PDF</Button>
          <Button className="bg-schoolgate-green gap-2"><CheckCircle2 className="h-4 w-4" /> Approve Admission</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Sidebar Info */}
        <Card className="xl:col-span-1 p-6 space-y-6 rounded-[14px] border-slate-100 shadow-sm">
          <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto" />
          <div className="space-y-4">
            <div className="space-y-1"><p className="text-xs text-slate-400 font-bold uppercase">Applying For</p><p className="font-bold text-slate-900">{applicant.applyingFor}</p></div>
            <div className="space-y-1"><p className="text-xs text-slate-400 font-bold uppercase">Phone</p><p className="font-bold text-slate-900">08012345678</p></div>
            <div className="space-y-1"><p className="text-xs text-slate-400 font-bold uppercase">Email</p><p className="font-bold text-slate-900">adebayo.o@email.com</p></div>
          </div>
          <Button className="w-full" variant="outline"><Edit className="h-4 w-4 mr-2" /> Edit Profile</Button>
        </Card>

        {/* Main Content */}
        <div className="xl:col-span-3 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="bg-white border-slate-100 p-1 rounded-xl">
              <TabsTrigger value="overview" className="data-[state=active]:bg-schoolgate-green data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="academics" className="data-[state=active]:bg-schoolgate-green data-[state=active]:text-white">Academic History</TabsTrigger>
              <TabsTrigger value="exam" className="data-[state=active]:bg-schoolgate-green data-[state=active]:text-white">Entrance Exam</TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-schoolgate-green data-[state=active]:text-white">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-xs text-slate-400">Date of Birth</p><p className="font-medium">12 May 2015</p></div>
                  <div><p className="text-xs text-slate-400">Gender</p><p className="font-medium">Male</p></div>
                  <div><p className="text-xs text-slate-400">Nationality</p><p className="font-medium">Nigerian</p></div>
                  <div><p className="text-xs text-slate-400">State</p><p className="font-medium">Lagos</p></div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
