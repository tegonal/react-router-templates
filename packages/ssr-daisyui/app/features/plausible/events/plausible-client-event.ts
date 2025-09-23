import { isClient } from '~/lib/is-client.ts'

import { plausibleConfig } from '../config.ts'
import { type PlausibleClientEventOptions } from '../types/types'
import { shouldRetryEvent, withRetry } from '../utils/retry'

export const plausibleClientEvent = async (options: PlausibleClientEventOptions) => {
	const { name } = options
	if (!isClient()) {
		throw new Error('Client-side plausible events are not supported on the server')
	}

	const body = {
		domain: window.location.hostname,
		name: name || 'pageview',
		props: 'props' in options ? options.props : {},
		referrer: document.referrer || '',
		url: window.location.href,
	}

	const sendEvent = async () => {
		const controller = new AbortController()
		const timeoutId = setTimeout(() => controller.abort(), plausibleConfig.api.timeout)

		try {
			const response = await fetch(plausibleConfig.api.endpoint, {
				body: JSON.stringify(body),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
				signal: controller.signal,
			})

			clearTimeout(timeoutId)

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`)
			}

			return response
		} catch (error) {
			clearTimeout(timeoutId)
			throw error
		}
	}

	try {
		// Use retry for critical events
		if (shouldRetryEvent(name)) {
			return await withRetry(sendEvent, {
				onRetry: (attempt, error) => {
					console.warn(`Retrying Plausible event (${name}) - attempt ${attempt}:`, error.message)
				},
			})
		} else {
			// Single attempt for non-critical events
			return await sendEvent()
		}
	} catch (error) {
		// Silently fail - analytics errors shouldn't affect user experience
		console.warn('Failed to send Plausible event:', error)
		return null
	}
}
