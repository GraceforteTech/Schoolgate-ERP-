# Plan - Inventory & Store Management Enhancement

Enhance the Inventory module to track sales performance, item-specific accounts, and profit/loss metrics.

## 1. Enhance KPI Summary Cards
- Update `src/components/inventory/inventory-kpi-cards.tsx` to include:
    - **Total Items** (Existing)
    - **Amount Sold** (Total Revenue from Sales)
    - **Net Profit/Loss** (Calculated based on Unit Cost vs Selling Price)
- Add hover effects and premium styling to these new cards.

## 2. Create Item Account Summary Component
- Create `src/components/inventory/items/item-account-summary.tsx`:
    - Display a grid of item-specific summary cards (e.g., "English Textbook Account Summary").
    - Each card will show:
        - Item Name & Category
        - Total Quantity Collected
        - Total Sold (Quantity & Amount)
        - Returns & Unsold count
        - Estimated Profit/Loss for that specific item
        - Trend indicator
- Add a search filter to quickly find specific item accounts.

## 3. Integrate into Inventory Dashboard
- Update `src/routes/inventory/index.tsx`:
    - Add a new tab: **"Item Accounts"** (or "Financial Summary").
    - Render the `ItemAccountSummary` component in this tab.
    - Update the "Valuation" tab or merge it with this new view if it provides better insights.

## 4. Verification
- Verify the new KPIs are visible on the main Inventory page.
- Ensure the "Item Accounts" tab displays item-specific performance metrics.
- Check responsive layout across mobile and desktop.
