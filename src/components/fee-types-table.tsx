import { useMemo, useState } from "react";
import {
  Archive,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
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

type FeeStatus = "Active" | "Archived" | "Draft";

type FeeType = {
  id: string;
  name: string;
  school: string;
  applicableClass: string;
  category: string;
  amount: number;
  studentsAssigned: number;
  status: FeeStatus;
  createdBy: string;
  dateCreated: string;
};

const FEE_TYPES: FeeType[] = [
  { id: "1", name: "Tuition Fee", school: "Secondary School", applicableClass: "JSS 1 – SS 3", category: "Tuition", amount: 75000, studentsAssigned: 120, status: "Active", createdBy: "Adaeze Okonkwo", dateCreated: "12 Jan 2026" },
  { id: "2", name: "Boarding Fee", school: "Secondary School", applicableClass: "JSS 1 – SS 3", category: "Boarding", amount: 145000, studentsAssigned: 64, status: "Active", createdBy: "Adaeze Okonkwo", dateCreated: "12 Jan 2026" },
  { id: "3", name: "Transport Fee", school: "All Schools", applicableClass: "All Classes", category: "Transport", amount: 32500, studentsAssigned: 210, status: "Active", createdBy: "Ibrahim Bello", dateCreated: "18 Jan 2026" },
  { id: "4", name: "Library Levy", school: "Primary School", applicableClass: "Primary 1 – 6", category: "Facility", amount: 8500, studentsAssigned: 340, status: "Active", createdBy: "Ibrahim Bello", dateCreated: "02 Feb 2026" },
  { id: "5", name: "ICT Laboratory Fee", school: "Secondary School", applicableClass: "SS 1 – SS 3", category: "Facility", amount: 21000, studentsAssigned: 88, status: "Draft", createdBy: "Chinelo Umeh", dateCreated: "09 Feb 2026" },
  { id: "6", name: "PTA Levy", school: "All Schools", applicableClass: "All Classes", category: "Levy", amount: 5000, studentsAssigned: 512, status: "Active", createdBy: "Chinelo Umeh", dateCreated: "14 Feb 2026" },
  { id: "7", name: "Excursion Fee", school: "Primary School", applicableClass: "Primary 4 – 6", category: "Activity", amount: 17500, studentsAssigned: 96, status: "Archived", createdBy: "Tunde Alabi", dateCreated: "21 Feb 2026" },
  { id: "8", name: "Examination Fee", school: "Secondary School", applicableClass: "JSS 3 & SS 3", category: "Examination", amount: 12500, studentsAssigned: 154, status: "Active", createdBy: "Tunde Alabi", dateCreated: "03 Mar 2026" },
];

type SortKey = "name" | "amount" | "expectedRevenue" | "status";
type SortDirection = "asc" | "desc";

const STATUS_ORDER: Record<FeeStatus, number> = { Active: 0, Draft: 1, Archived: 2 };

const naira = (value: number) =>
  `₦${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

const statusStyles: Record<FeeStatus, string> = {
  Active: "border-transparent bg-schoolgate-green-light text-schoolgate-green",
  Draft: "border-transparent bg-amber-100 text-amber-800",
  Archived: "border-transparent bg-muted text-muted-foreground",
};

export function FeeTypesTable() {
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [selected, setSelected] = useState<string[]>([]);

  const rows = useMemo(() => {
    const withRevenue = FEE_TYPES.map((fee) => ({
      ...fee,
      expectedRevenue: fee.amount * fee.studentsAssigned,
    }));

    const factor = sortDirection === "asc" ? 1 : -1;
    return withRevenue.sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name) * factor;
        case "amount":
          return (a.amount - b.amount) * factor;
        case "expectedRevenue":
          return (a.expectedRevenue - b.expectedRevenue) * factor;
        case "status":
          return (STATUS_ORDER[a.status] - STATUS_ORDER[b.status]) * factor;
        default:
          return 0;
      }
    });
  }, [sortKey, sortDirection]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const allSelected = selected.length === rows.length && rows.length > 0;

  const toggleAll = (checked: boolean) =>
    setSelected(checked ? rows.map((r) => r.id) : []);

  const toggleRow = (id: string, checked: boolean) =>
    setSelected((prev) => (checked ? [...prev, id] : prev.filter((v) => v !== id)));

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
    <div className="overflow-hidden rounded-[14px] border border-border/70">
      <div className="max-h-[560px] overflow-auto">
        <table className="w-full min-w-[1400px] border-collapse text-sm">
          <thead className="sticky top-0 z-10">
            <tr className="bg-page-background text-left text-xs font-medium uppercase tracking-wide text-muted-foreground shadow-[inset_0_-1px_0_0_var(--color-border)]">
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
              <th className="px-4 py-3">School</th>
              <th className="px-4 py-3">Applicable Class</th>
              <th className="px-4 py-3">Fee Category</th>
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
                    "border-b border-border/60 transition-colors last:border-0",
                    index % 2 === 1 ? "bg-page-background/60" : "bg-white",
                    "hover:bg-schoolgate-green-light/60",
                    isSelected && "bg-schoolgate-green-light/80",
                  )}
                >
                  <td className="px-4 py-3.5">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={(v) => toggleRow(fee.id, Boolean(v))}
                      aria-label={`Select ${fee.name}`}
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 font-medium text-foreground">
                    {fee.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">{fee.school}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">{fee.applicableClass}</td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <Badge variant="outline" className="rounded-md border-border font-normal text-muted-foreground">
                      {fee.category}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right tabular-nums text-foreground">
                    {naira(fee.amount)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right tabular-nums text-muted-foreground">
                    {fee.studentsAssigned.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-right font-bold tabular-nums text-schoolgate-green">
                    {naira(fee.expectedRevenue)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <Badge className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[fee.status])}>
                      {fee.status}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">{fee.createdBy}</td>
                  <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">{fee.dateCreated}</td>
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
                        <DropdownMenuItem><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
                        <DropdownMenuItem><Archive className="h-4 w-4" /> Archive</DropdownMenuItem>
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
