import { createFileRoute } from '@tanstack/react-router';
import { 
  FileText, 
  Search, 
  Upload, 
  Download, 
  Eye, 
  MoreVertical, 
  BookOpen, 
  Video, 
  Music, 
  HelpCircle,
  FileDown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DIGITAL_RESOURCES = [
  { id: 1, title: 'Physics Past Questions (2020-2023)', author: 'WAEC Dept', type: 'PDF', size: '4.2 MB', category: 'Past Questions', downloads: 1240 },
  { id: 2, title: 'Biology Textbook Vol 1', author: 'Modern Science', type: 'E-book', size: '12.8 MB', category: 'Textbooks', downloads: 850 },
  { id: 3, title: 'Introduction to Calculus', author: 'Maths Lab', type: 'Video', size: '450 MB', category: 'Educational Videos', downloads: 2100 },
  { id: 4, title: 'English Literature Audio Series', author: 'Arts Dept', type: 'Audio', size: '25 MB', category: 'Audio Books', downloads: 420 },
  { id: 5, title: 'Chemistry Lab Guide', author: 'SciTech', type: 'PDF', size: '1.5 MB', category: 'Research Materials', downloads: 310 },
];

export const Route = createFileRoute('/library/digital')({
  component: DigitalLibrary,
});

function DigitalLibrary() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Digital Library</h1>
          <p className="text-muted-foreground">Access e-books, research materials, and educational media.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-[#0B6E3C] hover:bg-[#095A31] gap-2"><Upload className="h-4 w-4" /> Upload Resource</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-bold text-sm uppercase text-muted-foreground tracking-wider">Categories</h3>
              <div className="space-y-1">
                {['All Resources', 'PDF Books', 'E-books', 'Past Questions', 'Research Materials', 'Audio Books', 'Educational Videos'].map((cat, i) => (
                  <Button key={cat} variant={i === 0 ? "secondary" : "ghost"} className={cn(
                    "w-full justify-start gap-2 h-9 text-sm rounded-lg",
                    i === 0 ? "bg-schoolgate-green-light text-schoolgate-green hover:bg-schoolgate-green-light" : ""
                  )}>
                    {cat === 'All Resources' ? <BookOpen className="h-4 w-4" /> :
                     cat === 'Educational Videos' ? <Video className="h-4 w-4" /> :
                     cat === 'Audio Books' ? <Music className="h-4 w-4" /> :
                     <FileText className="h-4 w-4" />}
                    {cat}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="md:col-span-3 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm">
            <CardContent className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search digital resources by subject, class, author or keyword..." className="pl-10 rounded-xl" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DIGITAL_RESOURCES.map((res) => (
                  <Card key={res.id} className="rounded-xl border border-gray-100 shadow-none hover:shadow-md transition-all group overflow-hidden">
                    <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                       {res.type === 'Video' ? <Video className="h-10 w-10 text-gray-300" /> :
                        res.type === 'Audio' ? <Music className="h-10 w-10 text-gray-300" /> :
                        <FileText className="h-10 w-10 text-gray-300" />}
                       <Badge className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm border-none text-[10px]">{res.type}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-bold text-sm line-clamp-1 mb-1">{res.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{res.author} • {res.size}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-tight">{res.downloads.toLocaleString()} Downloads</span>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7"><Eye className="h-3 w-3" /></Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-schoolgate-green hover:text-schoolgate-green hover:bg-schoolgate-green-light">
                            <FileDown className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
