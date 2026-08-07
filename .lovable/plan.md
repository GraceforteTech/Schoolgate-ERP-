# Plan: Virtual Learning & Online Classroom

The ERP now explicitly supports online classes for admins and teachers through a new "Virtual Classroom & LMS" module.

## Proposed Changes

### Academic Management Module
- [x] Created `src/components/academic/virtual-classroom/virtual-classroom-hub.tsx` as a dashboard for live sessions and integrations.
- [x] Created `src/routes/academic/virtual-classroom.tsx` as the main route for virtual learning.
- [x] Integrated "Virtual Classroom" as a tab within the main Academic Management dashboard (`src/routes/academic/index.tsx`).
- [x] Added "Virtual Class & LMS" to the main navigation sidebar (`src/components/app-sidebar.tsx`).

### Feature Highlights
- **Live Session Management**: Teachers can schedule and start live video classes.
- **Platform Integrations**: Built-in support for Zoom, Google Meet, and Microsoft Teams.
- **CBT Integration**: Online examinations and live proctoring (already in `/cbt`).
- **LMS Capabilities**: Digital schemes, syllabus distribution, and recorded class archives.

### Memory Update
- [x] Created `mem://features/virtual-learning.md` to document virtual classroom support.
- [x] Updated `mem://index.md` to reference the virtual learning memory.

## Verification Plan

### Manual Verification
- Navigate to "Academics" and click the "Virtual Classroom" tab.
- Click "Open Virtual Learning Hub" to verify the dedicated dashboard.
- Check the sidebar for the new "Virtual Class & LMS" entry.
- Verify that the live session cards reflect the "Schoolgate Green" branding and responsive layout.
