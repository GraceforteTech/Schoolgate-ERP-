import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 h-8 w-8" />
        <div className="hidden h-6 w-px bg-border sm:block" />
        <nav className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
          <span>Finance</span>
          <span className="text-border">/</span>
          <span className="font-medium text-foreground">Fee Types</span>
        </nav>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3 md:justify-between">
        <div className="relative hidden w-full max-w-md md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search fee types, students, or reports..."
            className="h-9 rounded-lg border-border pl-9 pr-4 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-schoolgate-green" />
          </Button>
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-schoolgate-green-light">
            <div className="grid h-full w-full place-items-center text-xs font-semibold text-schoolgate-green">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
