import { index, layout, prefix, route, type RouteConfig } from '@react-router/dev/routes'

export default [
	layout('./routes/layout.tsx', [
		index('./routes/index.tsx'),
		...prefix(':lang?', [
			index('./routes/lang/index.tsx'),
			route('home', './routes/lang/home.tsx'),
			route('legal', './routes/lang/legal.tsx'),
			route('form', './routes/lang/form.tsx'),
			route('privacy', './routes/lang/privacy.tsx'),
		]),
		route('*', './routes/catch-all-404.tsx'),
	]),
	...prefix('api', [
		route('health', './routes/api/healthcheck.ts'),
		route('event', './routes/api/event.ts'),
	]),
	route('robots.txt', './routes/files/robots.ts'),
	route('sitemap.xml', './routes/files/sitemap.ts'),
] satisfies RouteConfig
