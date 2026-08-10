import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { approveTransaction } from "@/lib/finance.functions";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/finance/approvals")({
  component: ApprovalsPage,
});

function ApprovalsPage() {
  const queryClient = useQueryClient();
  const approve = useServerFn(approveTransaction);

  const { data: pendingTransactions, isLoading } = useQuery({
    queryKey: ['pending-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*, profiles!student_id(full_name)')
        .eq('status', 'pending');
      if (error) throw error;
      return data;
    }
  });

  const approveMutation = useMutation({
    mutationFn: async (transactionId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Unauthorized");
      return approve({ data: { transactionId, adminId: session.user.id } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-transactions'] });
      toast.success("Transaction approved and student balance updated.");
    },
    onError: (e: any) => toast.error(e.message)
  });

  if (isLoading) return <div className="p-8 text-center font-bold text-slate-400">Loading pending requests...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Approval Centre</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Review and authorize financial transactions.</p>
        </div>
      </div>

      <Card className="rounded-3xl border-none shadow-xl overflow-hidden bg-white">
        <CardHeader className="border-b p-6 bg-slate-50/50">
          <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Clock size={20} className="text-amber-500" /> Pending Authorizations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {pendingTransactions?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Student</th>
                    <th className="px-6 py-4 text-left">Type</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pendingTransactions.map((t: any) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {new Date(t.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-800">{t.profiles?.full_name || 'N/A'}</p>
                        <p className="text-[10px] font-medium text-slate-400">REF: {t.reference || t.id.slice(0, 8)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className="bg-blue-50 text-blue-600 border-none font-bold uppercase text-[9px] px-2">
                          {t.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-black text-slate-800 tabular-nums">
                        ₦{t.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Button 
                            onClick={() => approveMutation.mutate(t.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 h-9 px-4 gap-2 rounded-lg font-bold shadow-lg shadow-emerald-600/20"
                          >
                            <CheckCircle2 size={16} /> Approve
                          </Button>
                          <Button variant="ghost" className="text-rose-600 hover:bg-rose-50 h-9 px-4 gap-2 rounded-lg font-bold">
                            <XCircle size={16} /> Reject
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-16 text-center text-slate-400 italic font-medium">
              No pending transactions require your attention at this time.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
