import { Search, Home, ExternalLink } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationsHub } from "@/components/notifications-hub";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 shadow-sm md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 h-8 w-8" />
        <div className="hidden h-6 w-px bg-border sm:block" />
        <Link 
          to="/enterprise" 
          className="flex items-center gap-2 rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Home"
        >
          <Home className="h-4 w-4" />
        </Link>
        <Link 
          to="/landing" 
          className="flex items-center gap-2 rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title="Landing Page"
        >
          <ExternalLink className="h-4 w-4" />
        </Link>
        <div className="hidden h-6 w-px bg-border sm:block" />
        <nav className="hidden items-center gap-1 text-xs font-bold uppercase tracking-widest text-muted-foreground sm:flex">
          <span className="hover:text-schoolgate-green cursor-pointer transition-colors">Enterprise</span>
          <span className="text-slate-300">/</span>
          <span className="text-foreground">Dashboard</span>
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
          <ThemeToggle />
          <NotificationsHub />
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
