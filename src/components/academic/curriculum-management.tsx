import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function CurriculumManagement() {
  const subjects = [
    { subject: "Mathematics", curriculum: "NERDC", progress: 85 },
    { subject: "English Language", curriculum: "NERDC", progress: 75 },
    { subject: "Integrated Science", curriculum: "British", progress: 90 },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((s, i) => (
        <Card key={i} className="p-6 rounded-[14px] border-none shadow-sm bg-white">
          <h3 className="font-black text-lg mb-2">{s.subject}</h3>
          <Badge className="mb-4">{s.curriculum}</Badge>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-schoolgate-green" style={{ width: `${s.progress}%` }} />
          </div>
          <p className="text-xs text-slate-500 mt-2 font-bold">{s.progress}% Completion</p>
        </Card>
      ))}
    </div>
  );
}
