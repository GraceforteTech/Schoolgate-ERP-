import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  FileSearch,
  BookOpen,
  ArrowRight,
  BrainCircuit,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AIQuestionCentre() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <Sparkles size={20} />
              </div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">AI Data Extraction</h3>
            </div>
            
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Upload past questions in PDF, Word or Image format. Our AI will automatically extract questions, detect answers, and categorize them.
            </p>

            <div className="border-2 border-dashed border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-100 group-hover:text-purple-600 transition-all">
                <Upload size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-700">Drop files here or click</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">PDF, DOCX, JPG or PNG (Max 20MB)</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Auto-Categorization</h4>
              <div className="space-y-2">
                {['Detect Subject', 'Identify Topic', 'Suggest Difficulty', 'Extract Options'].map((opt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Processing Progress</h4>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                  <span>Extracting Questions</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-1.5 bg-slate-100" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 p-2 rounded-lg">
                <CheckCircle2 size={12} />
                Scanning for correct answers...
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-black text-slate-800">Review Extracted Questions</h3>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none px-3 py-1 font-black text-[10px] uppercase">
              12 Questions Found
            </Badge>
          </div>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-4 hover:border-purple-200 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-100 font-bold text-[9px] uppercase">
                      Mathematics
                    </Badge>
                    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-100 font-bold text-[9px] uppercase">
                      Algebra
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                    <Settings size={14} />
                  </Button>
                </div>

                <p className="text-sm font-bold text-slate-800 leading-relaxed">
                  {i === 1 
                    ? "Solve for x in the equation: 2x^2 + 5x - 3 = 0. Use the quadratic formula if necessary."
                    : "Which of the following describes the nature of the roots of the equation 2x^2 + 4x + 2 = 0?"}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {['A', 'B', 'C', 'D'].map((opt) => (
                    <div key={opt} className={cn(
                      "p-3 rounded-xl border border-slate-100 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all hover:bg-slate-50",
                      i === 1 && opt === 'B' && "bg-emerald-50 border-emerald-200 text-emerald-700"
                    )}>
                      <span className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">{opt}</span>
                      Answer Option {opt}
                      {i === 1 && opt === 'B' && <CheckCircle2 size={14} className="ml-auto" />}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" className="h-11 rounded-xl border-slate-200 gap-2 font-bold text-slate-600">
              Discard All
            </Button>
            <Button className="h-11 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 gap-2 font-black shadow-lg">
              PUBLISH TO QUESTION BANK
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Practice Centre Section */}
      <Card className="p-8 rounded-[20px] border-slate-100 shadow-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <Badge className="bg-schoolgate-green text-white border-none mb-4 font-black text-[10px] uppercase tracking-widest px-3 py-1">
            Exclusive Practice Centre
          </Badge>
          <h3 className="text-3xl font-black tracking-tight mb-4">Exam Prep & Mock Training</h3>
          <p className="text-slate-400 font-medium leading-relaxed mb-8">
            Select standard examination bodies to generate mock tests for your students using historical past questions and AI-generated variants.
          </p>
          <div className="flex flex-wrap gap-3">
            {['WAEC', 'NECO', 'JAMB', 'BECE', 'IGCSE', 'SAT'].map((body) => (
              <Button key={body} variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-black text-xs h-11 px-6 rounded-xl transition-all">
                {body}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
