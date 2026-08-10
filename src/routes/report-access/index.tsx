import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/report-access/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/report-access/"!</div>
}
