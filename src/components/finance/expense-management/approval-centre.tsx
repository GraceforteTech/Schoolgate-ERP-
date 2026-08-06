import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Printer, 
  History,
  User,
  Clock,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const pendingApprovals = [
  {
    id: "EXP-001",
    date: "2024-05-20",
    description: "Purchase of whiteboard markers and stationery",
    amount: 150000,
    recordedBy: "Accountant Joe",
    level: "Principal Review",
    status: "pending",
  },
  {
    id: "EXP-005",
    date: "2024-05-21",
    description: "New Desktop for Computer Lab",
    amount: 350000,
    recordedBy: "Accountant Joe",
    level: "Proprietor Approval",
    status: "pending",
  }
];

const timeline = [
  {
    user: "Accountant Joe",
    action: "Expense Recorded",
    date: "20 May 2024",
    time: "09:30 AM",
    remarks: "Standard academic supplies restock.",
    status: "recorded"
  },
  {
    user: "Principal Reviewer",
    action: "Reviewed & Recommended",
    date: "20 May 2024",
    time: "11:45 AM",
    remarks: "Verified with department head. Approved for next level.",
    status: "reviewed"
  }
];

export function ApprovalCentre() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6">
        <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">Pending Approvals</CardTitle>
            <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-50 border-none shadow-none rounded-full px-3 text-[10px] font-bold">
              {pendingApprovals.length} Actions Required
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            {pendingApprovals.map((item, idx) => (
              <div key={item.id} className={cn(
                "p-4 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors",
                idx % 2 === 1 ? "bg-slate-50/20" : "bg-white"
              )}>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                      {item.id}
                      <span className="text-[10px] font-medium text-slate-400">• {item.date}</span>
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs font-bold text-schoolgate-green">₦{item.amount.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter bg-slate-100 px-2 rounded-md">{item.level}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-wider border-slate-200">
                    View
                  </Button>
                  <Button className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-schoolgate-green hover:bg-schoolgate-green/90 text-white">
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <Card className="rounded-[14px] border-none shadow-sm overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">Approval Timeline</CardTitle>
            <History size={16} className="text-slate-400" />
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className={cn(
                    "absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 border-white ring-4 ring-white shadow-sm",
                    event.status === 'recorded' ? "bg-slate-400" : "bg-schoolgate-green"
                  )} />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-700">{event.action}</h5>
                      <span className="text-[10px] text-slate-400 font-medium">{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold italic">
                      <User size={10} /> {event.user}
                    </div>
                    <div className="mt-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed italic">
                      "{event.remarks}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-9 rounded-xl border-slate-200 text-xs font-bold text-rose-500 hover:text-rose-600 gap-2">
                <XCircle size={14} /> Reject
              </Button>
              <Button className="h-9 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 text-white text-xs font-bold gap-2">
                <CheckCircle2 size={14} /> Approve Now
              </Button>
              <Button variant="outline" className="col-span-2 h-9 rounded-xl border-slate-200 text-xs font-bold text-slate-600 gap-2">
                <RotateCcw size={14} /> Return for Correction
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
