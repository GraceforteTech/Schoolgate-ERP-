import { createFileRoute } from "@tanstack/react-router";
import { 
  Video, 
  LayoutDashboard, 
  Calendar, 
  History, 
  Settings, 
  MonitorPlay,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { VirtualClassroomHub } from "@/components/academic/virtual-classroom/virtual-classroom-hub";

export const Route = createFileRoute("/academic/virtual-classroom")({
  component: VirtualClassroomPage,
});

function VirtualClassroomPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" className="h-8 rounded-lg text-slate-500 hover:text-schoolgate-green" asChild>
              <Link to="/academic">
                <ArrowLeft size={16} className="mr-1" />
                Back to Academic Management
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Virtual Classroom & LMS</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Host live online classes, manage recordings, and track virtual student engagement.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live Server Active
          </div>
        </div>
      </div>

      <Tabs defaultValue="hub" className="space-y-8">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
          <TabsList className="bg-white border border-slate-100 rounded-xl p-1 shadow-sm h-12 inline-flex min-w-max">
            <TabsTrigger value="hub" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <LayoutDashboard className="w-4 h-4" /> Learning Hub
            </TabsTrigger>
            <TabsTrigger value="live" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <Video className="w-4 h-4" /> Live Sessions
            </TabsTrigger>
            <TabsTrigger value="schedule" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <Calendar className="w-4 h-4" /> Class Schedule
            </TabsTrigger>
            <TabsTrigger value="recordings" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <History className="w-4 h-4" /> Recorded Classes
            </TabsTrigger>
            <TabsTrigger value="monitor" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <MonitorPlay className="w-4 h-4" /> Engagement Monitor
            </TabsTrigger>
            <TabsTrigger value="settings" className="px-6 rounded-lg text-xs font-bold uppercase tracking-wider data-[state=active]:bg-schoolgate-green data-[state=active]:text-white h-full gap-2">
              <Settings className="w-4 h-4" /> LMS Settings
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="hub">
          <VirtualClassroomHub />
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <div className="bg-white p-12 rounded-[24px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center animate-pulse">
              <Video size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Live Video Sessions</h3>
              <p className="text-slate-500 max-w-md mx-auto mt-2">Manage all ongoing live classes. Integration with Zoom and Google Meet allows for direct classroom control.</p>
            </div>
            <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl px-8 h-12 font-bold shadow-lg shadow-schoolgate-green/20">
              Start a Quick Session
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="bg-white p-6 rounded-[14px] shadow-sm border border-slate-100">
             <h3 className="text-lg font-bold text-slate-800 mb-6">Online Class Calendar</h3>
             <div className="grid grid-cols-7 gap-4">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                 <div key={day} className="text-center font-bold text-[10px] text-slate-400 uppercase tracking-widest py-2 border-b border-slate-50">{day}</div>
               ))}
               {Array.from({ length: 31 }).map((_, i) => (
                 <div key={i} className="h-24 bg-slate-50/50 rounded-xl p-2 border border-slate-100/50 hover:bg-white hover:border-schoolgate-green/30 transition-all cursor-pointer">
                    <span className="text-xs font-bold text-slate-400">{i + 1}</span>
                    {i === 6 && (
                      <div className="mt-1 p-1 bg-red-100 text-[8px] font-bold text-red-600 rounded uppercase">Live: Math</div>
                    )}
                 </div>
               ))}
             </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
