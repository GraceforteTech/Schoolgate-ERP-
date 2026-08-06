# Plan - Enhanced B/F (Brought Forward) Management

The ERP already supports manual posting of B/F (Brought Forward) balances in both the **Manual Posting** and **Spreadsheet Posting** modules. To ensure maximum financial visibility and ease of use, I will enhance these existing features.

## 1. Confirm Existing B/F Support
- **Manual Posting**: Students can have their B/F debts adjusted individually with real-time total calculation.
- **Spreadsheet Posting**: Bulk entry of B/F debts for entire classes with Excel-like copy/paste support.
- **Dashboard**: "Total B/F" is tracked as a key KPI.

## 2. UI Enhancements for B/F Visibility
- **Manual Posting Enhancement**: Add a "B/F History" or "Debt Analysis" tooltip near the B/F input in `src/components/finance/fee-posting/manual-posting.tsx`.
- **Spreadsheet Enhancement**: Add a column-specific highlight for "B/F Debt" to distinguish it from current term fees in `src/components/finance/fee-posting-spreadsheet.tsx`.
- **Quick Action**: Add a "Post Arrears (B/F)" quick action to the Finance Dashboard or Fee Posting Overview.

## 3. Implementation Steps

### Finance Dashboard
- Update `src/components/finance/dashboard/QuickActions.tsx` to include an explicit "Post B/F Balances" action.

### Fee Posting Module
- Enhance `src/components/finance/fee-posting/manual-posting.tsx` with a clearer "Arrears Management" label and a note about how B/F affects student statements.
- Enhance `src/components/finance/fee-posting-spreadsheet.tsx` to ensure the B/F column is easily identifiable (e.g., subtle amber tint).

### Navigation & Routing
- Ensure the "B/F Management" intent is reflected in the page metadata and headers.

## 4. Verification
- Verify that manual entry of B/F correctly updates the "Total Amount Payable" in both individual and bulk views.
- Confirm the audit trail captures B/F adjustments.

---
*Note: The requested "visual text edit" on the invisible character is treated as a synthetic selection artifact and will not be applied as a visible content change.*
