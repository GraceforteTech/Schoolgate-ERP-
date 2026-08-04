import type { ComponentType } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Archive,
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
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-page-background">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopNav />

          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Page header */}
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-1">
                  <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground">
                    Fee Types
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Create and manage school fee structures.
                  </p>
                </div>
              </div>

              {/* KPI summary cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                <SummaryCard
                  label="Total Fee Types"
                  value="12"
                  icon={Layers}
                />
                <SummaryCard
                  label="Expected Revenue"
                  value="$124,500"
                  icon={DollarSign}
                />
                <SummaryCard
                  label="Primary School Fee Types"
                  value="5"
                  icon={GraduationCap}
                />
                <SummaryCard
                  label="Secondary School Fee Types"
                  value="7"
                  icon={School}
                />
                <SummaryCard
                  label="Active Fee Types"
                  value="10"
                  icon={CheckCircle2}
                />
                <SummaryCard
                  label="Archived Fee Types"
                  value="2"
                  icon={Archive}
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
                          { value: "2023-2024", label: "2023/2024 Session" },
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
                      <FilterSelect
                        placeholder="School"
                        defaultValue="all"
                        options={[
                          { value: "all", label: "All Schools" },
                          { value: "primary", label: "Primary School" },
                          { value: "secondary", label: "Secondary School" },
                        ]}
                      />
                      <FilterSelect
                        placeholder="Class"
                        defaultValue="all"
                        options={[
                          { value: "all", label: "All Classes" },
                          { value: "jss1", label: "JSS 1" },
                          { value: "jss2", label: "JSS 2" },
                          { value: "ss1", label: "SS 1" },
                        ]}
                      />
                      <FilterSelect
                        placeholder="Status"
                        defaultValue="active"
                        options={[
                          { value: "active", label: "Active" },
                          { value: "archived", label: "Archived" },
                          { value: "all", label: "All Statuses" },
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
                      <Button className="h-9 shrink-0 gap-2 rounded-lg bg-schoolgate-green px-4 text-sm font-medium text-white hover:bg-schoolgate-green/90">
                        <Plus className="h-4 w-4" />
                        New Fee Type
                      </Button>
                      <Button
                        variant="outline"
                        className="h-9 shrink-0 gap-2 rounded-lg border-border text-sm font-medium"
                      >
                        <FileSpreadsheet className="h-4 w-4" />
                        Export Excel
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
                      <CardTitle className="text-base font-semibold">Fee Types List</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Manage tuition, transport, library, and other fee categories.
                      </p>
                    </div>

                  </div>
                </CardHeader>

                <CardContent className="p-4 sm:p-6">
                  <FeeTypesTable />

                  <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
                    <span>Showing 1–8 of 12 fee types</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-lg">
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
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
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
            {value}
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
