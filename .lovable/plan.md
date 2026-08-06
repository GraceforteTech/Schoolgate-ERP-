# Plan: Class Information Management Implementation

The user is asking for a "CLASS INFORMATION" feature including "manage class" etc. Currently, there's a basic  component inside `src/routes/academic/index.tsx`, but it lacks a dedicated page and advanced management features (KPIs, detailed registry, etc.).

## Proposed Changes

### 1. New Route: Class Information Management
- Create `src/routes/academic/classes.tsx` to host the dedicated Class Information page.
- Implement a modern dashboard layout similar to other modules (Admissions, Students).
- Include:
    - **Executive KPI Cards**: Total Classes, Total Students, Average Class Size, Teacher Allocation Rate, etc.
    - **Action Bar**: Search, Filter by School/Level, "New Class" button, Export.
    - **Class Registry Table**: Name, Level, Category (Primary/Secondary), Class Teacher, Capacity, Enrollment, Status.
    - **Quick View / Stats Sidebar**: Gender distribution, Subject coverage.

### 2. Components
- Create `src/components/academic/class-kpi-cards.tsx`.
- Create `src/components/academic/class-registry-table.tsx`.
- Create `src/components/academic/class-search-center.tsx`.

### 3. Sidebar Navigation
- Update `src/components/app-sidebar.tsx` to include "Class Information" under the "Main" or "Academics" section.

### 4. Navigation Links
- Update `src/routes/academic/index.tsx` to link to the new dedicated hub.

## Verification Plan
- Navigate to `/academic/classes` to verify the layout.
- Check responsiveness across viewports.
- Verify the "Academic Management" overview links correctly to the new page.
