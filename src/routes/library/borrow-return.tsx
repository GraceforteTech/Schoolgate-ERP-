import { createFileRoute } from '@tanstack/react-router';
import { 
  User, 
  Book, 
  Calendar, 
  Search, 
  Plus, 
  ArrowRightLeft, 
  History, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  QrCode,
  Receipt,
  RotateCcw,
  Ban
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_LOANS = [
  { id: 1, borrower: 'Adebayo Samuel', id_num: 'STU/2024/001', book: 'Things Fall Apart', borrow_date: '2024-05-10', due_date: '2024-05-24', status: 'Active', fine: 0 },
  { id: 2, borrower: 'Chidi Okafor', id_num: 'STU/2024/042', book: 'Purple Hibiscus', borrow_date: '2024-05-01', due_date: '2024-05-15', status: 'Overdue', fine: 500 },
  { id: 3, borrower: 'Mrs. Oluchi', id_num: 'STA/2020/015', book: 'Advanced Mathematics', borrow_date: '2024-05-18', due_date: '2024-06-01', status: 'Active', fine: 0 },
  { id: 4, borrower: 'Bello Aminu', id_num: 'STU/2024/102', book: 'Modern Physics', borrow_date: '2024-04-20', due_date: '2024-05-04', status: 'Returned', fine: 0 },
];

export const Route = createFileRoute('/library/borrow-return')({
  component: BorrowReturnCentre,
});

function BorrowReturnCentre() {
  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Borrow & Return Centre</h1>
          <p className="text-muted-foreground">Manage book circulation, loans, and returns.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2"><QrCode className="h-4 w-4" /> Scan Code</Button>
          <Button className="bg-[#0B6E3C] hover:bg-[#095A31] gap-2"><Plus className="h-4 w-4" /> Issue Book</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <ArrowRightLeft className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Active Loans</p>
              <h3 className="text-xl font-bold">1,840</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Overdue</p>
              <h3 className="text-xl font-bold">145</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Returns Today</p>
              <h3 className="text-xl font-bold">32</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[14px] border-none shadow-sm">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
              <History className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-semibold">Reservations</p>
              <h3 className="text-xl font-bold">255</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[14px] border-none shadow-sm">
        <CardHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Loan Records</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search borrower or book..." className="pl-10 rounded-xl" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Borrower</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Book</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Dates</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Fine</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_LOANS.map((loan) => (
                  <tr key={loan.id} className="group hover:bg-[#F8FBFA] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{loan.borrower}</p>
                          <p className="text-[10px] text-muted-foreground uppercase">{loan.id_num}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm font-medium">{loan.book}</p>
                    </td>
                    <td className="p-4">
                      <div className="text-xs"><span className="text-muted-foreground">Issued:</span> {loan.borrow_date}</div>
                      <div className="text-xs mt-1 font-semibold"><span className="text-muted-foreground font-normal">Due:</span> {loan.due_date}</div>
                    </td>
                    <td className="p-4">
                      <span className={cn("text-sm font-bold", loan.fine > 0 ? 'text-red-600' : 'text-gray-400')}>
                        ₦{loan.fine}
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge className={cn(
                        "rounded-full text-[10px] px-2",
                        loan.status === 'Active' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                        loan.status === 'Overdue' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                        'bg-gray-100 text-gray-600 hover:bg-gray-100'
                      )}>
                        {loan.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl">
                          <DropdownMenuItem className="gap-2 text-green-600"><RotateCcw className="h-4 w-4" /> Return Book</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Clock className="h-4 w-4" /> Renew Loan</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><Receipt className="h-4 w-4" /> Print Receipt</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-orange-600"><Ban className="h-4 w-4" /> Waive Fine</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
