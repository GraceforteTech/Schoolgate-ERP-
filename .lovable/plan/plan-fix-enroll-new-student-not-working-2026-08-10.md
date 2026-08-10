# Plan - Fix "Enroll New Student" Not Working

The "Enrol New Student" button in the Student Directory is currently a static UI element with no onClick handler or form connection. I will implement a functional enrollment form using the existing `PlaceholderForm` pattern and wire it to the button.

## Proposed Changes

### Components
#### [src/routes/students.tsx]
- Import `PlaceholderForm` and `UserPlus` icon.
- Add state to manage the visibility of the "Enrol New Student" form.
- Update the "Enrol New Student" card button to trigger the form.
- Render the `PlaceholderForm` with student enrollment context.

## Verification Plan

### Manual Verification
- Navigate to the `/students` route.
- Locate the "Enrol New Student" card in the right sidebar.
- Click the "Get Started" button.
- Verify that the "Enrol New Student" dialog appears with the correct icon and description.
- Verify that the "Cancel" button closes the dialog.
