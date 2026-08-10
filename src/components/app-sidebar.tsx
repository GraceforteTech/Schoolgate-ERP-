import { Link, useRouterState } from "@tanstack/react-router";
import {
  Banknote,
  BookOpen,
  CalendarDays,
  CreditCard,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
  UserPlus,
  Wallet,
  MonitorPlay,
  ShieldCheck,
  Bus,
  Library,
  Package,
  Home as HomeIcon,
  LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  url: string;
  icon: any;
  disabled?: boolean;
}

const mainNavItems = [
  { title: "Dashboard", url: "/enterprise", icon: LayoutDashboard },
];

const managementNavItems = [
  { title: "Students", url: "/students", icon: Users },
  { title: "Student Portal", url: "/student", icon: GraduationCap },
  { title: "Parent Portal", url: "/parent", icon: Users }, // Placeholder as requested
  { title: "Staff", url: "/finance/hr-payroll/employees", icon: ShieldCheck },
  { title: "Classes", url: "/academic/classes", icon: Users },
];

const academicNavItems = [
  { title: "Sessions", url: "/academic", icon: CalendarDays },
  { title: "Terms", url: "/academic", icon: CalendarDays },
  { title: "Subjects", url: "/academic/classes", icon: BookOpen },
  { title: "Results", url: "/finance/results", icon: FileText },
  { title: "Attendance", url: "/attendance", icon: CalendarDays },
];

const financeNavItems = [
  { title: "Fee Types", url: "/fee-types-overview", icon: CreditCard },
  { title: "Fee Structure", url: "/fee-types", icon: FileSpreadsheet },
  { title: "Individual Fees", url: "/finance/adjustment-management", icon: Banknote },
  { title: "Collect Fees", url: "/finance/invoice-management", icon: FileText },
  { title: "Bulk Posting", url: "/finance/fee-posting", icon: FileSpreadsheet },
  { title: "Outstanding Balances", url: "/finance/outstanding-fees", icon: CreditCard },
  { title: "Finance Dashboard", url: "/finance/dashboard", icon: LayoutDashboard },
  { title: "Expenses", url: "/finance/expense-management", icon: Banknote },
  { title: "Payments", url: "/finance/payroll-management", icon: Banknote },
  { title: "Approval Centre", url: "/finance/approvals", icon: ShieldCheck },
];

const systemNavItems = [
  { title: "Communication", url: "/communication", icon: MonitorPlay, disabled: true },
  { title: "Reports", url: "/reports", icon: FileText, disabled: true },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({
    select: (router) => router.location.pathname,
  });

  const isActive = (path: string) => currentPath === path;

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out successfully");
      window.location.href = "/landing";
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-16 items-center gap-3 px-4">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-schoolgate-green text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-semibold leading-tight">
                Schoolgate
              </span>
              <span className="truncate text-xs text-muted-foreground">ERP</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        isActive(item.url)
                          ? "bg-schoolgate-green-light text-schoolgate-green"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>School Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} disabled={item.disabled}>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        isActive(item.url)
                          ? "bg-schoolgate-green-light text-schoolgate-green"
                          : item.disabled ? "opacity-50 cursor-not-allowed" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Academics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {academicNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        isActive(item.url)
                          ? "bg-schoolgate-green-light text-schoolgate-green"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Finance</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {financeNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        isActive(item.url)
                          ? "bg-schoolgate-green-light text-schoolgate-green"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} disabled={item.disabled}>
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        isActive(item.url)
                          ? "bg-schoolgate-green-light text-schoolgate-green"
                          : item.disabled ? "opacity-50 cursor-not-allowed" : "text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors w-full"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="font-bold">Sign Out</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
