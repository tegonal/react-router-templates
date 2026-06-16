import { PAYLOAD_ENDPOINTS } from '~/features/image-service/config.server.ts'

export function isPayloadEndpoint(path: string): boolean {
  return PAYLOAD_ENDPOINTS.some(
    (endpoint) => path.startsWith(`/${endpoint}/`) || path.startsWith(endpoint),
  )
}

export function processImageUrl(imageUrl: string): string {
  // If it's a Payload API endpoint, proxy it
  if (isPayloadEndpoint(imageUrl)) {
    // Remove leading slash if present
    const cleanPath = imageUrl.replace(/^\//, '')
    return `/api/proxy/${cleanPath}`
  }

  // Return as-is for regular paths
  return imageUrl
}
