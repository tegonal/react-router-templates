import { getClientIPAddress } from 'remix-utils/get-client-ip-address'
import { isClient } from '~/lib/is-client.ts'
import { isServer } from '~/lib/is-server.ts'
import { logger } from '~/lib/logger.ts'
import { type PlausibleEventNames } from '~/lib/plausible/event-names.ts'
import { getHostname } from '~/lib/plausible/get-hostname.ts'
import { getPathname } from '~/lib/plausible/get-pathname.ts'

type UserActionEvent = {
	name: PlausibleEventNames
	props?: Record<string, string | number>
	request: Request
}

type ActionEvent = {
	name: 'action'
	props?: Record<string, string>
	request: Request
}

type PlausibleEventOptions = UserActionEvent | ActionEvent

export const plausibleServerEvent = async (options: PlausibleEventOptions) => {
	const { name, request } = options

	const clientIp = getClientIPAddress(request) || ''
	const userAgent = request.headers.get('user-agent') || ''

	if (isClient()) {
		throw new Error('Server-side plausible events are not supported on the client')
	}

	if (isServer() && !request) {
		throw new Error('Request object is required for server-side plausible events')
	}

	const body = {
		name: name || 'pageview',
		url: getPathname(request.url),
		domain: getHostname(request.url),
		referrer: getPathname(request.headers.get('referrer')),
		props: 'props' in options ? options.props : {},
	}

	logger.debug(`Plausible event (${name})`, { body })

	if (process?.env?.ORIGIN?.includes('localhost')) {
		logger.debug(`Plausible event suppressed (${body.name})`)
		return
	}

	return fetch(`${process.env.ORIGIN}/api/event`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'User-Agent': userAgent,
			'X-Forwarded-For': clientIp,
		},
		body: JSON.stringify(body),
	})
}
