---
name: Student Enrollment Fix
description: Implement real student enrollment form and connect to Supabase
type: feature
---
# Student Enrollment Implementation

## 1. Schema Definition
The `public.students` table already exists with:
- `id` (uuid)
- `tenant_id` (uuid)
- `campus_id` (uuid)
- `parent_id` (uuid)
- `admission_number` (text)
- `full_name` (text)
- `class_id` (text)
- `status` (text)

## 2. Server Functions
- `enrollStudent`: A new server function in `src/lib/students.functions.ts` to handle the insertion of a new student record. It will validate input using Zod and perform the database operation via `supabaseAdmin`.

## 3. UI Components
- `EnrollStudentDialog`: A new component in `src/components/students/enroll-student-dialog.tsx` to replace the `PlaceholderForm` used in `src/routes/students.tsx`.
- The form will capture:
    - Full Name
    - Admission Number
    - Class (Select)
    - Campus (Select)
    - Gender (Select)
    - Parent Contact (Phone/Email)
- Integrate `useServerFn` for submission and `react-hook-form` with `zod` for validation.

## 4. Integration
- Update `src/routes/students.tsx` to use `EnrollStudentDialog`.
- Invalidate the student directory query after successful enrollment.
