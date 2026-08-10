import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { School, Building2, Globe, Phone, Mail, CheckCircle2 } from "lucide-react";
import { completeOnboarding } from "@/lib/onboarding.functions";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    schoolName: "",
    workspaceSlug: "",
    contactEmail: "",
    contactPhone: "",
    campusName: "Main Campus",
    plan: "trial"
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate({ to: "/auth/login" });
      setUser(user);
      setFormData(prev => ({ ...prev, contactEmail: user?.email || "" }));
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);

    try {
      await completeOnboarding({
        data: {
          userId: user.id,
          ...formData
        }
      });
      
      toast.success("School workspace created successfully!");
      setStep(3);
    } catch (error: any) {
      toast.error(error.message || "Failed to complete onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-4">
        <Card className="w-full max-w-md rounded-[14px] border-none shadow-lg text-center p-8">
          <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={32} />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 mb-2">Setup Complete!</CardTitle>
          <CardDescription className="text-slate-600 mb-8">
            Your school workspace is ready. You have been assigned as the School Owner.
          </CardDescription>
          <Button 
            className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-schoolgate-green/20"
            onClick={() => window.location.href = "/enterprise"}
          >
            Launch Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] p-4">
      <Card className="w-full max-w-xl rounded-[14px] border-none shadow-lg">
        <CardHeader className="text-center pb-8 border-b border-slate-50">
          <div className="mx-auto w-12 h-12 bg-schoolgate-green rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-schoolgate-green/20">
            <School size={28} />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">School Onboarding</CardTitle>
          <CardDescription className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Set up your institution workspace</CardDescription>
        </CardHeader>
        
        <CardContent className="pt-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <Building2 size={14} className="text-schoolgate-green" />
                  School Name
                </Label>
                <Input
                  placeholder="e.g. Royal International Academy"
                  value={formData.schoolName}
                  onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value, workspaceSlug: e.target.value.toLowerCase().replace(/ /g, '-') }))}
                  required
                  className="rounded-lg border-slate-200"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <Globe size={14} className="text-schoolgate-green" />
                  Workspace Slug
                </Label>
                <div className="relative">
                  <Input
                    placeholder="royal-academy"
                    value={formData.workspaceSlug}
                    onChange={(e) => setFormData(prev => ({ ...prev, workspaceSlug: e.target.value }))}
                    required
                    className="rounded-lg border-slate-200 pl-3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <Mail size={14} className="text-schoolgate-green" />
                  Contact Email
                </Label>
                <Input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                  required
                  className="rounded-lg border-slate-200"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <Phone size={14} className="text-schoolgate-green" />
                  Contact Phone
                </Label>
                <Input
                  placeholder="+234..."
                  value={formData.contactPhone}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                  required
                  className="rounded-lg border-slate-200"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="flex items-center gap-2 text-slate-700">
                  <Building2 size={14} className="text-schoolgate-green" />
                  Main Campus Name
                </Label>
                <Input
                  placeholder="Main Campus"
                  value={formData.campusName}
                  onChange={(e) => setFormData(prev => ({ ...prev, campusName: e.target.value }))}
                  required
                  className="rounded-lg border-slate-200"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold h-12 rounded-xl shadow-lg shadow-schoolgate-green/20 mt-4 transition-all hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? "Creating School Workspace..." : "Complete Setup"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
