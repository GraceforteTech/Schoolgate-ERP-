import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/finance/hr-payroll/payroll-dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/finance/hr-payroll/payroll-dashboard"!</div>
}
