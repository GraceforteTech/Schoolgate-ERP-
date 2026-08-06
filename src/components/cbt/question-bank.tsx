import { 
  Plus, 
  Upload, 
  FileWord, 
  FileSpreadsheet, 
  FileText, 
  Sparkles, 
  Download,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Copy,
  Trash2,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const questions = [
  { id: 1, subject: "Mathematics", topic: "Quadratic Equations", class: "JSS 3", difficulty: "Medium", type: "Objective", marks: 2, status: "Active" },
  { id: 2, subject: "Physics", topic: "Atomic Structure", class: "SS 2", difficulty: "Hard", type: "Multiple Choice", marks: 3, status: "Active" },
  { id: 3, subject: "English", topic: "Comprehension", class: "JSS 1", difficulty: "Easy", type: "Essay", marks: 10, status: "Review" },
  { id: 4, subject: "Chemistry", topic: "Organic Compounds", class: "SS 3", difficulty: "Medium", type: "Fill in the Blank", marks: 2, status: "Active" },
  { id: 5, subject: "Biology", topic: "Cell Division", class: "JSS 2", difficulty: "Easy", type: "True/False", marks: 1, status: "Archived" },
];

export function QuestionBank() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl gap-2 h-11 px-6 shadow-md">
            <Plus size={18} />
            Add Question
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 h-11 border-slate-200">
            <Upload size={18} />
            Bulk Upload
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 h-11 border-slate-200 text-blue-600">
            <FileWord size={18} />
            Import Word
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 h-11 border-slate-200 text-emerald-600">
            <FileSpreadsheet size={18} />
            Import Excel
          </Button>
          <Button variant="outline" className="rounded-xl gap-2 h-11 border-slate-200 text-purple-600">
            <Sparkles size={18} />
            AI Generator
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="rounded-xl gap-2 h-11 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input placeholder="Search question bank by keyword, topic or tag..." className="pl-9 h-11 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-colors" />
        </div>
        <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-100 text-slate-500 gap-2 font-bold">
          <Filter size={16} />
          Filters
        </Button>
      </div>

      <Card className="rounded-[14px] border-slate-100 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="w-[100px] font-black text-slate-400 uppercase tracking-widest text-[10px]">Subject</TableHead>
                <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Topic</TableHead>
                <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Class</TableHead>
                <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Difficulty</TableHead>
                <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Type</TableHead>
                <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px] text-center">Marks</TableHead>
                <TableHead className="font-black text-slate-400 uppercase tracking-widest text-[10px] text-center">Status</TableHead>
                <TableHead className="text-right font-black text-slate-400 uppercase tracking-widest text-[10px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((q) => (
                <TableRow key={q.id} className="hover:bg-slate-50/50 border-slate-50">
                  <TableCell className="font-bold text-slate-700">{q.subject}</TableCell>
                  <TableCell className="text-slate-500 font-medium">{q.topic}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-100 font-bold uppercase text-[9px]">
                      {q.class}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-none hover:bg-emerald-100' :
                      q.difficulty === 'Hard' ? 'bg-rose-50 text-rose-600 border-none hover:bg-rose-100' :
                      'bg-blue-50 text-blue-600 border-none hover:bg-blue-100'
                    }>
                      {q.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs font-medium">{q.type}</TableCell>
                  <TableCell className="text-center font-black text-slate-700">{q.marks}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        q.status === 'Active' ? 'bg-emerald-500' : 
                        q.status === 'Review' ? 'bg-orange-500' : 
                        'bg-slate-300'
                      )} />
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{q.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg">
                          <MoreVertical size={16} className="text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl p-2 w-48">
                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-slate-600">
                          <Eye size={14} className="text-slate-400" /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-slate-600">
                          <Edit size={14} className="text-slate-400" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-slate-600">
                          <Copy size={14} className="text-slate-400" /> Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-lg gap-2 cursor-pointer font-bold text-xs text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                          <Trash2 size={14} /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
