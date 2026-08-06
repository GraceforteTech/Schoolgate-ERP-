# Plan - Bulk Fee Posting via Spreadsheet Enhancement

The ERP already supports bulk school fee posting via a dedicated spreadsheet interface. I will enhance the existing `FeePostingSpreadsheet` component to improve the user experience and ensure data integrity.

## 1. Confirm Existing Spreadsheet Features
- **Bulk Entry**: Supports entering School Fees, B/F (Brought Forward), and Discounts for a whole class at once.
- **Excel Features**: Copy/Paste, cell selection, and keyboard navigation are already implemented.
- **Auto-Calculations**: Automatically updates "Total Payable" and "Outstanding" balances as values change.
- **Auto-Save UI**: Shows "Saving..." and "Changes Saved" badges to provide feedback.

## 2. Planned Enhancements
- **Import Protection**: Integrate the `ImportProtectionDialog` to handle conflicts when importing data (Skip, Update, or Overwrite existing records).
- **Progress Tracking**: Add a visual progress indicator for the bulk posting process in the confirmation dialog.
- **Visual Feedback**: Improve the "Modified Rows" counter to accurately reflect changes in the spreadsheet session.

## 3. Implementation Steps

### Spreadsheet Enhancements
- Update `src/components/finance/fee-posting-spreadsheet.tsx` to include the `ImportProtectionDialog`.
- Enhance the `handlePostFees` function to simulate a more detailed processing workflow with progress updates.
- Refine the "Modified Rows" state to track which rows have been edited during the session.

### UI Polish
- Ensure the spreadsheet toolbar is fully functional, especially the "Template Download" and "Import Excel" buttons (adding mock logic/toasts where necessary).

## 4. Verification
- Verify that bulk values can be pasted from external sources.
- Confirm that "Apply & Post Fees" correctly triggers the summary dialog and subsequent success toast.
- Ensure the "Modified Rows" counter updates as cells are edited.

---
*Note: The requested "visual text edit" on the invisible character is treated as a synthetic selection artifact and will not be applied as a visible content change.*
