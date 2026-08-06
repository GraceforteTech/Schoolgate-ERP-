import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/library/digital')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/library/digital"!</div>
}
