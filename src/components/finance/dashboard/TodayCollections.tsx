import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Receipt, 
  Wallet, 
  Target,
  ArrowRight,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TodayCollections() {
  const today = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const kpis = [
    { label: "Today's Fees Collected", value: "₦1,250,400", icon: Wallet, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Students Paid Today", value: "42", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Receipts Issued Today", value: "48", icon: Receipt, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Today's Outstanding", value: "₦450,200", icon: Wallet, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Collection Rate", value: "73.5%", icon: Target, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <Card className="border-none shadow-sm rounded-[14px] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white">
        <div>
          <CardTitle className="text-lg font-bold text-slate-900">Today's Collections</CardTitle>
          <div className="flex items-center text-slate-400 text-xs mt-1 font-medium">
            <Calendar size={12} className="mr-1" />
            {today}
          </div>
        </div>
        <Button variant="ghost" className="text-schoolgate-green hover:text-schoolgate-green/90 font-bold gap-2 text-xs">
          Daily Dashboard
          <ArrowRight size={14} />
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpis.map((kpi, i) => (
            <div 
              key={i} 
              className="p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={cn("p-2 w-fit rounded-lg mb-3 transition-colors", kpi.bg)}>
                <kpi.icon className={cn("w-4 h-4", kpi.color)} />
              </div>
              <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">{kpi.label}</p>
              <h4 className="text-lg font-black text-slate-900 mt-1">{kpi.value}</h4>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-50 pt-6">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50">
            <span className="text-sm font-medium text-slate-600">Primary School</span>
            <span className="text-sm font-bold text-slate-900">₦520,000</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50">
            <span className="text-sm font-medium text-slate-600">Secondary School</span>
            <span className="text-sm font-bold text-slate-900">₦730,400</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-schoolgate-green-light">
            <span className="text-sm font-bold text-schoolgate-green">Combined Total</span>
            <span className="text-sm font-black text-schoolgate-green">₦1,250,400</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
