import { createFileRoute } from "@tanstack/react-router";
import { 
  Settings, 
  User, 
  Building2, 
  Shield, 
  Bell, 
  CreditCard, 
  Languages, 
  Lock,
  ChevronRight,
  Database,
  Cloud
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-12">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="px-6 py-6 max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">System Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage school profile, users, security and global configurations.</p>
          </div>
        </div>
      </div>

      <div className="px-6 mt-6 max-w-[1600px] mx-auto">
        <Tabs defaultValue="profile" className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TabsList className="flex flex-col h-auto bg-transparent border-none p-0 space-y-1">
            <SettingsTabTrigger value="profile" icon={Building2} label="School Profile" />
            <SettingsTabTrigger value="users" icon={User} label="User Management" />
            <SettingsTabTrigger value="security" icon={Shield} label="Security & Roles" />
            <SettingsTabTrigger value="billing" icon={CreditCard} label="Subscription" />
            <SettingsTabTrigger value="notifications" icon={Bell} label="Notifications" />
            <SettingsTabTrigger value="system" icon={Database} label="System & Backup" />
          </TabsList>

          <div className="md:col-span-3">
            <TabsContent value="profile" className="m-0 space-y-6">
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
                    <div className="space-y-2">
                      <Label htmlFor="school-phone">Phone Number</Label>
                      <Input id="school-phone" defaultValue="+234 800 000 0000" className="rounded-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school-website">Website URL</Label>
                      <Input id="school-website" defaultValue="https://schoolgate.edu" className="rounded-lg" />
                    </div>
                  </div>
                  <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-lg">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[14px]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Platform Branding</CardTitle>
                  <CardDescription>Customize the look and feel for your tenant.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-schoolgate-green flex items-center justify-center text-white font-bold">S</div>
                      <div>
                        <p className="text-sm font-bold">School Logo</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Recommended: 200x200px PNG</p>
                      </div>
                    </div>
                    <Button variant="outline" className="rounded-lg text-xs font-bold">Change Logo</Button>
                  </div>

                  <div className="space-y-4">
                    <Label>Primary Brand Color</Label>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0B6E3C] border-2 border-white shadow-sm ring-1 ring-slate-200" />
                      <Input defaultValue="#0B6E3C" className="w-32 rounded-lg" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="m-0 space-y-6">
              <Card className="border-none shadow-sm rounded-[14px]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Multi-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to school accounts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Require MFA for Staff</p>
                      <p className="text-xs text-muted-foreground">Mandate 2FA for all administrative roles.</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">Session Timeout</p>
                      <p className="text-xs text-muted-foreground">Automatically log out inactive users.</p>
                    </div>
                    <div className="w-24">
                      <Input type="number" defaultValue="30" className="rounded-lg" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm rounded-[14px]">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Tenant Isolation Key</CardTitle>
                  <CardDescription>System generated unique identifier for your school portal.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 bg-slate-900 text-white p-4 rounded-xl">
                    <Cloud className="text-schoolgate-green" size={20} />
                    <code className="text-xs font-bold">TID-SCH-9021-XLR8</code>
                    <Button variant="ghost" size="sm" className="ml-auto text-xs text-slate-400 hover:text-white">Copy ID</Button>
                  </div>
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
      className="w-full justify-start gap-3 px-4 py-3 rounded-xl text-sm font-bold tracking-tight text-slate-600 data-[state=active]:bg-schoolgate-green data-[state=active]:text-white transition-all hover:bg-slate-100 data-[state=active]:hover:bg-schoolgate-green group"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
      <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-data-[state=active]:opacity-50 transition-opacity" />
    </TabsTrigger>
  );
}