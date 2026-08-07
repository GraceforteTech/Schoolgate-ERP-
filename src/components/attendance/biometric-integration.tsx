import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Fingerprint, 
  RefreshCw, 
  Settings2, 
  CheckCircle2, 
  AlertCircle, 
  Wifi, 
  WifiOff, 
  Database,
  Link2
} from "lucide-react";

export function BiometricIntegration() {
  const devices = [
    { id: "DEV-ZK-001", name: "Main Entrance (ZKTeco F22)", status: "connected", staffCount: 124, lastSync: "2 mins ago", ip: "192.168.1.105" },
    { id: "DEV-ZK-002", name: "Admin Office (ZKTeco SilkID)", status: "disconnected", staffCount: 15, lastSync: "1 hour ago", ip: "192.168.1.106" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-900 text-white pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Fingerprint className="h-6 w-6 text-schoolgate-green" />
                    Biometric Device Management
                  </CardTitle>
                  <CardDescription className="text-slate-400 mt-1">Connect and sync external thumbprint devices for automated attendance.</CardDescription>
                </div>
                <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg">
                  <RefreshCw className="h-4 w-4 mr-2" /> Sync All Devices
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {devices.map((device) => (
                  <div key={device.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${device.status === 'connected' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {device.status === 'connected' ? <Wifi className="h-6 w-6" /> : <WifiOff className="h-6 w-6" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-800">{device.name}</h4>
                          <Badge variant="outline" className={device.status === 'connected' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'}>
                            {device.status === 'connected' ? 'Online' : 'Offline'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                            <Database className="h-3 w-3" /> {device.staffCount} Staff Enrolled
                          </span>
                          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                            <Link2 className="h-3 w-3" /> {device.ip}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right mr-4">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Sync</p>
                        <p className="text-xs font-black text-slate-700">{device.lastSync}</p>
                      </div>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-slate-200">
                        <Settings2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[14px] border-none shadow-sm bg-white p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-schoolgate-green" /> Real-time Integration Log
            </h3>
            <div className="space-y-4">
              {[
                { time: "10:15:24 AM", event: "Staff Check-in (AD-001)", status: "success", device: "Main Entrance" },
                { time: "10:14:05 AM", event: "Staff Check-in (AD-042)", status: "success", device: "Main Entrance" },
                { time: "10:10:00 AM", event: "Daily Auto-Sync Started", status: "info", device: "Cloud Engine" },
                { time: "09:55:12 AM", event: "Connection Timeout", status: "error", device: "Admin Office" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-dashed border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : log.status === 'error' ? 'bg-rose-500' : 'bg-blue-500'}`} />
                    <span className="text-xs font-bold text-slate-400 font-mono">{log.time}</span>
                    <span className="text-sm font-semibold text-slate-700">{log.event}</span>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-slate-400 font-black uppercase border-none"> {log.device}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[14px] border-none shadow-sm bg-white p-6 border-l-4 border-l-schoolgate-green">
            <h4 className="font-black text-slate-800 mb-2 uppercase text-xs tracking-widest">Integration Guide</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              To connect your thumbprint device, ensure it is on the same network as the ERP or has a static public IP. Support is available for ZKTeco, Hikvision, and Anviz SDKs.
            </p>
            <Button variant="outline" className="w-full mt-4 rounded-xl border-slate-200 font-bold text-xs h-10">
              Download Bridge Tool
            </Button>
          </Card>

          <Card className="rounded-[14px] border-none shadow-sm bg-white p-6">
            <h4 className="font-black text-slate-800 mb-4 uppercase text-xs tracking-widest">Device Health</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Uptime</span>
                <span className="text-xs font-black text-emerald-600">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Sync Failures (24h)</span>
                <span className="text-xs font-black text-rose-600">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-500">Latency</span>
                <span className="text-xs font-black text-slate-700">45ms</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
