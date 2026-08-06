import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Trash2, 
  Copy, 
  ChevronUp, 
  ChevronDown, 
  Sparkles,
  ListOrdered
} from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TeachingStep {
  id: string;
  title: string;
  teacherActivity: string;
  studentActivity: string;
  resources: string;
  outcome: string;
  time: string;
}

export function LessonStepsEditor() {
  const [steps, setSteps] = useState<TeachingStep[]>([
    {
      id: "1",
      title: "Introduction",
      teacherActivity: "GREETING: The teacher greets the students and introduces the topic by asking questions about previous knowledge.",
      studentActivity: "Students respond to greetings and participate in the introductory discussion.",
      resources: "Whiteboard, Charts",
      outcome: "Students should be able to link previous knowledge to the new topic.",
      time: "5 mins"
    }
  ]);

  const addStep = () => {
    const newStep: TeachingStep = {
      id: Date.now().toString(),
      title: `New Step ${steps.length + 1}`,
      teacherActivity: "",
      studentActivity: "",
      resources: "",
      outcome: "",
      time: "10 mins"
    };
    setSteps([...steps, newStep]);
  };

  const deleteStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
  };

  const duplicateStep = (id: string) => {
    const stepToCopy = steps.find(s => s.id === id);
    if (stepToCopy) {
      const newStep = { ...stepToCopy, id: Date.now().toString(), title: `${stepToCopy.title} (Copy)` };
      setSteps([...steps, newStep]);
    }
  };

  return (
    <Card className="border-none shadow-sm rounded-[14px]">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <ListOrdered className="h-5 w-5 text-schoolgate-green" />
            Teaching Steps
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Define the step-by-step delivery process of the lesson.</p>
        </div>
        <Button onClick={addStep} size="sm" className="bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg">
          <Plus className="h-4 w-4 mr-1" /> Add Step
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <Accordion type="multiple" defaultValue={["1"]} className="space-y-4">
          {steps.map((step, index) => (
            <AccordionItem key={step.id} value={step.id} className="border border-slate-100 rounded-xl overflow-hidden px-0">
              <div className="flex items-center px-4 py-2 bg-slate-50/50 border-b border-slate-100">
                <AccordionTrigger className="flex-1 py-2 hover:no-underline">
                  <span className="text-sm font-bold text-slate-700">Step {index + 1}: {step.title || "Untitled Step"}</span>
                </AccordionTrigger>
                <div className="flex items-center gap-1 ml-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" onClick={(e) => { e.stopPropagation(); duplicateStep(step.id); }}><Copy className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><ChevronUp className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><ChevronDown className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-500 hover:bg-rose-50" onClick={(e) => { e.stopPropagation(); deleteStep(step.id); }}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
              <AccordionContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Step Title</label>
                    <Input defaultValue={step.title} placeholder="e.g. Presentation" className="rounded-lg h-10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Time Allocation</label>
                    <Input defaultValue={step.time} placeholder="e.g. 10 mins" className="rounded-lg h-10" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Teacher Activities</label>
                    <Textarea defaultValue={step.teacherActivity} placeholder="What will the teacher do?" className="rounded-lg min-h-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Student Activities</label>
                    <Textarea defaultValue={step.studentActivity} placeholder="What will the students do?" className="rounded-lg min-h-[100px]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Learning Resources</label>
                    <Input defaultValue={step.resources} placeholder="Books, Charts, Video..." className="rounded-lg h-10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Expected Learning Outcome</label>
                    <Input defaultValue={step.outcome} placeholder="What should be achieved?" className="rounded-lg h-10" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
