# Plan: Make all buttons clickable and display forms

The user wants all buttons in the ERP to be clickable and display forms where applicable. Based on previous interactions, specifically for the Inventory module, I will ensure that the "New Item" and "Add Category" buttons (and others like "Add Supplier", "Create PO", etc.) trigger the appropriate forms or at least show a placeholder/form if they were previously non-functional.

## Proposed Changes

### 1. Inventory Management (`src/routes/inventory/index.tsx`)
- Ensure "Add Supplier", "Create PO", "New GRN", and "Issue Items" buttons are clickable.
- Since the user specifically mentioned "display any form under it", I will implement state-driven modals for these remaining actions, similar to `AddItemForm` and `CreateCategoryForm`.

### 2. Executive Command Center (`src/routes/enterprise/index.tsx`)
- The "Executive Quick Actions" (Collect School Fees, Admit Student, Register Staff, Post Scores, etc.) are currently static buttons. 
- I will wire these up to show at least a basic "Work in Progress" form or a relevant existing form if available (e.g., "Admit Student" could link to the admissions flow or show a modal).

### 3. Fee Types Registry (`src/routes/fee-types.tsx`)
- Ensure the "New Fee Type" button is functional and displays a form.

## Verification Plan

### Automated Tests
- I will use Playwright to verify that clicking these buttons actually opens a dialog/modal.
- Specifically, I'll check:
  - Inventory page: "Add Supplier" opens a modal.
  - Enterprise page: "Collect School Fees" opens a modal.

### Manual Verification
- I will use the live preview to click through the major buttons in the modules I've modified to confirm they all trigger a UI response (a form or a descriptive modal).
