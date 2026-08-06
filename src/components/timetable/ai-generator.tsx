import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Sparkles, 
  Settings2, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Info,
  ChevronRight,
  ShieldCheck,
  LayoutGrid
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

export function AIGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startGeneration = () => {
    setIsGenerating(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast.success("AI Timetable Generation Complete!", {
             description: "48 timetables generated with 0 conflicts found.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <Card className="rounded-[14px] shadow-sm border-2 border-schoolgate-green/20 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Bot className="h-40 w-40" />
             </div>
             <CardHeader>
               <CardTitle className="flex items-center gap-2 text-schoolgate-green">
                 <Bot className="h-6 w-6" />
                 AI Smart Timetable Generator
               </CardTitle>
               <p className="text-sm text-gray-500">Automatically optimize your school schedule using machine learning algorithms.</p>
             </CardHeader>
             <CardContent className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <Label className="text-sm font-semibold">Teacher Workload Balance</Label>
                         <span className="text-xs font-bold text-schoolgate-green">Strict</span>
                      </div>
                      <Slider defaultValue={[80]} max={100} step={1} />
                      <p className="text-[10px] text-gray-400">Ensures no teacher has more than 5 consecutive periods.</p>
                   </div>
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <Label className="text-sm font-semibold">Room Utilization Density</Label>
                         <span className="text-xs font-bold text-schoolgate-green">Optimized</span>
                      </div>
                      <Slider defaultValue={[65]} max={100} step={1} />
                      <p className="text-[10px] text-gray-400">Maximizes classroom usage while maintaining social distancing.</p>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="flex items-center justify-between p-4 rounded-xl border bg-gray-50/50">
                      <div className="flex flex-col gap-0.5">
                         <Label className="text-sm font-semibold">Avoid Double Periods</Label>
                         <span className="text-[10px] text-gray-400">Except for practical subjects</span>
                      </div>
                      <Switch defaultChecked />
                   </div>
                   <div className="flex items-center justify-between p-4 rounded-xl border bg-gray-50/50">
                      <div className="flex flex-col gap-0.5">
                         <Label className="text-sm font-semibold">Primary & Secondary Sync</Label>
                         <span className="text-[10px] text-gray-400">Synchronize break times</span>
                      </div>
                      <Switch defaultChecked />
                   </div>
                </div>

                <div className="space-y-4 rounded-xl bg-schoolgate-green/5 border border-schoolgate-green/10 p-6">
                   <h4 className="font-semibold text-schoolgate-green flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      AI Optimization Rules
                   </h4>
                   <ul className="space-y-2">
                      {[
                         "No teacher conflict across multiple schools/levels",
                         "Automatic allocation of laboratory periods for Science subjects",
                         "Morning periods prioritized for Mathematics and English",
                         "Sports and Extra-curriculars scheduled for Friday afternoons",
                         "Automatic free-period gap filling for staff"
                      ].map((rule, idx) => (
                         <li key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-schoolgate-green shrink-0" />
                            {rule}
                         </li>
                      ))}
                   </ul>
                </div>

                {isGenerating && (
                   <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                         <span className="font-medium text-schoolgate-green">Optimizing Timetables...</span>
                         <span className="font-bold">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-gray-400 text-center animate-pulse italic">Scanning 1,400+ possible period permutations...</p>
                   </div>
                )}

                <div className="flex items-center gap-4">
                   <Button 
                      disabled={isGenerating} 
                      onClick={startGeneration}
                      className="flex-1 bg-schoolgate-green hover:bg-schoolgate-green/90 h-12 text-lg gap-2 shadow-lg"
                   >
                      {isGenerating ? <Zap className="h-5 w-5 animate-spin" /> : <Bot className="h-5 w-5" />}
                      {isGenerating ? 'AI Generating...' : 'Generate Optimized Timetable'}
                   </Button>
                   <Button variant="outline" className="h-12 px-6" disabled={isGenerating}>
                      <Settings2 className="h-5 w-5 mr-2" />
                      Advanced Params
                   </Button>
                </div>
             </CardContent>
           </Card>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-[14px] shadow-sm">
                 <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                       <ShieldCheck className="h-4 w-4 text-green-600" />
                       Integrity Check
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-3">
                       <div className="flex items-center justify-between text-sm border-b pb-2">
                          <span className="text-gray-500">Teacher Availability</span>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">86/86 Linked</Badge>
                       </div>
                       <div className="flex items-center justify-between text-sm border-b pb-2">
                          <span className="text-gray-500">Room Capacity</span>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">42/42 Linked</Badge>
                       </div>
                       <div className="flex items-center justify-between text-sm border-b pb-2">
                          <span className="text-gray-500">Subject Weights</span>
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending Review</Badge>
                       </div>
                    </div>
                 </CardContent>
              </Card>
              <Card className="rounded-[14px] shadow-sm">
                 <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                       <LayoutGrid className="h-4 w-4 text-blue-600" />
                       Generation History
                    </CardTitle>
                 </CardHeader>
                 <CardContent>
                    <div className="space-y-3">
                       <div className="flex items-center justify-between text-xs border-b pb-2">
                          <span>Today, 09:15 AM</span>
                          <span className="text-green-600 font-bold">Success</span>
                       </div>
                       <div className="flex items-center justify-between text-xs border-b pb-2">
                          <span>Yesterday, 11:30 PM</span>
                          <span className="text-green-600 font-bold">Success</span>
                       </div>
                       <Button variant="link" className="h-auto p-0 text-[10px] text-gray-400">View logs</Button>
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>

        <div className="space-y-6">
           <Card className="rounded-[14px] shadow-sm bg-gradient-to-br from-schoolgate-green to-[#085a31] text-white">
              <CardHeader>
                 <CardTitle className="text-lg">Why AI Generator?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex gap-3">
                    <Clock className="h-5 w-5 shrink-0 opacity-60" />
                    <p className="text-sm">Save <span className="font-bold underline">12+ hours</span> of manual scheduling every term.</p>
                 </div>
                 <div className="flex gap-3">
                    <AlertTriangle className="h-5 w-5 shrink-0 opacity-60" />
                    <p className="text-sm">Zero conflicts. The AI scans millions of combinations to find the perfect fit.</p>
                 </div>
                 <div className="flex gap-3">
                    <Info className="h-5 w-5 shrink-0 opacity-60" />
                    <p className="text-sm">Optimized teacher productivity by minimizing free-period gaps.</p>
                 </div>
              </CardContent>
           </Card>

           <Card className="rounded-[14px] shadow-sm">
              <CardHeader>
                 <CardTitle className="text-base">Quick Setup Checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[
                    { label: "Opening & Closing Times", done: true },
                    { label: "Period Duration (40 mins)", done: true },
                    { label: "Break Intervals", done: true },
                    { label: "Teacher Subjects Assigned", done: true },
                    { label: "Classroom Availability", done: false },
                 ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                       <div className={`h-5 w-5 rounded-md border flex items-center justify-center ${item.done ? 'bg-schoolgate-green border-schoolgate-green' : 'border-gray-200'}`}>
                          {item.done && <CheckCircle className="h-3 w-3 text-white" />}
                       </div>
                       <span className={`text-sm ${item.done ? 'text-gray-900' : 'text-gray-400'}`}>{item.label}</span>
                       {!item.done && <ChevronRight className="h-4 w-4 ml-auto text-gray-300" />}
                    </div>
                 ))}
                 <Button className="w-full mt-4" variant="outline">Update Settings</Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
