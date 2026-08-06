import { createFileRoute } from "@tanstack/react-router";
import { 
  Home, 
  Plus, 
  Download, 
  History, 
  Search,
  LayoutGrid,
  List,
  Building2,
  Users,
  Bed,
  Calendar,
  Wrench,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HostelKpiCards } from "@/components/hostel/hostel-kpi-cards";
import { HostelSearchCenter } from "@/components/hostel/hostel-search-center";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/hostel")({
  component: HostelManagementDashboard,
});

function HostelManagementDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 lg:p-8 space-y-8 pb-20">
      {/* Premium Header */}
      <div className="flex flex-col lg:row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-schoolgate-green grid place-items-center text-white shadow-lg shadow-schoolgate-green/20">
            <Home className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hostel & Boarding</h1>
            <p className="text-slate-500 font-medium italic mt-1">Manage accommodation, room allocations, and boarding operations.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600">
            <History size={18} /> Audit Trail
          </Button>
          <Button className="h-11 rounded-xl bg-schoolgate-green text-white font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
            <Plus size={18} /> New Allocation
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <HostelKpiCards />

      {/* AI Insights Banner */}
      <div className="bg-gradient-to-r from-schoolgate-green to-emerald-600 rounded-[14px] p-6 text-white shadow-lg shadow-schoolgate-green/20 flex flex-col md:row md:items-center justify-between gap-6 relative overflow-hidden group">
        <div className="relative z-10 flex items-center gap-5">
          <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm grid place-items-center animate-pulse">
            <ShieldCheck className="h-9 w-9 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">AI Room Optimizer Active</h2>
            <p className="text-emerald-50 text-sm font-medium opacity-90">We've identified 12 optimal bed placements to improve student social dynamics in Boys Hostel A.</p>
          </div>
        </div>
        <div className="relative z-10 flex gap-3">
          <Button className="bg-white text-schoolgate-green hover:bg-emerald-50 font-black rounded-xl h-11 px-6 shadow-md border-none">
            View Suggestions
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10 font-bold rounded-xl h-11 border-white/20 border">
            Dismiss
          </Button>
        </div>
        {/* Decorative background circle */}
        <div className="absolute -right-10 -top-10 h-40 w-40 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
      </div>

      {/* Main Workspace */}
      <Tabs defaultValue="registry" className="space-y-6">
        <div className="flex flex-col lg:row lg:items-center justify-between gap-6">
          <TabsList className="bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm h-auto flex flex-wrap lg:flex-nowrap">
            <TabsTrigger value="registry" className="rounded-xl px-6 py-2.5 font-bold text-xs data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all">
              Room Registry
            </TabsTrigger>
            <TabsTrigger value="allocation" className="rounded-xl px-6 py-2.5 font-bold text-xs data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all">
              Allocations
            </TabsTrigger>
            <TabsTrigger value="attendance" className="rounded-xl px-6 py-2.5 font-bold text-xs data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all">
              Boarding Attendance
            </TabsTrigger>
            <TabsTrigger value="passes" className="rounded-xl px-6 py-2.5 font-bold text-xs data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all">
              Exit Passes
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="rounded-xl px-6 py-2.5 font-bold text-xs data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all">
              Maintenance
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl px-6 py-2.5 font-bold text-xs data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all">
              Analytics
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-lg px-3 ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-lg px-3 ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-400'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
          </div>
        </div>

        <HostelSearchCenter />

        <TabsContent value="registry" className="space-y-8 focus-visible:ring-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hostel Status Cards */}
            {[
              { name: "Boys Hostel A", status: "Active", occupancy: 92, rooms: 24, beds: 120, type: "Boys" },
              { name: "Girls Hostel A", status: "Active", occupancy: 85, rooms: 24, beds: 120, type: "Girls" },
              { name: "Boys Hostel B", status: "Active", occupancy: 78, rooms: 20, beds: 100, type: "Boys" },
            ].map((hostel, i) => (
              <Card key={i} className="p-6 border-none shadow-sm rounded-[14px] bg-white group hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 grid place-items-center group-hover:bg-schoolgate-green-light transition-colors">
                    <Building2 className="h-6 w-6 text-slate-400 group-hover:text-schoolgate-green" />
                  </div>
                  <Badge className={hostel.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-700 border-slate-100"}>
                    {hostel.status}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-black text-slate-900 tracking-tight">{hostel.name}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 mb-6">{hostel.type} Boarding Section</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-slate-600 tracking-tight">Occupancy Rate</span>
                      <span className="text-xs font-black text-schoolgate-green">{hostel.occupancy}%</span>
                    </div>
                    <Progress value={hostel.occupancy} className="h-2 bg-slate-100" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Total Rooms</p>
                      <p className="text-lg font-black text-slate-800">{hostel.rooms}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Capacity</p>
                      <p className="text-lg font-black text-slate-800">{hostel.beds} Beds</p>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-slate-900 text-white rounded-xl font-bold h-11 group-hover:bg-schoolgate-green transition-colors">
                  View Room Details
                </Button>
              </Card>
            ))}
          </div>

          <div className="bg-white rounded-[14px] border border-slate-100 shadow-sm p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Recent Maintenance Requests</h3>
                <p className="text-xs font-bold text-slate-400 uppercase mt-1">Pending and Urgent Repairs</p>
              </div>
              <Button variant="link" className="text-schoolgate-green font-bold text-xs p-0">View Maintenance Hub</Button>
            </div>
            
            <div className="space-y-4">
              {[
                { room: "B-204", item: "Leaking Pipe", status: "Urgent", date: "2 hours ago", hostel: "Boys Hostel B" },
                { room: "G-108", item: "Broken Window", status: "Pending", date: "5 hours ago", hostel: "Girls Hostel A" },
                { room: "A-312", item: "Fan Replacement", status: "Ongoing", date: "Yesterday", hostel: "Boys Hostel A" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl grid place-items-center ${item.status === 'Urgent' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                      <Wrench size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{item.item} - Room {item.room}</h4>
                      <p className="text-[11px] font-medium text-slate-500">{item.hostel} • {item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={item.status === 'Urgent' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'}>
                      {item.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600">
                      <Plus className="rotate-45" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="allocation" className="focus-visible:ring-0">
          <Card className="border-none shadow-sm rounded-[14px] p-8 text-center bg-white border border-slate-100">
            <div className="max-w-md mx-auto py-12">
              <div className="h-24 w-24 bg-slate-50 rounded-full grid place-items-center mx-auto mb-6">
                <Users className="h-12 w-12 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Allocation Workspace</h3>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Drag and drop students into available rooms or use the auto-allocation wizard to optimize bed space based on class levels.
              </p>
              <div className="mt-8 flex justify-center gap-3">
                <Button className="bg-schoolgate-green font-bold rounded-xl h-11 px-8">Start Auto-Allocation</Button>
                <Button variant="outline" className="font-bold rounded-xl h-11 px-8 border-slate-200">Manual Entry</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="focus-visible:ring-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 border-none shadow-sm rounded-[14px] bg-white">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-schoolgate-green" />
                Revenue Trends
              </h3>
              <div className="h-64 bg-slate-50 rounded-xl grid place-items-center border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Revenue Chart Placeholder</p>
              </div>
            </Card>
            <Card className="p-6 border-none shadow-sm rounded-[14px] bg-white">
              <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-rose-500" />
                Maintenance Heatmap
              </h3>
              <div className="h-64 bg-slate-50 rounded-xl grid place-items-center border border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Building Heatmap Placeholder</p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}