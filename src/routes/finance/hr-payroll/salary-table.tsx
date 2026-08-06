import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/finance/hr-payroll/salary-table')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/finance/hr-payroll/salary-table"!</div>
}
