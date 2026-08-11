import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, Loader2 } from "lucide-react";
import { enrollStudent, getCampuses } from "@/lib/students.functions";
import { getTenantClasses } from "@/lib/fee-types.functions";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  full_name: z.string().min(3, "Full name must be at least 3 characters"),
  admission_number: z.string().min(2, "Admission number is required"),
  class_id: z.string().min(1, "Please select a class"),
  campus_id: z.string().min(1, "Please select a campus"),
  gender: z.string().optional(),
});

interface EnrollStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantId: string;
}

export function EnrollStudentDialog({ open, onOpenChange, tenantId }: EnrollStudentDialogProps) {
  const queryClient = useQueryClient();
  const enrollFn = useServerFn(enrollStudent);
  const fetchCampuses = useServerFn(getCampuses);
  const fetchClasses = useServerFn(getTenantClasses);
  
  const { data: campuses = [] } = useQuery({
    queryKey: ['campuses', tenantId],
    queryFn: () => fetchCampuses({ data: { tenantId } }),
    enabled: open
  });

  const { data: classes = [] } = useQuery({
    queryKey: ['tenant-classes-list', tenantId],
    queryFn: () => fetchClasses({ data: { tenantId } }),
    enabled: open
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      admission_number: "",
      class_id: "",
      campus_id: "",
      gender: "male",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await enrollFn({
        data: {
          ...values,
          tenant_id: tenantId,
          status: "active",
        },
      });
      
      toast.success("Student enrolled successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast.error(error.message || "Failed to enroll student");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] rounded-[24px] border-none shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-schoolgate-green-light flex items-center justify-center text-schoolgate-green">
              <UserPlus size={24} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
                Enrol New Student
              </DialogTitle>
              <DialogDescription className="text-slate-500 font-medium">
                Add a new student to the school register.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-5">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter student's full name" {...field} className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="admission_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Admission No.</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 2024/001" {...field} className="h-12 rounded-xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all" />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value!}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-slate-50/50">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="class_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Target Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value!}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-slate-50/50">
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        {classes.map((cls: string) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                        {classes.length === 0 && (
                          <SelectItem value="SS 1 Alpha">SS 1 Alpha</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="campus_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Campus</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value!}>
                      <FormControl>
                        <SelectTrigger className="h-12 rounded-xl border-slate-100 bg-slate-50/50">
                          <SelectValue placeholder="Select campus" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                        {campuses.map((c: any) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                        {campuses.length === 0 && (
                          <SelectItem value={tenantId}>Main Campus</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => onOpenChange(false)}
                className="h-12 rounded-xl font-bold text-slate-500"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting}
                className="h-12 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 text-white font-bold px-8 shadow-lg shadow-schoolgate-green/20"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                Complete Enrollment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
