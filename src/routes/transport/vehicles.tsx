import { createFileRoute } from '@tanstack/react-router';
import { 
  Bus, 
  Users, 
  MapPin, 
  Navigation, 
  Wrench, 
  AlertCircle, 
  CheckCircle2, 
  ShieldAlert,
  Calendar,
  Search,
  PlusCircle,
  FileText,
  Printer,
  Download,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  UserPlus,
  Route as RouteIcon,
  Trash
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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

export const Route = createFileRoute('/transport/vehicles')({
  component: VehicleManagement,
});

const vehicleKPIs = [
  { label: 'Total Vehicles', value: '42', icon: Bus, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Vehicles', value: '35', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Under Maintenance', value: '4', icon: Wrench, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Due for Service', value: '6', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Expired Insurance', value: '2', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Expired Road Worthiness', value: '1', icon: ShieldAlert, color: 'text-red-700', bg: 'bg-red-50' },
  { label: 'Available Vehicles', value: '12', icon: CheckCircle2, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Assigned to Routes', value: '30', icon: RouteIcon, color: 'text-indigo-600', bg: 'bg-indigo-50' },
];

const vehicles = [
  {
    id: "V-001",
    photo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=100&h=100",
    number: "BUS-012",
    plate: "LND-452-XY",
    type: "Coaster Bus",
    capacity: "32 Seater",
    driver: "John Doe",
    route: "Lekki-Ajah Express",
    insuranceExpiry: "2026-12-15",
    roadWorthiness: "2026-10-20",
    lastService: "2026-05-10",
    nextService: "2026-09-10",
    status: "Active"
  },
  {
    id: "V-002",
    photo: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&q=80&w=100&h=100",
    number: "VAN-005",
    plate: "KJA-881-ZZ",
    type: "Sienna Van",
    capacity: "7 Seater",
    driver: "Sarah Smith",
    route: "Ikeja-Ogba Loop",
    insuranceExpiry: "2026-08-01",
    roadWorthiness: "2026-08-01",
    lastService: "2026-07-20",
    nextService: "2026-08-20",
    status: "Service Due"
  },
  {
    id: "V-003",
    photo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=100&h=100",
    number: "BUS-008",
    plate: "APP-332-LQ",
    type: "Hiace Bus",
    capacity: "18 Seater",
    driver: "Michael Chen",
    route: "Surulere-Yaba",
    insuranceExpiry: "2026-11-30",
    roadWorthiness: "2026-11-15",
    lastService: "2026-03-12",
    nextService: "2026-08-12",
    status: "Maintenance"
  }
];

function VehicleManagement() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Vehicle Management</h2>
          <p className="text-muted-foreground">
            Manage school buses and transport vehicles efficiently.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="h-8 bg-schoolgate-green hover:bg-schoolgate-green/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Register Vehicle
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        {vehicleKPIs.map((kpi, index) => (
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

      <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
        <div className="p-4 bg-white border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search vehicle number, plate, driver..." className="pl-9 bg-slate-50 border-none focus-visible:ring-schoolgate-green" />
            </div>
            <Button variant="outline" size="icon" className="shrink-0 border-slate-200">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <Badge variant="outline" className="px-3 py-1 bg-slate-50 text-slate-600 border-slate-200 cursor-pointer hover:bg-slate-100 whitespace-nowrap">All Types</Badge>
            <Badge variant="outline" className="px-3 py-1 bg-slate-50 text-slate-600 border-slate-200 cursor-pointer hover:bg-slate-100 whitespace-nowrap">Active</Badge>
            <Badge variant="outline" className="px-3 py-1 bg-slate-50 text-slate-600 border-slate-200 cursor-pointer hover:bg-slate-100 whitespace-nowrap">Service Due</Badge>
            <Badge variant="outline" className="px-3 py-1 bg-slate-50 text-slate-600 border-slate-200 cursor-pointer hover:bg-slate-100 whitespace-nowrap">Maintenance</Badge>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[80px]">Photo</TableHead>
                <TableHead>Vehicle Info</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Driver & Route</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <img src={vehicle.photo} alt={vehicle.number} className="w-10 h-10 rounded-lg object-cover border border-slate-100" />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-slate-900">{vehicle.number}</p>
                      <p className="text-xs text-muted-foreground">{vehicle.plate} • {vehicle.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium bg-slate-100 text-slate-700">{vehicle.capacity}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm text-slate-700">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        {vehicle.driver}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="h-3 w-3" />
                        {vehicle.route}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Next Service: {vehicle.nextService}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase flex items-center gap-1">
                        <ShieldAlert className="h-3 w-3" /> Insurance: {vehicle.insuranceExpiry}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl">
                        <DropdownMenuLabel>Vehicle Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> Edit Vehicle</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><UserPlus className="h-4 w-4" /> Assign Driver</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><RouteIcon className="h-4 w-4" /> Assign Route</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Wrench className="h-4 w-4" /> Record Maintenance</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><FileText className="h-4 w-4" /> Service History</DropdownMenuItem>
                        <DropdownMenuSeparator />
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
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Active": "bg-green-50 text-green-700 border-green-100",
    "Service Due": "bg-amber-50 text-amber-700 border-amber-100",
    "Maintenance": "bg-red-50 text-red-700 border-red-100",
    "Inactive": "bg-slate-50 text-slate-700 border-slate-100",
  };

  return (
    <Badge variant="outline" className={cn("px-2 py-0.5 font-medium whitespace-nowrap", styles[status] || styles["Inactive"])}>
      {status}
    </Badge>
  );
}
