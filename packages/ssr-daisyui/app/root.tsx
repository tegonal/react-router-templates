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
import { useChangeLanguage } from 'remix-i18next/react'

import { DevModeOverlay } from '~/components/devmode-overlay'
import { ClientHintCheck, getHints } from '~/lib/client-hints.tsx'
import { i18nCookie } from '~/lib/cookies/i18next-cookie.server.ts'
import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { isClient } from '~/lib/is-client.ts'
import { logger } from '~/lib/logger.ts'
import { GenericAppEvents } from '~/lib/plausible/event-names.ts'
import { getHostname } from '~/lib/plausible/get-hostname.ts'
import { getLocale, i18nextMiddleware } from '~/middleware/i18next.ts'
import { performanceMiddleware } from '~/middleware/performance.ts'

import { type Route } from './+types/root.ts'
import './styles/fonts.css'
import './styles/tailwind.css'
import { plausibleClientEvent } from './lib/plausible/plausible-client-event.ts'
import versionFile from './version.json'

export const links: LinksFunction = () => [
	{ href: '/favicon.png', rel: 'icon', type: 'image/png' },
	{ href: '/favicon.ico', rel: 'icon', type: 'image/png' },
]

// HTTP headers can be set in the loader function or in the root route
// export const headers: HeadersFunction = () => {
// 	return {
// 		'Cache-Control': 'public, max-age=0, s-maxage=0',
// 	}
// }

export const loader = async ({ context, request }: Route.LoaderArgs) => {
	const locale = getLocale(context)

	logger.debug(`User language is ${locale}`)

	return data(
		{
			domain: getHostname(process.env.ORIGIN),
			ENV: {
				INSTANCE_NAME: process.env.INSTANCE_NAME,
				NODE_ENV: process.env.NODE_ENV,
				VERSION: versionFile.version,
			},
			isDev: process.env.NODE_ENV !== 'production',
			locale,
			requestInfo: {
				hints: getHints(request),
				nonce: crypto.randomUUID(),
			},
			version: versionFile.version,
		},
		{ headers: { 'Set-Cookie': await i18nCookie.serialize(locale) } },
	)
}

export type RootRouteLoaderData = typeof loader

export const unstable_middleware = [i18nextMiddleware, performanceMiddleware]

export const handle = {
	i18n: ['common'],
}

export default function App({ loaderData }: Route.ComponentProps) {
	useChangeLanguage(loaderData.locale)
	return <Outlet />
}

export function ErrorBoundary(args: Route.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
export function Layout({ children }: PropsWithChildren) {
	const { i18n } = useTranslation()
	const location = useLocation()
	const {
		ENV,
		requestInfo: {
			hints: { theme },
			nonce,
		},
		version,
	} = useLoaderData<typeof loader>()

	useEffect(() => {
		plausibleClientEvent({ name: GenericAppEvents.PageView })
	}, [location.pathname])

	if (isClient() && window.ENV.VERSION !== version) {
		logger.error('🔄 Should reload page or clear cache due to version mismatch')
	}

	return (
		<html data-theme={theme} dir={i18n.dir(i18n.language)} lang={i18n.language}>
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
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
