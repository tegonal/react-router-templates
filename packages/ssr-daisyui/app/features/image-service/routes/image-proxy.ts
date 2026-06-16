import axios from 'axios'
import { type LoaderFunctionArgs } from 'react-router'

import { PAYLOAD_ENDPOINTS } from '~/features/image-service/config.server.ts'

import { getCachedImage, getCacheKey, setCachedImage } from '../services/image/cache.server'

export async function loader({ params, request }: LoaderFunctionArgs) {
  const proxyPath = params['*']

  if (!proxyPath) {
    return new Response('Not Found', { status: 404 })
  }

  // Check if the path starts with a supported endpoint
  const isSupportedEndpoint = PAYLOAD_ENDPOINTS.some((endpoint) => proxyPath.startsWith(endpoint))

  if (!isSupportedEndpoint) {
    return new Response('Endpoint not supported', { status: 403 })
  }

  // Check if API_URL is configured
  const apiUrl = process.env.API_URL
  if (!apiUrl) {
    throw new Error('API_URL environment variable is not set')
  }

  const cacheKey = getCacheKey(proxyPath, {})

  // Check file cache first
  const cachedBuffer = await getCachedImage(cacheKey)
  if (cachedBuffer) {
    return new Response(Uint8Array.from(cachedBuffer), {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Type': 'application/octet-stream',
        'X-Cache': 'HIT',
      },
    })
  }

  try {
    // Proxy the request to Payload CMS
    const response = await axios.get(`${apiUrl}/${proxyPath}`, {
      headers: {
        'User-Agent': request.headers.get('User-Agent') || 'Yapuso-Proxy/1.0',
      },
      maxRedirects: 5,
      responseType: 'arraybuffer',
      timeout: 30_000,
    })

    const buffer = Buffer.from(response.data)

    // Extract relevant headers
    const headers: Record<string, string> = {
      'Content-Type':
        (response.headers['content-type'] as string | undefined) || 'application/octet-stream',
    }

    // Cache the response
    await setCachedImage(cacheKey, buffer)

    return new Response(Uint8Array.from(buffer), {
      headers: {
        ...headers,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Cache': 'MISS',
      },
    })
  } catch (error) {
    console.error('Proxy error:', error)

    if (axios.isAxiosError(error)) {
      return new Response('Resource not found', {
        status: error.response?.status || 404,
      })
    }

    return new Response('Internal Server Error', { status: 500 })
  }
}
