import { useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useTenant() {
  const { data: session } = useSuspenseQuery({
    queryKey: ['authSession'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    }
  });

  const userId = session?.user?.id;

  const { data: membership } = useSuspenseQuery({
    queryKey: ['userMembership', userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from('memberships')
        .select('tenant_id, campus_id')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('is_default', { ascending: false })
        .limit(1)
        .single();
      
      if (error) return null;
      return data;
    }
  });

  return {
    tenantId: membership?.tenant_id || "00000000-0000-0000-0000-000000000000",
    campusId: membership?.campus_id,
    userId,
    isLoading: !session && !membership
  };
}
