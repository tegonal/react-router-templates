import { type LoaderFunctionArgs } from 'react-router'

import { processImageUrl } from '~/features/image-service/services/process-image-url.ts'
import { logger } from '~/lib/logger.ts'

import {
	getCachedImage,
	getCacheKey,
	purgeCache,
	setCachedImage,
} from '../services/image/cache.server.ts'
import { fetchImage } from '../services/image/fetch.server.ts'
import { parseImageParams, transformImage } from '../services/image/transform.server.ts'

// Purge cache once on server startup in development
if (process.env.NODE_ENV === 'development') {
	logger.debug('Purging image cache on server startup (development mode)')
	purgeCache().catch((error) => {
		logger.error('Failed to purge image cache on startup:', error)
	})
}

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	const src = processImageUrl(url.searchParams.get('src') || '')

	// Validate source parameter
	if (!src) {
		return new Response('Missing src parameter', { status: 400 })
	}

	// // Validate image source
	// if (!isValidImageSource(src, ALLOWED_DOMAINS)) {
	// 	return new Response('Invalid image source', { status: 403 })
	// }

	// Parse transformation parameters
	const transformOptions = parseImageParams(url.searchParams)

	// Generate cache key
	const cacheKey = getCacheKey(src, transformOptions)

	try {
		// Check cache first
		let imageBuffer = await getCachedImage(cacheKey)

		if (!imageBuffer) {
			// Get referer from request headers
			const referer = request.headers.get('referer') || undefined

			// Fetch original image with referer
			const originalBuffer = await fetchImage(src, referer)

			// Transform image
			imageBuffer = await transformImage(originalBuffer, transformOptions)

			// Cache the result
			await setCachedImage(cacheKey, imageBuffer)
		}

		// Determine content type
		const format = transformOptions.format || 'jpeg'
		const contentType = format === 'jpg' ? 'image/jpeg' : `image/${format}`

		// Return transformed image
		return new Response(Uint8Array.from(imageBuffer), {
			headers: {
				'Cache-Control': 'public, max-age=31536000, immutable',
				'Content-Type': contentType,
				'X-Cache': imageBuffer ? 'HIT' : 'MISS',
			},
			status: 200,
		})
	} catch (error) {
		console.error('Image processing error:', error)
		return new Response('Failed to process image', { status: 500 })
	}
}
