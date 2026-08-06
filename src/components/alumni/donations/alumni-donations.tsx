import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Target, 
  Users, 
  ArrowRight, 
  Gift, 
  Trophy,
  History,
  TrendingUp
} from "lucide-react";

export function AlumniDonations() {
  const campaigns = [
    {
      id: 1,
      title: "STEM Innovation Lab",
      description: "Help us build a state-of-the-art laboratory for Robotics and AI studies.",
      raised: 9750000,
      goal: 15000000,
      donors: 124,
      daysLeft: 15,
      category: "Academic",
      icon: TrendingUp
    },
    {
      id: 2,
      title: "Sports Complex Renovation",
      description: "Restoring our historic sports complex to international standards.",
      raised: 4200000,
      goal: 10000000,
      donors: 86,
      daysLeft: 45,
      category: "Infrastructure",
      icon: Target
    },
    {
      id: 3,
      title: "Alumni Scholarship Fund 2026",
      description: "Sponsoring brilliant but indigent students to complete their education.",
      raised: 6800000,
      goal: 8000000,
      donors: 210,
      daysLeft: 20,
      category: "Scholarship",
      icon: Heart
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:col-span-8 flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Active Fundraising Campaigns</h2>
              <p className="text-sm text-slate-500">Invest in the future of Schoolgate through strategic giving.</p>
            </div>
            <Button variant="outline" className="h-10 rounded-xl bg-white border-slate-200 text-slate-600 font-bold gap-2">
              <History size={18} /> Donation History
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((camp) => (
              <Card key={camp.id} className="p-6 border-none shadow-sm bg-white rounded-[24px] space-y-5">
                <div className="flex items-center justify-between">
                  <Badge className="bg-schoolgate-green-light text-schoolgate-green border-none text-[10px] font-black px-3 py-1">
                    {camp.category.toUpperCase()}
                  </Badge>
                  <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {camp.daysLeft} days left
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">{camp.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{camp.description}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Raised</p>
                      <p className="text-xl font-black text-schoolgate-green">₦{camp.raised.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Goal</p>
                      <p className="text-sm font-bold text-slate-600">₦{camp.goal.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-schoolgate-green rounded-full shadow-[0_0_8px_rgba(11,110,60,0.4)]" 
                      style={{ width: `${(camp.raised / camp.goal) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>{camp.donors} Donors</span>
                    <span>{Math.round((camp.raised / camp.goal) * 100)}% Complete</span>
                  </div>
                </div>

                <Button className="w-full bg-schoolgate-green text-white font-bold rounded-xl h-11 hover:bg-schoolgate-green/90 shadow-lg shadow-schoolgate-green/20">
                  Donate Now
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:w-[350px] space-y-6">
          <Card className="p-6 border-none shadow-sm bg-slate-900 text-white rounded-[24px] relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-2xl bg-white/10 grid place-items-center text-white mb-6">
                <Trophy size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Top Donor Leaderboard</h3>
              <p className="text-xs text-white/50 mb-6">Recognizing our most generous alumni contributors of 2026.</p>
              
              <div className="space-y-4">
                {[
                  { name: "Ibrahim Yusuf", amount: "₦2.5M", class: "'10" },
                  { name: "Ademola Babatunde", amount: "₦1.8M", class: "'12" },
                  { name: "Chioma Okereke", amount: "₦1.2M", class: "'15" }
                ].map((donor, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-schoolgate-green grid place-items-center text-[10px] font-black">
                        #{i + 1}
                      </div>
                      <div>
                        <p className="text-xs font-bold">{donor.name}</p>
                        <p className="text-[9px] text-white/40">Class of {donor.class}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-schoolgate-green">{donor.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="w-full mt-6 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 group">
                View Full Leaderboard <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="absolute -right-10 -bottom-10 h-40 w-40 bg-schoolgate-green/10 rounded-full blur-3xl" />
          </Card>

          <Card className="p-6 border-none shadow-sm bg-white rounded-[24px]">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Gift className="h-4 w-4 text-schoolgate-green" /> Why Give?
            </h3>
            <div className="space-y-4">
              {[
                "Tax deductible receipts generated automatically.",
                "Direct impact on student learning experiences.",
                "Recognition in our annual Impact Report.",
                "Legacy naming opportunities for major projects."
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-schoolgate-green mt-1.5 shrink-0" />
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Clock({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
