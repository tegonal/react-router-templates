import { prefix, route, type RouteConfig } from '@react-router/dev/routes'

export const imageServiceRoutes = [
  ...prefix('api', [
    route('image', 'features/image-service/routes/image-resize.ts'),
    route('proxy/*', 'features/image-service/routes/image-proxy.ts'),
  ]),
] satisfies RouteConfig
