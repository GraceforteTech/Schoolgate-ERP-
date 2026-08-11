import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getInventoryItems = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string, search?: string, category?: string }) => z.object({
    tenantId: z.string().uuid(),
    search: z.string().optional(),
    category: z.string().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    
    let query = supabaseAdmin
      .from('inventory_items' as any)
      .select('*')
      .eq('tenant_id', data.tenantId);

    if (data.search) {
      query = query.ilike('name', `%${data.search}%`);
    }
    
    if (data.category && data.category !== 'all') {
      query = query.eq('category', data.category);
    }

    const { data: items, error } = await query.order('name');
    
    if (error) {
      console.error("Inventory fetch error:", error.message);
      return [] as any[];
    }
    
    return (items || []).map((item: any) => ({
      id: String(item.id),
      name: String(item.name || ''),
      code: String(item.code || ''),
      category: String(item.category || ''),
      quantity: Number(item.quantity || 0),
      unit: String(item.unit || ''),
      min_stock: Number(item.min_stock || 0),
      unit_price: Number(item.unit_price || 0),
      status: String(item.quantity <= 0 ? 'Out of Stock' : item.quantity <= item.min_stock ? 'Low Stock' : 'In Stock')
    })) as any[];
  });

export const getInventoryCategories = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: categories } = await supabaseAdmin
      .from('inventory_items' as any)
      .select('category')
      .eq('tenant_id', data.tenantId)
      .not('category', 'is', null);
    
    const distinct = Array.from(new Set((categories || []).map((c: any) => String(c.category))));
    return distinct.sort() as string[];
  });
