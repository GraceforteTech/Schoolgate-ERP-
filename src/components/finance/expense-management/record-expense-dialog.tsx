import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Receipt, Loader2, Save } from "lucide-react";
import { recordExpense } from "@/lib/expenses.functions";
import { supabase } from "@/integrations/supabase/client";

const EXPENSE_CATEGORIES = [
  "Salaries & Wages",
  "Utilities",
  "Maintenance & Repairs",
  "Teaching Materials",
  "Transport & Logistics",
  "Catering & Feeding",
  "Administrative",
  "Marketing",
  "Other",
];

const formSchema = z.object({
  category: z.string().min(2, "Select a category"),
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((v) => Number(v) > 0, "Amount must be greater than zero"),
  vendor: z.string().trim().max(160).optional(),
  method: z.enum(["cash", "bank_transfer", "card", "cheque", "wallet"]),
  reference: z.string().trim().max(120).optional(),
  date: z.string().min(1, "Select a date"),
  description: z.string().trim().max(1000).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface RecordExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecordExpenseDialog({ open, onOpenChange }: RecordExpenseDialogProps) {
  const queryClient = useQueryClient();
  const recordFn = useServerFn(recordExpense);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: "",
      vendor: "",
      method: "bank_transfer",
      reference: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be signed in to record an expense");

      const { data: membership } = await supabase
        .from("memberships")
        .select("tenant_id")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .limit(1)
        .maybeSingle();

      if (!membership) throw new Error("No active school found for your account");

      return recordFn({
        data: {
          tenantId: membership.tenant_id,
          category: values.category,
          amount: Number(values.amount),
          vendor: values.vendor || undefined,
          method: values.method,
          reference: values.reference || undefined,
          description: values.description || undefined,
          date: values.date,
        },
      });
    },
    onSuccess: () => {
      toast.success("Expense recorded and sent for approval");
      queryClient.invalidateQueries({ queryKey: ["expenses-register"] });
      queryClient.invalidateQueries({ queryKey: ["expense-kpis"] });
      form.reset();
      onOpenChange(false);
    },
    onError: (err: any) => toast.error(err?.message ?? "Could not record expense"),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[32px] shadow-2xl">
        <DialogHeader className="bg-schoolgate-green p-8 space-y-0">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-black tracking-tighter text-white">
                Record Expense
              </DialogTitle>
              <DialogDescription className="text-white/80 font-bold uppercase text-[10px] tracking-widest mt-1">
                Logged as pending until approved
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
            <div className="p-10 bg-white max-h-[65vh] overflow-y-auto space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-2xl">
                          {EXPENSE_CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c} className="font-medium">{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₦)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="0.00" className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold tabular-nums" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vendor / Payee</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Alpha Diesel Ltd" className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-2xl">
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="wallet">Wallet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reference</FormLabel>
                      <FormControl>
                        <Input placeholder="REF-12345" className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expense Date</FormLabel>
                      <FormControl>
                        <Input type="date" className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="What was this expense for?" className="rounded-2xl border-slate-100 bg-slate-50/50 font-medium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="px-10 py-6 bg-slate-50/50 border-t border-slate-100 gap-3">
              <Button
                type="button"
                variant="ghost"
                className="h-12 rounded-2xl font-black uppercase text-[11px] tracking-widest text-slate-500"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="h-12 px-10 rounded-2xl bg-schoolgate-green text-white font-black uppercase text-[11px] tracking-widest shadow-xl shadow-schoolgate-green/30 hover:bg-schoolgate-green/90"
              >
                {mutation.isPending ? (
                  <><Loader2 className="h-4 w-4 mr-3 animate-spin" /> Saving</>
                ) : (
                  <><Save className="h-4 w-4 mr-3" /> Record Expense</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}