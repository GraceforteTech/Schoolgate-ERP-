# Plan: Implement Biometric Attendance & Automated Lateness Deductions

The objective is to enable external thumbprint device integration for staff attendance and automate salary deductions based on lateness rules defined by the admin.

## Proposed Changes

### 1. New Components
- **`src/components/attendance/biometric-integration.tsx`**: 
  - Interface to connect and sync with external biometric devices.
  - Device status monitor (Connected/Disconnected/Syncing).
  - Data mapping (Device ID to Staff ID).
- **`src/components/hr/payroll-mgmt/lateness-rules.tsx`**: 
  - Admin interface to set lateness thresholds (e.g., "Grace period of 15 mins").
  - Automated deduction formulas (e.g., "₦500 per 30 mins late" or "1% of basic salary").
  - Rule activation toggle.
- **`src/components/attendance/staff-punctuality-log.tsx`**:
  - Detailed log showing "Arrival Time", "Lateness Duration", and "Calculated Penalty".

### 2. Route Updates
- **`src/routes/attendance/index.tsx`**: 
  - Add a "Biometric Integration" tab.
  - Add a "Staff Punctuality" sub-view.
- **`src/routes/finance/hr-payroll/salary-structure.tsx`**:
  - Integrate "Automated Deduction Rules" into the salary structure configuration.
- **`src/routes/finance/payroll-management/index.tsx`**:
  - Update the payroll processing view to include "Automated Lateness Deductions" calculated from biometric attendance logs.

### 3. Logic Enhancement
- Update `AttendanceRegister` to include "Time In" and lateness status.
- Mock the automated calculation logic that links attendance lateness to payroll line items.

### 4. Standalone Export Update
- Update `export/hr-management/` and `export/staff-portal/` to reflect these new capabilities.

## Verification Plan
1.  Navigate to `/attendance`.
2.  Verify the "Biometric Integration" tab exists and shows device connection options.
3.  Navigate to `/finance/hr-payroll/salary-structure`.
4.  Verify that "Lateness Deduction Rules" can be configured.
5.  Check `/finance/payroll-management` to ensure lateness deductions are automatically applied to the processing table.
