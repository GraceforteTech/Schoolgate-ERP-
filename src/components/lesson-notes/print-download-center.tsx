import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer, FileDown, Eye, FileText, CheckCircle } from "lucide-react";

export function PrintDownloadCenter() {
  const printableNotes = [
    { id: 1, title: "Algebra Basics", subject: "Mathematics", class: "JSS 1A", date: "May 15, 2024", teacher: "Sarah Johnson", status: "Approved" },
    { id: 2, title: "Circle Geometry", subject: "Mathematics", class: "SSS 1A", date: "May 16, 2024", teacher: "Sarah Johnson", status: "Approved" },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="p-8 rounded-[14px] border-none shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Printer className="h-6 w-6 text-schoolgate-green" />
          Print & Export Center
        </h3>
        <p className="text-slate-500 mb-8 text-sm font-medium">
          Generate professional, curriculum-standard PDF documents or print physical copies of your approved lesson notes.
        </p>

        <div className="space-y-4">
          {printableNotes.map((note) => (
            <div key={note.id} className="p-6 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-schoolgate-green">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{note.title}</h4>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{note.subject} • {note.class} • {note.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="rounded-lg h-10" onClick={handlePrint}>
                  <Printer className="mr-2 h-4 w-4" /> Print
                </Button>
                <Button variant="outline" className="rounded-lg h-10">
                  <FileDown className="mr-2 h-4 w-4" /> Export PDF
                </Button>
                <Button className="bg-schoolgate-green hover:bg-schoolgate-green/90 text-white rounded-lg h-10">
                  <Eye className="mr-2 h-4 w-4" /> View Layout
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Print Preview Layout (Hidden normally) */}
      <div className="hidden print:block p-10 bg-white min-h-screen text-slate-900 font-serif">
        <div className="text-center border-b-2 border-slate-900 pb-8 mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Schoolgate International Academy</h1>
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-600">Official Lesson Note</h2>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10 text-sm font-bold border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <p><span className="text-slate-400 uppercase mr-2">Teacher:</span> Sarah Johnson</p>
            <p><span className="text-slate-400 uppercase mr-2">Subject:</span> Mathematics</p>
            <p><span className="text-slate-400 uppercase mr-2">Class:</span> JSS 1A</p>
          </div>
          <div className="space-y-2 text-right">
            <p><span className="text-slate-400 uppercase mr-2">Date:</span> May 15, 2024</p>
            <p><span className="text-slate-400 uppercase mr-2">Week:</span> 4</p>
            <p><span className="text-slate-400 uppercase mr-2">Session:</span> 2023/2024</p>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 inline-block">Topic</h3>
            <p className="text-2xl font-bold">Introduction to Algebra Basics</p>
          </section>

          <section>
            <h3 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 inline-block">Learning Objectives</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>Define algebraic expressions and terms</li>
              <li>Identify variables and constants in an expression</li>
              <li>Simplify basic algebraic expressions</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 inline-block">Instructional Materials</h3>
            <p>Mathematics textbooks, chalkboard, algebraic tiles, flashcards.</p>
          </section>

          <section>
            <h3 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 inline-block">Lesson Content</h3>
            <div className="space-y-4 leading-relaxed">
              <p>Algebra is a branch of mathematics dealing with symbols and the rules for manipulating those symbols. In its simplest form, algebra involves using letters (variables) to represent numbers in equations.</p>
              <p>Key terms include Variable, Constant, Coefficient, and Operator.</p>
            </div>
          </section>

          <div className="mt-20 pt-10 border-t border-slate-200 flex justify-between items-end">
            <div className="text-center">
              <div className="h-px w-40 bg-slate-900 mb-2"></div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Teacher's Signature</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-10 w-10 text-emerald-600 mb-2 mx-auto" />
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Approved by HOD</p>
            </div>
            <div className="text-center">
              <div className="h-px w-40 bg-slate-900 mb-2"></div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Principal's Stamp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
