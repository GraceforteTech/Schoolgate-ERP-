# Plan: Online Class Scheduling and WhatsApp Integration

1.  **Online Class Scheduler Component**:
    *   Created `src/components/academic/virtual-classroom/online-class-scheduler.tsx` featuring:
        *   Form for Admin/Teacher to schedule classes (Topic, Date, Time, Teacher, Class, Platform, Link).
        *   **WhatsApp Share Feature**: Generates a pre-formatted message with class details and the join link.
        *   **Online Class Timetable**: A dedicated view showing scheduled sessions.
        *   **Conflict Resolution**: Visual indicators for Admin-overridden schedules.

2.  **Timetable Management Enhancement**:
    *   Updated `src/components/timetable/smart-timetable-builder.tsx` with "Admin Priority Mode" and conflict resolution logic settings.
    *   Modified `src/routes/timetable/index.tsx` activity log to show conflict overrides.

3.  **Virtual Classroom Integration**:
    *   Integrated the new `OnlineClassScheduler` into the "Class Schedule" tab of the Virtual Classroom route (`src/routes/academic/virtual-classroom.tsx`).
    *   Added WhatsApp notification toggle to the `VirtualClassroomHub` settings.

4.  **Verification**:
    *   Ensure all components render correctly.
    *   Verify the WhatsApp share functionality opens a new window with the correct payload.
    *   Confirm conflict resolution UI labels are visible.
