import type { ComponentType } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Archive,
  CheckCircle2,
  DollarSign,
  GraduationCap,
  Layers,
  Plus,
  School,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import { TopNav } from "@/components/top-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

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
                <Button className="h-9 shrink-0 gap-2 rounded-lg bg-schoolgate-green px-4 text-sm font-medium text-white hover:bg-schoolgate-green/90">
                  <Plus className="h-4 w-4" />
                  Add Fee Type
                </Button>
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

                    {/* Filter bar placeholder */}
                    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search fee types..."
                          className="h-9 rounded-lg border-border pl-9 pr-4 text-sm"
                        />
                      </div>
                      <Button
                        variant="outline"
                        className="h-9 shrink-0 gap-2 rounded-lg border-border text-sm font-medium"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Fee types table placeholder */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-4 rounded-lg bg-page-background px-4 py-3 text-xs font-medium text-muted-foreground">
                      <div className="col-span-4">Fee Name</div>
                      <div className="col-span-3">Category</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-2">Status</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 gap-4 rounded-lg border border-border/50 bg-white px-4 py-4"
                      >
                        <div className="col-span-4">
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                        <div className="col-span-3">
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="col-span-2">
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="col-span-2">
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="col-span-1">
                          <Skeleton className="h-4 w-8" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
                    <span>Showing 1–5 of 12 fee types</span>
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
  icon: React.ComponentType<{ className?: string }>;
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
