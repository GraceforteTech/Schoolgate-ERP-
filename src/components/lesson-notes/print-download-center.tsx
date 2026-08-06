import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Printer, 
  FileDown, 
  FileText, 
  Layout, 
  Type, 
  CheckCircle2, 
  Smartphone,
  Mail,
  Share2,
  Globe
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function PrintDownloadCenter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-none shadow-sm rounded-[14px]">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Printer className="h-5 w-5 text-schoolgate-green" />
            Print Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase text-slate-400">Paper Size & Color</Label>
            <RadioGroup defaultValue="a4-color" className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer">
                <RadioGroupItem value="a4-color" id="r1" />
                <Label htmlFor="r1" className="text-sm font-medium">A4 - Full Colour</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer">
                <RadioGroupItem value="a4-bw" id="r2" />
                <Label htmlFor="r2" className="text-sm font-medium">A4 - Black & White</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase text-slate-400">Includes in Print</Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                "School Logo & Header",
                "Teacher Signature Line",
                "HOD Signature Line",
                "Principal Signature Line",
                "Page Numbers",
                "QR Verification Code"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Checkbox id={`c${i}`} defaultChecked />
                  <Label htmlFor={`c${i}`} className="text-xs font-medium">{item}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button className="w-full bg-[#0B6E3C] hover:bg-[#0B6E3C]/90 text-white rounded-xl h-12 font-bold shadow-lg shadow-schoolgate-green/20">
            <Printer className="mr-2 h-4 w-4" /> Start Print Preview
          </Button>
        </CardContent>
      </Card>

      <Card className="border-none shadow-sm rounded-[14px]">
        <CardHeader>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <FileDown className="h-5 w-5 text-indigo-600" />
            Download & Share
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl border-slate-100 bg-slate-50/50 hover:bg-indigo-50 hover:border-indigo-100 hover:text-indigo-600 transition-all">
              <FileText className="h-6 w-6" />
              <span className="text-[10px] font-bold uppercase">PDF Document</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl border-slate-100 bg-slate-50/50 hover:bg-blue-50 hover:border-blue-100 hover:text-blue-600 transition-all">
              <Type className="h-6 w-6" />
              <span className="text-[10px] font-bold uppercase">MS Word</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 rounded-xl border-slate-100 bg-slate-50/50 hover:bg-emerald-50 hover:border-emerald-100 hover:text-emerald-600 transition-all">
              <Globe className="h-6 w-6" />
              <span className="text-[10px] font-bold uppercase">HTML Export</span>
            </Button>
          </div>

          <div className="space-y-4">
            <Label className="text-xs font-bold uppercase text-slate-400">Secure Sharing</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-xl h-11 border-slate-200 justify-start px-4">
                <Smartphone className="mr-2 h-4 w-4 text-emerald-500" /> WhatsApp Teacher
              </Button>
              <Button variant="outline" className="rounded-xl h-11 border-slate-200 justify-start px-4">
                <Mail className="mr-2 h-4 w-4 text-rose-500" /> Email HOD
              </Button>
              <Button variant="outline" className="rounded-xl h-11 border-slate-200 justify-start px-4 col-span-full">
                <Share2 className="mr-2 h-4 w-4 text-indigo-500" /> Generate Secure Share Link
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
