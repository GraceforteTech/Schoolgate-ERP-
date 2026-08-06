import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/library/borrow-return')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/library/borrow-return"!</div>
}
