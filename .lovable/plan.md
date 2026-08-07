# Plan: Enhanced Sales Posting for Inventory & Store

Allow storekeepers to post sales amounts with both daily and weekly flexibility, tracking both quantity and revenue.

## User Requirements
- Unified form for posting daily or weekly sales.
- Track both quantity sold and total revenue.
- Maintain existing premium ERP styling.

## Proposed Changes

### 1. New Component: `PostSalesDialog`
- Create `src/components/inventory/sales/post-sales-dialog.tsx`.
- Implement a `Dialog` containing:
    - **Frequency Toggle**: Switch between "Daily" and "Weekly".
    - **Item Search/Select**: Choose the item from the inventory.
    - **Date/Range Picker**:
        - Daily mode: Single date selection.
        - Weekly mode: Start and end date selection (or week number).
    - **Metric Inputs**:
        - `Quantity Sold`: Numeric input.
        - `Unit Price`: Displayed for reference (fetched from item selection).
        - `Total Revenue`: Auto-calculated (`Quantity * Unit Price`) but editable for manual adjustments.
    - **Submission Logic**: Mock success notification using `sonner`.

### 2. Update Component: `DailySalesLog`
- Modify `src/components/inventory/sales/daily-sales-log.tsx`.
- Update the header button to "Post Sales" and wire it to the new `PostSalesDialog`.
- Update the table structure to handle "Weekly Summary" rows alongside "Daily" logs.
- Add a badge or icon to distinguish between entry types.

### 3. Integration & Styling
- Use Schoolgate Green (`#0B6E3C`) for primary actions.
- Ensure responsive design for the form on mobile devices.

## Verification Plan
- **UI Check**: Verify the dialog opens and the frequency toggle updates the date picker labels/behavior.
- **Logic Check**: Confirm that changing the quantity automatically updates the total revenue field.
- **Visual Check**: Ensure the new entries (mocked) appear correctly in the `DailySalesLog` table with appropriate "Daily" or "Weekly" labels.
