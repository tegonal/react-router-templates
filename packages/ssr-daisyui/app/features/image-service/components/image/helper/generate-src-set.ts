// Generate srcset for responsive images (unpic-style)
import { createOptimizedUrl } from './create-optimized-url.ts'

export function generateSrcSet(
  src: string,
  baseWidth: number,
  fit?: string,
  format?: string,
  height?: number,
  quality?: number,
): string {
  // For container-based responsive images, generate a minimal srcset
  // Only include 1x and 2x variants of the exact target size
  const widths = [baseWidth]

  // Add 2x variant for high-DPI displays, but cap at reasonable maximums
  const highDpiWidth = Math.min(baseWidth * 2, 2560)
  if (highDpiWidth > baseWidth) {
    widths.push(highDpiWidth)
  }

  return widths
    .map((w) => {
      const aspectRatio = height && baseWidth ? height / baseWidth : undefined
      const scaledHeight = aspectRatio ? Math.round(w * aspectRatio) : undefined

      const url = createOptimizedUrl(src, fit, format, scaledHeight, quality, w)
      return `${url} ${w}w`
    })
    .join(', ')
}
