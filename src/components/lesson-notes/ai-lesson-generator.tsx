import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Wand2, 
  ChevronRight, 
  CheckCircle, 
  Loader2,
  FileText,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export function AILessonGenerator() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200 animate-pulse-slow">
          <Sparkles className="mr-2 h-4 w-4" /> AI Lesson Generator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] rounded-[20px]">
        <DialogHeader>
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
            <Wand2 className="h-6 w-6 text-indigo-600" />
          </div>
          <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight">AI Lesson Generator</DialogTitle>
          <DialogDescription className="text-slate-500 font-medium">
            Generate curriculum-compliant lesson notes in seconds using Schoolgate Intelligence.
          </DialogDescription>
        </DialogHeader>

        {!generating && progress !== 100 ? (
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Curriculum</label>
                <Select defaultValue="nerdc">
                  <SelectTrigger className="rounded-xl h-11 border-slate-200"><SelectValue placeholder="Curriculum" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nerdc">NERDC (Nigeria)</SelectItem>
                    <SelectItem value="british">British Curriculum</SelectItem>
                    <SelectItem value="cambridge">Cambridge</SelectItem>
                    <SelectItem value="custom">Custom School</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject</label>
                <Select defaultValue="math">
                  <SelectTrigger className="rounded-xl h-11 border-slate-200"><SelectValue placeholder="Subject" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="english">English Language</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Class</label>
                <Select defaultValue="jss1">
                  <SelectTrigger className="rounded-xl h-11 border-slate-200"><SelectValue placeholder="Class" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jss1">JSS 1</SelectItem>
                    <SelectItem value="jss2">JSS 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Topic</label>
                <Select defaultValue="algebra">
                  <SelectTrigger className="rounded-xl h-11 border-slate-200"><SelectValue placeholder="Topic" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="algebra">Algebraic Expressions</SelectItem>
                    <SelectItem value="geometry">Geometry & Shapes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">AI Will Generate:</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Learning Objectives", "Teaching Materials", 
                  "Step-by-step Procedure", "Class Activities",
                  "Assessment Questions", "Homework Tasks"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <CheckCircle className="h-3 w-3 text-emerald-500" /> {item}
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleGenerate}
              className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-xl text-white font-bold shadow-lg shadow-indigo-100"
            >
              Generate Lesson Note <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ) : generating ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-6">
            <div className="relative h-20 w-20">
              <Loader2 className="h-20 w-20 text-indigo-600 animate-spin absolute inset-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <p className="font-bold text-lg text-slate-800">Schoolgate AI is thinking...</p>
              <p className="text-sm text-slate-500 max-w-[300px]">Extracting curriculum standards and structuring pedagogical steps.</p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Optimizing Content</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-indigo-50" />
            </div>
          </div>
        ) : (
          <div className="py-8 space-y-6">
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center gap-4 animate-in zoom-in-95 duration-500">
              <div className="h-12 w-12 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-black text-emerald-900 text-lg">Generation Complete!</h4>
                <p className="text-emerald-700 text-sm font-medium">Mathematics: Algebraic Expressions for JSS 1.</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 rounded-xl font-bold justify-between px-6 border-slate-200">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-500" /> Preview Generated Note
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button className="w-full h-12 rounded-xl font-bold bg-[#0B6E3C] hover:bg-[#0B6E3C]/90 shadow-lg shadow-schoolgate-green/20">
                <Zap className="mr-2 h-4 w-4" /> Import into Builder
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <ShieldCheck className="h-3 w-3" /> Standard Compliance Verified
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
