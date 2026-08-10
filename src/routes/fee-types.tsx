import type { ComponentType } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  FileSpreadsheet,
  FileText,
  Trash2,
  AlertTriangle,
  Users,
  Clock,

  GraduationCap,
  Layers,
  Plus,
  Printer,
  School,
  Search,
} from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { FeeTypesTable } from "@/components/fee-types-table";
import { ImportProtectionDialog } from "@/components/finance/import-protection-dialog";
import { TopNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getFeeTypesRegistry } from "@/lib/fee-types.functions";
import { supabase } from "@/integrations/supabase/client";
import { CreateFeeTypeDialog } from "@/components/finance/create-fee-type-dialog";
import { exportToCSV } from "@/lib/csv-export";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { bulkAssignFees } from "@/lib/audit.functions";
import { BulkActionConfirmation } from "@/components/finance/bulk-action-confirmation";


export const Route = createFileRoute("/fee-types")({
  validateSearch: (search: Record<string, unknown>) => ({
    session: z.string().optional().catch("2025-2026").parse(search['session']),
    term: z.string().optional().catch("first").parse(search['term']),
    q: z.string().optional().catch("").parse(search['q']),
  }),


  head: () => ({
    meta: [
      { title: "Fee Types — Schoolgate ERP" },
      { name: "description", content: "Create and manage school fee structures." },
      { property: "og:title", content: "Fee Types — Schoolgate ERP" },
      { property: "og:description", content: "Create and manage school fee structures." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/fee-types" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/fee-types" }],
  }),
  component: FeeTypesPage,
});

function FeeTypesPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { session = "2025-2026", term = "first", q = "" } = Route.useSearch() as any;
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [isNewFeeTypeOpen, setIsNewFeeTypeOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [bulkAction, setBulkAction] = useState<{
    type: 'waiver' | 'adjustment' | 'assign' | 'remove';
    count: number;
    feeType?: string;
    amount?: number;
    totalImpact?: number;
  } | null>(null);


  const fetchRegistry = useServerFn(getFeeTypesRegistry);
  const assignFees = useServerFn(bulkAssignFees);


  const { data: registry, isLoading } = useQuery({
    queryKey: ['fee-types-registry', session, term, q],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return null;
      return fetchRegistry({ 
        data: { 
          tenantId: membership.tenant_id,
          filters: { session, term, search: q }
        } 
      });
    }
  });


  const naira = (value: number) =>
    `₦${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

  return (
    <SidebarProvider>
      <ImportProtectionDialog 
        open={importDialogOpen} 
        onOpenChange={setImportDialogOpen}
        onConfirm={(opt) => {
          console.log("Importing with strategy:", opt);
          setImportDialogOpen(false);
        }}
        stats={{ total: 120, existing: 45, new: 75, conflicts: 12 }}
      />

      <CreateFeeTypeDialog 
        open={isNewFeeTypeOpen}
        onOpenChange={setIsNewFeeTypeOpen}
      />

      <div className="flex min-h-screen w-full bg-page-background">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopNav />

          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Page header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Link to="/enterprise">
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white shadow-sm border border-slate-100">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </Link>
                  <div className="min-w-0 space-y-1">
                    <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground">
                      Fee Types Registry
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Complete register of school fee structures and allocations.
                    </p>
                  </div>
                </div>
              </div>

              {/* KPI summary cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <SummaryCard
                  label="Total Fee Types"
                  value={registry?.summary.totalFeeTypes.toString() || "0"}
                  icon={Layers}
                  loading={isLoading}
                />
                <SummaryCard
                  label="Expected Revenue"
                  value={naira(registry?.summary.totalExpectedRevenue || 0)}
                  icon={DollarSign}
                  loading={isLoading}
                />
                <SummaryCard
                  label="Assigned Records"
                  value={registry?.summary.totalAssignedFees.toString() || "0"}
                  icon={GraduationCap}
                  loading={isLoading}
                />
                <SummaryCard
                  label="Active"
                  value={registry?.summary.activeFeeTypes.toString() || "0"}
                  icon={CheckCircle2}
                  loading={isLoading}
                />
                <SummaryCard
                  label="Archived"
                  value={registry?.summary.archivedFeeTypes.toString() || "0"}
                  icon={Archive}
                  loading={isLoading}
                />
                <SummaryCard
                  label="School Count"
                  value="-"
                  icon={School}
                  loading={isLoading}
                />
              </div>

              {/* Action bar */}
              <Card className="rounded-[14px] border-0 bg-white shadow-sm">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Filters */}
                    <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
                      <Select 
                        value={session} 
                        onValueChange={(val) => navigate({ search: { ...Route.useSearch(), session: val }, replace: true })}
                      >
                        <SelectTrigger className="h-9 w-full rounded-lg border-border bg-white px-3 text-sm sm:w-40">
                          <SelectValue placeholder="Session" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-border">
                          <SelectItem value="2024-2025" className="text-sm">2024/2025 Session</SelectItem>
                          <SelectItem value="2025-2026" className="text-sm">2025/2026 Session</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select 
                        value={term} 
                        onValueChange={(val) => navigate({ search: { ...Route.useSearch(), term: val }, replace: true })}
                      >
                        <SelectTrigger className="h-9 w-full rounded-lg border-border bg-white px-3 text-sm sm:w-40">
                          <SelectValue placeholder="Term" />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-border">
                          <SelectItem value="first" className="text-sm">First Term</SelectItem>
                          <SelectItem value="second" className="text-sm">Second Term</SelectItem>
                          <SelectItem value="third" className="text-sm">Third Term</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="relative w-full sm:w-56">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search Fee Type"
                          value={q}
                          onChange={(e) => navigate({ search: { ...Route.useSearch(), q: e.target.value }, replace: true })}
                          className="h-9 rounded-lg border-border pl-9 pr-4 text-sm"
                        />
                      </div>


                    </div>



                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Button 
                        onClick={() => setIsNewFeeTypeOpen(true)}
                        className="h-9 shrink-0 gap-2 rounded-lg bg-schoolgate-green px-4 text-sm font-medium text-white hover:bg-schoolgate-green/90"
                      >
                        <Plus className="h-4 w-4" />
                        New Fee Type
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 shrink-0 gap-2 rounded-lg border-border text-sm font-medium"
                        onClick={() => setImportDialogOpen(true)}
                      >
                        <FileSpreadsheet className="h-4 w-4" />
                        Import CSV
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 shrink-0 gap-2 rounded-lg border-border text-sm font-medium"
                        onClick={() => {
                          if (registry?.feeTypes) {
                            exportToCSV(
                              registry.feeTypes.map((f: any) => ({
                                Name: f.name,
                                Session: f.academic_session,
                                Term: f.term,
                                Category: f.category,
                                Amount: f.amount,
                                Students: f.studentsAssigned,
                                'Expected Revenue': f.expectedRevenue,
                                Status: f.is_active ? 'Active' : 'Inactive'
                              })),
                              `fee_types_${new Date().toISOString().split('T')[0]}.csv`
                            );
                            toast.success("Fee registry exported successfully");
                          }
                        }}
                      >
                        <FileText className="h-4 w-4" />
                        Export CSV
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 shrink-0 gap-2 rounded-lg border-border text-sm font-medium"
                      >
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Main content card */}
              <Card className="rounded-[14px] border-0 bg-white shadow-sm overflow-hidden">
                <CardHeader className="border-b px-4 py-5 sm:px-6 bg-slate-50/30">
                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <CardTitle className="text-base font-semibold">Fee Types Registry</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Manage all school fee categories, mandatory requirements, and class-wise allocations.
                      </p>
                    </div>
                    {selectedIds.length > 0 && (
                      <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-300">
                        <span className="text-xs font-bold text-schoolgate-green bg-schoolgate-green-light px-3 py-1.5 rounded-full border border-schoolgate-green/20">
                          {selectedIds.length} selected
                        </span>
                        <Button 
                          size="sm"
                          className="h-8 rounded-lg bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold gap-2 shadow-sm"
                          onClick={() => {
                            const feeType = registry?.feeTypes.find((f: any) => f.id === selectedIds[0]);
                            setBulkAction({
                              type: 'assign',
                              count: selectedIds.length,
                              feeType: selectedIds.length === 1 ? feeType?.name : "Multiple Fee Types",
                              amount: selectedIds.length === 1 ? feeType?.amount : undefined,
                              totalImpact: selectedIds.length === 1 ? (feeType?.amount || 0) * (feeType?.studentsAssigned || 0) : 0
                            });

                          }}
                        >
                          <Users size={14} /> Bulk Assign
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-lg border-destructive/20 text-destructive hover:bg-destructive/5 font-bold gap-2"
                        >
                          <Trash2 size={14} /> Archive Selected
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>


                <CardContent className="p-0">
                  {isLoading ? (
                    <div className="py-20 text-center text-muted-foreground">Loading registry data...</div>
                  ) : (
                    <FeeTypesTable 
                      data={registry?.feeTypes || []} 
                      selected={selectedIds}
                      onSelectionChange={setSelectedIds}
                    />
                  )}


                  <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
                    <span>Showing {registry?.feeTypes.length || 0} fee types</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg" disabled>
                        Next
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>

      {bulkAction && (
        <BulkActionConfirmation 
          open={!!bulkAction}
          onOpenChange={(open) => !open && setBulkAction(null)}
          action={bulkAction}
          onConfirm={async (reason) => {
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) return;
              const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
              if (!membership) return;

              if (bulkAction.type === 'assign') {
                await assignFees({
                  data: {
                    tenantId: membership.tenant_id,
                    feeTypeIds: selectedIds,
                    studentIds: [], // In a real scenario, this might be filtered students
                    session: "2025-2026",
                    term: "first"
                  }
                });
                toast.success(`Successfully assigned ${selectedIds.length} fee types to selected students`);
                setSelectedIds([]);
              }
              setBulkAction(null);
              queryClient.invalidateQueries({ queryKey: ['fee-types-registry'] });
            } catch (err: any) {
              toast.error(err.message);
            }
          }}
        />
      )}
    </SidebarProvider>

  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  loading = false,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  loading?: boolean;
}) {
  return (
    <Card className="group rounded-[14px] border-0 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-schoolgate-green-light text-schoolgate-green">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        <div className="space-y-0.5">
          <p className="text-2xl font-semibold tracking-tight text-foreground">
            {loading ? "..." : value}
          </p>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FilterSelect({
  placeholder,
  defaultValue,
  options,
}: {
  placeholder: string;
  defaultValue: string;
  options: { value: string; label: string }[];
}) {
  return (
    <Select defaultValue={defaultValue}>
      <SelectTrigger className="h-9 w-full rounded-lg border-border bg-white px-3 text-sm sm:w-40">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-lg border-border">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-sm">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}