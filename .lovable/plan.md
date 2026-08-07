# Plan: Implement Staff Dashboard with Wallet System

The objective is to create a dedicated personal dashboard for staff members, featuring a "Staff Wallet" that tracks salary release, deductions, and allows for withdrawals, alongside other personal metrics.

## Proposed Changes

### 1. New Components
- **`src/components/staff/staff-wallet.tsx`**: A premium wallet component showing:
  - Total Wallet Balance (Released Salary).
  - Breakdowns: Basic Salary, Allowances, Deductions (Tax, Pension, Loans).
  - Status indicator (Salary Released/Pending).
  - "Withdraw Funds" action with a modern modal.
- **`src/components/staff/staff-activity-feed.tsx`**: Personalized feed for the staff member (notifications, class updates, payroll alerts).
- **`src/components/staff/staff-personal-kpis.tsx`**: KPIs specific to the staff (Productivity Score, Attendance %, Pending Tasks).

### 2. New Routes
- **`src/routes/staff/dashboard.tsx`**: The main entry point for the Staff Personal Portal.
  - Layout matching the premium Schoolgate ERP style.
  - Integration of Wallet, Personal KPIs, Timetable, and Activity.

### 3. Sidebar Integration
- **`src/components/app-sidebar.tsx`**: Add a "My Portal" or "Staff Dashboard" link to the main navigation for easy access.

### 4. Standalone Export
- **`export/staff-portal/`**: Generate HTML/CSS production-ready export for the staff portal.

## Verification Plan
1.  Verify the new `/staff/dashboard` route renders correctly.
2.  Ensure the Wallet component accurately displays mock data for released salary and deductions.
3.  Check responsiveness and hover animations consistent with the enterprise design system.
4.  Confirm the sidebar link works.
