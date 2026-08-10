import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getResultsForBulkAction, bulkUpdateResultStatus } from "@/lib/results.functions";
import { useTenant } from "@/hooks/use-tenant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  CheckCircle2, 
  XCircle, 
  Undo2, 
  Globe, 
  FileText, 
  Search, 
  User, 
  Clock, 
  ArrowRight,
  Filter
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultApprovalCentre() {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [session, setSession] = useState("2023/2024");
  const [term, setTerm] = useState("Second Term");

  const { data: results, isLoading } = useQuery({
    queryKey: ['results-approval-queue', tenantId, session, term],
    queryFn: () => getResultsForBulkAction({ 
      data: {
        tenantId: tenantId!, 
        session, 
        term 
      }
    }),
    enabled: !!tenantId,
  });

  const mutation = useMutation({
    mutationFn: (vars: { ids: string[], status: 'approved' | 'published' }) => 
      bulkUpdateResultStatus({ 
        data: {
          tenantId: tenantId!, 
          resultIds: vars.ids, 
          status: vars.status 
        }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['results-approval-queue'] });
      setSelectedIds([]);
      toast.success("Result status updated successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update status");
    }
  });

  const handleBulkAction = (status: 'approved' | 'published') => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one result");
      return;
    }
    mutation.mutate({ ids: selectedIds, status });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === (results?.length || 0)) {
      setSelectedIds([]);
    } else {
      setSelectedIds(results?.map((r: any) => r.id) || []);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Workflow Visualization */}
      <div className="bg-white p-8 rounded-[14px] shadow-sm border border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 text-center">Approval Workflow Pipeline</h3>
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-0" />
          {[
            { label: "Teacher", active: true },
            { label: "Subject Head", active: true },
            { label: "VP Academics", active: true },
            { label: "Principal", active: false },
            { label: "Published", active: false, icon: Globe }
          ].map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step.active ? "bg-schoolgate-green border-schoolgate-green text-white scale-110 shadow-lg shadow-schoolgate-green/20" : "bg-white border-slate-200 text-slate-400"}`}>
                {step.icon ? <step.icon size={18} /> : <span className="text-sm font-bold">{i + 1}</span>}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider ${step.active ? "text-schoolgate-green" : "text-slate-400"}`}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics & Actions */}
        <div className="space-y-4">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Approval Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50">
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-600 w-4 h-4" />
                  <span className="text-sm font-bold text-blue-900">Submitted</span>
                </div>
                <span className="text-lg font-black text-blue-900">
                  {results?.filter((r: any) => r.status === 'submitted').length || 0}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-600 w-4 h-4" />
                  <span className="text-sm font-bold text-emerald-900">Approved</span>
                </div>
                <span className="text-lg font-black text-emerald-900">
                  {results?.filter((r: any) => r.status === 'approved').length || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={() => handleBulkAction('published')}
            disabled={mutation.isPending || selectedIds.length === 0}
            className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 h-12 rounded-xl font-bold shadow-lg shadow-schoolgate-green/20 gap-2"
          >
            <Globe size={18} /> {mutation.isPending ? "Processing..." : "Publish Approved Results"}
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleBulkAction('approved')}
            disabled={mutation.isPending || selectedIds.length === 0}
            className="w-full h-11 rounded-xl font-bold border-slate-200 gap-2 text-slate-600 mt-2"
          >
            <CheckCircle2 size={18} /> Bulk Approve Selection
          </Button>
        </div>

        {/* Requests List */}
        <div className="lg:col-span-2">
          <Card className="rounded-[14px] border-none shadow-sm bg-white overflow-hidden h-full">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-black text-slate-800 uppercase tracking-wider">Submitted Results Queue</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2">
                  <Filter size={14} /> Filter Queue
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 space-y-4">
                  {[1,2,3,4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-slate-50/30">
                    <TableRow className="hover:bg-transparent border-slate-50">
                      <TableHead className="w-12 px-6">
                        <Checkbox 
                          checked={selectedIds.length > 0 && selectedIds.length === results?.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider">Student & Subject</TableHead>
                      <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Status</TableHead>
                      <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider text-right px-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results?.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-32 text-center text-slate-400 font-medium">
                          No pending result approvals found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      results?.map((req: any) => (
                        <TableRow key={req.id} className="hover:bg-slate-50/50 border-slate-50 transition-colors">
                          <TableCell className="px-6">
                            <Checkbox 
                              checked={selectedIds.includes(req.id)}
                              onCheckedChange={() => toggleSelect(req.id)}
                            />
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex flex-col">
                              <span className="font-black text-slate-900 text-sm tracking-tight">{req.students?.full_name}</span>
                              <span className="text-xs font-bold text-slate-500">{req.subjects?.name} • Score: {req.ca_score + req.exam_score}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={`rounded-full border-none px-3 py-1 text-[10px] font-black uppercase tracking-wider ${
                              req.status === 'published' ? 'bg-emerald-100 text-emerald-600' : 
                              req.status === 'approved' ? 'bg-blue-100 text-blue-600' : 
                              'bg-amber-100 text-amber-600'
                            }`}>
                              {req.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right px-6">
                            <div className="flex items-center justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => mutation.mutate({ ids: [req.id], status: 'approved' })}
                                className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                              >
                                <CheckCircle2 size={16} />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg">
                                <XCircle size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
        <Clock size={14} /> Systems active. All approval actions are logged for audit.
      </div>
    </div>
  );
}
