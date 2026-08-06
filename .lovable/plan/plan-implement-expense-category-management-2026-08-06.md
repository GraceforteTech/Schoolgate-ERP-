# Plan: Implement Expense Category Management

The current system has an Expense Management module, but lacks a dedicated interface for managing expense categories (defining, editing, and monitoring budgets per category).

## Proposed Changes

### 1. Update Expense Management Main Page
- Modify `src/routes/finance/expense-management/index.tsx` to include a new "Categories" tab.
- This will allow users to switch between the Expense Register, Analytics, Approvals, and Category Management.

### 2. Create Category Management Component
- Create `src/components/finance/expense-management/category-management.tsx`.
- Features:
    - **Category Registry**: A table showing all expense categories (e.g., Salaries, Utilities, Supplies, Marketing).
    - **Budget Tracking**: Show "Allocated Budget" vs "Actual Spent" per category with progress bars.
    - **Add/Edit Category**: A modern dialog or form to create new categories.
    - **Status Toggle**: Ability to archive or activate categories.

### 3. Enhance Action Bar
- Update `src/components/finance/expense-management/expense-action-bar.tsx` to include a "Manage Categories" shortcut button when in the Register tab, or ensure the UI feels cohesive.

## Verification Plan

### Manual Verification
- Navigate to `/finance/expense-management`.
- Verify the "Categories" tab is visible in the tab list.
- Click the tab and ensure the Category Registry loads with mock data.
- Check the "Add Category" button triggers a placeholder or dialog.
- Verify responsiveness on mobile/tablet viewports.
