# Plan - Promote Alumni Management to a Standout Feature

The user wants "Manage Alumni" to be a standout feature. Currently, it's a tab inside the Student Information Management page. To make it "standout," I will promote it to a top-level feature in the sidebar and create a dedicated dashboard page for it.

## Proposed Changes

### 1. New Dedicated Alumni Route
- Create `src/routes/alumni/index.tsx`.
- This page will feature alumni-specific KPIs, an alumni directory, engagement metrics, and a "Higher Ed Placement" tracker.
- It will reuse parts of the `StudentDirectory` component but filtered specifically for alumni.

### 2. Sidebar Navigation Update
- Update `src/components/app-sidebar.tsx` to include "Alumni" as a standalone item under the "Main" navigation group.
- Use the `GraduationCap` or a similar distinctive icon.

### 3. Alumni Dashboard Components
- Create `src/components/alumni/alumni-kpi-cards.tsx`: Focus on total graduates, employment rate, higher education placement, and alumni donations/revenue.
- Create `src/components/alumni/alumni-engagement.tsx`: Track alumni events, mentorship programs, and outreach.

### 4. Cleanup/Refinement
- Keep the tab in the Students page for quick access, but link it to the new dedicated module or keep it as a simplified view.
- Update the Alumni standalone export to reflect the new standalone dashboard structure.

## Verification Plan

### Automated Verification
- Check if the new route `/alumni` loads correctly using a Playwright script.
- Verify that the sidebar contains the "Alumni" link and it navigates to the correct page.

### Visual Verification
- Ensure the new Alumni Dashboard has a premium feel with high-level executive KPIs.
