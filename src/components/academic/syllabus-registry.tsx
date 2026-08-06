import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, MoreVertical, Calendar, User } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const documents = [
  { 
    id: 1, 
    title: "Mathematics Syllabus", 
    type: "Syllabus", 
    subject: "Mathematics", 
    class: "JSS 1", 
    updatedAt: "May 10, 2024", 
    updatedBy: "Admin",
    fileSize: "2.4 MB",
    format: "PDF"
  },
  { 
    id: 2, 
    title: "English Scheme of Work", 
    type: "Scheme of Work", 
    subject: "English Language", 
    class: "SSS 2", 
    updatedAt: "May 12, 2024", 
    updatedBy: "Academic Dir",
    fileSize: "1.8 MB",
    format: "Word"
  },
  { 
    id: 3, 
    title: "Physics Course Outline", 
    type: "Course Outline", 
    subject: "Physics", 
    class: "SSS 3", 
    updatedAt: "May 08, 2024", 
    updatedBy: "Admin",
    fileSize: "3.1 MB",
    format: "PDF"
  },
  { 
    id: 4, 
    title: "Basic Science Syllabus", 
    type: "Syllabus", 
    subject: "Basic Science", 
    class: "JSS 2", 
    updatedAt: "May 15, 2024", 
    updatedBy: "HOD Science",
    fileSize: "2.1 MB",
    format: "PDF"
  },
  { 
    id: 5, 
    title: "Economics Scheme of Work", 
    type: "Scheme of Work", 
    subject: "Economics", 
    class: "SSS 1", 
    updatedAt: "May 14, 2024", 
    updatedBy: "Admin",
    fileSize: "1.5 MB",
    format: "Word"
  },
  { 
    id: 6, 
    title: "Literature Syllabus", 
    type: "Syllabus", 
    subject: "Literature in English", 
    class: "SSS 2", 
    updatedAt: "May 11, 2024", 
    updatedBy: "Admin",
    fileSize: "2.7 MB",
    format: "PDF"
  },
];

export function SyllabusRegistry() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => (
        <Card key={doc.id} className="p-0 rounded-[14px] border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-all">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={cn(
                "h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-sm",
                doc.type === "Syllabus" ? "bg-schoolgate-green" : 
                doc.type === "Scheme of Work" ? "bg-indigo-600" : "bg-amber-500"
              )}>
                <FileText className="h-6 w-6" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <MoreVertical className="h-4 w-4 text-slate-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl">
                  <DropdownMenuItem className="gap-2 font-medium"><Eye className="h-4 w-4" /> Preview</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 font-medium"><Download className="h-4 w-4" /> Download</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 font-medium text-schoolgate-green focus:text-schoolgate-green"><FileText className="h-4 w-4" /> Update Version</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-1 mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-wider py-0 px-2 rounded-md border-slate-200 text-slate-500">
                  {doc.type}
                </Badge>
                <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none text-[10px] font-bold py-0 px-2 rounded-md">
                  {doc.format}
                </Badge>
              </div>
              <h3 className="font-black text-lg text-slate-800 group-hover:text-schoolgate-green transition-colors">{doc.title}</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{doc.subject} • {doc.class}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] font-medium text-slate-500">{doc.updatedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] font-medium text-slate-500">{doc.updatedBy}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 p-4 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.fileSize}</span>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs font-bold gap-2 text-slate-600 hover:text-schoolgate-green hover:bg-schoolgate-green-light">
                <Eye size={14} /> Preview
              </Button>
              <Button size="sm" className="h-8 rounded-lg text-xs font-bold gap-2 bg-schoolgate-green hover:bg-schoolgate-green/90 shadow-sm">
                <Download size={14} /> Download
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
