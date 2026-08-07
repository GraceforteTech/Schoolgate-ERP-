# Plan - Birthday Tracking & Executive Visibility

Enhance the Schoolgate ERP to display upcoming birthdays for teachers and students, specifically targeted for executive visibility as per user preference.

## Proposed Changes

### 1. Finance Dashboard Enhancement
- Modify `src/components/finance/dashboard/ExecutiveInsights.tsx` to include a new section for "Upcoming Celebrations".
- Add a dedicated list showing upcoming birthdays for both teachers and students.
- Use Cake/Gift icons to make the section visually distinct.

### 2. HR Dashboard Enhancement
- Update `src/components/hr/hr-dashboard-feeds.tsx` to include birthdays in the notification or activity feed.
- This ensures HR personnel are also aware of staff milestones.

### 3. Data Mocking
- Update mock data in `src/components/teachers/teacher-directory.tsx` and `src/components/students/student-directory.tsx` (or related utilities) to include `dateOfBirth` fields if they are missing or need realistic values for testing.

## Implementation Details

- **Iconography**: Use `Cake`, `Gift`, or `PartyPopper` from `lucide-react`.
- **Layout**: The "Upcoming Celebrations" will be added as a third column or a new section in the `ExecutiveInsights` component to avoid cluttering the existing financial KPIs.
- **Tone**: Keep it professional yet celebratory, aligning with the "Institutional Health" theme of the executive dashboard.

## Verification Plan
- Navigate to `/finance/dashboard` and verify the new "Upcoming Celebrations" section is visible and correctly formatted.
- Navigate to `/finance/hr-payroll` and check the feeds for birthday notifications.
- Ensure responsive layout is maintained.
