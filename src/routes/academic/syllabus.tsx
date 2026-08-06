import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus, 
  Filter, 
  Download,
  BookOpen,
  LayoutDashboard,
  Upload,
  ChevronRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SyllabusKPIs } from '@/components/academic/syllabus-kpis';
import { SyllabusRegistry } from '@/components/academic/syllabus-registry';
import { SyllabusUploadCenter } from '@/components/academic/syllabus-upload-center';

export const Route = createFileRoute('/academic/syllabus')({
  component: SyllabusManagement,
});

function SyllabusManagement() {
  const [activeTab, setActiveTab] = useState("registry");

  return (
    <div className="flex-1 space-y-6 p-8 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <span>Academic</span>
            <ChevronRight size={12} />
            <span className="text-schoolgate-green">Syllabus & Scheme of Work</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Syllabus & Scheme of Work</h1>
          <p className="text-slate-500 font-medium italic">
            Manage and download curriculum documents, syllabus, and scheme of work by class and subject.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl bg-white border-slate-200 h-11 px-6 font-bold text-slate-600 shadow-sm">
            <Download className="mr-2 h-4 w-4" />
            Bulk Download
          </Button>
          <Button 
            className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl h-11 px-6 font-bold shadow-lg shadow-schoolgate-green/20"
            onClick={() => setActiveTab("upload")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </div>
      </div>

      <SyllabusKPIs />

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search syllabus or subject..." className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all" />
        </div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="2023-2024">
            <SelectTrigger className="w-[140px] h-11 rounded-xl border-slate-100 bg-slate-50/50">
              <SelectValue placeholder="Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023-2024">2023/2024</SelectItem>
              <SelectItem value="2024-2025">2024/2025</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-schools">
            <SelectTrigger className="w-[160px] h-11 rounded-xl border-slate-100 bg-slate-50/50">
              <SelectValue placeholder="School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-schools">All Schools</SelectItem>
              <SelectItem value="primary">Primary School</SelectItem>
              <SelectItem value="secondary">Secondary School</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-classes">
            <SelectTrigger className="w-[140px] h-11 rounded-xl border-slate-100 bg-slate-50/50">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-classes">All Classes</SelectItem>
              <SelectItem value="jss1">JSS 1</SelectItem>
              <SelectItem value="ss3">SS 3</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-100 text-slate-500 gap-2 font-bold">
            <Filter size={16} />
            Advanced
          </Button>
        </div>
      </div>

      <Tabs defaultValue="registry" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <TabsList className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 h-12">
            <TabsTrigger value="registry" className="rounded-lg px-6 h-full font-bold data-[state=active]:bg-schoolgate-green data-[state=active]:text-white gap-2">
              <LayoutDashboard size={16} /> Document Registry
            </TabsTrigger>
            <TabsTrigger value="upload" className="rounded-lg px-6 h-full font-bold data-[state=active]:bg-schoolgate-green data-[state=active]:text-white gap-2">
              <Upload size={16} /> Upload Centre
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="rounded-lg px-6 h-full font-bold data-[state=active]:bg-schoolgate-green data-[state=active]:text-white gap-2">
              <BookOpen size={16} /> Curriculum Map
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="registry" className="mt-0">
          <SyllabusRegistry />
        </TabsContent>

        <TabsContent value="upload" className="mt-0">
          <SyllabusUploadCenter />
        </TabsContent>

        <TabsContent value="curriculum" className="mt-0">
          <div className="bg-white p-12 rounded-[14px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
              <BookOpen size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Curriculum Mapping System</h3>
              <p className="text-slate-500 max-w-md mx-auto mt-2">
                Visualize how subjects and topics align across different grades and educational standards.
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 h-11 font-bold">
              View Curriculum Map
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
