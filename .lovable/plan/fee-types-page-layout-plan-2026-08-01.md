# Fee Types Page Layout Plan

## Current State
- Fresh TanStack Start template with placeholder `src/routes/index.tsx`.
- No existing app-level sidebar or top navigation components.
- shadcn/ui Sidebar, Button, Card, Input, and Badge components are available.

## Goal
Build a responsive "Fee Types" page layout for a School ERP with modern enterprise styling (Stripe/Zoho/Odoo feel). No forms or tables yet — only styled placeholders.

## Design Decisions
- Background: `#F5F7FA` (light grey) applied to the page surface.
- Primary brand color: Schoolgate Green `#0B6E3C` mapped to a CSS design token.
- Content cards: white background with `14px` border radius and subtle shadow.
- Layout: collapsible left sidebar + fixed top navigation bar + white content area.
- Responsive: full sidebar on desktop, sheet/drawer sidebar on mobile.

## Implementation Steps

1. **Design tokens**
   - Add `--schoolgate-green: #0B6E3C` and a complementary light surface token to `src/styles.css`.
   - Register them in `@theme inline` so Tailwind utilities are generated.

2. **App sidebar**
   - Create `src/components/app-sidebar.tsx` using the existing shadcn `Sidebar` component.
   - Include School ERP navigation items with "Fee Types" highlighted/active.
   - Support collapsible icon mode and mobile sheet behavior.

3. **Top navigation bar**
   - Create `src/components/top-nav.tsx` with:
     - Sidebar trigger (mobile)
     - Breadcrumb or page path
     - Search placeholder
     - Notification and user profile avatars/icons
   - Keep it minimal and enterprise-clean.

4. **Fee Types page route**
   - Create `src/routes/fee-types.tsx` (path `/fee-types`).
   - Compose `SidebarProvider`, `AppSidebar`, `TopNav`, and the main content area.
   - Add a unique `head()` with title, description, and OG/Twitter meta.

5. **Page content layout**
   - Page header with title "Fee Types" and subtitle "Create and manage school fee structures."
   - Primary CTA button ("Add Fee Type") in the header, styled with Schoolgate Green.
   - White content container with rounded corners.
   - Placeholder blocks for:
     - **Summary Cards**: 3-4 horizontal stat cards (e.g., Total Fee Types, Active, Inactive, Total Revenue).
     - **Filter Bar**: search input, status filter, and "Apply Filters" placeholder.
     - **Fee Types Table**: skeleton placeholder indicating where the table will go.

6. **Responsiveness**
   - Use CSS grid/flex with `min-w-0` and `shrink-0` for header rows.
   - Stack summary cards on mobile, grid on desktop.
   - Ensure sidebar collapses correctly on mobile via shadcn sheet.

7. **Verification**
   - Run typecheck/build to confirm no import or syntax errors.
   - Visually verify the preview renders the layout, placeholders, and brand color correctly.

## Out of Scope
- No actual data fetching or backend integration.
- No real forms, modals, or table implementations.
- No interactive filtering logic.
