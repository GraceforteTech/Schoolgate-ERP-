import { createFileRoute } from "@tanstack/react-router";
import { 
  LayoutDashboard, 
  Wallet, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronRight,
  TrendingUp,
  FileText,
  Clock,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StaffWallet } from "@/components/staff/staff-wallet";
import { StaffPersonalKpis } from "@/components/staff/staff-personal-kpis";
import { StaffActivityFeed } from "@/components/staff/staff-activity-feed";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/staff/dashboard")({
  component: StaffDashboard,
});

function StaffDashboard() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] p-4 md:p-8 pb-24">
      {/* Welcome Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-schoolgate-green-light border-4 border-white shadow-xl overflow-hidden flex items-center justify-center">
              <User size={40} className="text-schoolgate-green" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-emerald-500 border-2 border-white shadow-sm flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Welcome back, Adewale!</h1>
              <Badge className="bg-schoolgate-green text-white border-none font-black text-[10px] px-2">SENIOR TEACHER</Badge>
            </div>
            <p className="text-slate-500 mt-1 font-medium flex items-center gap-2">
              <Clock size={14} className="text-schoolgate-green" />
              Your last login was 4 hours ago from Lagos, NG.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 rounded-xl bg-white border-none shadow-sm font-bold gap-2 text-slate-600 hover:bg-slate-50">
            <Settings size={18} />
            Profile Settings
          </Button>
          <Button className="h-12 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 font-black gap-2 shadow-lg shadow-schoolgate-green/20 px-6">
            <LayoutDashboard size={18} />
            Principal Mode
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Personal KPIs */}
        <StaffPersonalKpis />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Wallet and Main Tools */}
          <div className="xl:col-span-8 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Financial Overview</h3>
                <Button variant="link" className="text-schoolgate-green font-black text-xs p-0 h-auto">View Payroll Portal</Button>
              </div>
              <StaffWallet />
            </section>

            {/* Quick Actions Grid */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "My Timetable", icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Lesson Plans", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Results Entry", icon: FileText, color: "text-purple-600", bg: "bg-purple-50" },
                { label: "Leave Request", icon: Clock, color: "text-rose-600", bg: "bg-rose-50" },
              ].map((action, i) => (
                <Card key={i} className="p-4 rounded-xl border-slate-100 shadow-sm bg-white hover:border-schoolgate-green transition-all cursor-pointer group text-center">
                  <div className={`w-12 h-12 rounded-xl ${action.bg} ${action.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon size={24} />
                  </div>
                  <span className="text-xs font-black text-slate-800">{action.label}</span>
                </Card>
              ))}
            </section>
          </div>

          {/* Right Column: Activity and Sidebar Info */}
          <div className="xl:col-span-4 space-y-8">
            <section className="h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Real-time Alerts</h3>
              </div>
              <StaffActivityFeed />
            </section>

            {/* Support/Quick Links */}
            <Card className="p-6 rounded-[14px] bg-slate-900 text-white border-none shadow-xl overflow-hidden relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-schoolgate-green rounded-full blur-3xl opacity-20" />
              <h4 className="text-sm font-black mb-2 flex items-center gap-2">
                <ExternalLink size={16} className="text-schoolgate-green" /> Need Assistance?
              </h4>
              <p className="text-xs text-slate-400 font-medium mb-4 italic">Having trouble with your payroll or portal? Reach out to HR.</p>
              <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-black text-xs h-10 rounded-lg">
                Contact HR Support
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}