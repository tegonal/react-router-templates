import { cacheHeader } from 'pretty-cache-header'
import { data } from 'react-router'

import { i18nConfig } from '~/i18n-config.ts'
import { logger } from '~/lib/logger.ts'

import { type Route } from '../../../.react-router/types/app/routes/api/+types/locales.ts'

const resources = i18nConfig.resources

export async function loader({ params }: Route.LoaderArgs) {
	const lng = params.lang
	const ns = params.ns

	// Validate language
	if (!lng || !(lng in resources)) {
		logger.error(`Invalid language: ${lng}`)
		return data({ error: 'Invalid language' }, { status: 400 })
	}

	const namespaces = resources[lng as keyof typeof resources]

	// Validate namespace
	if (!ns || !(ns in namespaces)) {
		logger.error(`Invalid namespace: ${ns}`)
		return data({ error: 'Invalid namespace' }, { status: 400 })
	}

	const headers = new Headers()

	// On production, we want to add cache headers to the response
	if (process.env.NODE_ENV === 'production') {
		headers.set(
			'Cache-Control',
			cacheHeader({
				maxAge: '5m', // Cache in the browser for 5 minutes
				sMaxage: '1d', // Cache in the CDN for 1 day
				// Serve stale content if there's an error for 7 days
				staleIfError: '7d',
				// Serve stale content while revalidating for 7 days
				staleWhileRevalidate: '7d',
			}),
		)
	}

	return data(namespaces[ns as keyof typeof namespaces], { headers })
}
