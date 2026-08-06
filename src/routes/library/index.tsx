import { createFileRoute } from '@tanstack/react-router';
import { 
  Library, 
  Book, 
  Users as UsersIcon, 
  History, 
  BarChart3, 
  Globe, 
  Plus, 
  Download, 
  Search,
  BookOpen,
  UserCheck,
  UserX,
  AlertCircle,
  PiggyBank,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// --- MOCK DATA ---
const KPI_DATA = [
  { label: 'Total Books', value: '12,450', icon: Book, trend: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Available Books', value: '10,210', icon: UserCheck, trend: '82%', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Borrowed Books', value: '1,840', icon: BookOpen, trend: '15%', color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Overdue Books', value: '145', icon: AlertCircle, trend: '1.2%', color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Reserved Books', value: '255', icon: History, trend: '+5%', color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Total Members', value: '2,840', icon: UsersIcon, trend: '+85', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Student Members', value: '2,650', icon: UsersIcon, trend: '93%', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { label: 'Staff Members', value: '190', icon: UsersIcon, trend: '7%', color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Fines Collected', value: '₦42,500', icon: PiggyBank, trend: '+₦2.4k', color: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'New Books Added', value: '120', icon: Plus, trend: 'This Month', color: 'text-emerald-600', bg: 'bg-emerald-50' },
];

const RECENT_ACTIVITIES = [
  { id: 1, user: 'Adebayo Samuel', action: 'Borrowed "Things Fall Apart"', time: '2 mins ago', type: 'borrow' },
  { id: 2, user: 'Chidi Okafor', action: 'Returned "Purple Hibiscus"', time: '15 mins ago', type: 'return' },
  { id: 3, user: 'Mrs. Oluchi (Staff)', action: 'Reserved "Advanced Mathematics"', time: '45 mins ago', type: 'reserve' },
  { id: 4, user: 'System', action: 'Added 5 new e-books to Digital Library', time: '2 hours ago', type: 'system' },
  { id: 5, user: 'Bello Aminu', action: 'Paid fine: ₦500 (Overdue)', time: '3 hours ago', type: 'fine' },
];

const TREND_DATA = [
  { month: 'Jan', borrow: 400, return: 350 },
  { month: 'Feb', borrow: 450, return: 400 },
  { month: 'Mar', borrow: 600, return: 500 },
  { month: 'Apr', borrow: 550, return: 520 },
  { month: 'May', borrow: 700, return: 600 },
  { month: 'Jun', borrow: 800, return: 750 },
];

export const Route = createFileRoute('/library/')({
  component: LibraryDashboard,
});

function LibraryDashboard() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F5F7FA] min-h-screen animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Library Management</h1>
          <p className="text-muted-foreground">Manage books, members and library activities efficiently.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export Report
          </Button>
          <Button className="bg-[#0B6E3C] hover:bg-[#095A31] gap-2">
            <Plus className="h-4 w-4" /> Add New Book
          </Button>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="bg-gradient-to-r from-[#0B6E3C] to-[#14A85C] rounded-[14px] p-6 text-white shadow-lg relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center animate-pulse">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Library Assistant</h3>
              <p className="text-white/80 max-w-md">Discover resources, get book recommendations, and manage your reading list with AI-powered insights.</p>
            </div>
          </div>
          <Button className="bg-white text-[#0B6E3C] hover:bg-white/90 font-semibold gap-2">
            Ask AI Assistant <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-500"></div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {KPI_DATA.map((kpi, index) => (
          <Card key={index} className="rounded-[14px] border-none shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-lg", kpi.bg)}>
                  <kpi.icon className={cn("h-5 w-5", kpi.color)} />
                </div>
                <Badge variant="secondary" className="text-[10px] font-medium bg-gray-100 text-gray-600 border-none">
                  {kpi.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold tracking-tight">{kpi.value}</h4>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle Column */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList className="bg-white p-1 rounded-xl shadow-sm h-auto border border-gray-100">
                <TabsTrigger value="overview" className="rounded-lg px-4 py-2 data-[state=active]:bg-[#0B6E3C] data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="catalogue" className="rounded-lg px-4 py-2 data-[state=active]:bg-[#0B6E3C] data-[state=active]:text-white">Catalogue</TabsTrigger>
                <TabsTrigger value="borrow" className="rounded-lg px-4 py-2 data-[state=active]:bg-[#0B6E3C] data-[state=active]:text-white">Borrow & Return</TabsTrigger>
                <TabsTrigger value="digital" className="rounded-lg px-4 py-2 data-[state=active]:bg-[#0B6E3C] data-[state=active]:text-white">Digital Library</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-6 animate-in slide-in-from-left-4 duration-500 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Borrowing Trends Chart */}
                <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-[#0B6E3C]" />
                      Borrowing Trends
                    </CardTitle>
                    <CardDescription>Monthly borrowing vs returns analytics</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={TREND_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          cursor={{ fill: '#F5F7FA' }}
                        />
                        <Bar dataKey="borrow" name="Borrowed" fill="#0B6E3C" radius={[4, 4, 0, 0]} barSize={12} />
                        <Bar dataKey="return" name="Returned" fill="#14A85C" radius={[4, 4, 0, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Popular Categories Chart */}
                <Card className="rounded-[14px] border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                      <Globe className="h-5 w-5 text-[#0B6E3C]" />
                      Popular Categories
                    </CardTitle>
                    <CardDescription>Distribution of library collection</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[250px] pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Science', value: 35 },
                            { name: 'Fiction', value: 25 },
                            { name: 'History', value: 20 },
                            { name: 'Maths', value: 20 },
                          ]}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#0B6E3C" />
                          <Cell fill="#14A85C" />
                          <Cell fill="#1DB954" />
                          <Cell fill="#2ECC71" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Featured Books / Catalogue Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg">Top Borrowed Books</h3>
                  <Button variant="link" className="text-[#0B6E3C] font-semibold p-0 h-auto">View All</Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="aspect-[3/4] rounded-[14px] bg-gray-200 mb-2 overflow-hidden relative shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
                        <img 
                          src={`https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop`} 
                          alt="Book Cover"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <Button size="sm" className="w-full bg-white text-[#0B6E3C] hover:bg-white/90">Borrow</Button>
                        </div>
                      </div>
                      <h4 className="font-bold text-sm line-clamp-1">Things Fall Apart</h4>
                      <p className="text-xs text-muted-foreground">Chinua Achebe</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="catalogue" className="animate-in slide-in-from-left-4 duration-500 mt-0">
               <Card className="rounded-[14px] border-none shadow-sm min-h-[500px] flex items-center justify-center text-muted-foreground italic">
                 Book Catalogue Content Placeholder
               </Card>
            </TabsContent>

            <TabsContent value="borrow" className="animate-in slide-in-from-left-4 duration-500 mt-0">
               <Card className="rounded-[14px] border-none shadow-sm min-h-[500px] flex items-center justify-center text-muted-foreground italic">
                 Borrow & Return Centre Content Placeholder
               </Card>
            </TabsContent>

            <TabsContent value="digital" className="animate-in slide-in-from-left-4 duration-500 mt-0">
               <Card className="rounded-[14px] border-none shadow-sm min-h-[500px] flex items-center justify-center text-muted-foreground italic">
                 Digital Library Content Placeholder
               </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column: Activities & Notifications */}
        <div className="space-y-6">
          {/* Quick Stats / Proprietor Insight Preview */}
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-[#F8FBFA] border-b border-gray-50">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#0B6E3C]" />
                Executive Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Book Utilization Rate</span>
                <span className="font-bold text-[#0B6E3C]">78.4%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0B6E3C] h-full rounded-full w-[78.4%]"></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Reading Activity Score</span>
                <span className="font-bold text-blue-600">High (8.2)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Overdue Rate</span>
                <span className="font-bold text-red-600">1.2%</span>
              </div>
              <Button variant="outline" size="sm" className="w-full text-xs font-semibold border-[#0B6E3C] text-[#0B6E3C] hover:bg-[#0B6E3C] hover:text-white transition-all">
                Full Proprietor Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-50 flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <History className="h-4 w-4 text-[#0B6E3C]" />
                Recent Activities
              </CardTitle>
              <Badge variant="outline" className="text-[10px] text-muted-foreground border-gray-200">Live</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <div className="divide-y divide-gray-50">
                  {RECENT_ACTIVITIES.map((activity) => (
                    <div key={activity.id} className="p-4 flex gap-3 hover:bg-[#F8FBFA] transition-colors cursor-pointer">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                        activity.type === 'borrow' ? 'bg-blue-50 text-blue-600' :
                        activity.type === 'return' ? 'bg-green-50 text-green-600' :
                        activity.type === 'reserve' ? 'bg-purple-50 text-purple-600' :
                        activity.type === 'fine' ? 'bg-red-50 text-red-600' :
                        'bg-gray-50 text-gray-600'
                      )}>
                        {activity.type === 'borrow' ? <BookOpen className="h-4 w-4" /> :
                         activity.type === 'return' ? <UserCheck className="h-4 w-4" /> :
                         activity.type === 'reserve' ? <History className="h-4 w-4" /> :
                         activity.type === 'fine' ? <PiggyBank className="h-4 w-4" /> :
                         <AlertCircle className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{activity.user}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{activity.action}</p>
                        <span className="text-[10px] text-muted-foreground mt-1 block uppercase tracking-wider">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 bg-gray-50/50">
                <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-[#0B6E3C]">
                  View All Log History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
