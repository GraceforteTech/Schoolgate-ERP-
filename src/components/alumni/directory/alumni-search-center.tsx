import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export function AlumniSearchCenter() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-6 border-none shadow-sm bg-white rounded-[20px] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-schoolgate-green-light text-schoolgate-green">
            <Search size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-none">Alumni Search Center</h3>
            <p className="text-xs text-slate-500 mt-1">Search through 4,850+ verified alumni records</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-schoolgate-green hover:bg-schoolgate-green-light font-bold"
        >
          {isExpanded ? (
            <>Less Filters <ChevronUp className="ml-2 h-4 w-4" /></>
          ) : (
            <>Advanced Filters <ChevronDown className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name / Student ID</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Enter name or ID..." className="pl-9 h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Graduation Year</Label>
          <Select>
            <SelectTrigger className="h-10 bg-slate-50 border-none rounded-xl text-sm">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent>
              {[2026, 2025, 2024, 2023, 2022, 2021, 2020].map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Industry</Label>
          <Select>
            <SelectTrigger className="h-10 bg-slate-50 border-none rounded-xl text-sm">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="medicine">Medicine</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="arts">Creative Arts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2">
          <Button className="flex-1 h-10 bg-schoolgate-green text-white font-bold rounded-xl hover:bg-schoolgate-green/90 shadow-md shadow-schoolgate-green/20">
            Apply Filters
          </Button>
          <Button variant="outline" className="h-10 w-10 p-0 border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50">
            <X size={18} />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Class Graduated</Label>
            <Input placeholder="e.g. Class of 2015" className="h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current City / Country</Label>
            <Input placeholder="e.g. Lagos, Nigeria" className="h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Membership Status</Label>
            <Select>
              <SelectTrigger className="h-10 bg-slate-50 border-none rounded-xl text-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active Member</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="association">Association Member</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Employment Sector</Label>
            <Input placeholder="e.g. Private, Public, NGO" className="h-10 bg-slate-50 border-none rounded-xl text-sm" />
          </div>
        </div>
      )}
    </Card>
  );
}
