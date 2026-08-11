# Schoolgate ERP — Functional Repair Plan

Audit result: 209 controls traced. 31 WORKING, 142 PLACEHOLDER, 9 BROKEN, 27 BLOCKED.
No code or database changes have been made.

## Phase 0 — Unblock everything (safe, no data risk)

1. `src/components/ui/placeholder-form.tsx` — the "Save & Continue" button has no onClick.
   Wire an `onSubmit` prop, or stop using this component for real actions.
   This single component gates 13 modules.
2. Remove the fake-success handlers that report success without writing:
   - `bulkAssignFees` (`src/lib/fee-types.functions.ts:224`)
   - `createClass` (`src/lib/academic-classes.functions.ts:43`)
   Until implemented they should throw or be hidden, not return `{success:true}`.

## Phase 1 — Finance completion (highest business value)

- Add `updateFeeType` and `deleteFeeType` server functions; build an Edit dialog.
- Wire Fee Type row actions View / Edit / Delete in `fee-types-table.tsx` (lines 253, 254, 261).
- Add `deleteExpense` and a full expense edit form.
- Implement `bulkAssignFees` for real (insert into `student_fees` for selected students).
- Wire the Primary/Secondary/Both, Class and Status selects to real query params
  (`smart-filters.tsx`, `expense-action-bar.tsx` — they have no `onValueChange` today).
- Replace hardcoded revenue/collection figures in fee-types-overview, fee-posting-kpis,
  invoice-management, adjustment-management and TodayCollections with the existing real
  aggregates from `getFeeTypesRegistry` / `getFeeSummaryStats`.
- Rebuild Outstanding Fees on a real query instead of the single mock student row.

## Phase 2 — Receipts, printing and reports

- Install a PDF library (no PDF dependency exists in package.json today).
- Implement receipt generation from a real `transactions` row and wire
  `receipt-dialog.tsx` Print / Download PDF.
- Reuse the working `exportAuditLogs` CSV pattern for the other export buttons.

## Phase 3 — Missing tables (additive migrations, each with GRANTs + tenant RLS)

attendance, timetable, teachers, classes, lesson_notes, biometric_devices,
library_books, inventory_items, employees, payroll, leave_requests,
transport, hostel, alumni, cbt questions/exams, applicants.

`academic.functions.ts` and `inventory.functions.ts` already call `lesson_notes`,
`biometric_devices` and `inventory_items`. Those calls fail today. Creating the
tables makes existing code work with no rewrite.

## Phase 4 — Platform gaps

- Build a Users & Roles admin screen. No role-assignment UI exists anywhere;
  all code only reads `user_roles`.
- Settings: wire School Profile save and Notifications save; add the missing
  TabsContent for the Subscription and System & Backup tabs.
- Add sidebar entries for Library, Inventory, Transport, Hostel, Alumni,
  Payroll Management and Audit Trail — those routes exist but are unreachable from nav.
- Fix the 4 `href="#"` links on the landing page.

## Data safety

The database holds 1 tenant, 1 campus, 1 membership, 1 role and zero business rows.
Every item above is additive. No backfill, no destructive migration.