import { createFileRoute } from '@tanstack/react-router'
import { 
  ShieldCheck, 
  TrendingUp, 
  Activity, 
  Brain, 
  Target, 
  Users, 
  FileText, 
  CheckSquare, 
  Search, 
  AlertTriangle,
  Zap,
  ArrowRight,
  Plus,
  Filter,
  Download,
  Calendar,
  Eye,
  Settings,
  MoreVertical,
  CheckCircle2,
  Clock,
  Cloud,
  Wallet,
  CreditCard,
  School,
  BookOpen,
  GraduationCap,
  Bus,
  Library,
  Package,
  UserCheck,
  UserX,
  MessageSquare,
  ShieldAlert,
  Bell,
  Mail,
  Phone,
  Printer,
  ChevronRight,
  History,
  AlertCircle,
  Cake,
  Gift,
  RefreshCw
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts'
import { useState, useEffect } from 'react'
import { PlaceholderForm } from '@/components/ui/placeholder-form'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useServerFn } from '@tanstack/react-start'
import { getExecutiveDashboardStats } from '@/lib/onboarding.functions'
import { toast } from 'sonner'

export const Route = createFileRoute('/enterprise/')({
  component: EnterpriseCommandCenter,
})

const REVENUE_EXPENSE_DATA = [
  { name: 'Mon', revenue: 4500000, expenses: 1200000 },
  { name: 'Tue', revenue: 5200000, expenses: 1500000 },
  { name: 'Wed', revenue: 4800000, expenses: 1100000 },
  { name: 'Thu', revenue: 6100000, expenses: 2100000 },
  { name: 'Fri', revenue: 5500000, expenses: 1300000 },
  { name: 'Sat', revenue: 2700000, expenses: 800000 },
  { name: 'Sun', revenue: 1500000, expenses: 400000 },
]

const MONTHLY_TREND_DATA = [
  { name: 'Jan', revenue: 42000000 },
  { name: 'Feb', revenue: 45000000 },
  { name: 'Mar', revenue: 48000000 },
  { name: 'Apr', revenue: 52000000 },
  { name: 'May', revenue: 55000000 },
  { name: 'Jun', revenue: 58000000 },
]

const ENROLLMENT_TREND = [
  { name: '2020', students: 850 },
  { name: '2021', students: 920 },
  { name: '2022', students: 1050 },
  { name: '2023', students: 1180 },
  { name: '2024', students: 1240 },
]

const TEXTBOOK_ANALYTICS_DATA = [
  {
    class: "JSS 1",
    subject: "English Language",
    delivered: 30,
    sold: 25,
    unsold: 5,
    worth: 75000,
    profit: 15000,
  },
  {
    class: "JSS 1",
    subject: "Mathematics",
    delivered: 30,
    sold: 28,
    unsold: 2,
    worth: 84000,
    profit: 16800,
  },
  {
    class: "JSS 2",
    subject: "Basic Science",
    delivered: 25,
    sold: 20,
    unsold: 5,
    worth: 60000,
    profit: 12000,
  },
  {
    class: "SS 1",
    subject: "Physics",
    delivered: 20,
    sold: 15,
    unsold: 5,
    worth: 75000,
    profit: 15000,
  },
]

function EnterpriseCommandCenter() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formConfig, setFormConfig] = useState({ title: '', description: '', icon: Users })

  const openForm = (title: string, description: string, icon: any) => {
    setFormConfig({ title, description, icon })
    setIsFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-page-background p-4 lg:p-8 space-y-8 pb-20">
      {/* 1. Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-card p-6 rounded-[14px] shadow-sm border border-border">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-black text-foreground tracking-tight">Executive Command Center</h1>
            <Badge className="bg-schoolgate-green/10 text-schoolgate-green border-none px-3 py-1 font-black">Live Performance</Badge>
          </div>
          <p className="text-muted-foreground font-medium">Real-time overview of every critical activity in your school.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 xl:gap-8 items-center">
          <HeaderMetadata icon={Calendar} label="Date" value={new Date().toLocaleDateString()} />
          <HeaderMetadata icon={Clock} label="Time" value="09:00 AM" />
          <HeaderMetadata icon={ShieldCheck} label="Session" value="2023/2024" />
          <HeaderMetadata icon={Target} label="Term" value="Second Term" />
          <HeaderMetadata icon={Cloud} label="Weather" value="28°C Sunny" />
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <div className="w-10 h-10 rounded-full bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Welcome back,</p>
              <p className="text-sm font-black text-foreground leading-none">Proprietor</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Executive Alert Center (Highlight items requiring immediate attention) */}
      <Card className="rounded-[14px] border-none shadow-sm bg-rose-50 border-rose-100 overflow-hidden">
        <CardHeader className="bg-rose-100/50 py-3 px-6 flex flex-row items-center justify-between border-b border-rose-100">
          <div className="flex items-center gap-2">
            <ShieldAlert className="text-rose-600" size={20} />
            <CardTitle className="text-sm font-black text-rose-900 uppercase tracking-wider">Executive Alert Center</CardTitle>
          </div>
          <Badge className="bg-rose-600 text-white border-none font-black">12 Urgent Actions</Badge>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <AlertItem label="Dr. Sarah Adebayo (Staff) birthday today!" isCelebration />
            <AlertItem label="35 Students with outstanding fees" />
            <AlertItem label="6 Teachers yet to submit lesson notes" />
            <AlertItem label="SS2 Mathematics scores incomplete" />
            <AlertItem label="Bus #3 Due For Maintenance" />
            <AlertItem label="Inventory: HB Pencils Running Low" />
            <AlertItem label="Missing Cognitive Assessment - JSS1" />
            <AlertItem label="Expiring Staff Documents (3)" />
            <AlertItem label="2 Pending Expense Approvals (>₦50k)" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Dashboard Content */}
        <div className="xl:col-span-9 space-y-8">
          
          {/* 3. Executive KPI Cards Sections */}
          <section className="space-y-6">
            <SectionHeader title="Financial Performance" icon={Wallet} color="text-emerald-600" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard title="Today's Revenue" value="₦4.2M" change="+12%" icon={TrendingUp} color="emerald" />
              <KPICard title="Today's Expenses" value="₦1.2M" change="+5%" icon={TrendingUp} color="rose" />
              <KPICard title="Today's Net Income" value="₦3.0M" change="+18%" icon={Zap} color="emerald" />
              <KPICard title="Collection Rate" value="71.1%" change="+2.4%" icon={Target} color="blue" />
              <KPICard title="Outstanding Fees" value="₦13.1M" change="-5%" icon={AlertCircle} color="amber" />
              <KPICard title="Expected Revenue" value="₦45.2M" change="+8%" icon={TrendingUp} color="blue" />
              <KPICard title="This Month Revenue" value="₦28.4M" change="+10%" icon={TrendingUp} color="emerald" />
              <KPICard title="Payroll Due" value="₦8.2M" change="Next week" icon={Clock} color="indigo" />
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeader title="Academic & Student Lifecycle" icon={GraduationCap} color="text-blue-600" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard title="Total Students" value="1,240" change="+42" icon={Users} color="blue" />
              <KPICard title="Student Attendance" value="94.2%" change="Today" icon={UserCheck} color="emerald" />
              <KPICard title="Staff Attendance" value="98.5%" change="Today" icon={UserCheck} color="emerald" />
              <KPICard title="Lesson Notes" value="78/85" change="Submitted" icon={FileText} color="amber" />
              <KPICard title="New Admissions" value="12" change="This week" icon={Plus} color="indigo" />
              <KPICard title="Result Completion" value="82%" change="Term 2" icon={CheckCircle2} color="emerald" />
              <KPICard title="Books Borrowed" value="45" change="Today" icon={Library} color="blue" />
              <KPICard title="Low Stock Items" value="12" change="Alert" icon={Package} color="rose" />
            </div>
          </section>

          <section className="space-y-6">
            <SectionHeader title="Operations & Logistics" icon={Bus} color="text-amber-600" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard title="Vehicles Active" value="14/15" change="1 Maintenance" icon={Bus} color="amber" />
              <KPICard title="Students Picked Up" value="412" change="Today" icon={Users} color="emerald" />
              <KPICard title="Transport Revenue" value="₦1.2M" change="This month" icon={TrendingUp} color="emerald" />
              <KPICard title="Salary Paid" value="₦7.8M" change="Last month" icon={Wallet} color="blue" />
              <KPICard title="Visitors Today" value="28" change="+4" icon={Users} color="indigo" />
              <KPICard title="Pending Approvals" value="4" change="High Priority" icon={CheckSquare} color="rose" />
              <KPICard title="Upcoming Birthdays" value="8" change="Staff & Students" icon={Cake} color="purple" />
              <KPICard title="Overdue Books" value="15" change="Alert" icon={AlertCircle} color="rose" />
            </div>
          </section>

          {/* 4. Executive Analytics */}
          <section className="space-y-6">
            <SectionHeader title="Executive Analytics & Trends" icon={Activity} color="text-schoolgate-green" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="rounded-[14px] border-none shadow-sm bg-card p-6">
                <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-black text-foreground uppercase tracking-wider">Revenue vs Expenses</CardTitle>
                    <p className="text-xs text-slate-400 font-bold">Daily performance this week</p>
                  </div>
                  <Badge variant="outline" className="font-bold border-border text-muted-foreground">Daily</Badge>
                </CardHeader>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_EXPENSE_DATA}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} tickFormatter={(value) => `₦${(value/1000000).toFixed(1)}M`} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                      <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} fillOpacity={0} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="rounded-[14px] border-none shadow-sm bg-card p-6">
                <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-black text-foreground uppercase tracking-wider">Student Enrollment Trend</CardTitle>
                    <p className="text-xs text-slate-400 font-bold">Historical growth per session</p>
                  </div>
                  <Badge variant="outline" className="font-bold border-border text-muted-foreground">Sessionly</Badge>
                </CardHeader>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ENROLLMENT_TREND}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                      <Bar dataKey="students" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </section>

          {/* 4.5 Textbook & Store Analytics */}
          <section className="space-y-6">
            <SectionHeader title="Textbook & Store Analytics" icon={BookOpen} color="text-indigo-600" />
            <Card className="rounded-[14px] border-none shadow-sm bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted border-b border-border">
                      <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">Class & Subject</th>
                      <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Delivered</th>
                      <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Sold</th>
                      <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">Unsold</th>
                      <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Worth</th>
                      <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-right">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {TEXTBOOK_ANALYTICS_DATA.map((item, idx) => (
                      <tr key={idx} className="hover:bg-muted/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                              <BookOpen size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-black text-foreground leading-tight">{item.subject}</p>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.class}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Badge variant="outline" className="bg-muted border-border font-bold text-muted-foreground">{item.delivered} copies</Badge>
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-emerald-600">{item.sold}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={cn("text-sm font-bold", item.unsold > 5 ? "text-muted-foreground" : "text-amber-500")}>{item.unsold}</span>
                        </td>
                        <td className="px-6 py-4 text-right font-black text-foreground">₦{item.worth.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-black text-schoolgate-green">₦{item.profit.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        </div>

        {/* Sidebar Intelligence & Actions */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* 5. AI Executive Assistant */}
          <Card className="rounded-[14px] border-none shadow-sm bg-slate-900 text-white overflow-hidden p-6 relative">
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Brain size={120} />
            </div>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-yellow-400" size={20} />
              <h3 className="text-lg font-black tracking-tight">AI Executive Assistant</h3>
            </div>
            <div className="space-y-4 relative z-10">
              <InsightCard text="Revenue is 12% below target this week. Consider fee reminders." type="warning" />
              <InsightCard text="SS2 Mathematics scores are incomplete. 12 students pending." type="info" />
              <InsightCard text="Fuel expenses increased by 18% vs last week. Audit needed." type="warning" />
              <InsightCard text="Student attendance dropped today to 94.2%." type="info" />
              <InsightCard text="Primary revenue exceeded target by 12%. Excellent collection!" type="success" />
            </div>
            <Button variant="outline" className="w-full mt-6 bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold rounded-xl h-11">
              Ask AI Anything <ArrowRight size={16} className="ml-2" />
            </Button>
          </Card>

          {/* 6. Executive Quick Actions */}
          <Card className="rounded-[14px] border-none shadow-sm bg-white p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Zap className="text-schoolgate-green" size={16} />
                Executive Quick Actions
              </CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 gap-2">
              <QuickActionButton 
                icon={CreditCard} 
                label="Collect School Fees" 
                onClick={() => openForm("Collect School Fees", "Process tuition and sundry fee payments.", CreditCard)} 
              />
              <QuickActionButton 
                icon={Plus} 
                label="Admit Student" 
                onClick={() => openForm("Admit Student", "Register a new student into the institution.", Plus)} 
              />
              <QuickActionButton 
                icon={UserPlus} 
                label="Register Staff" 
                onClick={() => openForm("Register Staff", "Onboard new academic or non-academic staff.", UserPlus)} 
              />
              <QuickActionButton 
                icon={Save} 
                label="Post Scores" 
                onClick={() => openForm("Post Scores", "Record academic assessments and exam marks.", Save)} 
              />
              <QuickActionButton 
                icon={CheckCircle2} 
                label="Approve Results" 
                onClick={() => openForm("Approve Results", "Review and authorize final term results.", CheckCircle2)} 
              />
              <QuickActionButton 
                icon={FileText} 
                label="Approve Lesson Notes" 
                onClick={() => openForm("Approve Lesson Notes", "Review teacher lesson plans and schemes of work.", FileText)} 
              />
              <QuickActionButton 
                icon={TrendingUp} 
                label="Approve Expenses" 
                onClick={() => openForm("Approve Expenses", "Authorize pending financial expenditure requests.", TrendingUp)} 
              />
              <div className="grid grid-cols-3 gap-2 mt-2">
                <Button variant="outline" className="flex-col h-16 rounded-xl border-slate-100 font-bold text-[10px] gap-1 bg-slate-50">
                  <MessageSquare size={16} /> SMS
                </Button>
                <Button variant="outline" className="flex-col h-16 rounded-xl border-slate-100 font-bold text-[10px] gap-1 bg-slate-50">
                  <Mail size={16} /> Email
                </Button>
                <Button variant="outline" className="flex-col h-16 rounded-xl border-slate-100 font-bold text-[10px] gap-1 bg-slate-50">
                  <Phone size={16} /> WhatsApp
                </Button>
              </div>
            </div>
          </Card>

          {/* 7. Upcoming Events */}
          <Card className="rounded-[14px] border-none shadow-sm bg-white p-6">
            <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="text-indigo-600" size={16} />
                Upcoming Events
              </CardTitle>
              <Badge variant="outline" className="text-[10px] border-slate-100">August 2024</Badge>
            </CardHeader>
            <div className="space-y-4">
              <EventItem date="Aug 08" title="Mid-Term Examinations" category="Academics" />
              <EventItem date="Aug 12" title="PTA General Meeting" category="Meeting" />
              <EventItem date="Aug 15" title="Fee Payment Deadline" category="Finance" color="rose" />
              <EventItem date="Aug 20" title="School Founders Day" category="Holiday" />
              <EventItem date="Today" title="Staff Strategy Meeting" category="Meeting" color="schoolgate-green" />
            </div>
          </Card>

          {/* 7.5 Upcoming Celebrations (Birthdays) */}
          <Card className="rounded-[14px] border-none shadow-sm bg-white p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Cake size={80} className="text-purple-600" />
            </div>
            <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between relative z-10">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Cake className="text-purple-600" size={16} />
                Upcoming Celebrations
              </CardTitle>
              <Badge className="bg-purple-50 text-purple-600 border-none font-black text-[10px] px-2">8 Birthdays</Badge>
            </CardHeader>
            <div className="space-y-2 relative z-10">
               <BirthdayItem name="Dr. Sarah Adebayo" role="Staff (Physics)" date="Today" isToday />
               <BirthdayItem name="Olawale Johnson" role="Student (SS 3)" date="Tomorrow" />
               <BirthdayItem name="Mrs. Blessing Udoh" role="Staff (Admin)" date="Aug 10" />
               <BirthdayItem name="Chidi Okafor" role="Student (JSS 2)" date="Aug 12" />
               <Button variant="ghost" className="w-full h-8 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg mt-2">
                 View All Celebrations <ChevronRight size={12} className="ml-1" />
               </Button>
            </div>
          </Card>

          {/* 8. Visitors Today */}
          <Card className="rounded-[14px] border-none shadow-sm bg-white p-6">
            <CardHeader className="p-0 mb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Visitors Today</CardTitle>
              <span className="text-xl font-black text-slate-900">28</span>
            </CardHeader>
            <div className="space-y-3">
              <VisitorStat label="Parent Visits" value="18" percentage={64} />
              <VisitorStat label="Official Visitors" value="6" percentage={21} />
              <VisitorStat label="Prospects" value="4" percentage={15} />
            </div>
          </Card>

        </div>
      </div>

      <PlaceholderForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        title={formConfig.title} 
        description={formConfig.description} 
        icon={formConfig.icon} 
      />
    </div>
  )
}

function HeaderMetadata({ icon: Icon, label, value, isClientOnly }: any) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-slate-400" />
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</span>
      </div>
      <p className="text-sm font-black text-slate-800 leading-none">
        {isClientOnly && !isMounted ? "--:--" : value}
      </p>
    </div>
  )
}

function SectionHeader({ title, icon: Icon, color }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg bg-white shadow-sm border border-slate-100", color)}>
        <Icon size={18} />
      </div>
      <h3 className="text-lg font-black text-slate-800 tracking-tight">{title}</h3>
      <div className="h-px bg-slate-200 flex-1 ml-4" />
    </div>
  )
}

function KPICard({ title, value, change, trend, icon: Icon, color }: any) {
  const colorMap: any = {
    emerald: 'bg-emerald-50 text-emerald-600',
    rose: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <Card className="rounded-[14px] border-none shadow-sm bg-white p-5 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", colorMap[color])}>
          <Icon size={20} />
        </div>
        <div className={cn(
          "text-[10px] font-black px-2 py-1 rounded-lg flex items-center gap-1",
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        )}>
          {change.startsWith('+') || change.startsWith('-') ? (
            <>
              {change.startsWith('+') ? <TrendingUp size={10} /> : <ArrowRight size={10} className="rotate-90" />}
              {change}
            </>
          ) : change}
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black text-slate-900 tracking-tighter">{value}</p>
    </Card>
  )
}

function AlertItem({ label, isCelebration }: { label: string, isCelebration?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 p-2 rounded-xl border transition-colors cursor-pointer",
      isCelebration 
        ? "bg-purple-50 border-purple-200/50 hover:bg-purple-100/50" 
        : "bg-white/50 border-rose-200/50 hover:bg-white"
    )}>
      {isCelebration ? (
        <Cake size={14} className="text-purple-500 shrink-0" />
      ) : (
        <ShieldAlert size={14} className="text-rose-500 shrink-0" />
      )}
      <span className={cn(
        "text-xs font-bold truncate",
        isCelebration ? "text-purple-700" : "text-slate-700"
      )}>{label}</span>
      <ChevronRight size={14} className={cn("ml-auto", isCelebration ? "text-purple-300" : "text-slate-300")} />
    </div>
  )
}

function InsightCard({ text, type }: { text: string, type: 'warning' | 'info' | 'success' }) {
  const colors = {
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    success: 'bg-schoolgate-green/10 text-schoolgate-green border-schoolgate-green/20'
  }

  return (
    <div className={cn("p-3 rounded-xl border text-xs font-medium leading-relaxed", colors[type])}>
      {text}
    </div>
  )
}

function QuickActionButton({ icon: Icon, label, onClick }: any) {
  return (
    <Button 
      onClick={onClick}
      variant="outline" 
      className="w-full justify-start h-11 rounded-xl border-slate-100 bg-slate-50 hover:bg-schoolgate-green-light hover:text-schoolgate-green hover:border-schoolgate-green transition-all font-bold text-xs gap-3"
    >
      <div className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center">
        <Icon size={14} />
      </div>
      {label}
    </Button>
  )
}

function BirthdayItem({ name, role, date, isToday }: any) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-2.5 rounded-xl transition-all cursor-pointer group border border-transparent hover:bg-slate-50",
      isToday && "bg-purple-50 border-purple-100 hover:bg-purple-100/50"
    )}>
      <div className={cn(
        "h-9 w-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
        isToday ? "bg-white text-purple-600" : "bg-slate-100 text-slate-400 group-hover:text-purple-600 group-hover:bg-white"
      )}>
        {isToday ? <Cake size={16} /> : <Gift size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-black text-slate-900 truncate tracking-tight">{name}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">{role}</p>
      </div>
      <Badge variant="outline" className={cn(
        "text-[8px] font-black border-slate-200 px-1.5 h-4",
        isToday ? "bg-purple-600 text-white border-none shadow-sm shadow-purple-200" : "text-slate-400"
      )}>
        {date}
      </Badge>
    </div>
  )
}

function EventItem({ date, title, category, color }: any) {
  const textColor = color === 'rose' ? 'text-rose-600' : color === 'schoolgate-green' ? 'text-schoolgate-green' : 'text-indigo-600'
  const bgColor = color === 'rose' ? 'bg-rose-50' : color === 'schoolgate-green' ? 'bg-schoolgate-green-light' : 'bg-indigo-50'

  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className={cn("w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-100", bgColor)}>
        <span className={cn("text-[10px] font-black uppercase tracking-tighter", textColor)}>{date.split(' ')[0]}</span>
        <span className={cn("text-lg font-black leading-none mt-0.5", textColor)}>{date.split(' ')[1] || date}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-slate-900 truncate group-hover:text-schoolgate-green transition-colors">{title}</p>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{category}</p>
      </div>
    </div>
  )
}

function VisitorStat({ label, value, percentage }: any) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-900">{value}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

const UserPlus = (props: any) => <Users {...props} />
const Save = (props: any) => <FileText {...props} />
