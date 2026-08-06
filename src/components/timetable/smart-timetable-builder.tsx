import { useState } from "react";
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
import { 
  Plus, 
  Save, 
  FileText, 
  Printer, 
  Download, 
  CheckCircle, 
  Zap, 
  Settings,
  Trash2,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function SmartTimetableBuilder() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAutoGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("Timetable generated successfully with 0 conflicts detected!");
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Configuration Sidebar */}
        <div className="space-y-6 rounded-[14px] border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b pb-4">
            <Settings className="h-5 w-5 text-schoolgate-green" />
            <h3 className="font-semibold text-gray-900">Configuration</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Session</Label>
              <Select defaultValue="2023-2024">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023/2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Term</Label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">First Term</SelectItem>
                  <SelectItem value="2">Second Term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>School Type</Label>
              <Select defaultValue="secondary">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Class</Label>
              <Select defaultValue="ss1">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ss1">SS 1</SelectItem>
                  <SelectItem value="ss2">SS 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Arm</Label>
              <Select defaultValue="gold">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="diamond">Diamond</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Periods per day</span>
                <Badge variant="secondary">8 Periods</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Break Time</span>
                <Badge variant="secondary">10:30 - 11:00</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Closing Time</span>
                <Badge variant="secondary">15:30</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Builder Main Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="rounded-[14px] border bg-white p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Builder Canvas</h3>
                <p className="text-sm text-gray-500">Drag and drop subjects into slots or generate automatically.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleAutoGenerate} 
                  disabled={isGenerating}
                  className="bg-schoolgate-green hover:bg-schoolgate-green/90"
                >
                  <Zap className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                  {isGenerating ? 'Generating...' : 'Generate Automatically'}
                </Button>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Build Manually
                </Button>
              </div>
            </div>

            {/* Timetable Grid Placeholder */}
            <div className="relative overflow-x-auto rounded-lg border bg-[#F9FAFB]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-4 py-3 text-left font-medium text-gray-500">Time</th>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                      <th key={day} className="px-4 py-3 text-left font-medium text-gray-500">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    "08:00 - 08:40",
                    "08:40 - 09:20",
                    "09:20 - 10:00",
                    "10:00 - 10:30", // Short Break
                    "10:30 - 11:10",
                    "11:10 - 11:50",
                    "11:50 - 12:30", // Long Break
                    "12:30 - 13:10",
                    "13:10 - 13:50",
                  ].map((time, idx) => (
                    <tr key={time} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-4 font-medium text-gray-700 whitespace-nowrap bg-gray-50/50">{time}</td>
                      {[1, 2, 3, 4, 5].map(day => {
                        const isBreak = time.includes("Break");
                        if (isBreak) {
                          return (
                            <td key={day} className="px-4 py-4 text-center">
                               {day === 1 && <span className="font-bold text-gray-300 uppercase tracking-widest">BREAK TIME</span>}
                            </td>
                          );
                        }
                        return (
                          <td key={day} className="px-4 py-4">
                            <div className="group relative flex h-16 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-200 transition-all hover:border-schoolgate-green/50 hover:bg-schoolgate-green/5">
                              <Plus className="h-4 w-4 text-gray-300 group-hover:text-schoolgate-green" />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="text-schoolgate-green border-schoolgate-green hover:bg-schoolgate-green/5">
                   <CheckCircle className="mr-2 h-4 w-4" />
                   Validate Timetable
                </Button>
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>2 Free slots remaining</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Print</Button>
                <Select defaultValue="pdf">
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">Export PDF</SelectItem>
                    <SelectItem value="excel">Export Excel</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
