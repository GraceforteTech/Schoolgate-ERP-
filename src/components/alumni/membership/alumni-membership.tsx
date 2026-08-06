import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, Zap, Award, Crown } from "lucide-react";

export function AlumniMembership() {
  const plans = [
    {
      name: "Free Member",
      price: "₦0",
      description: "Basic access to the alumni network and digital registry.",
      icon: ShieldCheck,
      color: "text-slate-400",
      bgColor: "bg-slate-50",
      features: [
        "Digital Alumni ID",
        "View Registry",
        "Receive Newsletters",
        "Basic Event Access"
      ]
    },
    {
      name: "Standard Member",
      price: "₦5,000",
      period: "/ year",
      description: "Enhanced benefits for active alumni community participation.",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "All Free features",
        "Priority Event Registration",
        "Alumni Business Listing",
        "Voting Rights",
        "Career Portal Access"
      ],
      popular: true
    },
    {
      name: "Premium Member",
      price: "₦15,000",
      period: "/ year",
      description: "Full access to networking, mentorship, and school resources.",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      features: [
        "All Standard features",
        "Exclusive Executive Events",
        "Mentorship Opportunities",
        "Access to School Library",
        "Sport Club Membership",
        "Digital Magazine Subscription"
      ]
    },
    {
      name: "Lifetime Member",
      price: "₦100,000",
      period: "once",
      description: "The ultimate commitment to the Schoolgate legacy.",
      icon: Crown,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "All Premium features",
        "Permanent Voting Seat",
        "Lifetime Association ID",
        "Naming Rights for One Seat",
        "Annual Gala VIP Pass",
        "Legacy Profile Badge"
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl font-black text-slate-900">Alumni Membership Plans</h2>
        <p className="text-slate-500">Choose a plan that fits your level of engagement and support for the Schoolgate community.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className={`p-6 border-none shadow-sm bg-white rounded-[24px] flex flex-col relative overflow-hidden ${plan.popular ? 'ring-2 ring-schoolgate-green' : ''}`}>
            {plan.popular && (
              <div className="absolute top-4 right-[-32px] bg-schoolgate-green text-white text-[10px] font-black py-1 px-10 rotate-45">
                POPULAR
              </div>
            )}
            
            <div className={`h-12 w-12 rounded-2xl ${plan.bgColor} ${plan.color} grid place-items-center mb-6`}>
              <plan.icon size={24} />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">{plan.name}</h3>
              <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                {plan.period && <span className="text-xs font-bold text-slate-400">{plan.period}</span>}
              </div>
            </div>

            <div className="space-y-4 flex-1 mb-8">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                  <span className="text-xs font-medium text-slate-600 leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            <Button className={`w-full h-11 rounded-xl font-bold transition-all ${plan.popular ? 'bg-schoolgate-green text-white hover:bg-schoolgate-green/90 shadow-lg shadow-schoolgate-green/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
              Select Plan
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
