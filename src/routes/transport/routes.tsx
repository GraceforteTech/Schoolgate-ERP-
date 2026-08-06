import { createFileRoute } from '@tanstack/react-router';
import { 
  Navigation, 
  MapPin, 
  Bus, 
  Users, 
  Clock, 
  AlertCircle, 
  Search, 
  PlusCircle, 
  Download, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash,
  CheckCircle2,
  TrendingUp,
  MoveHorizontal
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

export const Route = createFileRoute('/transport/routes')({
  component: RouteManagement,
});

const routeKPIs = [
  { label: 'Total Routes', value: '24', icon: Navigation, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Active Routes', value: '22', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Morning Routes', value: '18', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Afternoon Routes', value: '18', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Total Bus Stops', value: '112', icon: MapPin, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Assigned Vehicles', value: '38', icon: Bus, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Assigned Drivers', value: '41', icon: Users, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Students Assigned', value: '850', icon: Users, color: 'text-schoolgate-green', bg: 'bg-schoolgate-green-light' },
  { label: 'Routes Under Review', value: '2', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Average Occupancy', value: '85%', icon: TrendingUp, color: 'text-blue-700', bg: 'bg-blue-50' },
];

const routes = [
  {
    code: "RT-001",
    name: "Lekki-Ajah Express",
    campus: "Main Campus",
    vehicle: "BUS-012",
    driver: "John Sunday",
    stops: 8,
    students: 45,
    occupancy: "92%",
    status: "Active"
  },
  {
    code: "RT-002",
    name: "Ikeja-Ogba Loop",
    campus: "Main Campus",
    vehicle: "VAN-005",
    driver: "Sarah Williams",
    stops: 12,
    students: 28,
    occupancy: "78%",
    status: "Active"
  },
  {
    code: "RT-003",
    name: "Surulere-Yaba",
    campus: "Annex Campus",
    vehicle: "BUS-008",
    driver: "Michael Abiola",
    stops: 6,
    students: 35,
    occupancy: "88%",
    status: "Active"
  }
];

function RouteManagement() {
  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Route Management</h2>
          <p className="text-muted-foreground">
            Create and manage school transport routes, stops and assignments efficiently.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button className="h-8 bg-schoolgate-green hover:bg-schoolgate-green/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Route
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-5 lg:grid-cols-5">
        {routeKPIs.map((kpi, index) => (
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
              <Input placeholder="Search route name, code, driver..." className="pl-9 bg-slate-50 border-none focus-visible:ring-schoolgate-green" />
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
                <TableHead>Route Code</TableHead>
                <TableHead>Route Name</TableHead>
                <TableHead>Campus</TableHead>
                <TableHead>Assigned Details</TableHead>
                <TableHead>Stops/Students</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.code} className="hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-schoolgate-green">{route.code}</TableCell>
                  <TableCell className="font-semibold text-slate-900">{route.name}</TableCell>
                  <TableCell className="text-slate-600 text-sm">{route.campus}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Bus className="h-3 w-3 text-muted-foreground" /> {route.vehicle}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" /> {route.driver}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <p className="text-xs font-bold text-slate-900">{route.stops}</p>
                        <p className="text-[10px] text-muted-foreground">Stops</p>
                      </div>
                      <div className="h-4 w-[1px] bg-slate-200"></div>
                      <div className="text-center">
                        <p className="text-xs font-bold text-slate-900">{route.students}</p>
                        <p className="text-[10px] text-muted-foreground">Students</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 w-24">
                      <div className="flex justify-between text-[10px] font-medium">
                        <span className="text-muted-foreground">Load</span>
                        <span>{route.occupancy}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full rounded-full", 
                            parseInt(route.occupancy) > 90 ? "bg-red-500" : "bg-schoolgate-green"
                          )} 
                          style={{ width: route.occupancy }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-100 px-2 py-0.5 font-medium">
                      {route.status}
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
                        <DropdownMenuLabel>Route Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Stops</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> Edit Route</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><MapPin className="h-4 w-4" /> Manage Stops</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><Users className="h-4 w-4" /> Assign Students</DropdownMenuItem>
                        <DropdownMenuItem className="gap-2"><MoveHorizontal className="h-4 w-4" /> Optimize Route</DropdownMenuItem>
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
