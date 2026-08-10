import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const checkTableExists = createServerFn({ method: "GET" })
  .handler(async () => {
    const { data, error } = await supabaseAdmin
      .from('report_pins')
      .select('count', { count: 'exact', head: true });
    
    if (error) return { exists: false, error: error.message, code: error.code };
    return { exists: true };
  });
