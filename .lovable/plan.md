# Plan - Alumni Management Implementation

The user asked if the ERP allows managing Alumni and also provided a visual text edit instruction. While the visual text edit appears to be a no-op (same character), the user's primary question indicates a need for Alumni management features within the Student Information module.

Currently, "Total Alumni" is shown as a KPI, but there is no dedicated view or management interface for them.

## Proposed Changes

### Student Management
- Update `src/components/students/executive-kpi-cards.tsx` to ensure "Total Alumni" is interactive or correctly represented.
- Add an "Alumni Directory" tab to `src/routes/students.tsx` and `src/components/students/student-directory.tsx` (or a new dedicated component).
- Implement a filter for "Graduated" (Alumni) status in the student directory.
- Add a "Graduate Student" bulk action to transition students to Alumni status.

### Standalone Export
- Update `export/student-management/index.html` to reflect the Alumni management capabilities in the UI.

## Verification Plan

### Manual Verification
- Navigate to `/students` and check for the "Alumni" related filters and KPIs.
- Verify the "Graduated" status exists in the status dropdown.
- Check the "Total Alumni" KPI card.

### Automated Verification
- Run a playwright script to verify the presence of "Alumni" text and the "Graduated" status option in the directory filters.
