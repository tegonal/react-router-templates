import path from 'node:path'

export const CACHE_DIR = path.join(process.cwd(), 'node_modules/.cache/image-service')
export const ALLOWED_DOMAINS = ['yapuso.com', 'localhost']
export const PAYLOAD_ENDPOINTS = ['api/media', 'api/mediaPublic', 'api/placesPhotos']
