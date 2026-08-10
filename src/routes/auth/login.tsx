import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { School, Info } from "lucide-react";
import { checkUserTenants } from "@/lib/onboarding.functions";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (user) {
        toast.success("Signed in successfully");
        const { hasTenants } = await checkUserTenants({ data: { userId: user.id } });
        
        if (!hasTenants) {
          navigate({ to: "/onboarding" });
        } else {
          window.location.href = "/enterprise";
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page-background p-4">
      <Card className="w-full max-w-md rounded-[14px] border-none shadow-lg">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-12 h-12 bg-schoolgate-green rounded-xl flex items-center justify-center text-white mb-4 shadow-lg shadow-schoolgate-green/20">
            <School size={28} />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Schoolgate ERP</CardTitle>
          <CardDescription className="font-bold text-slate-500 uppercase text-[10px] tracking-widest">Enterprise Multi-Tenant Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-xs text-blue-700">
            <Info className="shrink-0 h-4 w-4" />
            <div className="space-y-1">
              <p className="font-bold">Existing school administrators:</p>
              <p>Sign in with your email and password to access your dashboard.</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@school.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/login"
                  className="text-xs text-schoolgate-green hover:underline font-bold"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold h-11 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-slate-400 font-bold">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full border-slate-200 font-bold h-11 rounded-lg"
            onClick={handleGoogleLogin}
          >
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t border-slate-50 pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-600 font-bold">New school?</p>
            <Link to="/auth/signup">
              <Button variant="link" className="text-schoolgate-green font-black p-0 h-auto">
                Create your Schoolgate account to get started
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
