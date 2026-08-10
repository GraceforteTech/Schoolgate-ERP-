import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Copy, Eye, Save, Send, Trash2, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTenant } from "@/hooks/use-tenant";
import { supabase } from "@/integrations/supabase/client";
import { updateGradingScheme } from "@/lib/results.functions";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

export function ResultConfig() {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const updateScheme = useServerFn(updateGradingScheme);

  const [assessments] = useState([
    { name: "CA 1", score: 10 },
    { name: "CA 2", score: 10 },
    { name: "CA 3", score: 10 },
    { name: "Project", score: 10 },
    { name: "Assignment", score: 10 },
    { name: "Exam", score: 50 },
  ]);

  const { data: gradingRules, isLoading: loadingRules } = useQuery({
    queryKey: ['grading-rules', tenantId],
    queryFn: async () => {
      // 1. Get schemes for tenant
      const { data: schemes } = await supabase.from('grading_schemes').select('id').eq('tenant_id', tenantId!);
      if (!schemes || schemes.length === 0) return [];
      
      // 2. Get rules for those schemes
      const { data, error } = await supabase.from('grading_rules').select('*').in('scheme_id', schemes.map(s => s.id));
      if (error) throw error;
      return data || [];
    },
    enabled: !!tenantId
  });

  const [localGrades, setLocalGrades] = useState<any[]>([]);

  // Initialize local state when data loads
  useState(() => {
    if (gradingRules && localGrades.length === 0) {
      setLocalGrades(gradingRules);
    }
  });

  const mutation = useMutation({
    mutationFn: (rules: any[]) => updateScheme({ data: { tenantId: tenantId!, rules } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['grading-rules'] });
      toast.success("Grading scheme updated successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update grading scheme");
    }
  });

  const handleAddGrade = () => {
    setLocalGrades([...localGrades, { grade: "", min_score: 0, max_score: 0, remark: "" }]);
  };

  const handleUpdateGrade = (index: number, field: string, value: any) => {
    const updated = [...localGrades];
    updated[index] = { ...updated[index], [field]: value };
    setLocalGrades(updated);
  };

  const handleRemoveGrade = (index: number) => {
    setLocalGrades(localGrades.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    mutation.mutate(localGrades);
  };

  const grades = localGrades.length > 0 ? localGrades : (gradingRules || [
    { grade: "A1", min_score: 80, max_score: 100, remark: "Distinction" },
    { grade: "B2", min_score: 70, max_score: 79, remark: "Very Good" },
    { grade: "B3", min_score: 65, max_score: 69, remark: "Good" },
    { grade: "C4", min_score: 60, max_score: 64, remark: "Credit" },
    { grade: "C5", min_score: 55, max_score: 59, remark: "Credit" },
    { grade: "C6", min_score: 50, max_score: 54, remark: "Credit" },
    { grade: "D7", min_score: 45, max_score: 49, remark: "Pass" },
    { grade: "E8", min_score: 40, max_score: 44, remark: "Pass" },
    { grade: "F9", min_score: 0, max_score: 39, remark: "Fail" },
  ]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Assessment Structure */}
      <Card className="rounded-[14px] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
          <CardTitle className="text-lg font-black text-slate-800">Assessment Structure</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            {assessments.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-xs font-bold text-slate-400 uppercase">Assessment Name</Label>
                  <Input defaultValue={item.name} className="h-10 rounded-lg border-slate-200" />
                </div>
                <div className="w-24">
                  <Label className="text-xs font-bold text-slate-400 uppercase">Max Score</Label>
                  <Input type="number" defaultValue={item.score} className="h-10 rounded-lg border-slate-200" />
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full h-11 border-dashed border-2 rounded-xl text-slate-500 hover:text-schoolgate-green hover:border-schoolgate-green gap-2">
              <Plus size={16} /> Add Assessment Component
            </Button>
          </div>
          
          <Separator className="bg-slate-100" />
          
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
            <span className="text-sm font-bold text-emerald-700">Total Score Calculation</span>
            <span className="text-2xl font-black text-emerald-800">100</span>
          </div>
        </CardContent>
      </Card>

      {/* Grading System */}
      <Card className="rounded-[14px] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
          <CardTitle className="text-lg font-black text-slate-800">Grading System</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-10 gap-2 text-xs font-bold text-slate-400 uppercase px-2">
              <div className="col-span-2">Grade</div>
              <div className="col-span-2">Min</div>
              <div className="col-span-2">Max</div>
              <div className="col-span-4">Remark</div>
            </div>
            {grades.map((item, i) => (
              <div key={i} className="grid grid-cols-10 gap-2">
                <div className="col-span-2">
                  <Input defaultValue={item.grade} className="h-10 rounded-lg border-slate-200 font-bold" />
                </div>
                <div className="col-span-2">
                  <Input type="number" defaultValue={item.min} className="h-10 rounded-lg border-slate-200" />
                </div>
                <div className="col-span-2">
                  <Input type="number" defaultValue={item.max} className="h-10 rounded-lg border-slate-200" />
                </div>
                <div className="col-span-4">
                  <Input defaultValue={item.remark} className="h-10 rounded-lg border-slate-200" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            <Separator className="bg-slate-100" />
            <div>
              <h3 className="text-sm font-bold text-slate-800 mb-4">Promotion Policy</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-400 uppercase">Minimum Pass Mark</Label>
                  <Input type="number" defaultValue={40} className="h-10 rounded-lg border-slate-200" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-400 uppercase">Class Average Target</Label>
                  <Input type="number" defaultValue={55} className="h-10 rounded-lg border-slate-200" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-800">Remark Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Pass Remark</Label>
                  <Input defaultValue="Good performance. Keep it up." className="h-9 mt-1 rounded-lg border-slate-200 text-sm" />
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Fail Remark</Label>
                  <Input defaultValue="Requires more effort and focus." className="h-9 mt-1 rounded-lg border-slate-200 text-sm" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 h-11 rounded-xl px-6 gap-2 shadow-lg shadow-schoolgate-green/20">
                <Save size={18} /> Save Configuration
              </Button>
              <Button variant="outline" className="h-11 rounded-xl gap-2 border-slate-200">
                <Eye size={18} /> Preview
              </Button>
              <Button variant="outline" className="h-11 rounded-xl gap-2 border-slate-200">
                <Send size={18} /> Apply to Classes
              </Button>
              <Button variant="outline" className="h-11 rounded-xl gap-2 border-slate-200">
                <Copy size={18} /> Copy to Other Classes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
