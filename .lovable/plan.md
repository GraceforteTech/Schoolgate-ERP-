# Plan - Comprehensive HR & Staff Management Suite

Implement Recruitment, Awards, Promotions, and advanced Leave Management into the HR & Payroll module.

## User Requirements
- Recruitment management (Job portal, applications)
- Employee management (Enhanced profiles)
- Awards tracking
- Promotion history/management
- Leave management (Approvals, calendar)

## Proposed Changes

### 1. Recruitment Management
- Create `src/components/hr/recruitment/recruitment-hub.tsx`:
  - Job Vacancies registry.
  - Applicant Pipeline (Applied -> Screened -> Interview -> Offered).
  - Interview Scheduler.

### 2. Staff Awards & Promotions
- Create `src/components/hr/performance/awards-promotions.tsx`:
  - Awards Registry (Award type, recipient, date, description).
  - Promotion History (Previous role -> New role, effective date, increment).
  - Performance Review summaries.

### 3. Advanced Leave Management
- Create `src/components/hr/leave/leave-management-system.tsx`:
  - Leave Calendar view.
  - Leave Application form & Approval workflow.
  - Leave Balance tracking (Annual, Sick, Maternity, etc.).

### 4. Employee 360 Enhancement
- Update `src/components/hr/employee-mgmt/employee-directory.tsx`:
  - Add "Awards & Promotions" and "Leave History" to the action menu or a new profile view component.

### 5. Main Dashboard Integration
- Update `src/routes/finance/hr-payroll/index.tsx`:
  - Populate the "Leave Mgmt" tab with the new `LeaveManagementSystem`.
  - Add a "Recruitment" tab and populate it with `RecruitmentHub`.
  - Add "Awards & Promotions" to the "Performance" tab.

### 6. Standalone Export
- Generate updated HTML/CSS exports in `export/hr-management/` to reflect these premium features.

## Verification Plan

### Automated Checks
- Run `tsgo` to ensure type safety.
- Verify all new components render without errors.

### Manual Verification
- Navigate to HR & Payroll dashboard.
- Verify "Recruitment" tab shows the pipeline and vacancies.
- Verify "Leave Mgmt" shows the calendar and approval queue.
- Verify "Performance" tab shows awards and promotion history.
- Check WhatsApp/Share integration if applicable for job postings.
