import React, { useEffect, useRef, useState } from 'react'

import { cn } from '~/lib/utils.ts'

import { type ImageProps } from '../../types'
import { createOptimizedUrl } from './helper/create-optimized-url.ts'
import { generateSrcSet } from './helper/generate-src-set.ts'
import { getImageUrl } from './helper/get-image-url.ts'

export function Image({
  alt,
  className,
  disableSrcSet = false,
  fit,
  format = 'webp',
  height,
  priority = false,
  quality = 75,
  sizes,
  src,
  width,
  ...imgProps
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Extract URL from various src types
  const imageUrl = getImageUrl(src)

  // Extract alt text from media object if available and alt prop not provided
  let altText = alt
  if (!alt && typeof src === 'object' && src && 'altText' in src) {
    altText = src.altText || ''
  }

  // Use dimensions from media object if not specified
  const imageWidth =
    width ||
    (typeof src === 'object' && src && 'width' in src && typeof src.width === 'number'
      ? src.width
      : undefined)
  const imageHeight =
    height ||
    (typeof src === 'object' && src && 'height' in src && typeof src.height === 'number'
      ? src.height
      : undefined)

  // Create the main optimized URL
  const optimizedSrc = imageUrl
    ? createOptimizedUrl(imageUrl, fit, format, imageHeight, quality, imageWidth)
    : ''

  // Generate responsive srcset if width is provided
  const srcSet =
    !disableSrcSet && imageWidth && imageUrl
      ? generateSrcSet(imageUrl, imageWidth, fit, format, imageHeight, quality)
      : undefined

  // Check if image is already loaded (e.g., from cache)
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalHeight > 0) {
      setIsLoaded(true)
    }
  }, [optimizedSrc])

  if (!imageUrl) {
    return null
  }

  return (
    <img
      {...imgProps}
      alt={altText}
      className={cn(
        'transition-opacity duration-300 ease-in-out',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      decoding="async"
      height={imageHeight}
      loading={priority ? 'eager' : 'lazy'}
      onLoad={(e) => {
        setIsLoaded(true)
        imgProps.onLoad?.(e)
      }}
      ref={imgRef}
      sizes={sizes}
      src={optimizedSrc}
      srcSet={srcSet}
      width={imageWidth}
    />
  )
}
