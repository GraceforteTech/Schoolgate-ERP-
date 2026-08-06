import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ClipboardCheck, 
  HelpCircle, 
  MessageSquare, 
  Save, 
  Send,
  Zap
} from "lucide-react";
import { useState } from "react";

export function LessonAssessmentEditor() {
  return (
    <Card className="border-none shadow-sm rounded-[14px]">
      <CardHeader className="border-b border-slate-100 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-schoolgate-green" />
          Assessment & Evaluation
        </CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Define how you will measure student learning and achievement.</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">Class Exercise</label>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] text-indigo-600 font-bold p-0"><Zap className="h-3 w-3 mr-1" /> AI Suggest</Button>
            </div>
            <Textarea placeholder="Specific tasks students will perform during the lesson..." className="rounded-xl min-h-[100px] border-slate-200" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">Evaluation Questions</label>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] text-indigo-600 font-bold p-0"><Zap className="h-3 w-3 mr-1" /> AI Suggest</Button>
            </div>
            <Textarea placeholder="Questions to test understanding at the end of the lesson..." className="rounded-xl min-h-[100px] border-slate-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700">Assignment / Project</label>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] text-indigo-600 font-bold p-0"><Zap className="h-3 w-3 mr-1" /> AI Suggest</Button>
            </div>
            <Textarea placeholder="Take-home task for deeper learning..." className="rounded-xl min-h-[100px] border-slate-200" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">General Remarks</label>
            <Textarea placeholder="Notes on student response, areas for improvement..." className="rounded-xl min-h-[100px] border-slate-200 bg-slate-50/50" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest flex items-center gap-1">
            <HelpCircle className="h-3 w-3" /> Drafts are saved automatically
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-xl h-10 border-slate-200 font-bold text-xs">
              <Save className="mr-2 h-4 w-4" /> Save Draft
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
