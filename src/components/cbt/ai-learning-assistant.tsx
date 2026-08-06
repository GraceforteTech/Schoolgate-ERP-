import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  BrainCircuit, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Target,
  ArrowRight,
  Flame,
  Zap,
  Lightbulb
} from "lucide-react";

export function AILearningAssistant() {
  return (
    <div className="space-y-8">
      {/* Student Selector / Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[14px] shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <BrainCircuit size={28} />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800">AI Learning Personalization</h3>
            <p className="text-sm text-slate-500 font-medium">Personalized insights for <span className="text-slate-900 font-bold">Adebayo Olawale</span> (JSS 3A)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold text-slate-600">
            Switch Student
          </Button>
          <Button className="h-10 rounded-xl bg-purple-600 hover:bg-purple-700 font-black shadow-md shadow-purple-200">
            GENERATE STUDY PLAN
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Test Performance */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Post-Exam Analysis: Mathematics Mock 1</h4>
            <Badge className="bg-emerald-100 text-emerald-700 border-none font-black text-[10px] uppercase px-3 py-1">Score: 78% (B+)</Badge>
          </div>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i} className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline" className={i === 1 ? "bg-red-50 text-red-600 border-red-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"}>
                      {i === 1 ? <XCircle size={12} className="mr-1" /> : <CheckCircle2 size={12} className="mr-1" />}
                      Question {i === 1 ? "Incorrect" : "Correct"}
                    </Badge>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Algebra</span>
                </div>

                <p className="text-sm font-bold text-slate-800">
                  {i === 1 
                    ? "If 3x + 4 = 19, what is the value of x?"
                    : "Calculate the area of a circle with radius 7cm (Take π = 22/7)."}
                </p>

                {i === 1 && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                      <Sparkles size={14} className="text-purple-600" />
                      AI Explanation
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      You chose <span className="text-red-600 font-bold">x = 6</span>. The correct answer is <span className="text-emerald-600 font-bold">x = 5</span>. 
                      To solve, subtract 4 from both sides (19 - 4 = 15), then divide by 3 (15 / 3 = 5).
                    </p>
                    <div className="pt-2">
                      <Button variant="ghost" className="h-8 text-[10px] font-black uppercase text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0">
                        View Video Lesson <ArrowRight size={12} className="ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <Card className="p-8 rounded-[20px] bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap size={160} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-2">Personalized Practice Test</h3>
              <p className="text-indigo-100 font-medium text-sm mb-6 max-w-lg">
                We've generated a 10-question test focusing on <span className="font-bold text-white underline decoration-wavy underline-offset-4">Linear Equations</span> and <span className="font-bold text-white underline decoration-wavy underline-offset-4">Geometry</span> based on your recent performance.
              </p>
              <Button className="h-12 px-8 rounded-xl bg-white text-indigo-600 hover:bg-white/90 font-black shadow-lg">
                START AI TEST NOW
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Mastery & Progress */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Topic Mastery Scores</h4>
            <div className="space-y-5">
              {[
                { topic: "Algebra", score: 45, color: "red", trend: "down" },
                { topic: "Geometry", score: 68, color: "orange", trend: "up" },
                { topic: "Trigonometry", score: 85, color: "emerald", trend: "up" },
                { topic: "Calculus", score: 92, color: "blue", trend: "up" },
              ].map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-slate-700">{m.topic}</span>
                    <div className="flex items-center gap-2">
                      <span className={m.color === 'emerald' ? 'text-emerald-600' : m.color === 'red' ? 'text-red-600' : m.color === 'orange' ? 'text-orange-500' : 'text-blue-600'}>
                        {m.score}%
                      </span>
                      {m.trend === 'up' ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingUp size={12} className="text-red-500 rotate-180" />}
                    </div>
                  </div>
                  <Progress value={m.score} className="h-1.5 bg-slate-50" />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <Lightbulb size={18} />
              </div>
              <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Recommended Topics</h4>
            </div>
            <div className="space-y-3">
              {[
                { name: "Simultaneous Equations", reason: "Missed 3 questions recently", difficulty: "Intermediate" },
                { name: "Pythagoras Theorem", reason: "Foundational gap detected", difficulty: "Beginner" },
              ].map((t, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-100 hover:border-amber-200 transition-all cursor-pointer bg-slate-50/50">
                  <div className="flex justify-between mb-1">
                    <p className="text-xs font-bold text-slate-800">{t.name}</p>
                    <Badge variant="outline" className="text-[8px] h-4 font-bold border-slate-200 text-slate-400">{t.difficulty}</Badge>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">{t.reason}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Target size={32} />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Overall Learning Streak</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                   <Flame size={20} className="text-orange-500" />
                   <span className="text-3xl font-black text-slate-800">12 Days</span>
                </div>
             </div>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Keep going to unlock the "Master" badge!</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
