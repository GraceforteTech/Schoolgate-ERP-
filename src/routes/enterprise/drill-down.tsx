import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { getDrillDownData } from '@/lib/drill-down.functions';
import { supabase } from '@/integrations/supabase/client';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Search, 
  Users,
  Wallet,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { exportToCSV } from '@/lib/csv-export';
import { toast } from 'sonner';

const drillDownSearchSchema = z.object({
  type: z.enum([
    'total_students', 
    'total_fees_billed', 
    'total_collected', 
    'outstanding_fees', 
    'pending_payments', 
    'paid_students', 
    'partially_paid_students', 
    'unpaid_students', 
    'total_expenses'
  ]),
  session: z.string().optional(),
  term: z.string().optional(),
  classId: z.string().optional(),
  page: z.number().catch(1).optional()
});

export const Route = createFileRoute('/enterprise/drill-down')({
  validateSearch: (search) => drillDownSearchSchema.parse(search),
  component: DrillDownPage,
});

function DrillDownPage() {
  const { type, session, term, classId, page = 1 } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const fetchDrillDown = useServerFn(getDrillDownData);

  const { data: result, isLoading } = useQuery({
    queryKey: ['drill-down', type, session, term, classId, page],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      const { data: profile } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!profile) throw new Error("Tenant not found");
      
      return fetchDrillDown({ 
        data: { 
          tenantId: profile.tenant_id,
          type,
          filters: { session, term, classId },
          page
        } 
      });
    }
  });

  const getTitle = () => {
    switch (type) {
      case 'total_students': return 'Student Registry';
      case 'total_fees_billed': return 'Fee Assignments';
      case 'total_collected': return 'Approved Payments';
      case 'outstanding_fees': return 'Outstanding Balances';
      case 'pending_payments': return 'Pending Payments';
      case 'paid_students': return 'Fully Paid Students';
      case 'partially_paid_students': return 'Partially Paid Students';
      case 'unpaid_students': return 'Unpaid Students';
      case 'total_expenses': return 'Expense Register';
      default: return 'Data Drill-down';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'total_students':
      case 'paid_students':
      case 'partially_paid_students':
      case 'unpaid_students': return Users;
      case 'total_collected':
      case 'pending_payments': return CreditCard;
      case 'total_expenses': return Wallet;
      case 'outstanding_fees': return AlertCircle;
      default: return Eye;
    }
  };

  const updateFilters = (newFilters: any) => {
    navigate({
      search: (prev: any) => ({ ...prev, ...newFilters, page: 1 }),
      replace: true
    });
  };

  const handleExport = () => {
    if (!result?.data) return;
    exportToCSV(result.data, `${type}_drilldown.csv`);
    toast.success("Data exported successfully");
  };

  const Icon = getIcon();

  return (
    <div className="min-h-screen bg-page-background p-4 lg:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/enterprise">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-white shadow-sm border border-border"
            >
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-schoolgate-green/10 text-schoolgate-green">
                <Icon size={18} />
              </div>
              <h1 className="text-2xl font-black text-foreground tracking-tight">{getTitle()}</h1>
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
              Live records from database
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="rounded-xl border-border font-bold text-xs gap-2"
          >
            <Download size={16} /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="p-4 sm:p-6 border-b border-border/50 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-schoolgate-green transition-colors" size={14} />
              <Input 
                placeholder="Quick search..." 
                className="pl-9 h-10 bg-white border-border rounded-xl focus-visible:ring-schoolgate-green text-xs" 
              />
            </div>
            <Select value={session || "all"} onValueChange={(val) => updateFilters({ session: val === "all" ? undefined : val })}>
              <SelectTrigger className="h-10 bg-white border-border rounded-xl text-xs">
                <SelectValue placeholder="All Sessions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sessions</SelectItem>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
                <SelectItem value="2024/2025">2024/2025</SelectItem>
              </SelectContent>
            </Select>
            <Select value={term || "all"} onValueChange={(val) => updateFilters({ term: val === "all" ? undefined : val })}>
              <SelectTrigger className="h-10 bg-white border-border rounded-xl text-xs">
                <SelectValue placeholder="All Terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Terms</SelectItem>
                <SelectItem value="first">First Term</SelectItem>
                <SelectItem value="second">Second Term</SelectItem>
                <SelectItem value="third">Third Term</SelectItem>
              </SelectContent>
            </Select>
            <Select value={classId || "all"} onValueChange={(val) => updateFilters({ classId: val === "all" ? undefined : val })}>
              <SelectTrigger className="h-10 bg-white border-border rounded-xl text-xs">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="JSS 1">JSS 1</SelectItem>
                <SelectItem value="JSS 2">JSS 2</SelectItem>
                <SelectItem value="SS 1">SS 1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-20 text-center text-muted-foreground animate-pulse font-black uppercase tracking-widest text-xs">
              Loading records...
            </div>
          ) : !result?.data?.length ? (
            <div className="p-20 text-center text-muted-foreground font-black uppercase tracking-widest text-xs">
              No records found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-border/50">
                    {type.includes('student') ? (
                      <>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Student</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Adm No</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Class</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</TableHead>
                      </>
                    ) : type.includes('fee') || type === 'outstanding_fees' ? (
                      <>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Student</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Fee Type</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Amount Due</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Paid</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</TableHead>
                      </>
                    ) : type.includes('payment') || type === 'total_collected' ? (
                      <>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Transaction ID</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Student</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Amount</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Method</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</TableHead>
                      </>
                    ) : (
                      <>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Description</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Category</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Amount</TableHead>
                        <TableHead className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Status</TableHead>
                      </>
                    )}
                    <TableHead className="w-16 px-6 py-4 text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.data.map((item, idx) => (
                    <TableRow key={idx} className="hover:bg-slate-50 transition-colors border-b border-border/50 group">
                      {type.includes('student') ? (
                        <>
                          <TableCell className="px-6 py-4 font-black text-foreground text-sm uppercase tracking-tight">
                            {item.first_name} {item.last_name}
                          </TableCell>
                          <TableCell className="px-6 py-4 font-bold text-muted-foreground text-xs">{item.admission_no}</TableCell>
                          <TableCell className="px-6 py-4 font-bold text-muted-foreground text-xs uppercase">{item.class_id}</TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">
                              {item.status || 'Active'}
                            </Badge>
                          </TableCell>
                        </>
                      ) : type.includes('fee') || type === 'outstanding_fees' ? (
                        <>
                          <TableCell className="px-6 py-4 font-black text-foreground text-sm uppercase tracking-tight">
                            {item.students?.first_name} {item.students?.last_name}
                          </TableCell>
                          <TableCell className="px-6 py-4 font-bold text-muted-foreground text-xs uppercase">{item.fee_types?.name}</TableCell>
                          <TableCell className="px-6 py-4 text-right font-black text-foreground">₦{Number(item.amount_due).toLocaleString()}</TableCell>
                          <TableCell className="px-6 py-4 text-right font-black text-schoolgate-green">₦{Number(item.amount_paid).toLocaleString()}</TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge variant="outline" className={cn(
                              "border-none font-black text-[10px]",
                              item.status === 'paid' ? "bg-emerald-50 text-emerald-600" : 
                              item.status === 'partially_paid' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                            )}>
                              {item.status?.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                        </>
                      ) : type.includes('payment') || type === 'total_collected' ? (
                        <>
                          <TableCell className="px-6 py-4 font-bold text-muted-foreground text-xs">#{item.id.slice(0,8)}</TableCell>
                          <TableCell className="px-6 py-4 font-black text-foreground text-sm uppercase tracking-tight">
                            {item.students?.first_name} {item.students?.last_name}
                          </TableCell>
                          <TableCell className="px-6 py-4 text-right font-black text-schoolgate-green">₦{Number(item.amount).toLocaleString()}</TableCell>
                          <TableCell className="px-6 py-4 font-bold text-muted-foreground text-xs uppercase">{item.payment_method}</TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge variant="outline" className={cn(
                              "border-none font-black text-[10px]",
                              item.status === 'approved' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            )}>
                              {item.status}
                            </Badge>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell className="px-6 py-4 font-black text-foreground text-sm uppercase tracking-tight">{item.description}</TableCell>
                          <TableCell className="px-6 py-4 font-bold text-muted-foreground text-xs uppercase">{item.category}</TableCell>
                          <TableCell className="px-6 py-4 text-right font-black text-rose-600">₦{Number(item.amount).toLocaleString()}</TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">
                              {item.status}
                            </Badge>
                          </TableCell>
                        </>
                      )}
                      <TableCell className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg group-hover:bg-white shadow-sm border border-transparent group-hover:border-border">
                          <Eye size={14} className="text-slate-400 group-hover:text-schoolgate-green" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {result && result.count > 20 && (
          <div className="p-4 border-t border-border/50 flex items-center justify-between">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Showing {(page-1)*20 + 1} - {Math.min(page*20, result.count)} of {result.count}
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={page <= 1}
                onClick={() => updateFilters({ page: page - 1 })}
                className="h-8 rounded-lg font-bold text-[10px] uppercase tracking-widest"
              >
                Prev
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                disabled={page * 20 >= result.count}
                onClick={() => updateFilters({ page: page + 1 })}
                className="h-8 rounded-lg font-bold text-[10px] uppercase tracking-widest"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
