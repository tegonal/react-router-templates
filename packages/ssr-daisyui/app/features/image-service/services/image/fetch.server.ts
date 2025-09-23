import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'

import {
	apiServerServiceClient,
	setServiceClientToken,
} from '~/services/api/payload/api-server-service.server.ts'

export async function fetchImage(src: string, referer?: string): Promise<Buffer> {
	// Check if it's a local file path first (doesn't need API_URL)
	if (src.startsWith('/') && !src.startsWith('http') && !src.startsWith('/api/proxy/')) {
		try {
			// Assume it's a public asset
			const publicPath = path.join(process.cwd(), 'public', src)
			return await fs.readFile(publicPath)
		} catch {
			throw new Error(`Failed to read local image: ${src}`)
		}
	}

	// Check if it's a proxied Payload URL
	if (src.startsWith('/api/proxy/')) {
		if (!process.env.API_URL) {
			throw new Error('API_URL not set for proxy requests')
		}
		if (!process.env.PAYLOAD_SERVICE_USER_API_KEY) {
			throw new Error('PAYLOAD_SERVICE_USER_API_KEY is not set')
		}
		const token = process.env.PAYLOAD_SERVICE_USER_API_KEY

		// Remove the /api/proxy prefix and fetch directly from Payload CMS
		const source = src.replace('/api/proxy/', '')

		try {
			const client = apiServerServiceClient
			setServiceClientToken(token)
			const response = await client.get(source, {
				maxContentLength: 50 * 1024 * 1024, // 50MB max
				responseType: 'arraybuffer',
				timeout: 10000,
			})
			return Buffer.from(response.data)
		} catch {
			throw new Error(`Failed to fetch proxied resource: ${source}`)
		}
	}

	// Fetch from URL
	try {
		// Build headers to mimic browser behavior
		const headers: Record<string, string> = {
			Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'en-US,en;q=0.9',
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
		}

		// Add referer if provided or use the source domain as referer
		if (referer) {
			headers['Referer'] = referer
		} else {
			try {
				const url = new URL(src)
				headers['Referer'] = `${url.protocol}//${url.host}/`
			} catch {
				// If URL parsing fails, skip referer
			}
		}

		const response = await axios.get(src, {
			headers,
			maxContentLength: 50 * 1024 * 1024, // 50MB max
			responseType: 'arraybuffer',
			timeout: 30000, // Increased timeout for external images
			validateStatus: (status) => status < 500, // Accept any status < 500
		})

		if (response.status >= 400) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`)
		}

		return Buffer.from(response.data)
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const message = error.response?.status
				? `Failed to fetch image (HTTP ${error.response.status}): ${src}`
				: `Failed to fetch image (${error.code || 'UNKNOWN'}): ${src}`
			throw new Error(message)
		}
		throw new Error(`Failed to fetch image from URL: ${src}`)
	}
}

export function isValidImageSource(src: string, allowedDomains?: string[]): boolean {
	// Allow local paths
	if (src.startsWith('/') && !src.startsWith('http')) {
		return true
	}

	// Validate URL
	try {
		const url = new URL(src)

		// If no allowed domains specified, allow all
		if (!allowedDomains || allowedDomains.length === 0) {
			return true
		}

		// Check if hostname is in allowed domains
		return allowedDomains.some((domain) => {
			return url.hostname === domain || url.hostname.endsWith(`.${domain}`)
		})
	} catch {
		return false
	}
}
