# Plan: Promote Inventory & Store to Standalone Feature

The user asked if "Manage Inventory" is a standalone feature. Currently, it is linked in the `AppSidebar` under the "Main" section, but it functions as a comprehensive, standalone management suite with its own route (`/inventory`).

To make it a "standout" or more prominently standalone feature (similar to how I recently promoted Alumni), I will ensure it has its own clear section or is positioned as a primary module in the navigation.

## Current State Analysis
- `src/components/app-sidebar.tsx` lists "Inventory & Store" in the `mainNavItems`.
- `src/routes/inventory/index.tsx` is the entry point for the module.
- It has 7 sub-modules (Stock Registry, Categories, Stock-In, Stock-Out, POs, Suppliers, Valuation) managed via tabs.

## Proposed Changes
1. **Sidebar Reorganization**: Move "Inventory & Store" to a more prominent position if appropriate, or ensure its labeling and icon clearly distinguish it as a standalone ERP pillar.
2. **Metadata Enhancement**: Add unique page title and metadata to the inventory route for SEO and browser tab clarity.
3. **Feature Documentation**: Update project memory to reflect its status as a core enterprise pillar.

## Verification Plan
- [ ] Check sidebar navigation for "Inventory & Store".
- [ ] Verify the `/inventory` route loads all tabs correctly.
