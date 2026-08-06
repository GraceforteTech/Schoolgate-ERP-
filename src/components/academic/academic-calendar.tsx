import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Plus, Printer, FileDown } from "lucide-react";

export function AcademicCalendar() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-1 rounded-[14px] border-none shadow-sm bg-white p-6">
        <CardHeader className="p-0 mb-6">
          <CardTitle className="text-lg font-black text-slate-800">Academic Calendar</CardTitle>
        </CardHeader>
        <Calendar mode="single" className="rounded-xl border border-slate-100 p-3" />
        <div className="mt-6 flex flex-col gap-2">
            <Button className="w-full h-11 rounded-xl bg-schoolgate-green font-bold"><Plus size={16} className="mr-2"/> Add Event</Button>
            <Button variant="outline" className="w-full h-11 rounded-xl font-bold"><Printer size={16} className="mr-2"/> Print</Button>
            <Button variant="outline" className="w-full h-11 rounded-xl font-bold"><FileDown size={16} className="mr-2"/> Export</Button>
        </div>
      </Card>
      <Card className="lg:col-span-2 rounded-[14px] border-none shadow-sm bg-white p-6">
        <h3 className="text-lg font-black text-slate-800 mb-6">Upcoming Events</h3>
        <div className="space-y-4">
            {['Mid-Term Break', 'Examinations', 'Public Holiday'].map((event, i) => (
                <div key={i} className="flex items-center p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center font-black text-schoolgate-green mr-4">12</div>
                    <div>
                        <h4 className="font-bold text-slate-900">{event}</h4>
                        <p className="text-xs text-slate-500">Starts Oct 12, 2026</p>
                    </div>
                </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
