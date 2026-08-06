import React from 'react';
import { 
  History,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  User,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const activities = [
  {
    user: "Accountant Joe",
    action: "recorded a new expense",
    target: "EXP-001",
    time: "2 mins ago",
    type: "create"
  },
  {
    user: "Principal Reviewer",
    action: "approved expense",
    target: "EXP-002",
    time: "15 mins ago",
    type: "approve"
  },
  {
    user: "System Auditor",
    action: "flagged high-value expense",
    target: "EXP-008",
    time: "45 mins ago",
    type: "alert"
  },
  {
    user: "Bursar",
    action: "rejected expense",
    target: "EXP-004",
    time: "1 hour ago",
    type: "reject"
  }
];

export function RecentActivities() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'create': return <Clock className="text-blue-500" size={16} />;
      case 'approve': return <CheckCircle2 className="text-emerald-500" size={16} />;
      case 'reject': return <XCircle className="text-rose-500" size={16} />;
      case 'alert': return <AlertCircle className="text-amber-500" size={16} />;
      default: return <History size={16} />;
    }
  };

  return (
    <Card className="rounded-[14px] border-none shadow-sm overflow-hidden h-full">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold text-slate-800 uppercase tracking-wider">Recent Activities</CardTitle>
        <History size={16} className="text-slate-400" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-50">
          {activities.map((activity, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-50/50 transition-colors group cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 p-1.5 rounded-lg bg-slate-50 group-hover:bg-white transition-colors border border-slate-100">
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs text-slate-600 leading-tight">
                    <span className="font-bold text-slate-800">{activity.user}</span> {activity.action}{" "}
                    <span className="font-bold text-schoolgate-green">{activity.target}</span>
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{activity.time}</span>
                    <ChevronRight size={12} className="text-slate-300 group-hover:text-schoolgate-green transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-slate-50 text-center">
          <button className="text-[10px] font-bold text-schoolgate-green uppercase tracking-widest hover:underline flex items-center justify-center gap-1.5 w-full">
            View All Logs <ExternalLink size={10} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
