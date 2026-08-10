import { createServerFn } from "@tanstack/react-start";

export const checkTableExists = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    const { error } = await (supabaseAdmin
      .from('report_pins' as any) as any)
      .select('count', { count: 'exact', head: true });
    
    if (error) return { exists: false, error: error.message, code: error.code };
    return { exists: true };
  });
