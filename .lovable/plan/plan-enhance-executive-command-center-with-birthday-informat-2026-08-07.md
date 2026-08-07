# Plan: Enhance Executive Command Center with Birthday Information

The user wants the Executive Command Center to display current and upcoming birthdays for students and staff.

## Proposed Changes

### 1. Update Imports and Components in `src/routes/enterprise/index.tsx`
- Add `Cake` and `Gift` icons from `lucide-react`.
- Update `AlertItem` to support celebration-type alerts with distinct styling and the `Cake` icon.
- Create a new `BirthdayItem` component for detailed birthday listings.
- Update the existing "Upcoming Birthdays" KPI card in the "Operations & Logistics" section to use the `Cake` icon.

### 2. Enhance Executive Alert Center
- Add a high-visibility alert for "Dr. Sarah Adebayo (Staff) birthday today!" to ensure immediate awareness.

### 3. Add Detailed Birthday Widget to Sidebar
- Implement an "Upcoming Celebrations" card in the intelligence sidebar.
- Include a list of today's and upcoming birthdays for both staff and students (e.g., Dr. Sarah Adebayo, Olawale Johnson, etc.).
- Use the `Cake` icon for today's birthdays and the `Gift` icon for upcoming ones.
- Add a "View All Celebrations" quick action button.

## Verification Plan
- Check the "Executive Alert Center" for the birthday notification.
- Verify the "Upcoming Birthdays" KPI card in the operations section.
- Ensure the "Upcoming Celebrations" card appears in the sidebar with correct styling (purple theme).
- Confirm that today's birthdays are highlighted with a distinct background.
