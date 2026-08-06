import { createFileRoute } from "@tanstack/react-router";
import { 
  FileSpreadsheet, 
  ArrowLeft,
  Search,
  Plus,
  Filter,
  ChevronDown,
  Info
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AppSidebar } from "@/components/app-sidebar";
import { TopNav } from "@/components/top-nav";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { FeePostingSpreadsheet } from "@/components/finance/fee-posting-spreadsheet";
import { 
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

export const Route = createFileRoute("/finance/bulk-posting")({
  head: () => ({
    meta: [
      { title: "Bulk School Fees Posting — Schoolgate ERP" },
      { name: "description", content: "Excel-like spreadsheet for bulk fee posting." },
    ],
  }),
  component: BulkPostingPage,
});

function BulkPostingPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-page-background">
        <AppSidebar />
        <SidebarInset className="flex flex-1 flex-col">
          <TopNav />
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                   <Link to="/fee-types-overview">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white shadow-sm border">
                        <ArrowLeft size={16} />
                      </Button>
                   </Link>
                   <div>
                      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Bulk School Fees Posting</h1>
                      <p className="text-sm text-muted-foreground mt-0.5">Apply fee structures across multiple student accounts using a spreadsheet interface.</p>
                   </div>
                </div>
                <div className="flex items-center gap-2">
                   <Button variant="outline" className="h-9 rounded-xl font-bold gap-2">
                      <Plus size={16} /> Add Single Student
                   </Button>
                </div>
              </div>

              {/* Alert Info */}
              <Alert className="bg-blue-50 border-blue-100 text-blue-800 rounded-2xl p-4">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-sm font-bold">Pro-Tip: Spreadsheet Navigation</AlertTitle>
                <AlertDescription className="text-xs font-medium opacity-80">
                  Use arrow keys to move between cells, Tab for next cell, and Enter to edit. Use Ctrl+C/V to copy-paste values from external Excel files.
                </AlertDescription>
              </Alert>

              {/* Main Spreadsheet Component */}
              <FeePostingSpreadsheet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
