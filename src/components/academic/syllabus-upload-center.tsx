import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, AlertCircle } from "lucide-react";

export function SyllabusUploadCenter() {
  return (
    <Card className="p-8 rounded-[14px] border-none shadow-sm bg-white">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-schoolgate-green-light rounded-full flex items-center justify-center text-schoolgate-green animate-pulse">
          <Upload size={40} />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Upload New Curriculum Documents</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Drag and drop your syllabus or scheme of work files here. Supports PDF, DOCX, and Excel formats.
          </p>
        </div>
        
        <div className="w-full max-w-lg p-10 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-slate-50 hover:border-schoolgate-green transition-all cursor-pointer flex flex-col items-center gap-4 group">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-12 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center group-hover:-translate-y-1 transition-transform">
                <FileText className="h-5 w-5 text-slate-400" />
              </div>
            ))}
          </div>
          <div className="text-sm font-bold text-slate-500">
            Click to browse or <span className="text-schoolgate-green">drag files here</span>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Max file size: 10MB per document</p>
        </div>

        <div className="flex items-center gap-3 w-full max-w-lg bg-amber-50 p-4 rounded-xl border border-amber-100 text-left">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
          <p className="text-[11px] text-amber-800 font-medium">
            <span className="font-bold">Important:</span> Ensure documents are tagged with the correct Academic Session and Class to help teachers find them easily.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="rounded-xl h-11 px-6 font-bold border-slate-200">
            Cancel
          </Button>
          <Button className="rounded-xl h-11 px-8 font-bold bg-schoolgate-green hover:bg-schoolgate-green/90 shadow-lg shadow-schoolgate-green/20">
            Upload & Tag Documents
          </Button>
        </div>
      </div>
    </Card>
  );
}
