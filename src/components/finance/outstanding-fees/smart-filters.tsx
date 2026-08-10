import React from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  FileText, 
  Printer, 
  RefreshCw, 
  X,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export function SmartFilters({ onFilterChange }: { onFilterChange?: (filters: any) => void }) {
  return (
    <Card className="p-4 border-none bg-white rounded-[14px] shadow-sm flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* Session & Term */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Session</label>
          <Select defaultValue="2023/2024">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Select Session" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023/2024">2023/2024</SelectItem>
              <SelectItem value="2022/2023">2022/2023</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Term</label>
          <Select defaultValue="first">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first">First Term</SelectItem>
              <SelectItem value="second">Second Term</SelectItem>
              <SelectItem value="third">Third Term</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* School & Class */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">School</label>
          <Select defaultValue="both">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Select School" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Class</label>
          <Select>
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="All Classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jss1">JSS 1</SelectItem>
              <SelectItem value="jss2">JSS 2</SelectItem>
              <SelectItem value="pry1">Primary 1</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Range & Status */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Outstanding Range</label>
          <Select>
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="All Ranges" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50k">₦0 - ₦50,000</SelectItem>
              <SelectItem value="50k-200k">₦50,000 - ₦200,000</SelectItem>
              <SelectItem value="200k+">₦200,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Payment Status</label>
          <Select defaultValue="owing">
            <SelectTrigger className="h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-schoolgate-green">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="owing">Partially Paid</SelectItem>
              <SelectItem value="none">Not Paid At All</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-schoolgate-green transition-colors" size={16} />
            <Input 
              placeholder="Student / Parent / Admin No" 
              className="pl-10 h-10 bg-slate-50 border-slate-100 rounded-xl focus-visible:ring-schoolgate-green" 
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="Date Range" 
              className="pl-10 h-10 bg-slate-50 border-slate-100 rounded-xl focus-visible:ring-schoolgate-green" 
            />
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-wrap gap-2 justify-end">
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-slate-600 font-semibold gap-2">
            <RefreshCw size={16} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-slate-600 font-semibold gap-2">
            <X size={16} />
            Reset
          </Button>
          <div className="h-8 w-[1px] bg-slate-200 self-center mx-1 hidden sm:block" />
          <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-slate-600 font-semibold gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button className="h-10 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-semibold gap-2 px-6">
            <Filter size={16} />
            Apply Filters
          </Button>
        </div>
      </div>
    </Card>
  );
}
