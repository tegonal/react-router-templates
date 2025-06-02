import { logger } from '~/lib/logger.ts'

export const getHostname = (url: null | string | undefined) => {
	if (!url) return ''
	try {
		const urlObject = new URL(url)
		return urlObject.hostname
	} catch (error) {
		logger.warn('Failed to parse url', { error, url })
		return ''
	}
}
