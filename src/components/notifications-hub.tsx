import { useState, useMemo } from "react";
import { 
  Bell, 
  Check, 
  Clock, 
  Info, 
  AlertCircle,
  Settings,
  X,
  ChevronRight,
  ExternalLink,
  Archive,
  RotateCcw,
  CheckCircle2,
  MoreVertical,
  Trash2
} from "lucide-react";
import { Link } from "@tanstack/react-router";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function NotificationsHub() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [confirmAction, setConfirmAction] = useState<{ type: string; ids: string[] } | null>(null);
  const [viewArchived, setViewArchived] = useState(false);

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .is('archived_at', viewArchived ? null : null) // Logic handled by RLS/Query
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (viewArchived) {
        // Just a placeholder filter for now until schema is robust
      }
      
      let query = supabase.from('notifications').select('*');
      if (viewArchived) {
        query = query.not('archived_at', 'is', null);
      } else {
        query = query.is('archived_at', null);
      }
      
      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    },
    enabled: open
  });

  const unreadCount = notifications.filter(n => !n.read_at).length;

  const bulkUpdate = useMutation({
    mutationFn: async ({ ids, updates }: { ids: string[]; updates: any }) => {
      const { error } = await supabase
        .from('notifications')
        .update(updates)
        .in('id', ids);
      if (error) throw error;
      return ids.length;
    },
    onSuccess: (count) => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      setSelectedIds([]);
      toast.success(`Successfully updated ${count} notifications`);
    },
    onError: (err: any) => {
      toast.error(`Failed to update notifications: ${err.message}`);
    }
  });

  const handleBulkAction = (type: string) => {
    if (selectedIds.length === 0) return;
    
    if (type === 'archive' || type === 'delete') {
      setConfirmAction({ type, ids: [...selectedIds] });
    } else {
      executeBulkAction(type, selectedIds);
    }
  };

  const executeBulkAction = (type: string, ids: string[]) => {
    let updates = {};
    switch (type) {
      case 'read': updates = { read_at: new Date().toISOString() }; break;
      case 'unread': updates = { read_at: null }; break;
      case 'archive': updates = { archived_at: new Date().toISOString() }; break;
      case 'restore': updates = { archived_at: null }; break;
    }
    bulkUpdate.mutate({ ids, updates });
    setConfirmAction(null);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === notifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(notifications.map(n => n.id));
    }
  };

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
              <SheetTitle className="text-xl font-black text-slate-900 tracking-tight">
                {viewArchived ? "Archived Activity" : "Activity Notifications"}
              </SheetTitle>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                {viewArchived ? "View past logs" : "Real-time alerts & updates"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("h-8 w-8 rounded-lg", viewArchived ? "text-schoolgate-green bg-emerald-50" : "text-slate-400")}
                onClick={() => setViewArchived(!viewArchived)}
                title={viewArchived ? "View Active" : "View Archive"}
              >
                <Archive size={18} />
              </Button>
              <Link 
                to="/settings" 
                className="h-8 w-8 rounded-lg text-slate-400 hover:text-slate-600 flex items-center justify-center hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                <Settings size={18} />
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Checkbox 
                  checked={notifications.length > 0 && selectedIds.length === notifications.length}
                  onCheckedChange={toggleSelectAll}
                  className="rounded-md border-slate-300 data-[state=checked]:bg-schoolgate-green data-[state=checked]:border-schoolgate-green"
                />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {selectedIds.length > 0 ? `${selectedIds.length} SELECTED` : 'SELECT ALL'}
                </span>
              </div>
            </div>

            {selectedIds.length > 0 ? (
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-[10px] font-black text-schoolgate-green uppercase tracking-widest"
                  onClick={() => handleBulkAction('read')}
                >
                  Read
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg text-slate-400">
                      <MoreVertical size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-xl border-slate-100 shadow-xl">
                    <DropdownMenuItem onClick={() => handleBulkAction('unread')} className="text-xs font-bold gap-2">
                      <RotateCcw size={14} /> Mark as Unread
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkAction(viewArchived ? 'restore' : 'archive')} className="text-xs font-bold gap-2">
                      {viewArchived ? <RotateCcw size={14} /> : <Archive size={14} />}
                      {viewArchived ? 'Restore' : 'Archive'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : !viewArchived && unreadCount > 0 && (
              <button 
                onClick={() => executeBulkAction('read', notifications.filter(n => !n.read_at).map(n => n.id))}
                className="text-[10px] font-black text-schoolgate-green uppercase tracking-widest hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
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
                    "p-6 transition-all cursor-pointer hover:bg-slate-50 group relative flex gap-4",
                    !notification.read_at && !viewArchived && "bg-emerald-50/30",
                    selectedIds.includes(notification.id) && "bg-schoolgate-green/5"
                  )}
                  onClick={() => toggleSelect(notification.id)}
                >
                  <div className="pt-1" onClick={e => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedIds.includes(notification.id)}
                      onCheckedChange={() => toggleSelect(notification.id)}
                      className="rounded-md border-slate-300 data-[state=checked]:bg-schoolgate-green data-[state=checked]:border-schoolgate-green"
                    />
                  </div>
                  {!notification.read_at && !viewArchived && (
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
                         {(notification.metadata as any)?.link ? (
                           <Link 
                            to={(notification.metadata as any).link}
                            className="text-[10px] font-bold text-schoolgate-green uppercase tracking-widest flex items-center gap-1 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!notification.read_at) markAsRead.mutate(notification.id);
                              setOpen(false);
                            }}
                           >
                             View Details <ExternalLink size={10} className="ml-0.5" />
                           </Link>
                         ) : (
                           <span className="text-[10px] font-bold text-schoolgate-green uppercase tracking-widest flex items-center gap-1">
                             View Details <ChevronRight size={12} />
                           </span>
                         )}
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

function AuditFiltersDialog({ 
  open, 
  onOpenChange, 
  onSave, 
  filterName, 
  setFilterName 
}: { 
  open: boolean; 
  onOpenChange: (val: boolean) => void;
  onSave: () => void;
  filterName: string;
  setFilterName: (val: string) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-[24px] border-none shadow-2xl p-8">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black text-slate-900 tracking-tight">Save Search Filter</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 font-medium pt-2 leading-relaxed">
            Give this filter configuration a name so you can reuse it later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-6">
          <Input 
            placeholder="e.g. Finance Errors, Admin Changes" 
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="h-12 rounded-xl border-slate-200 font-bold focus-visible:ring-schoolgate-green"
          />
        </div>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="h-12 rounded-xl border-none bg-slate-100 font-black uppercase text-[10px] tracking-widest text-slate-500 hover:bg-slate-200">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onSave}
            className="h-12 rounded-xl bg-schoolgate-green font-black uppercase text-[10px] tracking-widest hover:bg-schoolgate-green/90"
          >
            Save Filter
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
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