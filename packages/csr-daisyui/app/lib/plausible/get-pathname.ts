import { logger } from '~/lib/logger.ts'

export const getPathname = (url: string | null | undefined) => {
	if (!url) return ''
	try {
		const urlObject = new URL(url)
		return urlObject.pathname
	} catch (error) {
		logger.warn('Failed to parse url', { url, error })
		return ''
	}
}
