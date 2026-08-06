import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Printer, 
  FileDown, 
  Share2, 
  Copy, 
  Archive, 
  Trash,
  FileText,
  BadgeCheck
} from "lucide-react";
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
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const myNotes = [
  { id: 1, title: "Algebra Basics", subject: "Mathematics", class: "JSS 1A", week: "Week 4", date: "May 15, 2024", status: "Approved", version: "v2.0" },
  { id: 2, title: "Circle Geometry", subject: "Mathematics", class: "SSS 1A", week: "Week 5", date: "May 16, 2024", status: "Pending", version: "v1.4" },
  { id: 3, title: "Chemical Bonding", subject: "Chemistry", class: "SSS 2C", week: "Week 4", date: "May 14, 2024", status: "Returned", version: "v1.2" },
  { id: 4, title: "Force & Motion", subject: "Physics", class: "SSS 2A", week: "Week 3", date: "May 08, 2024", status: "Approved", version: "v1.0" },
  { id: 5, title: "Set Theory", subject: "Mathematics", class: "JSS 2B", week: "Week 4", date: "May 15, 2024", status: "Draft", version: "v0.8" },
];

export function MyLessonNotesList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search your lesson notes..." className="pl-10 rounded-xl border-slate-200" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl border-slate-200 h-10 px-4">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" className="rounded-xl border-slate-200 h-10 px-4">
            <FileDown className="mr-2 h-4 w-4" /> Export All
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-[14px] overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Lesson Title</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Subject & Class</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Week & Date</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider">Version</TableHead>
              <TableHead className="text-right font-bold text-xs uppercase tracking-wider">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myNotes.map((note) => (
              <TableRow key={note.id} className="hover:bg-slate-50/30 transition-colors group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green shrink-0">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-slate-800 group-hover:text-schoolgate-green transition-colors">{note.title}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{note.subject}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{note.class}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-700">{note.week}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{note.date}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider",
                    note.status === "Approved" ? "bg-emerald-50 text-emerald-700" : 
                    note.status === "Pending" ? "bg-amber-50 text-amber-700" : 
                    note.status === "Returned" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-600"
                  )}>
                    {note.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{note.version}</span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <MoreVertical className="h-4 w-4 text-slate-400" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-200">
                      <DropdownMenuItem className="gap-2 font-medium"><Eye className="h-4 w-4" /> Preview</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 font-medium text-schoolgate-green focus:text-schoolgate-green"><Edit className="h-4 w-4" /> Edit Note</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 font-medium"><Printer className="h-4 w-4" /> Print A4</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 font-medium"><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 font-medium"><Share2 className="h-4 w-4" /> Share Link</DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 font-medium text-rose-600 focus:text-rose-600"><Trash className="h-4 w-4" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
