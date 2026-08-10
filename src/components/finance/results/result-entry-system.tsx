import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { saveResultScores } from "@/lib/results.functions";
import { useTenant } from "@/hooks/use-tenant";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Upload, Download, Save, Send, Printer } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export function ResultEntrySystem() {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [session, setSession] = useState("2023/2024");
  const [term, setTerm] = useState("Second Term");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Fetch students in the selected class
  const { data: students, isLoading: loadingStudents } = useQuery({
    queryKey: ['students-for-entry', tenantId, selectedClass],
    queryFn: async () => {
      let query = supabase.from('students').select('*').eq('tenant_id', tenantId!);
      if (selectedClass) query = query.eq('class_id', selectedClass);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  // Fetch existing results for editing
  const { data: existingResults, isLoading: loadingResults } = useQuery({
    queryKey: ['existing-results', tenantId, session, term, selectedClass, selectedSubject],
    queryFn: async () => {
      let query = supabase.from('academic_results').select('*')
        .eq('tenant_id', tenantId!)
        .eq('academic_session', session)
        .eq('term', term);
      
      if (selectedClass) query = query.eq('class_id', selectedClass);
      if (selectedSubject) query = query.eq('subject_id', selectedSubject);
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!tenantId,
  });

  const mutation = useMutation({
    mutationFn: (results: any[]) => saveResultScores({ data: { tenantId: tenantId!, results } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['existing-results'] });
      toast.success("Results saved successfully");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to save results");
    }
  });

  const handleSave = () => {
    if (!selectedClass || !selectedSubject) {
      toast.error("Please select both class and subject");
      return;
    }

    const resultsToSave = students?.map(student => {
      const existing = existingResults?.find(r => r.student_id === student.id);
      
      // Finding inputs via DOM for quick state management in this spreadsheet-like view
      const caInput = document.getElementById(`ca-${student.id}`) as HTMLInputElement;
      const examInput = document.getElementById(`exam-${student.id}`) as HTMLInputElement;

      return {
        id: existing?.id,
        studentId: student.id,
        subjectId: selectedSubject,
        classId: selectedClass,
        session,
        term,
        caScore: Number(caInput?.value || 0),
        examScore: Number(examInput?.value || 0),
        status: 'submitted'
      };
    });

    if (resultsToSave) {
      mutation.mutate(resultsToSave);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Filters Bar */}
      <Card className="rounded-[14px] border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <Select value={session} onValueChange={setSession}>
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Session" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023/2024">2023/2024</SelectItem>
                <SelectItem value="2024/2025">2024/2025</SelectItem>
              </SelectContent>
            </Select>
            <Select value={term} onValueChange={setTerm}>
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="First Term">First Term</SelectItem>
                <SelectItem value="Second Term">Second Term</SelectItem>
                <SelectItem value="Third Term">Third Term</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedClass || ""} onValueChange={setSelectedClass}>
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grade4">Grade 4 Blue</SelectItem>
                <SelectItem value="jss1">JSS 1 Alpha</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSubject || ""} onValueChange={setSelectedSubject}>
              <SelectTrigger className="h-10 rounded-lg border-slate-200">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="english">English Language</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input 
                placeholder="Search student..." 
                className="pl-9 h-10 rounded-lg border-slate-200" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-schoolgate-green-light text-schoolgate-green border-none hover:bg-schoolgate-green-light px-3 py-1 font-bold uppercase tracking-wider text-[10px]">
            {selectedSubject || "No Subject Selected"} • {selectedClass || "No Class"}
          </Badge>
          <span className="text-xs font-bold text-slate-400 uppercase">Live Entry Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10 rounded-lg gap-2 border-slate-200 text-slate-600">
            <Upload size={16} /> Bulk Upload
          </Button>
          <Button variant="outline" className="h-10 rounded-lg gap-2 border-slate-200 text-slate-600">
            <Download size={16} /> Export Excel
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <Card className="rounded-[14px] border-none shadow-sm overflow-hidden bg-white">
        {(loadingStudents || loadingResults) ? (
          <div className="p-8 space-y-4">
            {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-slate-50/80">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="w-[150px] font-black text-slate-800 uppercase text-[10px] tracking-wider px-6">Adm. No</TableHead>
                <TableHead className="font-black text-slate-800 uppercase text-[10px] tracking-wider">Student Name</TableHead>
                <TableHead className="w-[120px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">CA Score (40)</TableHead>
                <TableHead className="w-[120px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Exam Score (60)</TableHead>
                <TableHead className="w-[100px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Total</TableHead>
                <TableHead className="w-[100px] font-black text-slate-800 uppercase text-[10px] tracking-wider text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-slate-400 font-medium">
                    No students found in the selected class.
                  </TableCell>
                </TableRow>
              ) : (
                students?.filter(s => s.full_name.toLowerCase().includes(searchTerm.toLowerCase())).map((student) => {
                  const result = existingResults?.find(r => r.student_id === student.id);
                  return (
                    <TableRow key={student.id} className="hover:bg-slate-50/50 border-slate-50 transition-colors">
                      <TableCell className="font-bold text-slate-600 px-6">{student.admission_number || student.id.slice(0, 8)}</TableCell>
                      <TableCell className="font-black text-slate-900">{student.full_name}</TableCell>
                      <TableCell>
                        <Input 
                          id={`ca-${student.id}`}
                          type="number" 
                          defaultValue={result?.ca_score || 0} 
                          className="h-10 rounded-xl border-slate-200 text-center font-black text-slate-700 focus:border-schoolgate-green" 
                          max={40} min={0} 
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          id={`exam-${student.id}`}
                          type="number" 
                          defaultValue={result?.exam_score || 0} 
                          className="h-10 rounded-xl border-slate-200 text-center font-black text-slate-700 focus:border-schoolgate-green" 
                          max={60} min={0} 
                        />
                      </TableCell>
                      <TableCell className="text-center font-black text-schoolgate-green text-lg">
                        {(result?.ca_score || 0) + (result?.exam_score || 0)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`rounded-full border-none px-3 py-1 text-[9px] font-black uppercase ${
                          result?.status === 'published' ? 'bg-emerald-100 text-emerald-600' : 
                          result?.status === 'approved' ? 'bg-blue-100 text-blue-600' : 
                          'bg-slate-100 text-slate-400'
                        }`}>
                          {result?.status || 'Pending'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Footer Actions */}
      <div className="flex items-center justify-between p-6 bg-white rounded-[14px] shadow-sm border border-slate-100">
        <div className="text-xs font-bold text-slate-400 italic">
          Last saved: {existingResults?.length ? "Just now" : "Never"}
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl px-6 gap-2 border-slate-200 text-slate-600">
            <Printer size={18} /> Print Draft
          </Button>
          <Button 
            onClick={handleSave}
            disabled={mutation.isPending || !students?.length}
            className="bg-schoolgate-green hover:bg-schoolgate-green/90 h-11 rounded-xl px-10 gap-2 shadow-lg shadow-schoolgate-green/20 font-bold"
          >
            <Save size={18} /> {mutation.isPending ? "Saving..." : "Save & Post Scores"}
          </Button>
        </div>
      </div>
    </div>
  );
}
