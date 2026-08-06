import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/library/catalogue')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/library/catalogue"!</div>
}
