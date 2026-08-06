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
} from "lucide-react";


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

const mainNavItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Admissions", url: "/finance/admissions", icon: UserPlus },
  { title: "Students", url: "/students", icon: Users },
  { title: "Teachers", url: "/teachers", icon: GraduationCap },

  { title: "Academics", url: "/academic", icon: BookOpen },
  { title: "Syllabus & Schemes", url: "/academic/syllabus", icon: FileText },
  { title: "Lesson Notes", url: "/academic/lesson-notes", icon: FileText },
  { title: "Attendance", url: "/attendance", icon: CalendarDays },
  { title: "Library", url: "/library", icon: Library },
  { title: "CBT", url: "/cbt", icon: MonitorPlay },
  { title: "Timetable", url: "/timetable", icon: CalendarDays },
  { title: "Transport", url: "/transport", icon: Bus },
];


const financeNavItems = [
  { title: "Dashboard", url: "/finance/dashboard", icon: LayoutDashboard },
  { title: "Fee Registry", url: "/fee-types-overview", icon: CreditCard },
  { title: "School Fee Posting", url: "/finance/fee-posting", icon: FileSpreadsheet },
  { title: "Adjustments", url: "/finance/adjustment-management", icon: Banknote },
  { title: "Invoices", url: "/finance/invoice-management", icon: FileText },
  { title: "Outstanding", url: "/finance/outstanding-fees", icon: CreditCard },
  { title: "Expenses", url: "/finance/expense-management", icon: Banknote },
  { title: "Payroll", url: "/finance/payroll-management", icon: Banknote },
  { title: "Results & Reports", url: "/finance/results", icon: FileText },
  { title: "HR & Payroll", url: "/finance/hr-payroll", icon: Users },
  { title: "Employee Hub", url: "/finance/hr-payroll/employees", icon: UserPlus },
  { title: "Payroll Centre", url: "/finance/hr-payroll/payroll-dashboard", icon: Banknote },
  { title: "Salary Grades", url: "/finance/hr-payroll/salary-structure", icon: CreditCard },
  { title: "Payroll Engine", url: "/finance/hr-payroll/processing", icon: FileSpreadsheet },
  { title: "Salary Ledger", url: "/finance/hr-payroll/salary-table", icon: FileText },
  { title: "Wealth & Loan", url: "/finance/wealth-loan", icon: Wallet },
];

const systemNavItems = [
  { title: "Enterprise", url: "/enterprise", icon: ShieldCheck },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({
    select: (router) => router.location.pathname,
  });

  const isActive = (path: string) => currentPath === path;

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
      </SidebarContent>
    </Sidebar>
  );
}
