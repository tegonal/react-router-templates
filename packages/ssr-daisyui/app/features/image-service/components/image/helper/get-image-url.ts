import { isNumber } from 'es-toolkit/compat'

import { type Media } from '~/types/media.ts'

export function getImageUrl(src: Media | null | number | string | undefined): null | string {
  // Handle null/undefined
  if (!src) return null

  // Handle string paths
  if (typeof src === 'string') {
    return src
  }

  // Handle media objects
  if (typeof src === 'object') {
    return src.url || src.filename || null
  }

  // Handle ID numbers (can't resolve without API call)
  if (isNumber(src)) {
    console.warn('Image: Cannot render media ID without full media object')
    return null
  }

  return null
}
