import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes'

import { imageServiceRoutes } from './features/image-service/routes'
import { plausibleEventsRoutes } from './features/plausible/routes'

export default [
  layout('./routes/layout.tsx', [
    index('./routes/index.tsx'),
    ...prefix(':lang', [
      index('./routes/lang/index.tsx'),
      route('home', './routes/lang/home.tsx'),
      route('legal', './routes/lang/legal.tsx'),
      route('form', './routes/lang/form.tsx'),
      route('images', './routes/lang/images.tsx'),
      route('privacy', './routes/lang/privacy.tsx'),
    ]),
    route('*', './routes/catch-all-404.tsx'),
  ]),
  ...prefix('api', [
    route('locales/:lang?/:ns?', './routes/api/locales.ts'),
    route('health', './routes/api/healthcheck.ts'),
  ]),
  route('robots.txt', './routes/files/robots.ts'),
  route('sitemap.xml', './routes/files/sitemap.ts'),
  ...imageServiceRoutes,
  ...plausibleEventsRoutes,
] satisfies RouteConfig
