import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useServerFn } from "@tanstack/react-start";
import { createFeeType, getTenantClasses } from "@/lib/fee-types.functions";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Layers, Plus, Save, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().min(0, "Amount cannot be negative"),
  session: z.string().min(1, "Academic session is required"),
  term: z.string().min(1, "Term is required"),
  applicableClasses: z.array(z.string()),
  isMandatory: z.boolean(),
  isRecurring: z.boolean(),
});

interface CreateFeeTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFeeTypeDialog({ open, onOpenChange }: CreateFeeTypeDialogProps) {
  const queryClient = useQueryClient();
  const createFn = useServerFn(createFeeType);
  
  const { data: classes } = useQuery({
    queryKey: ['tenant-classes'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) return [];
      return getTenantClasses({ data: { tenantId: membership.tenant_id } });
    },
    enabled: open
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "Tuition",
      amount: 0,
      session: "2025-2026",
      term: "first",
      applicableClasses: [],
      isMandatory: true,
      isRecurring: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");
      
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      if (!membership) throw new Error("No tenant membership found");

      await createFn({
        data: {
          ...values,
          tenantId: membership.tenant_id,
          userId: user.id,
          isActive: true,
          description: `Fee type for ${values.session} session, ${values.term} term`
        }
      });

      toast.success("Fee type created and assigned successfully");
      queryClient.invalidateQueries({ queryKey: ['fee-types-registry'] });
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[24px]">
        <div className="bg-schoolgate-green p-6 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center backdrop-blur-sm">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight">Create Fee Type</DialogTitle>
                <DialogDescription className="text-white/70 font-medium">
                  Define a new fee and distribute it across classes.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="p-8 bg-white max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-700">Fee Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Tuition Fee" className="h-11 rounded-xl border-slate-200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-700">Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 rounded-xl border-slate-200">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tuition">Tuition</SelectItem>
                          <SelectItem value="Transport">Transport</SelectItem>
                          <SelectItem value="Library">Library</SelectItem>
                          <SelectItem value="ICT">ICT</SelectItem>
                          <SelectItem value="Facility">Facility</SelectItem>
                          <SelectItem value="Activity">Activity</SelectItem>
                          <SelectItem value="Examination">Examination</SelectItem>
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
                      <FormLabel className="text-xs font-bold text-slate-700">Amount (₦)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" className="h-11 rounded-xl border-slate-200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="session"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-700">Academic Session</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 rounded-xl border-slate-200">
                            <SelectValue placeholder="Select session" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2025-2026">2025/2026 Session</SelectItem>
                          <SelectItem value="2024-2025">2024/2025 Session</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="term"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold text-slate-700">Term</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 rounded-xl border-slate-200">
                            <SelectValue placeholder="Select term" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="first">First Term</SelectItem>
                          <SelectItem value="second">Second Term</SelectItem>
                          <SelectItem value="third">Third Term</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mt-8">
                <FormLabel className="text-xs font-bold text-slate-700 mb-4 block">Applicable Classes</FormLabel>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {classes?.map((className: string) => (
                    <FormField
                      key={className}
                      control={form.control}
                      name="applicableClasses"
                      render={({ field }) => {
                        return (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(className)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, className])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== className
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-medium leading-none cursor-pointer">
                              {className}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  {(!classes || classes.length === 0) && (
                    <p className="text-xs text-slate-500 col-span-full py-2 italic">
                      No classes found. Please enroll students to define classes.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <FormField
                  control={form.control}
                  name="isMandatory"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-100 p-4 bg-slate-50/50">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-bold">Mandatory Fee</FormLabel>
                        <FormDescription className="text-[10px]">Required for all students in class.</FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isRecurring"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-slate-100 p-4 bg-slate-50/50">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-bold">Recurring</FormLabel>
                        <FormDescription className="text-[10px]">Applied every session/term.</FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100 sm:justify-between items-center">
              <div className="flex items-center gap-2 text-amber-600">
                 <AlertCircle size={14} />
                 <p className="text-[10px] font-bold uppercase tracking-wider">Automated Distribution Enabled</p>
              </div>
              <div className="flex gap-3">
                <Button variant="ghost" type="button" onClick={() => onOpenChange(false)} className="h-11 px-6 rounded-xl font-bold text-slate-600">
                  Cancel
                </Button>
                <Button type="submit" className="h-11 px-8 rounded-xl bg-schoolgate-green text-white font-black shadow-lg shadow-schoolgate-green/20 hover:bg-schoolgate-green/90">
                  <Save size={18} className="mr-2" /> Save & Distribute
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}