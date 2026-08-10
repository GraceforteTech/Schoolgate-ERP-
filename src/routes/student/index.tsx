import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getStudentFinanceProfile, getStudentFinanceProfile } from "@/lib/finance.functions";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Wallet, History, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  const fetchFinance = useServerFn(getStudentFinanceProfile);
  
  const { data: finance, isLoading } = useQuery({
    queryKey: ['student-finance'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      // In a real scenario, we'd look up the student record linked to this user_id
      // For now, we assume student_id is the user_id or linked in profiles.
      return fetchFinance({ data: { studentId: session.user.id, tenantId: '' as any } });
    }
  });

  if (isLoading) return <div className="p-8 text-center text-slate-500 font-medium">Authenticating student profile...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-schoolgate-green rounded-2xl flex items-center justify-center text-white shadow-lg">
            <GraduationCap size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Student Hub</h1>
            <p className="text-slate-500 mt-1 font-medium">Your personal academic and financial overview.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-none shadow-lg bg-white p-6">
          <div className="flex items-center gap-3 mb-4 text-slate-400">
            <Wallet size={20} />
            <h4 className="text-sm font-black uppercase tracking-widest">Personal Wallet</h4>
          </div>
          <p className="text-4xl font-black text-slate-800">₦{finance?.wallet?.balance || '0.00'}</p>
          <Badge className="mt-4 bg-emerald-50 text-emerald-600 border-none font-bold">LOCKED FOR FEES</Badge>
        </Card>
      </div>

      <Card className="rounded-3xl border-none shadow-lg bg-white overflow-hidden">
        <CardHeader className="border-b p-6">
          <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-2">
            <History size={20} className="text-blue-500" /> Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {finance?.transactions?.length ? (
             <div className="divide-y divide-slate-100">
             {finance.transactions.map((t: any) => (
               <div key={t.id} className="px-6 py-4 flex justify-between items-center">
                 <div>
                   <p className="font-bold text-slate-800">{t.description || t.type}</p>
                   <p className="text-[10px] font-black text-slate-400 uppercase">{new Date(t.created_at).toLocaleDateString()}</p>
                 </div>
                 <div className="text-right">
                   <p className={`font-black ${t.status === 'approved' ? 'text-emerald-600' : 'text-amber-500'}`}>
                     {t.type === 'credit' ? '+' : '-'}₦{t.amount}
                   </p>
                   <Badge variant="outline" className="text-[9px] font-black uppercase px-2">{t.status}</Badge>
                 </div>
               </div>
             ))}
           </div>
          ) : (
            <div className="p-12 text-center text-slate-400 italic">No transactions recorded.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
