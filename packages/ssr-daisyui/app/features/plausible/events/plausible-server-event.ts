import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

import { isClient } from '~/lib/is-client.ts'
import { isServer } from '~/lib/is-server.ts'
import { logger } from '~/lib/logger.ts'

import { type PlausibleServerEventOptions } from '../types/types.ts'
import { getHostname } from '../utils/get-hostname.ts'
import { getPathname } from '../utils/get-pathname.ts'

export const plausibleServerEvent = async (options: PlausibleServerEventOptions) => {
	const { name, request } = options

	if (isClient()) {
		throw new Error('Server-side plausible events are not supported on the client')
	}

	if (isServer() && !request) {
		throw new Error('Request object is required for server-side plausible events')
	}

	const clientIp = getClientIPAddress(request) || ''
	const userAgent = request.headers.get('user-agent') || ''

	const body = {
		domain: getHostname(request.url),
		name: name || 'pageview',
		props: 'props' in options ? options.props : {},
		referrer: getPathname(request.headers.get('referrer')),
		url: getPathname(request.url),
	}

	logger.debug(`Plausible event (${name})`, { body })

	if (!process.env.ORIGIN) {
		logger.warn('ORIGIN environment variable not set, skipping Plausible event')
		return null
	}

	try {
		const response = await fetch(`${process.env.ORIGIN}/api/event`, {
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'User-Agent': userAgent,
				'X-Forwarded-For': clientIp,
			},
			method: 'POST',
		})

		if (!response.ok) {
			logger.warn(`Plausible server event failed: ${response.status} ${response.statusText}`)
		}

		return response
	} catch (error) {
		logger.error('Failed to send Plausible server event', { error, name })
		return null
	}
}
