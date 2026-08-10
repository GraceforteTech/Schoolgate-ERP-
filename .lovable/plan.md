# Plan - Design Fee Type Module Enhancements

The user wants to "design fee type". Based on the existing codebase, we already have a robust fee type management system under `/fee-types`. I will enhance the design to match the premium **Executive Command Center** aesthetic, focusing on layout, summaries, and distribution UX.

## Proposed Changes

### 1. Enhance `src/routes/fee-types-overview.tsx`
- Refine the category cards to match the 24px/14px rounded aesthetic of the Executive Dashboard.
- Improve typography (font-black for headings, tracking-widest for labels).
- Ensure consistent spacing and premium hover effects.

### 2. Update `src/components/finance/create-fee-type-dialog.tsx`
- Refine the form layout to be more "Executive" (cleaner inputs, better grouping).
- Improve the "Applicable Classes" grid styling.
- Ensure the dialog matches the project's high-contrast theme.

### 3. Refine `src/routes/fee-types.tsx`
- Ensure the main registry page is perfectly aligned with the Command Center's look.
- Optimize the loading state with the premium skeleton pattern used in other modules.

### 4. Database & Logic Check
- No schema changes needed as the current migration already supports the required fields.
- Verify `applicable_classes` distribution logic in `src/lib/fee-types.functions.ts`.

## Verification Plan

### Automated Tests
- Build check: `npm run build:dev`
- Type check: `tsgo`

### Manual Verification
- Navigate to `/fee-types-overview` and `/fee-types`.
- Open the "New Fee Type" dialog and verify layout.
- Check responsiveness on mobile and tablet viewports.
