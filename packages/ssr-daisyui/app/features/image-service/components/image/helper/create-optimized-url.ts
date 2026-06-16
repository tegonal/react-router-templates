// Create optimized image URL for our API (Astro-compatible)

export function createOptimizedUrl(
  src: string,
  fit?: string,
  format?: string,
  height?: number,
  quality?: number,
  width?: number,
): string {
  const searchParams = new URLSearchParams()

  // Process the source URL (proxy if needed)
  const processedSrc = src
  searchParams.set('src', processedSrc)

  // Add transformation parameters using Astro-compatible parameter names
  if (width) {
    searchParams.set('w', width.toString())
  }
  if (height) {
    searchParams.set('h', height.toString())
  }
  if (format) {
    searchParams.set('f', format)
  }
  if (quality) {
    searchParams.set('q', quality.toString())
  }
  if (fit) {
    searchParams.set('fit', fit)
  }

  return `/api/image?${searchParams.toString()}`
}
