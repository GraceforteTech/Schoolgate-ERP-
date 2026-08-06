import React from "react";
import { 
  Search, 
  Filter, 
  Home, 
  Users, 
  Bed, 
  MapPin, 
  Calendar,
  Layers,
  Building2,
  Download,
  Printer,
  FileText
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function HostelSearchCenter() {
  return (
    <div className="bg-white p-4 rounded-[14px] shadow-sm space-y-4 border border-slate-100">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input 
            placeholder="Search student, room number, or hostel name..." 
            className="pl-9 h-11 border-slate-200 rounded-xl focus:ring-schoolgate-green/20"
          />
        </div>
        
        <Select>
          <SelectTrigger className="w-[160px] h-11 border-slate-200 rounded-xl font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-slate-400" />
              <SelectValue placeholder="Hostel" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="boys-a">Boys Hostel A</SelectItem>
            <SelectItem value="boys-b">Boys Hostel B</SelectItem>
            <SelectItem value="girls-a">Girls Hostel A</SelectItem>
            <SelectItem value="girls-b">Girls Hostel B</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[140px] h-11 border-slate-200 rounded-xl font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-slate-400" />
              <SelectValue placeholder="Floor" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ground">Ground Floor</SelectItem>
            <SelectItem value="first">First Floor</SelectItem>
            <SelectItem value="second">Second Floor</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[140px] h-11 border-slate-200 rounded-xl font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-400" />
              <SelectValue placeholder="Section" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary">Primary</SelectItem>
            <SelectItem value="secondary">Secondary</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[160px] h-11 border-slate-200 rounded-xl font-medium text-slate-600">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-slate-400" />
              <SelectValue placeholder="Availability" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available Only</SelectItem>
            <SelectItem value="occupied">Occupied Only</SelectItem>
            <SelectItem value="maintenance">Under Maintenance</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="outline" className="h-11 w-11 p-0 border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Filter className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-8 mx-1" />
          <Button variant="outline" className="h-11 px-4 border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-bold gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button variant="outline" className="h-11 w-11 p-0 border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}