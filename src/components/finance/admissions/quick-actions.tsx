import React, { useState } from "react";
import { 
  Users, 
  ArrowRight, 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  FileCheck, 
  ClipboardCheck,
  Loader2,
  Plus
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceholderForm } from "@/components/ui/placeholder-form";
import { EnrollStudentDialog } from "@/components/students/enroll-student-dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function QuickActions() {
  const [isEnrolOpen, setIsEnrolOpen] = useState(false);
  const [isPlaceOpen, setIsPlaceOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formIcon, setFormIcon] = useState<any>(Plus);

  const { data: tenantId } = useQuery({
    queryKey: ['current-tenant-id'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data: membership } = await supabase.from('memberships').select('tenant_id').eq('user_id', user.id).single();
      return membership?.tenant_id;
    }
  });

  const actions = [
    { 
      label: "New Application", 
      icon: Plus, 
      color: "bg-schoolgate-green", 
      desc: "Start new admission enquiry",
      onClick: () => {
        setFormTitle("New Admission Application");
        setFormIcon(Plus);
        setIsPlaceOpen(true);
      }
    },
    { 
      label: "Enrol Student", 
      icon: Users, 
      color: "bg-blue-600", 
      desc: "Direct student enrolment",
      onClick: () => setIsEnrolOpen(true)
    },
    { 
      label: "Upload Results", 
      icon: FileCheck, 
      color: "bg-amber-600", 
      desc: "Entrance exam scores",
      onClick: () => {
        setFormTitle("Upload Entrance Results");
        setFormIcon(FileCheck);
        setIsPlaceOpen(true);
      }
    },
    { 
      label: "Schedule Interview", 
      icon: Calendar, 
      color: "bg-indigo-600", 
      desc: "Set applicant review date",
      onClick: () => {
        setFormTitle("Schedule Applicant Interview");
        setFormIcon(Calendar);
        setIsPlaceOpen(true);
      }
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {actions.map((action, i) => (
        <Card 
          key={i} 
          onClick={action.onClick}
          className="p-5 border-none shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`h-10 w-10 rounded-xl ${action.color} flex items-center justify-center text-white shadow-lg shadow-${action.color.split('-')[1]}-500/20`}>
              <action.icon size={20} />
            </div>
            <ArrowRight size={16} className="text-slate-300 group-hover:text-schoolgate-green group-hover:translate-x-1 transition-all" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{action.label}</h4>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">{action.desc}</p>
          </div>
        </Card>
      ))}

      {tenantId && (
        <EnrollStudentDialog 
          open={isEnrolOpen}
          onOpenChange={setIsEnrolOpen}
          tenantId={tenantId}
        />
      )}

      <PlaceholderForm 
        open={isPlaceOpen}
        onOpenChange={setIsPlaceOpen}
        title={formTitle}
        description="Standardized form for admission operations."
        icon={formIcon}
      />
    </div>
  );
}
