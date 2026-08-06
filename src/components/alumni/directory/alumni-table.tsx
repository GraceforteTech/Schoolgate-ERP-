import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Mail, 
  MessageSquare, 
  Phone, 
  Printer, 
  Download, 
  StickyNote, 
  Heart, 
  Calendar, 
  Archive,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockAlumni = [
  {
    id: "ALU-2026-001",
    name: "Ademola Babatunde",
    gradYear: 2012,
    class: "Science A",
    occupation: "Senior Software Engineer",
    employer: "Google Inc.",
    country: "United States",
    email: "a.babatunde@google.com",
    phone: "+1 650 253 0000",
    membership: "Premium",
    lastActivity: "2 days ago",
    verification: "Verified",
    avatar: "https://i.pravatar.cc/150?u=ademola"
  },
  {
    id: "ALU-2026-002",
    name: "Chioma Okereke",
    gradYear: 2015,
    class: "Arts B",
    occupation: "Legal Consultant",
    employer: "Aluko & Oyebode",
    country: "Nigeria",
    email: "chioma.o@aluko-oyebode.com",
    phone: "+234 802 345 6789",
    membership: "Standard",
    lastActivity: "1 week ago",
    verification: "Verified",
    avatar: "https://i.pravatar.cc/150?u=chioma"
  },
  {
    id: "ALU-2026-003",
    name: "Ibrahim Yusuf",
    gradYear: 2010,
    class: "Commercial C",
    occupation: "Investment Banker",
    employer: "Goldman Sachs",
    country: "United Kingdom",
    email: "i.yusuf@gs.com",
    phone: "+44 20 7774 1000",
    membership: "Lifetime",
    lastActivity: "3 hours ago",
    verification: "Verified",
    avatar: "https://i.pravatar.cc/150?u=ibrahim"
  },
  {
    id: "ALU-2026-004",
    name: "Fatima Mohammed",
    gradYear: 2018,
    class: "Science B",
    occupation: "Medical Doctor",
    employer: "Lagos State Teaching Hospital",
    country: "Nigeria",
    email: "f.mohammed@lasuth.gov.ng",
    phone: "+234 803 123 4567",
    membership: "Free",
    lastActivity: "1 month ago",
    verification: "Pending",
    avatar: "https://i.pravatar.cc/150?u=fatima"
  }
];

export function AlumniTable() {
  return (
    <div className="rounded-[20px] border border-slate-100 bg-white overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="w-[80px] text-[11px] font-black uppercase text-slate-500 tracking-wider">Passport</TableHead>
            <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Full Name & ID</TableHead>
            <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Graduation</TableHead>
            <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Current Role</TableHead>
            <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Location</TableHead>
            <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Membership</TableHead>
            <TableHead className="text-[11px] font-black uppercase text-slate-500 tracking-wider">Status</TableHead>
            <TableHead className="text-right text-[11px] font-black uppercase text-slate-500 tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAlumni.map((alumnus) => (
            <TableRow key={alumnus.id} className="hover:bg-slate-50/50 transition-colors border-slate-50">
              <TableCell>
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                  <AvatarImage src={alumnus.avatar} />
                  <AvatarFallback className="bg-schoolgate-green-light text-schoolgate-green font-bold text-xs">
                    {alumnus.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{alumnus.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{alumnus.id}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-bold text-slate-700 text-sm">{alumnus.gradYear}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{alumnus.class}</p>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-bold text-slate-700 text-sm">{alumnus.occupation}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{alumnus.employer}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-600">{alumnus.country}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`
                  ${alumnus.membership === 'Lifetime' ? 'bg-purple-50 text-purple-600' : 
                    alumnus.membership === 'Premium' ? 'bg-amber-50 text-amber-600' : 
                    alumnus.membership === 'Standard' ? 'bg-blue-50 text-blue-600' : 
                    'bg-slate-50 text-slate-400'} 
                  border-none font-bold text-[10px] px-2.5 py-0.5 rounded-full
                `}>
                  {alumnus.membership}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    {alumnus.verification === 'Verified' ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                    )}
                    <span className={`text-[10px] font-bold ${alumnus.verification === 'Verified' ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {alumnus.verification}
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-medium italic">{alumnus.lastActivity}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100">
                      <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 p-1 rounded-xl border-slate-100 shadow-xl">
                    <DropdownMenuLabel className="text-[10px] uppercase font-black text-slate-400 px-3 py-2">Management Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <Eye className="h-4 w-4" /> View Full Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <Edit className="h-4 w-4" /> Edit Information
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-[10px] uppercase font-black text-slate-400 px-3 py-2">Communication</DropdownMenuLabel>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <Mail className="h-4 w-4" /> Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <MessageSquare className="h-4 w-4" /> Send WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <Phone className="h-4 w-4" /> Send SMS
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-[10px] uppercase font-black text-slate-400 px-3 py-2">Others</DropdownMenuLabel>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <Printer className="h-4 w-4" /> Print Alumni Card
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <Download className="h-4 w-4" /> Download Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <StickyNote className="h-4 w-4" /> Add Private Note
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <Heart className="h-4 w-4" /> View Donations
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-slate-600 py-2.5 cursor-pointer">
                      <Calendar className="h-4 w-4" /> Event Attendance
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="rounded-lg gap-2 text-sm font-bold text-rose-600 py-2.5 cursor-pointer hover:bg-rose-50 hover:text-rose-700">
                      <Archive className="h-4 w-4" /> Archive Record
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
