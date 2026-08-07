import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  Link as LinkIcon, 
  Share2, 
  Plus, 
  AlertCircle,
  CheckCircle2,
  Trash2,
  MessageCircle,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const scheduledClasses = [
  {
    id: "OC-001",
    title: "Intro to Algebra",
    teacher: "Dr. Adebayo Olawale",
    teacherId: "EMP001",
    class: "SS3 A",
    date: "2024-05-20",
    time: "09:00 AM",
    platform: "Zoom",
    link: "https://zoom.us/j/123456789",
    scheduledBy: "Admin",
    isConflict: false
  },
  {
    id: "OC-002",
    title: "Periodic Table Deep Dive",
    teacher: "Mrs. Okoro",
    teacherId: "EMP005",
    class: "SS2 B",
    date: "2024-05-20",
    time: "11:00 AM",
    platform: "Google Meet",
    link: "https://meet.google.com/abc-defg-hij",
    scheduledBy: "Teacher",
    isConflict: true
  }
];

export function OnlineClassScheduler() {
  const [isAdmin, setIsAdmin] = useState(true);

  const handleShareWhatsApp = (item: typeof scheduledClasses[0]) => {
    const text = `*Online Class Invitation*\n\n*Subject:* ${item.title}\n*Class:* ${item.class}\n*Teacher:* ${item.teacher}\n*Time:* ${item.date} at ${item.time}\n*Join Link:* ${item.link}\n\nShared via Schoolgate ERP`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    toast.success("Opening WhatsApp to share class details.");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Scheduler Form */}
      <div className="xl:col-span-1 space-y-6">
        <Card className="border-none shadow-sm rounded-[14px] bg-white">
          <CardHeader className="border-b border-slate-50">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Calendar className="text-schoolgate-green" size={20} />
              Schedule New Class
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Class Topic</Label>
              <Input placeholder="e.g. Quantum Physics Introduction" className="rounded-xl border-slate-200" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input type="date" className="pl-9 rounded-xl border-slate-200" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input type="time" className="pl-9 rounded-xl border-slate-200" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Teacher</Label>
              <Select>
                <SelectTrigger className="rounded-xl border-slate-200">
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EMP001">Dr. Adebayo Olawale</SelectItem>
                  <SelectItem value="EMP005">Mrs. Okoro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Class / Grade</Label>
              <Select>
                <SelectTrigger className="rounded-xl border-slate-200">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SS3A">SS3 A</SelectItem>
                  <SelectItem value="SS2B">SS2 B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Platform & Link</Label>
              <div className="flex gap-2">
                <Select defaultValue="zoom">
                  <SelectTrigger className="w-[120px] rounded-xl border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zoom">Zoom</SelectItem>
                    <SelectItem value="meet">Meet</SelectItem>
                    <SelectItem value="teams">Teams</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Meeting URL" className="flex-1 rounded-xl border-slate-200" />
              </div>
            </div>

            {isAdmin && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                <AlertCircle className="text-amber-600 shrink-0" size={16} />
                <p className="text-[10px] text-amber-700 font-medium">
                  <strong>Admin Override Active:</strong> Scheduling this class will automatically resolve any existing conflicts by prioritizing this Admin timetable.
                </p>
              </div>
            )}

            <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl h-11 font-bold gap-2">
              <Plus size={18} />
              Save to Timetable
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Online Class Timetable */}
      <div className="xl:col-span-2 space-y-6">
        <Card className="border-none shadow-sm rounded-[14px] bg-white overflow-hidden">
          <CardHeader className="border-b border-slate-50 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Online Class Timetable</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-lg h-8 text-[10px] uppercase font-bold tracking-wider">
                Daily
              </Button>
              <Button size="sm" className="bg-schoolgate-green rounded-lg h-8 text-[10px] uppercase font-bold tracking-wider">
                Weekly
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4">Time & Date</th>
                    <th className="px-6 py-4">Subject & Teacher</th>
                    <th className="px-6 py-4">Status & Conflict</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {scheduledClasses.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{item.time}</span>
                          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">{item.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{item.title}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] font-bold text-schoolgate-green uppercase">{item.class}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] text-slate-500 font-medium">{item.teacher}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1.5">
                          <Badge className={cn(
                            "w-fit rounded-full text-[9px] font-bold uppercase tracking-wider px-2 py-0",
                            item.scheduledBy === 'Admin' ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-blue-100"
                          )}>
                            By {item.scheduledBy}
                          </Badge>
                          {item.isConflict && (
                            <div className="flex items-center gap-1 text-[9px] text-red-500 font-bold uppercase animate-pulse">
                              <AlertCircle size={10} />
                              Overridden by Admin
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                           <div className="bg-slate-100 p-1.5 rounded-lg">
                             <Video size={14} className="text-slate-500" />
                           </div>
                           <span className="text-xs font-bold text-slate-600">{item.platform}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg text-emerald-600 hover:bg-emerald-50 border-emerald-100"
                            onClick={() => handleShareWhatsApp(item)}
                            title="Share to WhatsApp"
                          >
                            <MessageCircle size={14} />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg text-slate-500">
                            <LinkIcon size={14} />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-50 border-red-100">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">
                Conflict Resolution: Admin Schedule Priority [ENABLED]
              </p>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-xs h-8 gap-2">
                  <Download size={14} /> Export Timetable
                </Button>
                <Button variant="ghost" size="sm" className="text-xs h-8 gap-2">
                  <ExternalLink size={14} /> View Student Portal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
