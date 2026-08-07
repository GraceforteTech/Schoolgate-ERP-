import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Target, 
  AlertCircle,
  TrendingUp, 
  Wallet, 
  Activity, 
  Heart,
  Cake,
  Gift
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export function ExecutiveInsights() {
  const insights = [
    { label: "Collection Rate", value: "71.1%", trend: "+2.4%", status: "up", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Revenue Growth", value: "+18.5%", trend: "vs last term", status: "up", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Expense Growth", value: "-4.2%", trend: "vs last term", status: "down", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Financial Health", value: "88/100", trend: "Excellent", status: "up", color: "text-schoolgate-green", bg: "bg-schoolgate-green-light" },
  ];

  return (
    <Card className="border-none shadow-sm rounded-[14px] overflow-hidden bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-slate-900">Proprietor & Investor Insights</CardTitle>
          <div className="flex items-center gap-2 px-3 py-1 bg-schoolgate-green-light rounded-full">
            <Heart size={14} className="text-schoolgate-green fill-schoolgate-green" />
            <span className="text-xs font-bold text-schoolgate-green">Health Score: 88</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs font-medium">Real-time executive summary of institutional financial performance.</p>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {insights.map((insight, i) => (
            <div key={i} className="p-4 rounded-2xl border border-slate-50 bg-slate-50/20 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{insight.label}</span>
                <div className={cn("p-1.5 rounded-lg", insight.bg)}>
                  {insight.status === 'up' ? <ArrowUpRight size={14} className={insight.color} /> : <ArrowDownRight size={14} className={insight.color} />}
                </div>
              </div>
              <h4 className="text-xl font-black text-slate-900">{insight.value}</h4>
              <p className={cn("text-[10px] font-bold mt-1", insight.color)}>{insight.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-slate-50 pt-8">
          <div className="space-y-6">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Activity size={14} className="text-schoolgate-green" />
              Institutional Performance
            </h5>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-600">Primary School Collection</span>
                  <span className="font-bold text-slate-900">68.4%</span>
                </div>
                <Progress value={68.4} className="h-2 bg-slate-100" indicatorClassName="bg-indigo-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-600">Secondary School Collection</span>
                  <span className="font-bold text-slate-900">73.2%</span>
                </div>
                <Progress value={73.2} className="h-2 bg-slate-100" indicatorClassName="bg-schoolgate-green" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <AlertCircle size={14} className="text-rose-500" />
              High Priority Alerts
            </h5>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 border border-rose-100/50">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <AlertCircle size={16} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">JSS 3 Gold: High Outstanding</p>
                  <p className="text-[10px] text-rose-600 font-medium">₦2.4M remains uncollected this term.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100/50">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                  <TrendingUp size={16} className="text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Operating Expenses increased by 8%</p>
                  <p className="text-[10px] text-amber-600 font-medium">Driven by diesel and maintenance costs.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Cake size={14} className="text-purple-500" />
              Upcoming Celebrations
            </h5>
            <div className="space-y-3">
              {[
                { name: "Dr. Sarah Adebayo", role: "Teacher", date: "Tomorrow", icon: Cake, color: "text-purple-600", bg: "bg-purple-50" },
                { name: "Olawale Adebayo", role: "Student (SS 1)", date: "Aug 10", icon: Gift, color: "text-blue-600", bg: "bg-blue-50" },
                { name: "Mr. Johnson Okeke", role: "Teacher", date: "Aug 12", icon: Cake, color: "text-purple-600", bg: "bg-purple-50" },
              ].map((celebration, i) => (
                <div key={i} className={cn("flex items-center gap-3 p-3 rounded-xl border border-slate-100", celebration.bg + "/30")}>
                  <div className={cn("w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm", celebration.color)}>
                    <celebration.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">{celebration.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{celebration.role}</p>
                  </div>
                  <Badge variant="outline" className="text-[9px] font-black border-slate-200 text-slate-400">{celebration.date}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
