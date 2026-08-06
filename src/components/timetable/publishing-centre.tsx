import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Calendar, 
  History, 
  Users, 
  GraduationCap, 
  User, 
  MessageSquare, 
  Mail, 
  Smartphone,
  CheckCircle,
  Clock,
  Archive,
  Printer,
  FileDown,
  Eye
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function PublishingCentre() {
  const handlePublish = () => {
    toast.success("Timetable published successfully to all selected channels.");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[14px] shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-schoolgate-green" />
                Publishing Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: 'Teachers', icon: GraduationCap, description: 'Send to teacher portal and mobile app' },
                { name: 'Students', icon: Users, description: 'Publish to student dashboards' },
                { name: 'Parents', icon: User, description: 'Notify parents via SMS & Email' },
                { name: 'Notice Board', icon: Calendar, description: 'Display on public notice board terminals' },
              ].map((channel, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border shadow-sm">
                       <channel.icon className="h-5 w-5 text-schoolgate-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{channel.name}</p>
                      <p className="text-sm text-gray-500">{channel.description}</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}

              <div className="flex flex-col gap-4 border-t pt-6">
                 <h4 className="font-medium text-gray-900">Communication Mediums</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                       <Mail className="h-4 w-4 text-blue-500" />
                       <div className="flex-1">
                          <p className="text-xs font-medium">Email Notification</p>
                       </div>
                       <Switch defaultChecked />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                       <Smartphone className="h-4 w-4 text-purple-500" />
                       <div className="flex-1">
                          <p className="text-xs font-medium">Mobile App Push</p>
                       </div>
                       <Switch defaultChecked />
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                       <MessageSquare className="h-4 w-4 text-green-500" />
                       <div className="flex-1">
                          <p className="text-xs font-medium">WhatsApp Updates</p>
                       </div>
                       <Switch />
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between border-t pt-6">
                 <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                       <Clock className="h-4 w-4" />
                       Schedule Publication
                    </Button>
                    <Button variant="outline" className="gap-2 text-red-600 border-red-100 hover:bg-red-50">
                       <Archive className="h-4 w-4" />
                       Unpublish
                    </Button>
                 </div>
                 <Button onClick={handlePublish} className="bg-schoolgate-green hover:bg-schoolgate-green/90 gap-2 px-8">
                    <CheckCircle className="h-4 w-4" />
                    Publish Now
                 </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[14px] shadow-sm">
             <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                   <Eye className="h-5 w-5 text-blue-500" />
                   View Analytics
                </CardTitle>
                <Badge variant="outline">Last 24 Hours</Badge>
             </CardHeader>
             <CardContent>
                <div className="grid grid-cols-3 gap-6">
                   <div className="text-center p-4 rounded-xl bg-blue-50/50">
                      <p className="text-2xl font-bold text-blue-600">86%</p>
                      <p className="text-xs text-blue-700 font-medium">Teachers Viewed</p>
                   </div>
                   <div className="text-center p-4 rounded-xl bg-purple-50/50">
                      <p className="text-2xl font-bold text-purple-600">42%</p>
                      <p className="text-xs text-purple-700 font-medium">Students Viewed</p>
                   </div>
                   <div className="text-center p-4 rounded-xl bg-green-50/50">
                      <p className="text-2xl font-bold text-green-600">12</p>
                      <p className="text-xs text-green-700 font-medium">PDF Downloads</p>
                   </div>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[14px] shadow-sm">
             <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                   <History className="h-4 w-4 text-gray-500" />
                   Version History
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-4">
                {[
                   { version: 'v2.4 (Current)', date: 'Today, 10:24 AM', user: 'Admin', status: 'Published' },
                   { version: 'v2.3', date: 'Yesterday, 04:15 PM', user: 'Principal', status: 'Archived' },
                   { version: 'v2.2', date: 'May 12, 2024', user: 'Admin', status: 'Archived' },
                   { version: 'v2.1', date: 'May 10, 2024', user: 'Admin', status: 'Archived' },
                ].map((v, idx) => (
                   <div key={idx} className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0">
                      <div>
                         <p className="text-sm font-semibold text-gray-900">{v.version}</p>
                         <p className="text-[10px] text-gray-400">{v.date} by {v.user}</p>
                      </div>
                      <Badge variant={idx === 0 ? "default" : "outline"} className={idx === 0 ? "bg-schoolgate-green" : ""}>
                         {v.status}
                      </Badge>
                   </div>
                ))}
                <Button variant="link" className="w-full text-schoolgate-green text-xs">View full history</Button>
             </CardContent>
          </Card>

          <Card className="rounded-[14px] shadow-sm">
             <CardHeader>
                <CardTitle className="text-base">Quick Export</CardTitle>
             </CardHeader>
             <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3 h-11">
                   <Printer className="h-4 w-4 text-gray-400" />
                   Print Current View
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-11">
                   <FileDown className="h-4 w-4 text-red-400" />
                   Download PDF (Grid)
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 h-11">
                   <FileDown className="h-4 w-4 text-green-400" />
                   Export Excel (List)
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
