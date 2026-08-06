import { createFileRoute } from '@tanstack/react-router';
import { ExecutiveKPICards } from '@/components/finance/outstanding-fees/executive-kpi-cards';
import { SmartFilters } from '@/components/finance/outstanding-fees/smart-filters';
import { OutstandingStudentsTable } from '@/components/finance/outstanding-fees/outstanding-students-table';

export const Route = createFileRoute('/finance/outstanding-fees/')({
  component: OutstandingFeesPage,
});

function OutstandingFeesPage() {
  return (
    <div className="flex flex-col gap-6 p-6 md:p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Outstanding Fees</h1>
        <p className="text-slate-500 mt-1">Track, analyse and recover outstanding school fees efficiently.</p>
      </div>

      {/* KPI Section */}
      <ExecutiveKPICards />

      {/* Filters */}
      <SmartFilters />

      {/* Main Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Outstanding Students</h2>
        <OutstandingStudentsTable />
      </div>
    </div>
  );
}
