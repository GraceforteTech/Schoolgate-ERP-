import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNav } from "@/components/top-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "@/lib/audit.functions";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { 
  Search, 
  Filter, 
  Calendar, 
  Download,
  UserCircle,
  Clock,
  Monitor,
  Globe,
  Info
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exportToCSV } from "@/lib/csv-export";
import { toast } from "sonner";

type AuditFilters = {
  userId?: string;
  userRole?: string;
  action?: string;
  entityType?: string;
  dateFrom?: string;
  dateTo?: string;
  searchTerm?: string;
  academicSession?: string;
  term?: string;
  classId?: string;
  studentId?: string;
  page?: number;
};

export const Route = createFileRoute("/finance/audit-trail")({
  validateSearch: (search: Record<string, unknown>): AuditFilters => ({
    userId: z.string().uuid().optional().parse(search["userId"]),
    userRole: z.string().optional().parse(search["userRole"]),
    action: z.string().optional().parse(search["action"]),
    entityType: z.string().optional().parse(search["entityType"]),
    dateFrom: z.string().optional().parse(search["dateFrom"]),
    dateTo: z.string().optional().parse(search["dateTo"]),
    searchTerm: z.string().optional().parse(search["searchTerm"]),
    academicSession: z.string().optional().parse(search["academicSession"]),
    term: z.string().optional().parse(search["term"]),
    classId: z.string().uuid().optional().parse(search["classId"]),
    studentId: z.string().uuid().optional().parse(search["studentId"]),
    page: z.number().optional().catch(1).parse(search["page"]),
  }),
  component: AuditTrailPage,
});

function AuditTrailPage() {
  const navigate = useNavigate();
  const filters = Route.useSearch();
  const fetchLogs = useServerFn(getAuditLogs);

  const { data, isLoading } = useQuery({
    queryKey: ['finance-audit-logs', filters],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { logs: [], count: 0 };
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return { logs: [], count: 0 };
      return fetchLogs({ 
        data: { 
          tenantId: membership.tenant_id,
          filters: {
            ...filters,
          },
          page: filters.page || 1,
          pageSize: 50
        } 
      });
    }
  });

  const logs = data?.logs || [];
  const totalCount = data?.count || 0;

  const handleExport = () => {
    if (!logs.length) return;
    exportToCSV(
        logs.map((log: any) => ({
            Date: new Date(log.created_at).toLocaleString(),
            User: log.user_name || 'System',
            Role: log.user_role || 'N/A',
            Action: log.action,
            Entity: log.entity_type,
            Description: log.description || '',
            Details: JSON.stringify(log.metadata || {})
        })),
        `schoolgate_audit_trail_${new Date().toISOString().split('T')[0]}.csv`
    );
    toast.success("Audit trail exported successfully");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#F5F7FA]">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopNav />
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-6">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Financial Audit Trail</h1>
                    <p className="text-slate-500 mt-1 font-medium italic">Comprehensive log of all financial and administrative actions.</p>
                  </div>
                  <Button 
                    onClick={handleExport}
                    variant="outline" 
                    className="h-10 rounded-xl bg-white border-slate-200 font-bold gap-2 text-slate-600"
                  >
                    <Download size={16} /> Export CSV
                  </Button>
               </div>

               <Card className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden">
                  <CardHeader className="p-4 bg-slate-50/50 border-b">
                     <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                           <Input 
                             placeholder="Search description, user..." 
                             className="h-10 w-64 pl-10 rounded-xl border-slate-200 text-xs font-medium"
                             defaultValue={filters.searchTerm || ""}
                             onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                 navigate({ search: (prev: any) => ({ ...prev, searchTerm: e.currentTarget.value, page: 1 }) });
                               }
                             }}
                           />
                        </div>
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 gap-2 text-xs font-bold px-4">
                           <Filter size={14} /> Filters
                        </Button>
                        <Button variant="outline" className="h-10 rounded-xl border-slate-200 gap-2 text-xs font-bold px-4">
                           <Calendar size={14} /> Date Range
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="h-10 rounded-xl text-xs font-bold px-4 text-slate-400"
                          onClick={() => navigate({ search: {} as any })}
                        >
                          Reset
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {isLoading ? (
                      <div className="p-20 text-center text-slate-400 font-bold animate-pulse">Loading secure audit trail...</div>
                    ) : (
                      <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse">
                            <thead>
                               <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                  <th className="px-6 py-4">Actor</th>
                                  <th className="px-6 py-4">Action & Entity</th>
                                  <th className="px-6 py-4">Description</th>
                                  <th className="px-6 py-4">Environment</th>
                                  <th className="px-6 py-4 text-right">Details</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                               {logs.map((log: any) => (
                                  <tr key={log.id} className="hover:bg-slate-50/50 transition-colors group">
                                     <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                           <div className="h-9 w-9 rounded-full bg-schoolgate-green-light text-schoolgate-green flex items-center justify-center">
                                              <UserCircle size={20} />
                                           </div>
                                           <div>
                                              <p className="text-sm font-bold text-slate-900">{log.user_name || 'System'}</p>
                                              <p className="text-[10px] font-bold text-schoolgate-green uppercase tracking-tight">{log.user_role || 'Automated'}</p>
                                           </div>
                                        </div>
                                     </td>
                                     <td className="px-6 py-5">
                                        <div>
                                           <Badge variant="outline" className="mb-1.5 rounded-md border-slate-200 text-slate-600 font-bold text-[9px] uppercase tracking-wider">
                                              {log.action}
                                           </Badge>
                                           <p className="text-sm font-bold text-slate-700">{log.entity_type}: {log.entity_id}</p>
                                           <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                                              <Clock size={10} /> {new Date(log.created_at).toLocaleString()}
                                           </p>
                                        </div>
                                     </td>
                                     <td className="px-6 py-5 max-w-[300px]">
                                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                                            {log.description}
                                        </p>
                                     </td>
                                     <td className="px-6 py-5">
                                        <div className="space-y-1.5">
                                           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                              <Monitor size={12} className="text-slate-400" /> Web Interface
                                           </div>
                                           <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                              <Globe size={12} className="text-slate-400" /> ID: {log.id.slice(0, 8)}
                                           </div>
                                        </div>
                                     </td>
                                     <td className="px-6 py-5 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-schoolgate-green rounded-lg">
                                           <Info size={18} />
                                        </Button>
                                     </td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                         {!logs.length && (
                             <div className="p-16 text-center text-slate-400 italic font-medium">
                                No audit records match your current filters.
                             </div>
                         )}

                         {totalCount > 50 && (
                            <div className="p-4 border-t flex items-center justify-between">
                               <p className="text-xs font-bold text-slate-400 italic">Showing {logs.length} of {totalCount} records</p>
                               <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    disabled={filters.page === 1}
                                    onClick={() => navigate({ search: (prev: any) => ({ ...prev, page: (prev.page || 1) - 1 }) })}
                                  >Previous</Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    disabled={logs.length < 50}
                                    onClick={() => navigate({ search: (prev: any) => ({ ...prev, page: (prev.page || 1) + 1 }) })}
                                  >Next</Button>
                               </div>
                            </div>
                         )}
                      </div>
                    )}
                  </CardContent>
               </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}