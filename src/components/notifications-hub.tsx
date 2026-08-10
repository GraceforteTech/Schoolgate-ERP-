import { useState } from "react";
import { 
  Bell, 
  Check, 
  Clock, 
  Info, 
  AlertCircle,
  Settings,
  X,
  ChevronRight
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function NotificationsHub() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      return data;
    },
    enabled: open
  });

  const unreadCount = notifications.filter(n => !n.read_at).length;

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .is('read_at', null);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success("All notifications marked as read");
    }
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative h-10 w-10 rounded-xl hover:bg-slate-100 group"
        >
          <Bell size={20} className="text-slate-600 group-hover:text-schoolgate-green transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 border border-white"></span>
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 border-none shadow-2xl flex flex-col bg-white">
        <SheetHeader className="p-6 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl font-black text-slate-900 tracking-tight">Activity Notifications</SheetTitle>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time alerts & updates</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <Settings size={18} />
            </Button>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center justify-between pt-4">
              <Badge className="bg-schoolgate-green text-white border-none font-bold text-[10px] px-3">
                {unreadCount} NEW MESSAGES
              </Badge>
              <button 
                onClick={() => markAllAsRead.mutate()}
                className="text-[10px] font-black text-schoolgate-green uppercase tracking-widest hover:underline"
              >
                Mark all as read
              </button>
            </div>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center space-y-4">
              <Loader2 className="h-8 w-8 text-schoolgate-green animate-spin" />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fetching updates...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                <Bell size={32} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">All caught up!</h4>
                <p className="text-xs text-slate-500 mt-1 font-medium italic">No new notifications at the moment.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={cn(
                    "p-6 transition-all cursor-pointer hover:bg-slate-50 group relative",
                    !notification.read_at && "bg-emerald-50/30"
                  )}
                  onClick={() => !notification.read_at && markAsRead.mutate(notification.id)}
                >
                  {!notification.read_at && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-schoolgate-green"></div>
                  )}
                  <div className="flex gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                      notification.type === 'result_published' ? "bg-emerald-100 text-emerald-600" :
                      notification.type === 'fee_assigned' ? "bg-amber-100 text-amber-600" :
                      "bg-blue-100 text-blue-600"
                    )}>
                      {notification.type === 'result_published' ? <Check size={20} /> :
                       notification.type === 'fee_assigned' ? <AlertCircle size={20} /> :
                       <Info size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h5 className={cn("text-sm font-bold truncate", !notification.read_at ? "text-slate-900" : "text-slate-600")}>
                          {notification.title}
                        </h5>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                          <Clock size={8} /> {notification.created_at ? new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[10px] font-bold text-schoolgate-green uppercase tracking-widest flex items-center gap-1">
                           View Details <ChevronRight size={12} />
                         </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100">
           <Button variant="outline" className="w-full rounded-xl border-slate-200 text-xs font-bold text-slate-600 h-10">
             View All Activity
           </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Loader2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}