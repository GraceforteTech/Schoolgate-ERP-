import React from "react";
import { 
  User, 
  Users, 
  GraduationCap, 
  CreditCard, 
  CalendarCheck, 
  Stethoscope, 
  AlertTriangle, 
  Book, 
  Home, 
  Bus, 
  FileText, 
  History,
  Edit,
  Printer,
  Contact,
  Wallet,
  FileBarChart,
  MessageSquare,
  Phone,
  Mail,
  MoreVertical,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export function Student360Profile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Sidebar - Quick Info */}
      <div className="lg:col-span-3 space-y-6">
        <Card className="p-6 border-slate-100 rounded-[14px] text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-schoolgate-green-light">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Olawale" />
                <AvatarFallback>OA</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-lg font-bold text-slate-900">Olawale Adebayo</h2>
          <p className="text-xs font-bold text-schoolgate-green uppercase tracking-wider">SS 1 Alpha</p>
          <p className="text-[10px] text-slate-400 mt-1">ADM: 2024/001</p>
          
          <div className="mt-6 flex flex-col gap-2">
            <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-lg text-xs h-9">
              <Edit className="h-3.5 w-3.5 mr-2" /> Edit Profile
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="text-[10px] h-8 px-1">
                <Contact className="h-3 w-3 mr-1.5" /> ID Card
              </Button>
              <Button variant="outline" className="text-[10px] h-8 px-1">
                <Printer className="h-3 w-3 mr-1.5" /> Profile
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4 text-left">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Attendance Score</p>
              <div className="flex items-center justify-between mt-1 mb-1.5">
                <span className="text-xs font-bold text-slate-700">96.5%</span>
                <span className="text-[10px] text-emerald-600 font-bold">+2.4%</span>
              </div>
              <Progress value={96.5} className="h-1 bg-slate-100" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Fee Status</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-bold text-slate-700">Clear</span>
                <Badge className="bg-emerald-50 text-emerald-700 text-[10px] h-4">No Balance</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-slate-100 rounded-[14px] shadow-sm">
          <h3 className="text-xs font-bold text-slate-800 mb-4 flex items-center gap-2">
            <MessageSquare className="h-3.5 w-3.5 text-schoolgate-green" />
            Quick Contact
          </h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-[11px] h-9 border-slate-100 hover:bg-slate-50">
              <Phone className="h-3.5 w-3.5 mr-3 text-blue-500" /> WhatsApp
            </Button>
            <Button variant="outline" className="w-full justify-start text-[11px] h-9 border-slate-100 hover:bg-slate-50">
              <MessageSquare className="h-3.5 w-3.5 mr-3 text-emerald-500" /> Send SMS
            </Button>
            <Button variant="outline" className="w-full justify-start text-[11px] h-9 border-slate-100 hover:bg-slate-50">
              <Mail className="h-3.5 w-3.5 mr-3 text-orange-500" /> Send Email
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content Area - Tabs */}
      <div className="lg:col-span-9">
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full flex overflow-x-auto justify-start h-12 bg-white border border-slate-100 rounded-xl p-1 mb-6 no-scrollbar">
            <TabsTrigger value="info" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <User className="h-3.5 w-3.5 mr-2" /> Basic Info
            </TabsTrigger>
            <TabsTrigger value="academic" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <GraduationCap className="h-3.5 w-3.5 mr-2" /> Academics
            </TabsTrigger>
            <TabsTrigger value="finance" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <Wallet className="h-3.5 w-3.5 mr-2" /> Finance
            </TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <CalendarCheck className="h-3.5 w-3.5 mr-2" /> Attendance
            </TabsTrigger>
            <TabsTrigger value="medical" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <Stethoscope className="h-3.5 w-3.5 mr-2" /> Medical
            </TabsTrigger>
            <TabsTrigger value="discipline" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <AlertTriangle className="h-3.5 w-3.5 mr-2" /> Discipline
            </TabsTrigger>
            <TabsTrigger value="hostel" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <Home className="h-3.5 w-3.5 mr-2" /> Hostel
            </TabsTrigger>
            <TabsTrigger value="library" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <Book className="h-3.5 w-3.5 mr-2" /> Library
            </TabsTrigger>
            <TabsTrigger value="timeline" className="text-xs font-bold px-4 data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green rounded-lg whitespace-nowrap">
              <History className="h-3.5 w-3.5 mr-2" /> Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <User className="h-4 w-4 text-schoolgate-green" /> Personal Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Date of Birth", value: "12 Oct 2008 (15 Years)" },
                    { label: "Blood Group", value: "O+" },
                    { label: "Religion", value: "Christianity" },
                    { label: "State of Origin", value: "Lagos State" },
                    { label: "LGA", value: "Ikeja" },
                    { label: "Address", value: "12, Admiralty Way, Lekki Phase 1" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">{item.label}</span>
                      <span className="text-xs font-bold text-slate-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm">
                <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Users className="h-4 w-4 text-schoolgate-green" /> Parent Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Father's Name", value: "Mr. Olawale Adebayo" },
                    { label: "Occupation", value: "Software Engineer" },
                    { label: "Mother's Name", value: "Mrs. Funmi Adebayo" },
                    { label: "Occupation", value: "Medical Doctor" },
                    { label: "Primary Phone", value: "08012345678" },
                    { label: "Emergency Contact", value: "07099887766" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">{item.label}</span>
                      <span className="text-xs font-bold text-slate-700">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                <FileText className="h-4 w-4 text-schoolgate-green" /> Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {["Birth Certificate", "Admission Letter", "Medical Report", "Previous Result"].map((doc, i) => (
                  <div key={i} className="p-3 border border-slate-100 rounded-xl flex items-center gap-3 hover:border-schoolgate-green/30 cursor-pointer transition-colors">
                    <div className="p-2 bg-slate-50 rounded-lg">
                      <FileText className="h-4 w-4 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-700 truncate">{doc}</p>
                      <span className="text-[9px] text-slate-400">PDF • 1.2MB</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-schoolgate-green" /> Academic Performance Summary
                </h3>
                <Button variant="outline" className="h-8 text-[10px] font-bold border-slate-200">
                  <FileBarChart className="h-3 w-3 mr-1.5" /> Full Report Card
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Current Position</p>
                  <p className="text-2xl font-black text-schoolgate-green">3rd / 45</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">GPA (Aggregate)</p>
                  <p className="text-2xl font-black text-blue-600">4.62 / 5.0</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Credit Units</p>
                  <p className="text-2xl font-black text-orange-500">124</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Subject Performance (Current Term)</h4>
                {[
                  { subject: "Mathematics", score: 88, grade: "A1" },
                  { subject: "English Language", score: 75, grade: "B2" },
                  { subject: "Further Mathematics", score: 92, grade: "A1" },
                  { subject: "Physics", score: 84, grade: "B1" },
                  { subject: "Chemistry", score: 79, grade: "B2" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <span className="w-40 text-xs font-bold text-slate-700">{item.subject}</span>
                    <div className="flex-1 flex items-center gap-3">
                      <Progress value={item.score} className="h-2 bg-slate-100" />
                      <span className="text-[10px] font-bold text-slate-400 w-8">{item.score}%</span>
                    </div>
                    <Badge className={
                      item.grade === 'A1' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                    }>{item.grade}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline">
            <Card className="p-6 border-slate-100 rounded-[14px] shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                <History className="h-4 w-4 text-schoolgate-green" /> Student Life Timeline
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100 before:pointer-events-none">
                {[
                  { date: "12 Jan 2024", event: "Promoted to SS 1", desc: "Based on 2023 final examination performance.", icon: GraduationCap, color: "bg-schoolgate-green" },
                  { date: "05 Dec 2023", event: "Disciplinary Warning", desc: "Late coming for assembly 3 times in a week.", icon: AlertTriangle, color: "bg-orange-500" },
                  { date: "15 Oct 2023", event: "Fee Payment (Term 1)", desc: "Payment of ₦450,000 processed successfully.", icon: Wallet, color: "bg-blue-500" },
                  { date: "10 Sep 2023", event: "Enrolled in Secondary", desc: "Initial admission into Schoolgate ERP system.", icon: Clock, color: "bg-slate-400" },
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start gap-6 pl-2">
                    <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${item.color} z-10`}>
                      <item.icon className="h-2.5 w-2.5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{item.date}</p>
                      <h4 className="text-xs font-bold text-slate-800 mt-0.5">{item.event}</h4>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
