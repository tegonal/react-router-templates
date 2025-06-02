import { isServer } from '~/lib/is-server.ts'
import { logger } from '~/lib/logger.ts'
import { type PlausibleEventNames } from '~/lib/plausible/event-names.ts'

type ActionEvent = {
	name: 'action'
	props?: Record<string, string>
}

type PlausibleEventOptions = ActionEvent | UserActionEvent

type UserActionEvent = {
	name: PlausibleEventNames
}

export const plausibleClientEvent = (options: PlausibleEventOptions) => {
	const { name } = options
	if (isServer()) {
		throw new Error('Client-side plausible events are not supported on the server')
	}
	const body = {
		domain: window.location.hostname,
		name: name || 'pageview',
		props: 'props' in options ? options.props : {},
		referrer: document.referrer || '',
		url: window.location.href,
	}

	if (window.location.hostname.startsWith('localhost')) {
		logger.debug(`Plausible event suppressed (${body.name})`)
		return
	}

	void fetch('/api/event', {
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	})
}
