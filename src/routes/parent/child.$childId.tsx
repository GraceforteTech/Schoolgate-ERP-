import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getStudentFinanceProfile } from "@/lib/finance.functions";
import { getStudentProfile } from "@/lib/students.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, History, Wallet, AlertCircle } from "lucide-react";
import { PaymentDialog } from "@/components/finance/payment-dialog";

export const Route = createFileRoute("/parent/child/$childId")({
  component: ChildDetailsPage,
});

function ChildDetailsPage() {
  const { childId } = Route.useParams();
  const fetchFinance = useServerFn(getStudentFinanceProfile);
  const fetchProfile = useServerFn(getStudentProfile);

  const { data: profile } = useQuery({
    queryKey: ['child-profile', childId],
    queryFn: () => fetchProfile({ data: { studentId: childId } })
  });

  const { data: finance, isLoading } = useQuery({
    queryKey: ['child-finance', childId],
    queryFn: () => fetchFinance({ data: { studentId: childId, tenantId: profile?.tenant_id } }),
    enabled: !!profile?.tenant_id
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profile?.full_name}</h1>
          <p className="text-slate-500 mt-1 font-medium">{profile?.admission_number} | {profile?.class_id}</p>
        </div>
        <Badge className="bg-schoolgate-green px-4 py-1 rounded-full font-bold">Active Student</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl border-none shadow-lg bg-white p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <CreditCard size={20} />
            </div>
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Fees Outstanding</h4>
          </div>
          <p className="text-4xl font-black text-slate-800">₦0.00</p>
          <Button className="mt-6 w-full bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl font-bold py-6">Pay Now</Button>
        </Card>

        <Card className="rounded-3xl border-none shadow-lg bg-emerald-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet size={20} />
            </div>
            <h4 className="text-sm font-black text-emerald-100 uppercase tracking-widest">Wallet Balance</h4>
          </div>
          <p className="text-4xl font-black">₦{finance?.wallet?.balance || '0.00'}</p>
          <p className="mt-2 text-xs font-medium text-emerald-100 italic">Available for immediate fee payment</p>
        </Card>

        <Card className="rounded-3xl border-none shadow-lg bg-amber-500 p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <h4 className="text-sm font-black text-amber-50 white uppercase tracking-widest">Pending Payments</h4>
          </div>
          <p className="text-4xl font-black">₦{finance?.wallet?.pending_balance || '0.00'}</p>
          <p className="mt-2 text-xs font-medium text-amber-50 italic">Awaiting bursar approval</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-3xl border-none shadow-lg bg-white overflow-hidden">
          <CardHeader className="border-b p-6">
            <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-2">
              <CreditCard size={20} className="text-schoolgate-green" /> Fee Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {finance?.fees?.length ? (
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-xs font-black uppercase">
                  <tr>
                    <th className="px-6 py-4 text-left">Fee Type</th>
                    <th className="px-6 py-4 text-right">Due</th>
                    <th className="px-6 py-4 text-right">Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {finance.fees.map((f: any) => (
                    <tr key={f.id}>
                      <td className="px-6 py-4 font-bold">{f.fee_types?.name}</td>
                      <td className="px-6 py-4 text-right font-bold">₦{f.amount_due}</td>
                      <td className="px-6 py-4 text-right font-black text-emerald-600">₦{f.amount_paid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-slate-400 italic">No fee records found for this term.</div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-none shadow-lg bg-white overflow-hidden">
          <CardHeader className="border-b p-6">
            <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-2">
              <History size={20} className="text-blue-500" /> Recent Transactions
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
              <div className="p-12 text-center text-slate-400 italic">No transaction history found.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
