import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Mail, 
  Smartphone, 
  FileText, 
  History,
  Send
} from "lucide-react";

const history = [
  { date: '2024-05-15', student: 'Chukwuemeka Okoro', parent: 'Mr. Okoro', method: 'WhatsApp', sentBy: 'Bursar', status: 'Sent', response: 'Read' },
  { date: '2024-05-14', student: 'Amina Yusuf', parent: 'Mrs. Yusuf', method: 'SMS', sentBy: 'Admin', status: 'Delivered', response: 'No Reply' },
  { date: '2024-05-12', student: 'Tunde Afolayan', parent: 'Mr. Afolayan', method: 'Email', sentBy: 'Bursar', status: 'Opened', response: 'Replied' },
];

export function ReminderCentre() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
      {/* Channels & Templates */}
      <div className="lg:col-span-4 flex flex-col gap-4">
        <Card className="p-5 border-none bg-white rounded-[14px] shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Send size={18} className="text-schoolgate-green" />
            Quick Channels
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-16 flex-col gap-1 rounded-xl border-slate-100 hover:bg-schoolgate-green-light/30 hover:text-schoolgate-green">
              <MessageSquare size={20} />
              <span className="text-[11px] font-bold uppercase">WhatsApp</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1 rounded-xl border-slate-100 hover:bg-schoolgate-green-light/30 hover:text-schoolgate-green">
              <Smartphone size={20} />
              <span className="text-[11px] font-bold uppercase">SMS</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1 rounded-xl border-slate-100 hover:bg-schoolgate-green-light/30 hover:text-schoolgate-green">
              <Mail size={20} />
              <span className="text-[11px] font-bold uppercase">Email</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-1 rounded-xl border-slate-100 hover:bg-schoolgate-green-light/30 hover:text-schoolgate-green">
              <FileText size={20} />
              <span className="text-[11px] font-bold uppercase">Letter</span>
            </Button>
          </div>
        </Card>

        <Card className="p-5 border-none bg-white rounded-[14px] shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-4">Templates</h3>
          <div className="flex flex-col gap-2">
            {['Friendly Reminder', 'First Warning', 'Final Notice', 'Payment Plan'].map((t) => (
              <Button key={t} variant="ghost" className="justify-start h-10 text-slate-600 hover:bg-slate-50 rounded-lg text-sm">
                {t}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Reminder Logs */}
      <div className="lg:col-span-8">
        <Card className="p-5 border-none bg-white rounded-[14px] shadow-sm h-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <History size={18} className="text-schoolgate-green" />
              Follow-up History
            </h3>
            <Button variant="link" className="text-schoolgate-green font-bold text-sm">View All Logs</Button>
          </div>
          
          <div className="space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100/50">
                <div className="flex gap-4 items-center">
                  <div className="p-2 rounded-lg bg-white shadow-sm text-schoolgate-green">
                    {item.method === 'WhatsApp' ? <MessageSquare size={16} /> : 
                     item.method === 'Email' ? <Mail size={16} /> : <Smartphone size={16} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.student}</p>
                    <p className="text-[11px] text-slate-500">{item.parent} • {item.date}</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-medium text-slate-700">{item.sentBy}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">{item.response}</p>
                  </div>
                  <Badge className="bg-schoolgate-green/10 text-schoolgate-green hover:bg-schoolgate-green/20 border-none">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
