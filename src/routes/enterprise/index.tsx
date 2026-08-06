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
  CheckCircle2
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Cell
} from 'recharts'

const chartData = [
  { name: 'Jan', revenue: 45, enrollment: 85, health: 92 },
  { name: 'Feb', revenue: 52, enrollment: 88, health: 91 },
  { name: 'Mar', revenue: 48, enrollment: 87, health: 94 },
  { name: 'Apr', revenue: 61, enrollment: 92, health: 95 },
  { name: 'May', revenue: 55, enrollment: 90, health: 93 },
  { name: 'Jun', revenue: 67, enrollment: 94, health: 96 },
]

const PIE_DATA = [
  { name: 'Academic', value: 400, color: '#0B6E3C' },
  { name: 'Financial', value: 300, color: '#10b981' },
  { name: 'Operational', value: 300, color: '#3b82f6' },
  { name: 'Reputation', value: 200, color: '#f59e0b' },
]

export const Route = createFileRoute('/enterprise/')({
  component: EnterpriseManagement,
})

function EnterpriseManagement() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 lg:p-8 space-y-8">
      {/* Executive Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Enterprise Management</h1>
          <p className="text-slate-500 font-medium">Corporate Strategy & Governance Intelligence Suite</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 bg-white">
            <Download size={18} className="mr-2" /> Export Reports
          </Button>
          <Button className="rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold px-6 shadow-lg shadow-schoolgate-green/20">
            <Plus size={18} className="mr-2" /> New Strategy
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-white p-1 rounded-2xl border border-slate-200 w-full overflow-x-auto inline-flex whitespace-nowrap scrollbar-hide">
          <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-schoolgate-green data-[state=active]:text-white px-6 font-bold transition-all">Command Centre</TabsTrigger>
          <TabsTrigger value="strategic" className="rounded-xl data-[state=active]:bg-schoolgate-green data-[state=active]:text-white px-6 font-bold transition-all">Strategic Planning</TabsTrigger>
          <TabsTrigger value="governance" className="rounded-xl data-[state=active]:bg-schoolgate-green data-[state=active]:text-white px-6 font-bold transition-all">Corporate Governance</TabsTrigger>
          <TabsTrigger value="audit" className="rounded-xl data-[state=active]:bg-schoolgate-green data-[state=active]:text-white px-6 font-bold transition-all">Internal Audit</TabsTrigger>
          <TabsTrigger value="risk" className="rounded-xl data-[state=active]:bg-schoolgate-green data-[state=active]:text-white px-6 font-bold transition-all">Risk & Compliance</TabsTrigger>
          <TabsTrigger value="analytics" className="rounded-xl data-[state=active]:bg-schoolgate-green data-[state=active]:text-white px-6 font-bold transition-all">Enterprise Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Executive KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard 
              title="School Health Score" 
              value="94.2%" 
              change="+2.4%" 
              trend="up" 
              icon={Activity} 
              color="emerald" 
            />
            <KPICard 
              title="Revenue Index" 
              value="₦84.2M" 
              change="+12.5%" 
              trend="up" 
              icon={TrendingUp} 
              color="blue" 
            />
            <KPICard 
              title="Operational Efficiency" 
              value="88.7%" 
              change="-1.2%" 
              trend="down" 
              icon={Zap} 
              color="amber" 
            />
            <KPICard 
              title="Staff Productivity" 
              value="91.4%" 
              change="+0.8%" 
              trend="up" 
              icon={Users} 
              color="purple" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Executive Insights */}
            <Card className="lg:col-span-2 rounded-[24px] border-none shadow-sm bg-white overflow-hidden p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">AI Executive Insights</h2>
                    <p className="text-sm text-slate-500 font-medium">Strategic intelligence for current quarter</p>
                  </div>
                </div>
                <Badge className="bg-schoolgate-green/10 text-schoolgate-green hover:bg-schoolgate-green/20 border-none px-3 py-1">Live Intelligence</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InsightItem 
                  title="Revenue Growth Opportunity" 
                  desc="Fee collection rate for Secondary classes is 15% above forecast. Consider early expansion of Year 10 capacity."
                  severity="high"
                />
                <InsightItem 
                  title="Operational Risk Alert" 
                  desc="Teacher turnover in Mathematics department is projected to increase based on current workload trends. Mitigation needed."
                  severity="medium"
                />
                <InsightItem 
                  title="Curriculum Efficiency" 
                  desc="STEM adoption across Primary 4-6 has improved student engagement by 22%. Recommend scaling to Primary 1-3."
                  severity="low"
                />
                <InsightItem 
                  title="Quality Compliance" 
                  desc="Recent inspection reports suggest 98% alignment with international standards. NECO readiness is optimal."
                  severity="low"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0B6E3C" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#0B6E3C" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="health" stroke="#0B6E3C" strokeWidth={3} fillOpacity={1} fill="url(#colorHealth)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Strategic Summary */}
            <div className="space-y-8">
              <Card className="rounded-[24px] border-none shadow-sm bg-white p-8">
                <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Target className="text-schoolgate-green" size={20} />
                  OKR Progress
                </h3>
                <div className="space-y-6">
                  <ProgressItem label="Revenue Maximization" value={82} color="bg-schoolgate-green" />
                  <ProgressItem label="Operational Excellence" value={65} color="bg-blue-500" />
                  <ProgressItem label="Brand Reputation" value={94} color="bg-purple-500" />
                  <ProgressItem label="Curriculum Innovation" value={48} color="bg-amber-500" />
                </div>
                <Button variant="ghost" className="w-full mt-8 rounded-xl font-bold text-slate-500 hover:bg-slate-50">
                  View OKR Details <ArrowRight size={16} className="ml-2" />
                </Button>
              </Card>

              <Card className="rounded-[24px] border-none shadow-sm bg-slate-900 text-white p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck size={120} />
                </div>
                <h3 className="text-lg font-bold mb-2 z-10 relative">School Health Score</h3>
                <p className="text-4xl font-black mb-4 z-10 relative">94.2</p>
                <div className="h-2 w-full bg-white/10 rounded-full mb-4 z-10 relative overflow-hidden">
                  <div className="h-full bg-schoolgate-green w-[94.2%]" />
                </div>
                <p className="text-xs text-slate-400 font-medium z-10 relative">
                  Performance is <span className="text-emerald-400">Excellent</span> based on 452 distinct operational data points.
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function KPICard({ title, value, change, trend, icon: Icon, color }: any) {
  const colorMap: any = {
    emerald: 'bg-emerald-50 text-emerald-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <Card className="rounded-[24px] border-none shadow-sm bg-white p-6 hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110", colorMap[color])}>
          <Icon size={20} />
        </div>
        <Badge className={cn(
          "bg-transparent border-none font-bold",
          trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
        )}>
          {change}
        </Badge>
      </div>
      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </Card>
  )
}

function InsightItem({ title, desc, severity }: any) {
  const severityMap: any = {
    high: 'border-l-rose-500 bg-rose-50/30',
    medium: 'border-l-amber-500 bg-amber-50/30',
    low: 'border-l-emerald-500 bg-emerald-50/30',
  }

  return (
    <div className={cn("p-5 rounded-2xl border-l-4 border border-slate-100", severityMap[severity])}>
      <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  )
}

function ProgressItem({ label, value, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-900">{value}%</span>
      </div>
      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
