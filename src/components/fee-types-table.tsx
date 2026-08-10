import { useMemo, useState } from "react";
import {
  Archive,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CheckCircle2,
  Copy,
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useServerFn } from "@tanstack/react-start";
import { updateFeeTypeStatus } from "@/lib/fee-types.functions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type FeeStatus = "Active" | "Archived" | "Draft";

type FeeType = {
  id: string;
  name: string;
  description?: string;
  category: string;
  amount: number;
  studentsAssigned: number;
  expectedRevenue: number;
  is_active: boolean;
  academic_session?: string;
  term?: string;
  applicable_classes?: string[];
  created_at: string;
  is_mandatory?: boolean;
  is_recurring?: boolean;
};

type SortKey = "name" | "amount" | "expectedRevenue" | "status";
type SortDirection = "asc" | "desc";

const naira = (value: number) =>
  `₦${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

export function FeeTypesTable({ 
  data = [], 
  selected = [], 
  onSelectionChange 
}: { 
  data?: any[]; 
  selected?: string[];
  onSelectionChange?: (ids: string[]) => void;
}) {

  const queryClient = useQueryClient();
  const updateStatus = useServerFn(updateFeeTypeStatus);

  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const toggleAll = (checked: boolean) => {
    const newSelection = checked ? rows.map((r) => r.id) : [];
    onSelectionChange?.(newSelection);
  };

  const toggleRow = (id: string, checked: boolean) => {
    const newSelection = checked ? [...selected, id] : selected.filter((v) => v !== id);
    onSelectionChange?.(newSelection);
  };


  const rows = useMemo(() => {
    const factor = sortDirection === "asc" ? 1 : -1;
    return [...data].sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name) * factor;
        case "amount":
          return (Number(a.amount) - Number(b.amount)) * factor;
        case "expectedRevenue":
          return (Number(a.expectedRevenue) - Number(b.expectedRevenue)) * factor;
        case "status":
          return (Number(a.is_active ? 0 : 1) - Number(b.is_active ? 0 : 1)) * factor;
        default:
          return 0;
      }
    });
  }, [data, sortKey, sortDirection]);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return;

      await updateStatus({ data: { id, isActive: !currentStatus, tenantId: membership.tenant_id } });
      queryClient.invalidateQueries({ queryKey: ['fee-types-registry'] });
      toast.success(`Fee type ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };


  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const allSelected = selected.length === rows.length && rows.length > 0;


  const SortButton = ({ label, sortValue }: { label: string; sortValue: SortKey }) => {
    const active = sortKey === sortValue;
    const Icon = !active ? ArrowUpDown : sortDirection === "asc" ? ArrowUp : ArrowDown;
    return (
      <button
        type="button"
        onClick={() => toggleSort(sortValue)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 transition-colors hover:text-foreground",
          active && "text-schoolgate-green",
        )}
      >
        {label}
        <Icon className="h-3.5 w-3.5" />
      </button>
    );
  };

  return (
    <div className="overflow-hidden bg-white">
      <div className="max-h-[600px] overflow-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        <table className="w-full min-w-[1400px] border-separate border-spacing-0 text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-50/50 backdrop-blur-md text-left text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.02)]">
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(v) => toggleAll(Boolean(v))}
                  aria-label="Select all fee types"
                />
              </th>
              <th className="px-4 py-3">
                <SortButton label="Fee Name" sortValue="name" />
              </th>
              <th className="px-4 py-3">Session</th>
              <th className="px-4 py-3">Term</th>
              <th className="px-4 py-3">Applicable Classes</th>
              <th className="px-4 py-3">Mandatory</th>
              <th className="px-4 py-3">Recurring</th>

              <th className="px-4 py-3 text-right">
                <SortButton label="Amount" sortValue="amount" />
              </th>
              <th className="px-4 py-3 text-right">Students Assigned</th>
              <th className="px-4 py-3 text-right">
                <SortButton label="Expected Revenue" sortValue="expectedRevenue" />
              </th>
              <th className="px-4 py-3">
                <SortButton label="Status" sortValue="status" />
              </th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Created By</th>
              <th className="px-4 py-3">Date Created</th>

              <th className="w-16 px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((fee, index) => {
              const isSelected = selected.includes(fee.id);
              return (
                <tr
                  key={fee.id}
                  className={cn(
                    "group border-b border-slate-50 transition-all duration-300",
                    index % 2 === 1 ? "bg-slate-50/10" : "bg-white",
                    "hover:bg-schoolgate-green-light/20 hover:shadow-[inset_4px_0_0_0_#0B6E3C]",
                    isSelected && "bg-schoolgate-green-light/40 shadow-[inset_4px_0_0_0_#0B6E3C]",
                  )}
                >
                  <td className="px-4 py-3.5">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(v) => toggleRow(fee.id, Boolean(v))}
                      aria-label={`Select ${fee.name}`}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 font-black text-slate-900 tracking-tight">
                    {fee.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-[11px] font-bold text-slate-500">{fee.academic_session}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">{fee.term}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-[11px] font-medium text-slate-400 italic">{fee.applicable_classes?.join(', ') || 'None'}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">
                    <Badge variant="outline" className={cn("rounded-md font-normal", fee.is_mandatory ? "text-schoolgate-green border-schoolgate-green" : "text-muted-foreground")}>
                      {fee.is_mandatory ? 'Yes' : 'No'}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">
                    <Badge variant="outline" className="rounded-md border-border font-normal text-muted-foreground">
                      {fee.is_recurring ? 'Yes' : 'No'}
                    </Badge>
                  </td>

                  <td className="whitespace-nowrap px-4 py-3.5 text-right tabular-nums text-foreground">
                    {naira(fee.amount)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right tabular-nums text-muted-foreground">
                    {fee.studentsAssigned.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right font-black tabular-nums text-schoolgate-green tracking-tighter text-base">
                    {naira(fee.expectedRevenue)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <Badge className={cn("rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-widest border-none", fee.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400")}>
                      {fee.is_active ? 'Active' : 'Archived'}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground uppercase text-[10px] font-bold">{fee.category}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">{fee.created_by_profile?.full_name || 'System'}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">{new Date(fee.created_at).toLocaleDateString()}</td>


                  <td className="px-4 py-3.5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open actions for {fee.name}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-lg">
                        <DropdownMenuItem><Eye className="h-4 w-4" /> View</DropdownMenuItem>
                        <DropdownMenuItem><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(fee.id, fee.is_active)}>
                          {fee.is_active ? <Archive className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                          {fee.is_active ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
