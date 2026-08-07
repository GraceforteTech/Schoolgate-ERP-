# Plan: Staff Archiving and Audit Trail

The user asked if the ERP allows deleting staff while keeping history. The system's architecture promotes archiving and audit trails over destructive deletion to ensure compliance and historical reporting.

## Proposed Changes

1.  **Memory Management**:
    *   Create `mem://features/staff-archiving.md` to document the requirement for preserving historical staff data and audit logs.
    *   Update `mem://index.md` to include a reference to the new archiving memory.

2.  **UI Updates**:
    *   Modify `src/components/hr/employee-mgmt/employee-directory.tsx` to include an "Archive Record" option in the employee action menu.
    *   Update `src/components/finance/enhanced-audit-trail.tsx` with a sample log entry for staff archiving to demonstrate historical tracking.

3.  **Verification**:
    *   Visual check of the Employee Directory action menu.
    *   Visual check of the Audit Trail logs.
