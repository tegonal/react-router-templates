import React, { useEffect, useRef, useState } from 'react'

import { cn } from '~/lib/utils.ts'

import { type ResponsiveImageProps } from '../../types'
import { Image } from './image.tsx'

export function ResponsiveImage({
  alt,
  aspectRatio = 'video',
  className,
  format,
  quality,
  src,
  ...props
}: ResponsiveImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ height: 0, width: 0 })
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  // Cap pixel density to 2x to avoid unnecessarily large images
  const pixelDensity = typeof window === 'undefined' ? 1 : Math.min(window.devicePixelRatio || 1, 2)

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const newSize = {
          height: Math.ceil(rect.height),
          width: Math.ceil(rect.width),
        }

        // Only update if size actually changed significantly (more than 50px difference)
        setContainerSize((prevSize) => {
          if (
            newSize.width > 0 &&
            newSize.height > 0 &&
            (Math.abs(prevSize.width - newSize.width) > 50 ||
              Math.abs(prevSize.height - newSize.height) > 50 ||
              prevSize.width === 0)
          ) {
            return newSize
          }
          return prevSize
        })
      }
    }

    // Debounced update for resize events
    const debouncedUpdateSize = () => {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = setTimeout(updateSize, 300)
    }

    // Initial size calculation after a short delay to ensure layout is complete
    const initialTimer = setTimeout(() => {
      updateSize()
    }, 100)

    // Update on resize with debouncing
    const resizeObserver = new ResizeObserver(debouncedUpdateSize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      clearTimeout(initialTimer)
      clearTimeout(debounceTimerRef.current)
      resizeObserver.disconnect()
    }
  }, [])

  // Calculate optimal dimensions based on container size and pixel density
  // Don't render the image until we have actual container dimensions to avoid double loading
  const hasContainerSize = containerSize.width > 0 && containerSize.height > 0

  const baseWidth = hasContainerSize ? Math.ceil(containerSize.width * pixelDensity) : 0

  const baseHeight = hasContainerSize ? Math.ceil(containerSize.height * pixelDensity) : 0

  // Map aspect ratio to static Tailwind classes for proper purging
  const aspectRatioClass = aspectRatio
    ? {
        '1/2': 'aspect-[1/2]',
        '2/1': 'aspect-[2/1]',
        '2/3': 'aspect-[2/3]',
        '3/2': 'aspect-[3/2]',
        '3/4': 'aspect-[3/4]',
        '4/3': 'aspect-[4/3]',
        '9/16': 'aspect-[9/16]',
        '16/9': 'aspect-[16/9]',
        square: 'aspect-square',
        video: 'aspect-video',
      }[aspectRatio]
    : ''

  return (
    <div
      className={cn(
        'bg-secondary/20 relative size-full overflow-hidden',
        aspectRatioClass,
        className,
      )}
      ref={containerRef}>
      {hasContainerSize && (
        <Image
          alt={alt}
          className="size-full object-cover"
          disableSrcSet={true}
          format={format}
          height={baseHeight}
          quality={quality}
          src={src}
          width={baseWidth}
          {...props}
        />
      )}
    </div>
  )
}
