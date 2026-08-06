import { createFileRoute } from '@tanstack/react-router';
import { 
  BarChart3, 
  TrendingUp, 
  BookOpen, 
  Users, 
  AlertCircle, 
  Download, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart as PieChartIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const BORROWING_TRENDS = [
  { day: 'Mon', borrow: 45, return: 38 },
  { day: 'Tue', borrow: 52, return: 45 },
  { day: 'Wed', borrow: 68, return: 60 },
  { day: 'Thu', borrow: 59, return: 55 },
  { day: 'Fri', borrow: 85, return: 70 },
];

const CATEGORY_DISTRIBUTION = [
  { name: 'Science', value: 400 },
  { name: 'Arts', value: 300 },
  { name: 'Fiction', value: 300 },
  { name: 'History', value: 200 },
];

const COLORS = ['#0B6E3C', '#14A85C', '#1DB954', '#2ECC71'];

export const Route = createFileRoute('/library/analytics')({
  component: LibraryAnalytics,
});

function LibraryAnalytics() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Library Analytics</h1>
          <p className="text-muted-foreground">Deep dive into library usage, collection value, and member activity.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filters</Button>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[14px] border-none shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Circulation Trends</CardTitle>
            <CardDescription>Daily borrowing and returning activity across all libraries.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BORROWING_TRENDS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="borrow" name="Borrowed" stroke="#0B6E3C" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="return" name="Returned" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Category Usage</CardTitle>
            <CardDescription>Most popular book categories by loan count.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Top Readers (Student)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[
                 { name: 'Adebayo Samuel', class: 'SSS 3 Gold', books: 42, points: 840 },
                 { name: 'Chidi Okafor', class: 'SSS 2 Blue', books: 38, points: 760 },
                 { name: 'Fatima Yusuf', class: 'SSS 3 Silver', books: 35, points: 700 },
                 { name: 'Bello Aminu', class: 'JSS 3 Green', books: 31, points: 620 },
               ].map((reader, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 bg-gray-50/30">
                   <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-schoolgate-green-light text-schoolgate-green flex items-center justify-center font-bold text-sm">
                       {i + 1}
                     </div>
                     <div>
                       <p className="text-sm font-bold text-gray-900">{reader.name}</p>
                       <p className="text-xs text-muted-foreground">{reader.class}</p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-bold text-[#0B6E3C]">{reader.books} Books</p>
                     <p className="text-[10px] text-muted-foreground uppercase">{reader.points} Pts</p>
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>

        <Card className="rounded-[14px] border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Overdue Hotspots</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               {[
                 { category: 'Science Fiction', count: 18, risk: 'High' },
                 { category: 'SSS 2 Class', count: 12, risk: 'Medium' },
                 { category: 'General Studies', count: 9, risk: 'Low' },
                 { category: 'STAFF Borrowers', count: 5, risk: 'Low' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-red-50 text-red-600">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold">{item.count} items</span>
                      <Badge className={cn(
                        "text-[10px] px-2",
                        item.risk === 'High' ? 'bg-red-100 text-red-600 hover:bg-red-100' :
                        item.risk === 'Medium' ? 'bg-orange-100 text-orange-600 hover:bg-orange-100' :
                        'bg-blue-100 text-blue-600 hover:bg-blue-100'
                      )}>{item.risk} Risk</Badge>
                    </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
