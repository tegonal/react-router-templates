import { logger } from '~/lib/logger.ts'

export const getPathname = (url: null | string | undefined) => {
	if (!url) return ''
	try {
		const urlObject = new URL(url)
		return urlObject.pathname
	} catch (error) {
		logger.warn('Failed to parse url', { error, url })
		return ''
	}
}
