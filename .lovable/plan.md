# Plan: Add Textbook Sales Analytics to Executive Command Center

The user wants the "Executive Command Center" to show detailed textbook delivery and sales statistics for each class (e.g., JSS1 English: copies delivered, sold, unsold, worth, and profit).

## Proposed Changes

### 1. `src/routes/enterprise/index.tsx`
- Add a new section called "Textbook & Store Analytics" within the `EnterpriseCommandCenter` component.
- This section will feature a responsive table or grid showing textbook statistics per class/subject.
- Statistics will include:
    - **Class/Subject** (e.g., JSS1 English)
    - **Delivered** (Total copies received)
    - **Sold** (Number of copies sold)
    - **Unsold** (Stock remaining)
    - **Worth** (Total revenue generated)
    - **Profit** (Margin realized)
- The UI will follow the established Schoolgate ERP design (rounded corners, semantic colors, bold typography).

### 2. Mock Data Update
- Define `TEXTBOOK_ANALYTICS_DATA` in `src/routes/enterprise/index.tsx` to populate this new view, using values similar to those in `ItemAccountSummary` but expanded for the executive overview.

## Verification Plan

### Automated Tests
- Check that the new section renders on the `/enterprise` route.
- Verify that currency values are formatted correctly (₦).

### Manual Verification
- Navigate to the Executive Command Center.
- Scroll to the "Textbook & Store Analytics" section.
- Confirm that the columns (Delivered, Sold, Unsold, Worth, Profit) are visible and accurate for each textbook entry.
