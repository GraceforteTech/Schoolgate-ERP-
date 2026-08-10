import type { ComponentType } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Archive,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  FileSpreadsheet,
  FileText,
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

export const Route = createFileRoute("/fee-types")({
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
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [isNewFeeTypeOpen, setIsNewFeeTypeOpen] = useState(false);
  const fetchRegistry = useServerFn(getFeeTypesRegistry);

  const { data: registry, isLoading } = useQuery({
    queryKey: ['fee-types-registry'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return null;
      return fetchRegistry({ data: { tenantId: membership.tenant_id } });
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
                      <FilterSelect
                        placeholder="Session"
                        defaultValue="2025-2026"
                        options={[
                          { value: "2025-2026", label: "2025/2026 Session" },
                          { value: "2024-2025", label: "2024/2025 Session" },
                        ]}
                      />
                      <FilterSelect
                        placeholder="Term"
                        defaultValue="first"
                        options={[
                          { value: "first", label: "First Term" },
                          { value: "second", label: "Second Term" },
                          { value: "third", label: "Third Term" },
                        ]}
                      />
                      <div className="relative w-full sm:w-56">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search Fee Type"
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
                      >
                        <FileText className="h-4 w-4" />
                        Export PDF
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
              <Card className="rounded-[14px] border-0 bg-white shadow-sm">
                <CardHeader className="border-b px-4 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <CardTitle className="text-base font-semibold">Fee Types Registry</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Manage all school fee categories, mandatory requirements, and class-wise allocations.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6">
                  {isLoading ? (
                    <div className="py-20 text-center text-muted-foreground">Loading registry data...</div>
                  ) : (
                    <FeeTypesTable data={registry?.feeTypes || []} />
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