import { createFileRoute } from "@tanstack/react-router";
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Award, 
  MessageSquare, 
  Calendar,
  ChevronRight,
  TrendingUp,
  MapPin,
  Users
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlumniKpiCards } from "@/components/alumni/alumni-kpi-cards";
import { AlumniTable } from "@/components/alumni/directory/alumni-table";
import { AlumniSearchCenter } from "@/components/alumni/directory/alumni-search-center";
import { AlumniMembership } from "@/components/alumni/membership/alumni-membership";
import { AlumniEvents } from "@/components/alumni/events/alumni-events";
import { AlumniDonations } from "@/components/alumni/donations/alumni-donations";

export const Route = createFileRoute("/alumni/")({
  component: AlumniManagementPage,
});

function AlumniManagementPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col lg:row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-schoolgate-green grid place-items-center text-white shadow-lg shadow-schoolgate-green/20">
            <GraduationCap className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Alumni Command Centre</h1>
            <p className="text-slate-500 font-medium italic mt-1">Connect, track, and empower the Schoolgate alumni network.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <Download size={18} /> Export Data
          </Button>
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <Share2 size={18} /> Network Invite
          </Button>
          <Button className="h-11 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
            <Award size={18} /> Alumni Recognition
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <AlumniKpiCards />

      {/* Main Workspace */}
      <Tabs defaultValue="directory" className="space-y-6">
        <div className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl w-full flex flex-wrap h-auto">
            <TabsTrigger value="directory" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Registry & Directory
            </TabsTrigger>
            <TabsTrigger value="membership" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Membership Plans
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Events & Reunions
            </TabsTrigger>
            <TabsTrigger value="donations" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Donations & Giving
            </TabsTrigger>
            <TabsTrigger value="mentorship" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Mentorship Hub
            </TabsTrigger>
            <TabsTrigger value="career" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Career & Jobs
            </TabsTrigger>
            <TabsTrigger value="business" className="data-[state=active]:bg-schoolgate-green-light data-[state=active]:text-schoolgate-green font-bold text-xs px-6 py-2 flex-1">
              Business Directory
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="directory" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <AlumniSearchCenter />
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-9">
              <Card className="p-6 bg-white border-none shadow-sm rounded-[20px] overflow-hidden">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">Alumni Directory</h3>
                  <Badge className="bg-schoolgate-green-light text-schoolgate-green border-none">4,850 Verified Graduates</Badge>
                </div>
                <AlumniTable />
              </Card>
            </div>

            <div className="xl:col-span-3 space-y-6">
              <Card className="p-5 border-none shadow-sm bg-white rounded-[20px]">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-schoolgate-green" /> Top Industries
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Technology", count: 842, percent: 85 },
                    { label: "Medicine", count: 520, percent: 65 },
                    { label: "Finance", count: 410, percent: 55 },
                    { label: "Creative Arts", count: 325, percent: 45 },
                  ].map((industry) => (
                    <div key={industry.label} className="space-y-2">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-600">{industry.label}</span>
                        <span className="text-slate-400">{industry.count}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-schoolgate-green rounded-full" 
                          style={{ width: `${industry.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-5 border-none shadow-sm bg-slate-900 text-white rounded-[20px] overflow-hidden relative">
                <div className="relative z-10">
                  <Badge className="bg-white/20 text-white border-none mb-3 text-[10px] uppercase font-bold">New Initiative</Badge>
                  <h3 className="font-bold text-lg leading-tight">Alumni Mentorship Program 2026</h3>
                  <p className="text-xs text-white/60 mt-2 mb-4">Connect current students with verified alumni mentors worldwide.</p>
                  <Button className="w-full bg-schoolgate-green text-white hover:bg-schoolgate-green/90 font-bold rounded-xl h-10 group">
                    Join Network <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <Users className="absolute -right-4 -bottom-4 h-24 w-24 text-white/5 rotate-12" />
              </Card>

              <Card className="p-5 border-none shadow-sm bg-white rounded-[20px]">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-schoolgate-green" /> Upcoming Events
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "20th Anniversary Reunion", date: "Aug 15, 2026", type: "Social" },
                    { title: "Career Path Webinar", date: "Sept 02, 2026", type: "Career" },
                    { title: "Founders Day Dinner", date: "Oct 12, 2026", type: "Gala" },
                  ].map((event, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                      <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-50 grid place-items-center text-slate-400 group-hover:bg-schoolgate-green-light group-hover:text-schoolgate-green transition-colors">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-slate-700 leading-tight">{event.title}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{event.date} • {event.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="engagement">
          <Card className="p-12 text-center bg-white border-none shadow-sm rounded-[20px]">
            <div className="h-20 w-20 bg-schoolgate-green-light rounded-2xl grid place-items-center text-schoolgate-green mx-auto mb-6">
              <MessageSquare className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Alumni Engagement Suite</h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">Track events, email campaigns, and networking activity. This module is currently under strategic development.</p>
            <Button className="mt-8 bg-schoolgate-green text-white font-bold px-8 rounded-xl h-11 shadow-lg shadow-schoolgate-green/20">
              Schedule First Campaign
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 bg-white border-none shadow-sm rounded-[20px]">
                <div className="h-48 w-full bg-slate-50 rounded-xl mb-6 grid place-items-center text-slate-300">
                  <MapPin size={48} />
                </div>
                <h3 className="font-bold text-slate-900">Project: Science Wing Expansion</h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">Goal: ₦15,000,000</p>
                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-schoolgate-green w-[65%]" />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>₦9,750,000 Raised</span>
                  <span>65% Complete</span>
                </div>
                <Button variant="outline" className="w-full mt-6 rounded-xl font-bold border-slate-100 text-slate-600 hover:bg-slate-50">
                  View Campaign Details
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
