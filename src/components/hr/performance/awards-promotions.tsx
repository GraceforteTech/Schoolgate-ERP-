import React from "react";
import { 
  Award, 
  TrendingUp, 
  History, 
  Star, 
  ShieldCheck, 
  Calendar, 
  UserPlus, 
  Medal,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const awards = [
  { 
    id: "AWD-001", 
    recipient: "Adebayo Olawale", 
    type: "Teacher of the Month", 
    date: "July 2024", 
    points: 450,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adebayo" 
  },
  { 
    id: "AWD-002", 
    recipient: "Sarah Johnson", 
    type: "Efficiency Excellence", 
    date: "June 2024", 
    points: 380,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
  },
  { 
    id: "AWD-003", 
    recipient: "Fatima Yusuf", 
    type: "Community Impact", 
    date: "May 2024", 
    points: 520,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima" 
  },
];

const promotions = [
  { 
    staff: "Chinedu Okoro", 
    prevRole: "Teacher", 
    newRole: "HOD Arts", 
    date: "2024-01-01", 
    increment: "15%",
    status: "Effective"
  },
  { 
    staff: "Adebayo Olawale", 
    prevRole: "Senior Teacher", 
    newRole: "Vice Principal (Acad)", 
    date: "2024-09-01", 
    increment: "22%",
    status: "Pending"
  },
];

export const AwardsPromotions = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Awards Leaderboard */}
        <Card className="xl:col-span-2 border-none shadow-sm rounded-xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Medal className="h-5 w-5 text-yellow-600" />
                Staff Excellence Awards
              </CardTitle>
              <Badge variant="outline" className="text-[10px] rounded-full text-yellow-600 border-yellow-200 bg-yellow-50">
                2024 Recognition
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider pl-6">Recipient</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider">Award Category</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-center">Zap Points</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase tracking-wider text-right pr-6">Date Recognized</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {awards.map((award) => (
                  <TableRow key={award.id} className="hover:bg-slate-50 transition-colors group">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 ring-2 ring-white shadow-sm">
                          <AvatarImage src={award.avatar} />
                          <AvatarFallback>{award.recipient[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-schoolgate-green transition-colors">{award.recipient}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] font-medium bg-schoolgate-green-light text-schoolgate-green border-none rounded-full px-2 py-0">
                        {award.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1 text-yellow-600 font-bold text-xs">
                        <Star className="h-3 w-3 fill-yellow-600" />
                        {award.points}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6 text-[10px] font-bold text-slate-500">{award.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Promotion Tracker */}
        <Card className="border-none shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              Promotion Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {promotions.map((promo, index) => (
              <div key={index} className="p-3 rounded-xl border border-slate-100 bg-slate-50/30 hover:shadow-sm transition-all group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">{promo.staff}</span>
                  <Badge className={cn(
                    "text-[9px] font-bold rounded-full px-2 py-0",
                    promo.status === "Effective" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                  )}>
                    {promo.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground bg-white p-2 rounded-lg border border-slate-50 shadow-sm">
                  <span className="font-medium line-through decoration-slate-300">{promo.prevRole}</span>
                  <ArrowRight className="h-3 w-3 text-schoolgate-green" />
                  <span className="font-bold text-slate-800">{promo.newRole}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-medium">Salary Impact: <b className="text-schoolgate-green">+{promo.increment}</b></span>
                  <span className="text-slate-400 italic">Eff: {promo.date}</span>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <div className="bg-schoolgate-green-light/20 p-3 rounded-xl border border-schoolgate-green-light flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-schoolgate-green shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-schoolgate-green uppercase tracking-wider">Career Path Intelligence</p>
                  <p className="text-[10px] text-schoolgate-green/80 mt-0.5 leading-relaxed">
                    System has identified 3 staff eligible for Q4 performance reviews based on Zap score metrics.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
