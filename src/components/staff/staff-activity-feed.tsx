import { Card } from "@/components/ui/card";
import { 
  Bell, 
  MessageSquare, 
  BookOpen, 
  Calendar, 
  Wallet, 
  Award,
  ArrowRight,
  Clock
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const activities = [
  {
    type: "payroll",
    title: "Salary Released",
    desc: "Your July 2024 salary has been credited to your wallet.",
    time: "2 hours ago",
    icon: Wallet,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    type: "academic",
    title: "New Lesson Note Approved",
    desc: "SS3 Mathematics: Quadratic Equations has been approved by the VP Academics.",
    time: "5 hours ago",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600"
  },
  {
    type: "social",
    title: "Staff Meeting",
    desc: "Monthly general staff meeting scheduled for Friday, 10:00 AM.",
    time: "Yesterday",
    icon: Calendar,
    color: "bg-purple-100 text-purple-600"
  },
  {
    type: "recognition",
    title: "Performance Award",
    desc: "Congratulations! You earned 'Teacher of the Week' for exceptional curriculum coverage.",
    time: "2 days ago",
    icon: Award,
    color: "bg-amber-100 text-amber-600"
  }
];

export function StaffActivityFeed() {
  return (
    <Card className="h-full rounded-[14px] border-slate-100 shadow-sm bg-white overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-schoolgate-green" /> Personal Activity
        </h3>
        <Badge className="bg-schoolgate-green-light text-schoolgate-green border-none font-bold text-[10px]">4 NEW</Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {activities.map((activity, i) => (
          <div key={i} className="flex gap-4 group cursor-pointer">
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl ${activity.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <activity.icon size={20} />
              </div>
              {i !== activities.length - 1 && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-full bg-slate-100" />
              )}
            </div>
            <div className="flex-1 space-y-1 pb-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-slate-800">{activity.title}</p>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{activity.time}</span>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{activity.desc}</p>
              <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase text-schoolgate-green p-0 gap-1 hover:bg-transparent">
                  View Details <ArrowRight size={12} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <Button className="w-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 font-black text-xs rounded-xl h-10">
          Clear All Notifications
        </Button>
      </div>
    </Card>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}