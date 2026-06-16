import { prefix, route, type RouteConfig } from '@react-router/dev/routes'

export const plausibleEventsRoutes = [
  ...prefix('api', [route('event', './routes/api/event.ts')]),
] satisfies RouteConfig
