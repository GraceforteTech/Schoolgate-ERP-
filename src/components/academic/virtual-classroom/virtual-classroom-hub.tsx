import React from "react";
import { 
  Video, 
  Users, 
  Calendar, 
  Clock, 
  Monitor, 
  Link as LinkIcon, 
  MessageSquare, 
  Settings,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const upcomingClasses = [
  {
    id: "VC-001",
    subject: "Advanced Mathematics",
    teacher: "Dr. Adebayo Olawale",
    class: "SS3 A",
    time: "10:00 AM - 11:30 AM",
    date: "Today",
    platform: "Zoom",
    status: "Live",
    studentsCount: 24,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo"
  },
  {
    id: "VC-002",
    subject: "English Literature",
    teacher: "Sarah Johnson",
    class: "SS2 B",
    time: "12:00 PM - 01:00 PM",
    date: "Today",
    platform: "Google Meet",
    status: "Upcoming",
    studentsCount: 30,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: "VC-003",
    subject: "Physics Practical",
    teacher: "James Peters",
    class: "SS3 C",
    time: "02:00 PM - 03:30 PM",
    date: "Today",
    platform: "Microsoft Teams",
    status: "Scheduled",
    studentsCount: 28,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James"
  }
];

export function VirtualClassroomHub() {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Virtual Learning Hub</h2>
          <p className="text-sm text-slate-500">Schedule and manage online live sessions with students.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl font-bold gap-2">
            <Settings size={16} />
            Configure Integrations
          </Button>
          <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl font-bold gap-2 shadow-lg shadow-schoolgate-green/20">
            <Plus size={16} />
            Schedule Online Class
          </Button>
        </div>
      </div>

      {/* Live & Upcoming Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {upcomingClasses.map((item) => (
          <Card key={item.id} className="relative overflow-hidden border-none shadow-sm rounded-[14px] bg-white group hover:shadow-md transition-all">
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${item.status === 'Live' ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-600'}`}>
                    <Video size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{item.subject}</h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.class}</p>
                  </div>
                </div>
                <Badge className={
                  item.status === 'Live' ? 'bg-red-100 text-red-600 border-none' : 
                  item.status === 'Upcoming' ? 'bg-blue-100 text-blue-600 border-none' :
                  'bg-slate-100 text-slate-600 border-none'
                }>
                  {item.status}
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Clock size={14} className="text-slate-400" />
                  <span className="font-medium">{item.time}</span>
                  <span className="mx-1">•</span>
                  <span className="text-slate-400">{item.date}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Monitor size={14} className="text-slate-400" />
                  <span className="font-medium">Platform:</span>
                  <span className="text-schoolgate-green font-bold">{item.platform}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Users size={14} className="text-slate-400" />
                  <span className="font-medium">Enrolled:</span>
                  <span className="font-bold">{item.studentsCount} Students</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarImage src={item.avatar} />
                    <AvatarFallback>{item.teacher.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-bold text-slate-700">{item.teacher}</span>
                </div>
                <Button 
                  size="sm" 
                  className={item.status === 'Live' ? 'bg-red-600 hover:bg-red-700' : 'bg-slate-900 hover:bg-black'}
                >
                  {item.status === 'Live' ? 'Join Now' : 'Join Link'}
                </Button>
              </div>
            </div>
            {item.status === 'Live' && (
              <div className="absolute top-0 right-0 p-2">
                <div className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Integration Status & Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 border-none shadow-sm rounded-[14px] bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <LinkIcon className="text-schoolgate-green" size={20} />
            External Integrations
          </h3>
          <div className="space-y-4">
            {[
              { name: "Zoom", status: "Connected", icon: Video },
              { name: "Google Meet", status: "Connected", icon: Monitor },
              { name: "Microsoft Teams", status: "Available", icon: Users }
            ].map((platform) => (
              <div key={platform.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-lg shadow-sm">
                    <platform.icon size={16} className="text-slate-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{platform.name}</span>
                </div>
                <Badge variant="outline" className={platform.status === 'Connected' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'text-slate-400 border-slate-200'}>
                  {platform.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-none shadow-sm rounded-[14px] bg-white">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MessageSquare className="text-blue-500" size={20} />
            Virtual Classroom Settings
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Auto-Record Sessions</span>
              <div className="h-5 w-10 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full shadow-sm" /></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Notify Students via SMS</span>
              <div className="h-5 w-10 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full shadow-sm" /></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Allow Guest Participants</span>
              <div className="h-5 w-10 bg-slate-200 rounded-full relative"><div className="absolute left-1 top-1 h-3 w-3 bg-white rounded-full shadow-sm" /></div>
            </div>
            <div className="pt-4">
              <Button variant="link" className="text-schoolgate-green p-0 h-auto font-bold">Manage Advanced Virtual Settings →</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
