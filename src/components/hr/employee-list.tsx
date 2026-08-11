import React, { useState } from "react";
import { 
  Search, 
  MoreHorizontal, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard, 
  ExternalLink,
  Edit,
  Trash,
  UserCheck,
  Filter,
  ArrowUpDown,
  Loader2,
  Users
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getEmployees } from "@/lib/hr.functions";
import { supabase } from "@/integrations/supabase/client";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

export const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const fetchEmployees = useServerFn(getEmployees);

  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['hr-employees', searchTerm],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return [];
      return fetchEmployees({ data: { tenantId: membership.tenant_id, search: searchTerm } });
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-schoolgate-green" />
        <p className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-widest">Opening Personnel Files...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-[14px] shadow-sm">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, role..." 
            className="pl-9 h-10 border-slate-200 rounded-lg focus-visible:ring-schoolgate-green"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg flex-1 sm:flex-none">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" className="h-10 gap-2 border-slate-200 rounded-lg flex-1 sm:flex-none">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {employees.length === 0 ? (
        <EmptyState 
          title="No Staff Found"
          description="We couldn't find any employees matching your criteria."
          icon={<Users className="h-10 w-10" />}
        />
      ) : (
        <div className="bg-white rounded-[14px] shadow-sm overflow-hidden border border-slate-200/60">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent">
                <TableHead>Employee</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp: any) => (
                <TableRow key={emp.id} className="group hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={emp.avatar_url} />
                        <AvatarFallback className="bg-schoolgate-green-light text-schoolgate-green font-bold">
                          {emp.full_name?.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm text-slate-900 group-hover:text-schoolgate-green transition-colors">
                          {emp.full_name}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {emp.email || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {emp.roles?.map((role: string) => (
                        <Badge key={role} variant="secondary" className="text-[9px] uppercase font-bold tracking-tighter">
                          {role.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "rounded-full text-[10px] font-bold px-2 py-0",
                        emp.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-600 border-slate-200"
                      )}
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {new Date(emp.created_at).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-200 rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg border-slate-200">
                        <DropdownMenuItem className="gap-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green">
                          <ExternalLink className="h-4 w-4" /> View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 focus:bg-schoolgate-green-light focus:text-schoolgate-green">
                          <Edit className="h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-red-600 focus:bg-red-50 focus:text-red-600">
                          <Trash className="h-4 w-4" /> Delete Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
