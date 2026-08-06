# Plan - Syllabus & Scheme of Work Management

Design and implement a premium "Syllabus & Scheme of Work" module for Schoolgate ERP, enabling administrators to upload and teachers to download curriculum documents (Syllabus, Scheme of Work, Course Outlines) filtered by class and subject.

## User Requirements
- Admin/Principal can upload Syllabus and Scheme of Works.
- Teachers can filter by Class and Subject to view/download these documents.
- Support for multiple document types (Syllabus, Scheme of Work, Course Outline).
- Responsive, modern enterprise UI following Schoolgate Green (#0B6E3C) theme.

## Proposed Implementation

### 1. New Route & Layout
- Create `src/routes/academic/syllabus.tsx` as the main hub.
- Integrate with `src/components/app-sidebar.tsx` for easy access.

### 2. Components
- **SyllabusKPIs**: Dashboard cards showing "Total Documents", "Active Syllabuses", "Pending Updates", and "Downloads This Month".
- **SyllabusFilters**: Interactive filter bar for Session, Term, School, Class, and Subject.
- **SyllabusRegistry**: A modern grid/table of document cards. Each card includes:
    - Document Type Badge (Syllabus, Scheme of Work, etc.)
    - Subject & Class details
    - Last Updated timestamp
    - Download button (PDF/Word icons)
    - Quick Preview feature
- **SyllabusUploadCenter**: A drag-and-drop upload interface for administrators with metadata tagging.

### 3. Visual Styling
- Theme: Schoolgate Green (#0B6E3C), White Cards, Light Grey Background (#F5F7FA).
- Rounded Corners: 14px.
- Icons: Lucide-react (FileText, Download, Upload, Filter, etc.).

### 4. Standalone Export
- Generate framework-free HTML5 and CSS3 in `export/syllabus-management/`.

## Progress Tracking
- [ ] Create `src/routes/academic/syllabus.tsx`
- [ ] Create sub-components in `src/components/academic/`
- [ ] Update `src/components/app-sidebar.tsx`
- [ ] Update `src/routes/academic/index.tsx` (add Syllabus tab)
- [ ] Generate standalone exports
- [ ] Commit to GitHub
