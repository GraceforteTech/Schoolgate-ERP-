import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/report-access/")({
  component: ReportAccessPage,
});

function ReportAccessPage() {
  const [pin, setPin] = useState("");

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-3xl border-none shadow-xl bg-white overflow-hidden">
        <div className="bg-schoolgate-green p-8 text-center text-white">
          <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Schoolgate ERP</h1>
          <p className="text-emerald-100 font-medium mt-1">Secure Report Access</p>
        </div>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-lg font-bold text-slate-800">Check Your Report Sheet</h2>
            <p className="text-sm text-slate-500">Enter your secure 6-digit report access PIN below.</p>
          </div>
          <div className="space-y-4">
            <Input 
              type="text" 
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter Report PIN" 
              className="h-14 text-center text-2xl font-black tracking-[0.5em] rounded-xl border-slate-200 focus-visible:ring-schoolgate-green" 
            />
            <Button className="w-full h-14 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 font-bold text-base shadow-lg shadow-schoolgate-green/20">
              VIEW REPORT
            </Button>
          </div>
          <p className="text-[10px] text-center text-slate-400 uppercase font-black tracking-wider">
            If you have lost your PIN, please contact your school administrator.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
