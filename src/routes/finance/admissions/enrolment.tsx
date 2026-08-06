import { createFileRoute } from "@tanstack/react-router";
import { 
  UserCheck, ShieldCheck, GraduationCap, School, MapPin, Calendar, CreditCard, BookOpen, Warehouse, Truck, Send, Printer, UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/finance/admissions/enrolment")({
  component: StudentEnrolmentPage,
});

function StudentEnrolmentPage() {
  const applicant = {
    name: "Adebayo Olawale",
    id: "APP/2026/001",
    applyingFor: "JSS 1",
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Student Enrolment</h1>
          <p className="text-sm text-slate-500 mt-1">Convert approved applicants into registered students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-schoolgate-green-light rounded-full grid place-items-center">
                <UserCheck className="h-8 w-8 text-schoolgate-green" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{applicant.name}</h3>
                <p className="text-sm text-slate-500">Applicant ID: {applicant.id} • Approved for {applicant.applyingFor}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Placement Details</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">School Section</label>
                    <Select defaultValue="secondary">
                      <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="primary">Primary School</SelectItem>
                        <SelectItem value="secondary">Secondary School</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Class</label>
                    <Select defaultValue="jss1">
                      <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="jss1">JSS 1</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">Arm/Section</label>
                    <Select defaultValue="a">
                      <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">Diamond (A)</SelectItem>
                        <SelectItem value="b">Gold (B)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Additional Services</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Warehouse className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">Hostel Allocation</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase">Optional</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Truck className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">Transport Service</span>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase">Optional</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-[14px]">
            <h4 className="text-emerald-800 font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              Automated Operations on Enrolment
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: GraduationCap, text: "Admission Number" },
                { icon: UserCircle, text: "Student Profile" },
                { icon: CreditCard, text: "Finance Account" },
                { icon: BookOpen, text: "Library Record" },
                { icon: MapPin, text: "Portal Access" },
                { icon: Calendar, text: "Attendance Log" },
              ].map((op, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <op.icon className="h-3.5 w-3.5 opacity-60" />
                  {op.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <h3 className="font-bold text-slate-800 mb-6 text-center">Ready to Enroll?</h3>
            <p className="text-sm text-slate-500 text-center mb-8">
              A unique admission number will be generated and welcome messages will be sent to the parent.
            </p>
            <div className="space-y-3">
              <Button className="w-full bg-schoolgate-green h-12 text-lg font-bold gap-2">
                <UserCheck className="h-5 w-5" /> Enroll Student
              </Button>
              <Button variant="outline" className="w-full h-12 font-bold">Save Draft</Button>
            </div>
          </Card>

          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white">
            <h3 className="font-bold text-slate-800 mb-4">Post-Enrolment Tasks</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full gap-2 justify-start font-medium border-slate-100">
                <Printer className="h-4 w-4 text-slate-400" /> Print Admission Slip
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start font-medium border-slate-100">
                <UserCircle className="h-4 w-4 text-slate-400" /> Print Student ID Card
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start font-medium border-slate-100">
                <Send className="h-4 w-4 text-slate-400" /> Send Welcome SMS/Email
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
