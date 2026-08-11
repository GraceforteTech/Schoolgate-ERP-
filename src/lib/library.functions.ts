import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getLibraryBooks = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string, search?: string, category?: string }) => z.object({
    tenantId: z.string().uuid(),
    search: z.string().optional(),
    category: z.string().optional()
  }).parse(data))
  .handler(async ({ data }) => {
    // Placeholder for library_books table
    return [
      { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '978-0385474542', category: 'Fiction', copies: 12, borrowed: 4, location: 'Shelf A1', status: 'Available' },
      { id: 2, title: 'Purple Hibiscus', author: 'Chimamanda Adichie', isbn: '978-1616202415', category: 'Fiction', copies: 8, borrowed: 8, location: 'Shelf A2', status: 'Borrowed' }
    ] as any[];
  });

export const getLibraryStats = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    return {
      totalBooks: 1250,
      borrowedToday: 15,
      overdueBooks: 4,
      newArrivals: 8
    };
  });
