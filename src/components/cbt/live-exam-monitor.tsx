import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Clock, 
  Wifi, 
  Save, 
  Pause, 
  Play, 
  Square, 
  Eye, 
  Flag,
  Search,
  ChevronRight
} from "lucide-react";
import { Input } from "@/components/ui/input";

export function LiveExamMonitor() {
  return (
    <div className="space-y-8">
      {/* Real-time Status Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-100 shadow-sm bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students Online</p>
            <p className="text-2xl font-black text-slate-800">452</p>
          </div>
        </Card>
        <Card className="p-4 border-slate-100 shadow-sm bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students Completed</p>
            <p className="text-2xl font-black text-slate-800">128</p>
          </div>
        </Card>
        <Card className="p-4 border-slate-100 shadow-sm bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
            <Wifi size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Average Progress</p>
            <p className="text-2xl font-black text-slate-800">64%</p>
          </div>
        </Card>
        <Card className="p-4 border-slate-100 shadow-sm bg-white flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
            <Flag size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Suspicious Flags</p>
            <p className="text-2xl font-black text-slate-800">3</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-800">Student Live Monitor</h3>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input placeholder="Search student..." className="pl-9 h-10 rounded-xl border-slate-100" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-4 border-slate-100 shadow-sm hover:shadow-md transition-all bg-white group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400">
                    S{i}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-black text-slate-800">Student Name {i}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">APP/2026/00{i}</p>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase">
                    Connected
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                    <span>Progress</span>
                    <span>{i * 15}%</span>
                  </div>
                  <Progress value={i * 15} className="h-1.5" />
                </div>

                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Syncing Data</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                      <Eye size={14} />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                      <Flag size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button variant="ghost" className="w-full h-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-schoolgate-green">
            Load More Monitoring Cards
            <ChevronRight size={14} className="ml-1" />
          </Button>
        </div>

        <div className="xl:col-span-4 space-y-6">
          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-6">
            <h3 className="text-lg font-black text-slate-800">Exam Command Centre</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 gap-3 font-bold text-orange-600 hover:bg-orange-50">
                <Pause size={18} />
                PAUSE EXAMINATION
              </Button>
              <Button variant="outline" className="w-full h-12 rounded-xl border-slate-100 gap-3 font-bold text-emerald-600 hover:bg-emerald-50">
                <Play size={18} />
                RESUME ALL STUDENTS
              </Button>
              <Button className="w-full h-12 rounded-xl bg-rose-600 hover:bg-rose-700 gap-3 font-bold shadow-lg shadow-rose-200">
                <Square size={16} fill="currentColor" />
                END EXAM (EMERGENCY)
              </Button>
            </div>

            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Global Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Wifi size={14} className="text-emerald-500" />
                    <span className="text-xs font-bold text-slate-600">Network Stability</span>
                  </div>
                  <Badge className="bg-emerald-500 text-white border-none text-[9px]">98%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Save size={14} className="text-blue-500" />
                    <span className="text-xs font-bold text-slate-600">Auto-Save Health</span>
                  </div>
                  <Badge className="bg-blue-500 text-white border-none text-[9px]">Active</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
