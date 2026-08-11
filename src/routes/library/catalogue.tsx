import { createFileRoute } from '@tanstack/react-router';
import { 
  Book, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  QrCode, 
  Upload, 
  Download,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PlaceholderForm } from '@/components/ui/placeholder-form';

const MOCK_BOOKS = [
  { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '978-0385474542', category: 'Fiction', copies: 12, borrowed: 4, location: 'Shelf A1', status: 'Available' },
  { id: 2, title: 'Purple Hibiscus', author: 'Chimamanda Adichie', isbn: '978-1616202415', category: 'Fiction', copies: 8, borrowed: 8, location: 'Shelf A2', status: 'Borrowed' },
  { id: 3, title: 'Advanced Mathematics', author: 'Dr. K. A. Stroud', isbn: '978-0831134709', category: 'Science', copies: 25, borrowed: 10, location: 'Shelf B4', status: 'Available' },
  { id: 4, title: 'Modern Physics', author: 'Arthur Beiser', isbn: '978-0072448481', category: 'Science', copies: 15, borrowed: 2, location: 'Shelf B5', status: 'Available' },
  { id: 5, title: 'Economics for Beginners', author: 'K. Richards', isbn: '978-1409581130', category: 'Social Science', copies: 10, borrowed: 12, location: 'Shelf C1', status: 'Overdue' },
];

export const Route = createFileRoute('/library/catalogue')({
  component: BookCatalogue,
});

function BookCatalogue() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6 bg-[#F5F7FA] min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Book Catalogue</h1>
          <p className="text-muted-foreground">Manage and organize your library's physical collection.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2"><Upload className="h-4 w-4" /> Import</Button>
          <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> Export</Button>
          <Button 
            onClick={() => setIsOpen(true)}
            className="bg-[#0B6E3C] hover:bg-[#095A31] gap-2 text-white"
          ><Plus className="h-4 w-4" /> Add Book</Button>
        </div>
      </div>

      <Card className="rounded-[14px] border-none shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by title, author, or ISBN..." className="pl-10 rounded-xl" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="social">Social Science</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px] rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Book Details</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase text-center">Copies</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Location</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_BOOKS.map((book) => (
                  <tr key={book.id} className="group hover:bg-[#F8FBFA] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-9 rounded bg-gray-100 flex items-center justify-center shrink-0">
                          <Book className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{book.title}</p>
                          <p className="text-xs text-muted-foreground">{book.author} • {book.isbn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{book.category}</td>
                    <td className="p-4 text-center">
                      <div className="text-sm font-medium">{book.copies} Total</div>
                      <div className="text-[10px] text-muted-foreground">{book.borrowed} Borrowed</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="rounded-lg text-[10px] font-semibold">{book.location}</Badge>
                    </td>
                    <td className="p-4">
                      <Badge className={cn(
                        "rounded-full text-[10px] px-2",
                        book.status === 'Available' ? 'bg-green-100 text-green-700 hover:bg-green-100' :
                        book.status === 'Borrowed' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' :
                        'bg-red-100 text-red-700 hover:bg-red-100'
                      )}>
                        {book.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                          <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Details</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-blue-600"><Edit className="h-4 w-4" /> Edit</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2"><QrCode className="h-4 w-4" /> Barcode/QR</DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-red-600"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
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

      <PlaceholderForm 
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Add New Book"
        description="Register a new physical book into the library catalogue."
        icon={Book}
      />
    </div>
  );
}

