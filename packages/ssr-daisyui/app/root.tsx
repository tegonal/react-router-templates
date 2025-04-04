import React, { type PropsWithChildren, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
	data,
	Links,
	type LinksFunction,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
} from 'react-router'
import { type Route } from './+types/root.ts'
import { plausibleClientEvent } from './lib/plausible/plausible-client-event.ts'
import versionFile from './version.json'
import { DevModeOverlay } from '~/components/devmode-overlay'
import { ClientHintCheck, getHints } from '~/lib/client-hints.tsx'
import { i18nCookie } from '~/lib/cookies/i18next-cookie.server.ts'
import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { isClient } from '~/lib/is-client.ts'
import { logger } from '~/lib/logger.ts'
import { GenericAppEvents } from '~/lib/plausible/event-names.ts'
import { getHostname } from '~/lib/plausible/get-hostname.ts'
import './styles/fonts.css'
import './styles/tailwind.css'
import { getLocale, i18nextMiddleware } from '~/middleware/i18next.ts'
import { performanceMiddleware } from '~/middleware/performance.ts'

export const links: LinksFunction = () => [
	{ rel: 'icon', href: '/favicon.png', type: 'image/png' },
	{ rel: 'icon', href: '/favicon.ico', type: 'image/png' },
]

// HTTP headers can be set in the loader function or in the root route
// export const headers: HeadersFunction = () => {
// 	return {
// 		'Cache-Control': 'public, max-age=0, s-maxage=0',
// 	}
// }

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	const locale = getLocale(context)

	return data(
		{
			locale,
			domain: getHostname(process.env.ORIGIN),
			version: versionFile.version,
			isDev: process.env.NODE_ENV !== 'production',
			ENV: {
				INSTANCE_NAME: process.env.INSTANCE_NAME,
				NODE_ENV: process.env.NODE_ENV,
				VERSION: versionFile.version,
			},
			requestInfo: {
				nonce: crypto.randomUUID(),
				hints: getHints(request),
			},
		},
		{ headers: { 'Set-Cookie': await i18nCookie.serialize(locale) } },
	)
}

export type RootRouteLoaderData = typeof loader

export const unstable_middleware = [i18nextMiddleware, performanceMiddleware]

export const handle = {
	i18n: ['common'],
}

export function Layout({ children }: PropsWithChildren) {
	const { i18n } = useTranslation()
	const location = useLocation()
	const {
		version,
		ENV,
		requestInfo: {
			nonce,
			hints: { theme },
		},
	} = useLoaderData<typeof loader>()

	useEffect(() => {
		plausibleClientEvent({ name: GenericAppEvents.PageView })
	}, [location.pathname])

	if (isClient() && window.ENV.VERSION !== version) {
		logger.error('🔄 Should reload page or clear cache due to version mismatch')
	}

	return (
		<html lang={i18n.language} dir={i18n.dir(i18n.language)} data-theme={theme}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="h-svh">
				{children}
				<ScrollRestoration />
				<Scripts />
				<DevModeOverlay />
				<ClientHintCheck nonce={nonce} />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(ENV)}`,
					}}
				/>
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}

export function ErrorBoundary(args: Route.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
