import { createFileRoute } from "@tanstack/react-router";
import { 
  Building2, 
  Shield, 
  CreditCard, 
  ChevronRight,
  Database,
  Lock,
  UserCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setFullName(user?.user_metadata?.["full_name"] || "");
    });
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      if (error) throw error;
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!password) {
        toast.error("Please enter a new password");
        return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;
      toast.success("Password updated successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-page-background pb-12">
      <div className="bg-card border-b border-border sticky top-0 z-30">
        <div className="px-6 py-6 max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Account & System Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your profile, security, and school configuration.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 max-w-[1600px] mx-auto">
        <Tabs defaultValue="profile" className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TabsList className="flex flex-col h-auto bg-transparent border-none p-0 space-y-1">
            <SettingsTabTrigger value="profile" icon={UserCircle} label="My Profile" />
            <SettingsTabTrigger value="school" icon={Building2} label="School Profile" />
            <SettingsTabTrigger value="security" icon={Shield} label="Security & Password" />
            <SettingsTabTrigger value="billing" icon={CreditCard} label="Subscription" />
            <SettingsTabTrigger value="system" icon={Database} label="System & Backup" />
          </TabsList>

          <div className="md:col-span-3">
            <TabsContent value="profile" className="m-0 space-y-6">
              <Card className="border-none shadow-sm rounded-[14px]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Personal Information</CardTitle>
                  <CardDescription>Update your personal details and how others see you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input 
                      id="full-name" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-lg" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      value={user?.email || ""} 
                      disabled
                      className="rounded-lg bg-muted" 
                    />
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Email changes must be requested through support.</p>
                  </div>
                  <Button 
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-lg font-bold"
                  >
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="m-0 space-y-6">
              <Card className="border-none shadow-sm rounded-[14px]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Lock size={18} className="text-schoolgate-green" />
                    Change Password
                  </CardTitle>
                  <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-lg" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-lg" 
                    />
                  </div>
                  <Button 
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-lg font-bold"
                  >
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="school" className="m-0 space-y-6">
              <Card className="border-none shadow-sm rounded-[14px]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">General Information</CardTitle>
                  <CardDescription>Public information about your school.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school-name">School Name</Label>
                      <Input id="school-name" defaultValue="Schoolgate International Academy" className="rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school-email">Contact Email</Label>
                      <Input id="school-email" defaultValue="admin@schoolgate.edu" className="rounded-lg" />
                    </div>
                  </div>
                  <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-lg font-bold">Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

function SettingsTabTrigger({ value, icon: Icon, label }: { value: string; icon: any; label: string }) {
  return (
    <TabsTrigger 
      value={value} 
      className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-tight text-muted-foreground data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all hover:bg-accent data-[state=active]:hover:bg-schoolgate-green group"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
      <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-data-[state=active]:opacity-50 transition-opacity" />
    </TabsTrigger>
  );
}
