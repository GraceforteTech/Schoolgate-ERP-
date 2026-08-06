import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/library/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/library/analytics"!</div>
}
