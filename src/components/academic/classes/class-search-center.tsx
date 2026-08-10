import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Plus, FileSpreadsheet, Printer } from "lucide-react";
import { useState } from "react";
import { PlaceholderForm } from "@/components/ui/placeholder-form";

export function ClassSearchCenter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search classes, teachers..." 
            className="pl-9 h-11 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-colors" 
          />
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-[160px] h-11 rounded-xl border-slate-100 bg-slate-50/50">
            <SelectValue placeholder="All Schools" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-100">
            <SelectItem value="all">All Schools</SelectItem>
            <SelectItem value="primary">Primary School</SelectItem>
            <SelectItem value="secondary">Secondary School</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[160px] h-11 rounded-xl border-slate-100 bg-slate-50/50">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-100">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="early">Early Years</SelectItem>
            <SelectItem value="lower-p">Lower Primary</SelectItem>
            <SelectItem value="upper-p">Upper Primary</SelectItem>
            <SelectItem value="junior-s">Junior Secondary</SelectItem>
            <SelectItem value="senior-s">Senior Secondary</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-100 text-slate-500 gap-2">
          <Filter size={16} />
          Filters
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-100 text-slate-500">
          <Printer size={18} />
        </Button>
        <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-100 text-slate-500">
          <FileSpreadsheet size={18} />
        </Button>
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-11 px-6 rounded-xl bg-schoolgate-green text-white hover:bg-schoolgate-green/90 font-bold gap-2 shadow-lg shadow-schoolgate-green/20"
        >
          <Plus size={18} />
          Create New Class
        </Button>
      </div>

      <PlaceholderForm 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        title="Create New Class"
        description="Add a new academic group to your school registry."
        icon={Plus}
      />
    </div>
  );
}
