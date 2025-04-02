import { logger } from '~/lib/logger.ts'
import { isServer } from '~/lib/is-server.ts'
import { PlausibleEventNames } from '~/lib/plausible/event-names.ts'

type UserActionEvent = {
	name: PlausibleEventNames
}

type ActionEvent = {
	name: 'action'
	props?: Record<string, string>
}

type PlausibleEventOptions = UserActionEvent | ActionEvent

export const plausibleClientEvent = (options: PlausibleEventOptions) => {
	const { name } = options
	if (isServer()) {
		throw new Error('Client-side plausible events are not supported on the server')
	}
	const body = {
		name: name || 'pageview',
		url: window.location.href,
		domain: window.location.hostname,
		referrer: document.referrer || '',
		props: 'props' in options ? options.props : {},
	}

	if (window.location.hostname.startsWith('localhost')) {
		logger.debug(`Plausible event suppressed (${body.name})`)
		return
	}

	fetch('/api/event', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
}
