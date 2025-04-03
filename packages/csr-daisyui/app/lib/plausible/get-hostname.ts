import { logger } from '~/lib/logger.ts'

export const getHostname = (url: string | null | undefined) => {
	if (!url) return ''
	try {
		const urlObject = new URL(url)
		return urlObject.hostname
	} catch (error) {
		logger.warn('Failed to parse url', { url, error })
		return ''
	}
}
