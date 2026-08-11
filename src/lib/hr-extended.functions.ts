import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getLeaveRequests = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    // Placeholder until leave_requests table is confirmed
    return [
      { id: '1', employee: 'Sarah Johnson', type: 'Annual Leave', duration: '5 days', status: 'Pending', date: 'Oct 12, 2024' },
      { id: '2', employee: 'Michael Chen', type: 'Sick Leave', duration: '2 days', status: 'Approved', date: 'Oct 10, 2024' }
    ] as any[];
  });

export const getAttendanceStats = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    return {
      present: 85,
      absent: 3,
      late: 7,
      onLeave: 5
    };
  });

export const getPayrollSummary = createServerFn({ method: "GET" })
  .validator((data: { tenantId: string }) => z.object({ tenantId: z.string().uuid() }).parse(data))
  .handler(async ({ data }) => {
    return {
      totalNetSalary: 4500000,
      totalDeductions: 500000,
      pendingApprovals: 2,
      lastProcessedDate: '2024-09-28'
    };
  });
