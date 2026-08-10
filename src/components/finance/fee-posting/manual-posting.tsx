import { useState, useEffect } from "react";
import { 
  User, 
  Search, 
  Save, 
  Printer, 
  X, 
  Calculator, 
  CreditCard, 
  Clock, 
  ShieldCheck,
  AlertCircle,
  ChevronRight,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { searchStudentsForPosting, saveManualFeePosting } from "@/lib/fee-posting.functions";

export function ManualFeePosting() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [fees, setFees] = useState(0);
  const [bf, setBf] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [totalPayable, setTotalPayable] = useState(0);
  const searchFn = useServerFn(searchStudentsForPosting);
  const saveFn = useServerFn(saveManualFeePosting);

  const getTenantId = async () => {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) throw new Error("You must be signed in");
    const { data: membership } = await supabase
      .from("memberships")
      .select("tenant_id")
      .eq("user_id", auth.user.id)
      .eq("is_active", true)
      .order("is_default", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!membership) throw new Error("No school found for your account");
    return membership.tenant_id as string;
  };

  useEffect(() => {
    setTotalPayable(fees + bf - discount);
  }, [fees, bf, discount]);

  const searchMutation = useMutation({
    mutationFn: async () => {
      const tenantId = await getTenantId();
      return searchFn({ data: { tenantId, search: searchQuery.trim() } });
    },
    onSuccess: (students) => {
      const student = students?.[0];
      if (!student) {
        setSelectedStudent(null);
        toast.error("No student matched that search");
        return;
      }
      setSelectedStudent({
        id: student.id,
        name: student.full_name,
        admNo: student.admission_number,
        parent: student.parent_id ? "Linked guardian" : "Not linked",
        class: student.class_id ?? "Unassigned",
        session: "2024/2025",
        term: "1st Term",
        currentClassFee: "₦0",
      });
      setFees(0);
      setBf(0);
      setDiscount(0);
      setReason("");
      setNotes("");
      toast.success(`Loaded ${student.full_name}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const tenantId = await getTenantId();
      return saveFn({
        data: {
          tenantId,
          studentId: selectedStudent.id,
          academicSession: selectedStudent.session,
          term: selectedStudent.term,
          classId: selectedStudent.class ?? "Unassigned",
          fees,
          broughtForward: bf,
          discount,
          reason: reason || undefined,
          notes: notes || undefined,
        },
      });
    },
    onSuccess: () => toast.success("Student fee record updated successfully"),
    onError: (e: Error) => toast.error(e.message),
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Enter a name or admission number");
      return;
    }
    searchMutation.mutate();
  };

  const handleSave = () => saveMutation.mutate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Search & Profile Sidebar */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden">
          <CardHeader className="p-5 border-b bg-slate-50/50">
            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Search size={18} className="text-schoolgate-green" />
              Find Student
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search by Name or Admission No</Label>
              <div className="relative">
                <Input 
                  placeholder="Enter Name, Adm No, or Parent Name..." 
                  className="rounded-xl pl-10 h-11 border-slate-200 focus:ring-schoolgate-green"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
            <Button 
              onClick={handleSearch}
              disabled={searchMutation.isPending}
              className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-xl h-11 font-bold gap-2"
            >
              {searchMutation.isPending ? "Searching..." : "Search Database"}
            </Button>
          </CardContent>
        </Card>

        {selectedStudent && (
          <Card className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-2">
            <CardHeader className="p-5 border-b bg-schoolgate-green-light/20">
              <CardTitle className="text-sm font-bold text-schoolgate-green flex items-center gap-2">
                <User size={18} />
                Student Profile Card
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
               <div className="flex flex-col items-center text-center mb-6">
                 <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md flex items-center justify-center text-slate-300 mb-4 overflow-hidden">
                    <User size={48} />
                 </div>
                 <h3 className="text-lg font-black text-slate-900 leading-tight">{selectedStudent.name}</h3>
                 <p className="text-xs font-bold text-schoolgate-green uppercase tracking-tighter mt-1">{selectedStudent.admNo}</p>
               </div>

               <div className="space-y-3">
                 <ProfileField label="Class" value={selectedStudent.class} />
                 <ProfileField label="Parent" value={selectedStudent.parent} />
                 <ProfileField label="Session" value={selectedStudent.session} />
                 <ProfileField label="Term" value={selectedStudent.term} />
                 <div className="pt-2 border-t mt-2">
                   <ProfileField label="Default Class Fee" value={selectedStudent.currentClassFee} isHighlighted />
                 </div>
               </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Manual Posting Form */}
      <div className="lg:col-span-8">
        {!selectedStudent ? (
          <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center bg-white rounded-[20px] border-2 border-dashed border-slate-200 p-8">
             <div className="p-4 rounded-full bg-slate-50 text-slate-300 mb-4">
               <Calculator size={48} />
             </div>
             <h3 className="text-xl font-bold text-slate-400">Search for a student to begin posting</h3>
             <p className="text-sm text-slate-400 max-w-xs mt-2 font-medium">Select a student from the sidebar to manually adjust their financial record.</p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
             {/* Main Form Card */}
             <Card className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-6 border-b flex flex-row items-center justify-between">
                   <CardTitle className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <CreditCard size={22} className="text-schoolgate-green" />
                      Individual Fee Adjustment
                   </CardTitle>
                   <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 rounded-lg py-1">
                      Draft Status
                   </Badge>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">School Fees (Current Term)</Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                          <Input 
                            type="number"
                            value={fees}
                            onChange={(e) => setFees(Number(e.target.value))}
                            className="rounded-xl pl-10 h-12 border-slate-200 font-black text-lg focus:ring-schoolgate-green"
                          />
                        </div>
                        <p className="text-[10px] font-medium text-slate-400 italic">Adjust this if student has specific term pricing.</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-xs font-bold text-slate-500 uppercase">Balance Brought Forward (B/F)</Label>
                          <Badge variant="outline" className="text-[9px] bg-amber-50 text-amber-600 border-amber-100 uppercase py-0 px-1.5 h-4 font-black">Arrears</Badge>
                        </div>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                          <Input 
                            type="number"
                            value={bf}
                            onChange={(e) => setBf(Number(e.target.value))}
                            className="rounded-xl pl-10 h-12 border-slate-200 font-black text-lg focus:ring-schoolgate-green bg-amber-50/10"
                          />
                        </div>
                        <p className="text-[10px] font-medium text-amber-500 italic">This debt from previous terms stays separate from current term fees.</p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Discount / Scholarship Amount</Label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₦</span>
                          <Input 
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            className="rounded-xl pl-10 h-12 border-slate-200 font-black text-lg focus:ring-schoolgate-green text-emerald-600"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-bold text-slate-500 uppercase">Discount Category (Required)</Label>
                        <Select value={reason} onValueChange={setReason}>
                          <SelectTrigger className="rounded-xl h-12 border-slate-200 font-bold">
                            <SelectValue placeholder="Select Reason..." />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100">
                            <SelectItem value="Scholarship">Full Scholarship</SelectItem>
                            <SelectItem value="Staff Child">Staff Child Benefit</SelectItem>
                            <SelectItem value="Sibling Discount">Sibling Discount</SelectItem>
                            <SelectItem value="Repeating Student">Repeating Student concession</SelectItem>
                            <SelectItem value="Management Approval">Management Approval</SelectItem>
                            <SelectItem value="Promotional">Promotional Discount</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                   </div>

                   <div className="space-y-2 pt-2">
                      <Label className="text-xs font-bold text-slate-500 uppercase">Internal Notes / Remarks (Optional)</Label>
                      <Textarea 
                        placeholder="Add specific details for this adjustment..."
                        className="rounded-xl min-h-[100px] border-slate-200 font-medium leading-relaxed"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                   </div>

                   {/* Total Display */}
                   <div className="bg-slate-900 rounded-[24px] p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-schoolgate-green/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-schoolgate-green/30 transition-all duration-700" />
                      <div>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                           <Calculator size={14} className="text-schoolgate-green" />
                           Total Amount Payable
                        </p>
                        <h2 className="text-3xl font-black tracking-tight text-white">
                           ₦{totalPayable.toLocaleString()}
                        </h2>
                        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">
                           Calculation: Fees ({fees.toLocaleString()}) + B/F ({bf.toLocaleString()}) - Disc ({discount.toLocaleString()})
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 min-w-[140px]">
                         <Button className="w-full bg-schoolgate-green hover:bg-schoolgate-green/90 rounded-xl h-11 font-black shadow-lg shadow-schoolgate-green/20" onClick={handleSave} disabled={saveMutation.isPending}>
                           <Save size={18} className="mr-2" />
                           {saveMutation.isPending ? "Saving..." : "Save Posting"}
                         </Button>
                         <Button variant="outline" className="w-full bg-white/5 border-white/10 hover:bg-white/10 rounded-xl h-11 font-bold text-white">
                           <X size={18} className="mr-2" />
                           Cancel
                         </Button>
                      </div>
                   </div>

                   {/* Secondary Actions */}
                   <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                         <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                            <Clock size={14} /> Last Updated: Never
                         </div>
                         <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                            <ShieldCheck size={14} /> Approved by: None
                         </div>
                      </div>
                      <Button variant="ghost" className="text-schoolgate-green font-bold hover:bg-schoolgate-green-light rounded-xl h-10">
                        <Printer size={16} className="mr-2" /> Print Student Statement
                      </Button>
                   </div>
                </CardContent>
             </Card>

             {/* Recent History Inline */}
             <Card className="rounded-[20px] border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-5 border-b flex flex-row items-center justify-between bg-slate-50/50">
                   <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Clock size={18} className="text-slate-400" />
                      Recent Posting History for {selectedStudent.name}
                   </CardTitle>
                   <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-wider h-8 text-schoolgate-green">
                      View Full History <ChevronRight size={14} className="ml-1" />
                   </Button>
                </CardHeader>
                <CardContent className="p-0">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <th className="px-6 py-3">Term</th>
                          <th className="px-6 py-3">Fees</th>
                          <th className="px-6 py-3">B/F</th>
                          <th className="px-6 py-3">Disc.</th>
                          <th className="px-6 py-3 text-right">Total Payable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        <tr className="text-sm font-medium text-slate-600">
                          <td className="px-6 py-4">3rd Term 2023</td>
                          <td className="px-6 py-4">₦38,000</td>
                          <td className="px-6 py-4">₦2,500</td>
                          <td className="px-6 py-4">₦0</td>
                          <td className="px-6 py-4 text-right font-black text-slate-900">₦40,500</td>
                        </tr>
                        <tr className="text-sm font-medium text-slate-600">
                          <td className="px-6 py-4">2nd Term 2023</td>
                          <td className="px-6 py-4">₦38,000</td>
                          <td className="px-6 py-4">₦12,000</td>
                          <td className="px-6 py-4">₦5,000</td>
                          <td className="px-6 py-4 text-right font-black text-slate-900">₦45,000</td>
                        </tr>
                      </tbody>
                   </table>
                </CardContent>
             </Card>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileField({ label, value, isHighlighted }: any) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className={cn(
        "text-sm font-bold",
        isHighlighted ? "text-schoolgate-green text-base" : "text-slate-700"
      )}>{value}</span>
    </div>
  );
}
