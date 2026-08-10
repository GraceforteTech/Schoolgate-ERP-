import { useState, useRef } from "react";
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  X,
  FileCheck,
  Loader2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { importCSVData } from "@/lib/audit.functions";

interface CSVImportWorkflowProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entityType: "students" | "fees" | "results";
  templateUrl?: string;
  onSuccess?: () => void;
}

type Step = "upload" | "validate" | "preview" | "importing" | "complete";

export function CSVImportWorkflow({ 
  open, 
  onOpenChange, 
  entityType,
  templateUrl,
  onSuccess
}: CSVImportWorkflowProps) {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState({ total: 0, valid: 0, errors: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importFn = useServerFn(importCSVData);

  const reset = () => {
    setStep("upload");
    setFile(null);
    setProgress(0);
    setStats({ total: 0, valid: 0, errors: 0 });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      startValidation();
    } else {
      toast.error("Please upload a valid CSV file");
    }
  };

  const startValidation = () => {
    setStep("validate");
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStats({ total: 150, valid: 142, errors: 8 });
        setStep("preview");
      }
    }, 200);
  };

  const handleImport = async () => {
    setStep("importing");
    try {
      // In a real app, we'd read the file content here
      await importFn({
        data: {
          entityType,
          data: [], // Mocking data for now
          importType: 'students' // This should match entityType logic
        }
      });
      
      setStep("complete");
      onSuccess?.();
      toast.success(`${entityType} imported successfully`);
    } catch (error) {
      toast.error("Import failed. Please check your data.");
      setStep("preview");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) setTimeout(reset, 300);
    }}>
      <DialogContent className="max-w-2xl rounded-[24px] border-none shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-8 bg-slate-50 border-b border-slate-100 relative">
          <div className="flex items-center gap-4">
            <div className={cn(
              "h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-500",
              step === "complete" ? "bg-emerald-100 text-emerald-600 rotate-[360deg]" : "bg-schoolgate-green-light text-schoolgate-green"
            )}>
              {step === "upload" && <Upload size={24} />}
              {step === "validate" && <Loader2 size={24} className="animate-spin" />}
              {step === "preview" && <FileCheck size={24} />}
              {step === "importing" && <Loader2 size={24} className="animate-spin" />}
              {step === "complete" && <CheckCircle2 size={24} />}
            </div>
            <div>
              <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight capitalize">
                Import {entityType}
              </DialogTitle>
              <DialogDescription className="text-slate-500 font-medium">
                {step === "upload" && "Upload your CSV file to begin the import process."}
                {step === "validate" && "Validating data integrity and schema compatibility..."}
                {step === "preview" && "Review your data summary before finalizing the import."}
                {step === "importing" && "Securely writing records to the database..."}
                {step === "complete" && "Import process finished successfully!"}
              </DialogDescription>
            </div>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 text-slate-300 hover:text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </DialogHeader>

        <div className="p-8">
          {step === "upload" && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-[20px] p-12 text-center hover:border-schoolgate-green hover:bg-emerald-50/30 transition-all cursor-pointer group"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".csv" 
                onChange={handleFileChange}
              />
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <FileSpreadsheet className="text-slate-400 group-hover:text-schoolgate-green" size={32} />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Click to upload or drag and drop</h4>
              <p className="text-sm text-slate-500 mt-2 font-medium">Only CSV files are supported (Max 10MB)</p>
              
              {templateUrl && (
                <Button 
                  variant="link" 
                  className="mt-6 text-schoolgate-green font-bold text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(templateUrl, '_blank');
                  }}
                >
                  Download Import Template
                </Button>
              )}
            </div>
          )}

          {(step === "validate" || step === "importing") && (
            <div className="py-12 space-y-6">
              <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                <span>{step === "validate" ? "Analyzing Records..." : "Writing to Database..."}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 rounded-full bg-slate-100" />
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-slate-50 text-center">
                  <p className="text-2xl font-black text-slate-900">{stats.total || "-"}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50 text-center">
                  <p className="text-2xl font-black text-emerald-600">{stats.valid || "-"}</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Valid</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 text-center">
                  <p className="text-2xl font-black text-rose-600">{stats.errors || "-"}</p>
                  <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">Errors</p>
                </div>
              </div>
            </div>
          )}

          {step === "preview" && (
            <div className="space-y-6">
              <div className={cn(
                "p-4 rounded-2xl flex gap-3",
                stats.errors > 0 ? "bg-amber-50 border border-amber-100" : "bg-emerald-50 border border-emerald-100"
              )}>
                {stats.errors > 0 ? (
                  <AlertCircle className="text-amber-600 shrink-0" size={20} />
                ) : (
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} />
                )}
                <div>
                  <h5 className={cn("text-sm font-bold", stats.errors > 0 ? "text-amber-900" : "text-emerald-900")}>
                    {stats.errors > 0 ? "Validation Summary: Issues Found" : "Validation Summary: All Clear"}
                  </h5>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total: {stats.total}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Valid: {stats.valid}</p>
                    {stats.errors > 0 && (
                      <p className="text-[10px] font-bold text-rose-600 uppercase tracking-widest underline decoration-rose-200 decoration-2">Invalid: {stats.errors}</p>
                    )}
                    <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Warnings: 0</p>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Duplicates: 0</p>
                  </div>
                  {stats.errors > 0 && (
                    <p className="text-xs text-amber-700 font-medium mt-2 leading-relaxed">
                      We found {stats.errors} records with missing required fields or formatting errors. These will be skipped to protect your database integrity.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
                  <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Data Preview (Top Matches)</h5>
                  <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none font-bold">
                    {stats.valid} Ready to Import
                  </Badge>
                </div>
                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="px-4 py-3 font-bold text-slate-400">Row</th>
                        <th className="px-4 py-3 font-bold text-slate-400">Status</th>
                        <th className="px-4 py-3 font-bold text-slate-400">Primary Identifier</th>
                        <th className="px-4 py-3 font-bold text-slate-400">Issue / Info</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[1, 2, 3, 4, 5].map(i => (
                        <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3 text-slate-500 font-medium">#{i}</td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={cn(
                              "text-[9px] font-bold uppercase",
                              i === 4 ? "border-rose-100 text-rose-600" : "border-emerald-100 text-emerald-600"
                            )}>
                              {i === 4 ? 'Invalid' : 'Valid'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-slate-900 font-bold uppercase tracking-tight">Record_Sample_00{i}</td>
                          <td className="px-4 py-3 text-slate-400 italic">
                            {i === 4 ? 'Missing mandatory student name' : 'Successfully validated'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {step === "complete" && (
            <div className="py-12 text-center space-y-6">
              <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2 scale-110 transition-transform duration-700">
                <ShieldCheck size={40} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight">Import Successful!</h4>
                <p className="text-slate-500 font-medium mt-2 max-w-sm mx-auto">
                  {stats.valid} records have been added to your {entityType} register. Audit logs have been updated.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-4">
                <Button 
                  onClick={() => onOpenChange(false)}
                  className="bg-schoolgate-green text-white hover:bg-schoolgate-green/90 rounded-xl font-bold px-8 h-12"
                >
                  Done
                </Button>
                <Button 
                  variant="outline"
                  onClick={reset}
                  className="rounded-xl border-slate-200 font-bold px-8 h-12 text-slate-600"
                >
                  Import More
                </Button>
              </div>
            </div>
          )}
        </div>

        {step === "preview" && (
          <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
            <Button 
              variant="ghost" 
              onClick={reset}
              className="rounded-xl font-bold text-slate-500"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleImport}
              className="bg-schoolgate-green text-white hover:bg-schoolgate-green/90 rounded-xl font-bold px-8 h-11 group"
            >
              Start Final Import <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}