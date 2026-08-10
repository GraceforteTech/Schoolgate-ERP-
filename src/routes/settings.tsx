import { createFileRoute } from "@tanstack/react-router";
import { 
  Building2, 
  Shield, 
  CreditCard, 
  ChevronRight,
  Database,
  Lock,
  UserCircle,
  BellRing
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
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
            <SettingsTabTrigger value="notifications" icon={BellRing} label="Notifications" />
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
            <TabsContent value="notifications" className="m-0 space-y-6">
              <Card className="border-none shadow-sm rounded-[14px]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <BellRing size={18} className="text-schoolgate-green" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Manage how you want to be notified about school activities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <NotificationChannel 
                    title="In-App Notifications" 
                    description="Real-time alerts within the Schoolgate ERP platform."
                    channels={['Alerts', 'Messages', 'System Updates']}
                  />
                  <NotificationChannel 
                    title="Email Notifications" 
                    description="Important summaries and formal communications sent to your inbox."
                    channels={['Financial Reports', 'Student Performance', 'Attendance Alerts']}
                  />
                  <NotificationChannel 
                    title="Push Notifications" 
                    description="Immediate alerts on your mobile device (Requires mobile app)."
                    channels={['Emergency Alerts', 'Direct Messages']}
                  />
                  <NotificationChannel 
                    title="SMS Notifications" 
                    description="Urgent text messages for critical school updates."
                    channels={['Fee Reminders', 'School Closures']}
                  />
                  <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-lg font-bold w-full md:w-auto">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

function NotificationChannel({ title, description, channels }: { title: string; description: string; channels: string[] }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{title}</h4>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map(channel => (
          <div key={channel} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-slate-700">{channel}</span>
            <Switch defaultChecked />
          </div>
        ))}
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
