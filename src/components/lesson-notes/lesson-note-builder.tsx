import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Save, 
  Eye, 
  Send, 
  Copy, 
  Printer, 
  FileDown, 
  ImagePlus,
  Type,
  List,
  Bold,
  Italic,
  HelpCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LessonStepsEditor } from "./lesson-steps-editor";
import { 
  Sparkles as SparklesIcon,
  Wand2,
  Settings,
  Archive,
  Trash,
  Share2,
  FileDown as FileDownIcon,
  Layout,
  Clock as ClockIcon
} from "lucide-react";

export function LessonNoteBuilder() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-6">
        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-[#0B6E3C]">New Lesson Note</h3>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
              <Button variant="outline" size="sm" className="rounded-lg"><Save className="mr-2 h-4 w-4" /> Save Draft</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Input placeholder="Enter lesson topic" className="rounded-lg border-slate-200" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sub-topic</label>
              <Input placeholder="Enter sub-topic" className="rounded-lg border-slate-200" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Learning Objectives</label>
              <Textarea placeholder="What should students know?" className="rounded-lg border-slate-200 min-h-[100px]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Teaching Materials</label>
              <Textarea placeholder="Charts, videos, models, etc." className="rounded-lg border-slate-200 min-h-[100px]" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Presentation & Content</label>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-md">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Bold size={14}/></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Italic size={14}/></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><List size={14}/></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Type size={14}/></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><ImagePlus size={14}/></Button>
                </div>
              </div>
              <Textarea 
                placeholder="Step-by-step teaching procedure..." 
                className="rounded-lg border-slate-200 min-h-[300px] bg-slate-50/30" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Activities</label>
                <Textarea placeholder="Tasks for students during lesson" className="rounded-lg border-slate-200" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assessment</label>
                <Textarea placeholder="How will you measure learning?" className="rounded-lg border-slate-200" />
              </div>
            </div>
            <LessonStepsEditor />
          </div>
        </Card>
      </div>

      <div className="lg:col-span-4 space-y-6">
        <Card className="p-6 rounded-[14px] shadow-sm border-none">
          <h3 className="text-lg font-bold mb-6">Configuration</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Session & Term</label>
              <div className="grid grid-cols-2 gap-3">
                <Select defaultValue="2023-2024">
                  <SelectTrigger className="rounded-lg"><SelectValue placeholder="Session" /></SelectTrigger>
                  <SelectContent><SelectItem value="2023-2024">2023/2024</SelectItem></SelectContent>
                </Select>
                <Select defaultValue="first">
                  <SelectTrigger className="rounded-lg"><SelectValue placeholder="Term" /></SelectTrigger>
                  <SelectContent><SelectItem value="first">First Term</SelectItem></SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Class & Subject</label>
              <div className="grid grid-cols-2 gap-3">
                <Select defaultValue="jss1">
                  <SelectTrigger className="rounded-lg"><SelectValue placeholder="Class" /></SelectTrigger>
                  <SelectContent><SelectItem value="jss1">JSS 1</SelectItem></SelectContent>
                </Select>
                <Select defaultValue="math">
                  <SelectTrigger className="rounded-lg"><SelectValue placeholder="Subject" /></SelectTrigger>
                  <SelectContent><SelectItem value="math">Mathematics</SelectItem></SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Timing</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground">Week</label>
                  <Select defaultValue="4">
                    <SelectTrigger className="rounded-lg h-9"><SelectValue placeholder="Week" /></SelectTrigger>
                    <SelectContent><SelectItem value="4">Week 4</SelectItem></SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground">Duration</label>
                  <Input defaultValue="40 mins" className="rounded-lg h-9" />
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Button className="w-full bg-[#0B6E3C] hover:bg-[#0B6E3C]/90 rounded-xl h-12 shadow-lg shadow-schoolgate-green/20">
                <Send className="mr-2 h-4 w-4" /> Submit for Approval
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="rounded-xl"><Copy className="mr-2 h-4 w-4" /> Duplicate</Button>
                <Button variant="outline" className="rounded-xl"><Printer className="mr-2 h-4 w-4" /> Print</Button>
              </div>
              <Button variant="ghost" className="w-full text-muted-foreground text-xs"><HelpCircle className="mr-1 h-3 w-3" /> Need help with curriculum?</Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 rounded-[14px] shadow-sm border-none bg-indigo-900 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="font-bold text-lg mb-2">Schoolgate AI</h4>
            <p className="text-indigo-100 text-sm mb-4">Stuck on your lesson note? Generate a complete note based on curriculum standards in seconds.</p>
            <Button className="w-full bg-white text-indigo-900 hover:bg-white/90 rounded-xl font-bold">
              Try AI Generator
            </Button>
          </div>
          <div className="absolute -right-8 -bottom-8 bg-white/10 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        </Card>
      </div>
    </div>
  );
}
