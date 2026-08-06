import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/finance/hr-payroll/employees')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/finance/hr-payroll/employees"!</div>
}
