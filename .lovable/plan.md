# Plan: Enhance Staff Dashboard with Ratings and Query Management

The objective is to augment the existing Staff Dashboard with detailed performance effectiveness ratings and a dedicated Query Management Centre to handle administrative/disciplinary queries.

## Proposed Changes

### 1. New Components
- **`src/components/staff/staff-performance-ratings.tsx`**: 
  - Visual breakdown of effectiveness scores (Punctuality, Teaching Quality, Curriculum Coverage, Student Feedback).
  - Overall "Star Rating" or "Grade".
  - Historical trend chart for performance.
- **`src/components/staff/staff-query-centre.tsx`**:
  - A management interface for staff queries.
  - Tabs/Filters for: "Unanswered Queries" (Urgent), "Answered Queries", and "Archived".
  - Status indicators (Pending Reply, Under Review, Resolved).
  - Quick-action buttons to "Reply to Query" or "View Details".

### 2. Dashboard Updates (`src/routes/staff/dashboard.tsx`)
- Integrate the new **Performance Ratings** section, likely next to the existing KPIs or as a dedicated "My Growth" section.
- Add a prominent **Compliance & Query Centre** section to ensure staff are alerted to pending queries immediately.
- Use conditional highlighting (e.g., pulse animation or red badges) if there are unanswered queries.

### 3. Standalone Export Update
- Update `export/staff-portal/index.html` to reflect the new performance metrics and query management features.

## Verification Plan
1.  Navigate to `/staff/dashboard`.
2.  Verify that detailed rating scores are visible with correct styling.
3.  Check the "Query Centre" to ensure unanswered queries are clearly identified and accessible.
4.  Test responsiveness of the new sections on mobile and desktop views.
