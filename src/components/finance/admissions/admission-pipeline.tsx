import React, { useState } from "react";
import { 
  Search, 
  FileText, 
  UserPlus, 
  ClipboardCheck, 
  Calendar, 
  GraduationCap, 
  CheckCircle, 
  Send, 
  UserCheck, 
  ArrowRight,
  GripVertical
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stages = [
  { id: "enquiry", label: "Enquiry", count: 124, icon: Search },
  { id: "started", label: "App Started", count: 85, icon: FileText },
  { id: "submitted", label: "App Submitted", count: 62, icon: UserPlus },
  { id: "verified", label: "Verification", count: 45, icon: ClipboardCheck },
  { id: "exam", label: "Examination", count: 38, icon: Calendar },
  { id: "interview", label: "Interview", count: 24, icon: GraduationCap },
  { id: "approved", label: "Approved", count: 18, icon: CheckCircle },
  { id: "offered", label: "Offer Sent", count: 15, icon: Send },
  { id: "accepted", label: "Acceptance", count: 12, icon: UserCheck },
  { id: "enrolled", label: "Enrolled", count: 8, icon: CheckCircle },
];

export function AdmissionPipeline() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-slate-700">Admission Pipeline</h3>
        <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-slate-500 font-bold border-slate-200">
          Interactive Tracker
        </Badge>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide no-scrollbar">
        {stages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <Card className="min-w-[180px] p-3 flex flex-col gap-3 group cursor-grab active:cursor-grabbing border-slate-100 hover:border-schoolgate-green/20 hover:shadow-md transition-all rounded-[14px] bg-white relative">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-slate-50 group-hover:bg-schoolgate-green-light rounded-lg text-slate-500 group-hover:text-schoolgate-green transition-colors">
                  <stage.icon className="h-4 w-4" />
                </div>
                <GripVertical className="h-4 w-4 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div>
                <p className="text-xs font-bold text-slate-800 line-clamp-1">{stage.label}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-lg font-bold text-schoolgate-green">{stage.count}</span>
                  <span className="text-[10px] text-slate-400 font-medium">Applicants</span>
                </div>
              </div>
              
              <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-schoolgate-green transition-all" 
                  style={{ width: `${Math.max(20, 100 - i * 10)}%` }} 
                />
              </div>
            </Card>
            
            {i < stages.length - 1 && (
              <div className="flex items-center justify-center min-w-[20px]">
                <ArrowRight className="h-4 w-4 text-slate-300" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
