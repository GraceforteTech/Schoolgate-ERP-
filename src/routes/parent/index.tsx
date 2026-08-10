import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getChildren } from "@/lib/students.functions";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Wallet, CreditCard, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/parent/")({
  component: ParentDashboard,
});

function ParentDashboard() {
  const fetchChildren = useServerFn(getChildren);
  
  const { data: children, isLoading } = useQuery({
    queryKey: ['parent-children'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];
      return fetchChildren({ data: { parentId: session.user.id } });
    }
  });

  if (isLoading) return <div className="p-8 text-center">Loading children...</div>;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Parent Portal</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your children's education and finances.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children?.map((child: any) => (
          <Card key={child.id} className="rounded-3xl border-none shadow-xl hover:shadow-2xl transition-all group overflow-hidden">
            <div className="bg-schoolgate-green p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{child.full_name}</h3>
                  <p className="text-emerald-100 text-sm font-medium">{child.class_id} | {child.campuses?.name}</p>
                </div>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Fees Balance</p>
                  <p className="text-lg font-black text-slate-800">₦0.00</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Wallet</p>
                  <p className="text-lg font-black text-emerald-600">₦0.00</p>
                </div>
              </div>
              <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 rounded-xl py-6 gap-2 font-bold shadow-lg">
                <Link to="/parent/child/$childId" params={{ childId: child.id }}>
                  View Details <ChevronRight size={18} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
