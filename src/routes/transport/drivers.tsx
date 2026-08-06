import { createFileRoute } from '@tanstack/react-router';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Star, 
  Search, 
  PlusCircle, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Calendar, 
  Bus, 
  MapPin, 
  Phone,
  FileText,
  Trash,
  Award,
  History,
  FileBadge
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute('/transport/drivers')({
  component: DriverManagement,
});

const driverKPIs = [
  { label: 'Total Drivers', value: '45', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Drivers', value: '38', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'On Leave', value: '3', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Expired Licences', value: '2', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Due for Medical', value: '4', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Assigned Drivers', value: '40', icon: Bus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Unassigned', value: '5', icon: Users, color: 'text-slate-600', bg: 'bg-slate-50' },
  { label: 'Performance Rating', value: '4.8', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

const drivers = [
  {
    id: "EMP-DRV-001",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    name: "John Sunday",
    phone: "08012345678",
    licence: "ABJ-29384-Z",
    expiry: "2027-05-20",
    medicalExpiry: "2026-11-15",
    vehicle: "BUS-012",
    route: "Lekki Phase 1",
    experience: "8 Years",
    status: "Active",
    rating: 4.9
  },
  {
    id: "EMP-DRV-002",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    name: "Sarah Williams",
    phone: "08087654321",
    licence: "LAG-11234-Y",
    expiry: "2026-08-10",
    medicalExpiry: "2026-08-10",
    vehicle: "VAN-005",
    route: "Ikeja GRA",
    experience: "5 Years",
    status: "Active",
    rating: 4.7
  },
  {
    id: "EMP-DRV-003",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    name: "Michael Abiola",
    phone: "08123334445",
    licence: "KNR-55678-X",
    expiry: "2026-06-12",
    medicalExpiry: "2026-12-01",
    vehicle: "N/A",
    route: "N/A",
    experience: "12 Years",
    status: "On Leave",
    rating: 4.5
  }
];

function DriverManagement() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Driver Management</h2>
          <p className="text-muted-foreground">
            Manage school drivers, licences, assignments and performance efficiently.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="h-8 bg-schoolgate-green hover:bg-schoolgate-green/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Register Driver
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        {driverKPIs.map((kpi, index) => (
          <Card key={index} className="rounded-[14px] border-none shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
              <div className={cn("p-2 rounded-lg group-hover:scale-110 transition-transform", kpi.bg)}>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{kpi.value}</h3>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-12 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
            <div className="p-4 bg-white border-b flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search driver name, ID, licence..." className="pl-9 bg-slate-50 border-none focus-visible:ring-schoolgate-green" />
                </div>
                <Button variant="outline" size="icon" className="shrink-0 border-slate-200">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow>
                    <TableHead>Driver Info</TableHead>
                    <TableHead>Licence & Contact</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Exp/Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((driver) => (
                    <TableRow key={driver.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={driver.photo} alt={driver.name} className="w-10 h-10 rounded-full border border-slate-100 bg-slate-50" />
                          <div>
                            <p className="font-semibold text-slate-900">{driver.name}</p>
                            <p className="text-[10px] text-muted-foreground font-mono">{driver.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm text-slate-700 flex items-center gap-1.5">
                            <Phone className="h-3 w-3 text-muted-foreground" /> {driver.phone}
                          </p>
                          <p className="text-xs text-muted-foreground">DL: {driver.licence}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                            <Bus className="h-3 w-3 text-muted-foreground" /> {driver.vehicle}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                            <MapPin className="h-3 w-3" /> {driver.route}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-slate-700">{driver.experience}</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold text-slate-900">{driver.rating}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("px-2 py-0.5 font-medium", 
                          driver.status === "Active" ? "bg-green-50 text-green-700 border-green-100" : "bg-orange-50 text-orange-700 border-orange-100"
                        )}>
                          {driver.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48 rounded-xl">
                            <DropdownMenuLabel>Driver Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Profile</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> Edit Details</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><Bus className="h-4 w-4" /> Assign Vehicle</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><MapPin className="h-4 w-4" /> Assign Route</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><FileBadge className="h-4 w-4" /> Upload Documents</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><Award className="h-4 w-4" /> Record Training</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600"><Trash className="h-4 w-4" /> Delete</DropdownMenuItem>
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

        <div className="col-span-12 lg:col-span-4">
          <Card className="rounded-[14px] border-none shadow-sm h-full">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-schoolgate-green" /> Quick Profile View
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="relative">
                  <img src={drivers[0].photo} alt={drivers[0].name} className="w-24 h-24 rounded-full border-4 border-schoolgate-green-light shadow-sm" />
                  <div className="absolute bottom-0 right-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{drivers[0].name}</h3>
                  <p className="text-sm text-muted-foreground">{drivers[0].id}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-schoolgate-green-light text-schoolgate-green hover:bg-schoolgate-green-light border-none">
                    Certified Driver
                  </Badge>
                  <Badge variant="outline" className="border-slate-200 text-slate-600">
                    Senior Class
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <ProfileItem icon={FileText} label="Licence Status" value="Valid (Exp: 2027)" status="success" />
                <ProfileItem icon={ShieldAlert} label="Medical Cert" value="Due in 3 months" status="warning" />
                <ProfileItem icon={Award} label="Training Score" value="94%" status="success" />
                <ProfileItem icon={History} label="Last Incident" value="None Recorded" status="success" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Overall Performance</span>
                  <span className="text-schoolgate-green">92%</span>
                </div>
                <Progress value={92} className="h-2 bg-slate-100" indicatorClassName="bg-schoolgate-green" />
              </div>

              <div className="pt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="rounded-xl border-slate-200">Full Profile</Button>
                <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl">Edit Details</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon: Icon, label, value, status }: { icon: any, label: string, value: string, status: 'success' | 'warning' | 'danger' }) {
  const statusColors = {
    success: 'text-green-600',
    warning: 'text-amber-600',
    danger: 'text-red-600'
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-lg shadow-sm">
          <Icon className="h-4 w-4 text-slate-500" />
        </div>
        <p className="text-xs font-medium text-slate-600">{label}</p>
      </div>
      <p className={cn("text-xs font-bold", statusColors[status])}>{value}</p>
    </div>
  );
}
