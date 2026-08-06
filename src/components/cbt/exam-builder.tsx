import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { 
  Save, 
  Eye, 
  Send, 
  Calendar, 
  Clock, 
  Settings2,
  ListChecks,
  AlertCircle
} from "lucide-react";

export function ExamBuilder() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      <div className="xl:col-span-8 space-y-8">
        <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-schoolgate-green-light rounded-lg text-schoolgate-green">
              <Settings2 size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Exam Configuration</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Exam Name</Label>
              <Input placeholder="e.g. 2nd Term Mathematics Final" className="rounded-xl h-11 border-slate-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Subject</Label>
              <Select>
                <SelectTrigger className="rounded-xl h-11 border-slate-100">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="phys">Physics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Duration (Minutes)</Label>
              <Input type="number" placeholder="60" className="rounded-xl h-11 border-slate-100" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-black text-slate-400 uppercase tracking-widest">Pass Mark (%)</Label>
              <Input type="number" placeholder="50" className="rounded-xl h-11 border-slate-100" />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h4 className="text-sm font-black text-slate-800 border-b border-slate-50 pb-2">Instructions</h4>
            <textarea 
              className="w-full h-32 p-4 rounded-xl border border-slate-100 bg-slate-50/30 focus:bg-white transition-all text-sm outline-none focus:ring-2 focus:ring-schoolgate-green/20"
              placeholder="Enter exam instructions for students..."
            />
          </div>
        </Card>

        <Card className="p-8 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-6">
           <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <ListChecks size={20} />
            </div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Question Selection</h3>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 h-14 rounded-xl border-slate-100 gap-3 font-bold text-slate-600 hover:bg-slate-50">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">M</div>
              Manual Selection
            </Button>
            <Button className="flex-1 h-14 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 gap-3 font-bold shadow-md">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">R</div>
              Randomized Selection
            </Button>
            <Button variant="outline" className="flex-1 h-14 rounded-xl border-slate-100 gap-3 font-bold text-slate-600 hover:bg-slate-50">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">X</div>
              Mixed Mode
            </Button>
          </div>
        </Card>
      </div>

      <div className="xl:col-span-4 space-y-8">
        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-6">
          <h3 className="text-lg font-black text-slate-800">Exam Rules</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50">
              <Label className="text-xs font-bold text-slate-600">Shuffle Questions</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50">
              <Label className="text-xs font-bold text-slate-600">Shuffle Options</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50">
              <Label className="text-xs font-bold text-slate-600">Negative Marking</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50">
              <Label className="text-xs font-bold text-slate-600">Show Results Immediately</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-[14px] border-slate-100 shadow-sm bg-white space-y-4">
          <Button className="w-full h-12 rounded-xl bg-schoolgate-green hover:bg-schoolgate-green/90 font-black gap-2 shadow-lg">
            <Save size={18} />
            SAVE & PUBLISH
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 rounded-xl border-slate-100 gap-2 font-bold text-slate-600">
              <Eye size={16} />
              Preview
            </Button>
            <Button variant="outline" className="h-11 rounded-xl border-slate-100 gap-2 font-bold text-slate-600">
              <Calendar size={16} />
              Schedule
            </Button>
          </div>
        </Card>

        <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex gap-3">
          <AlertCircle className="text-orange-500 shrink-0" size={20} />
          <p className="text-[10px] font-bold text-orange-700 leading-relaxed">
            Ensure you have at least 50 questions in the Mathematics question bank before publishing a randomized exam.
          </p>
        </div>
      </div>
    </div>
  );
}
