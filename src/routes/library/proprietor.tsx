import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/library/proprietor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/library/proprietor"!</div>
}
