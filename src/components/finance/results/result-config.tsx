import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Copy, Eye, Save, Send } from "lucide-react";

export function ResultConfig() {
  const [assessments, setAssessments] = useState([
    { name: "CA 1", score: 10 },
    { name: "CA 2", score: 10 },
    { name: "CA 3", score: 10 },
    { name: "Project", score: 10 },
    { name: "Assignment", score: 10 },
    { name: "Exam", score: 50 },
  ]);

  const [grades, setGrades] = useState([
    { grade: "A1", min: 80, max: 100, remark: "Distinction" },
    { grade: "B2", min: 70, max: 79, remark: "Very Good" },
    { grade: "B3", min: 65, max: 69, remark: "Good" },
    { grade: "C4", min: 60, max: 64, remark: "Credit" },
    { grade: "C5", min: 55, max: 59, remark: "Credit" },
    { grade: "C6", min: 50, max: 54, remark: "Credit" },
    { grade: "D7", min: 45, max: 49, remark: "Pass" },
    { grade: "E8", min: 40, max: 44, remark: "Pass" },
    { grade: "F9", min: 0, max: 39, remark: "Fail" },
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
