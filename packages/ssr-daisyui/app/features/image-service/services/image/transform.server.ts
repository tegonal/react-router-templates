import sharp, { type FitEnum, type ResizeOptions } from 'sharp'

import { type ImageTransformOptions } from './types'

export function parseImageParams(searchParams: URLSearchParams): ImageTransformOptions {
  const options: ImageTransformOptions = {}

  // Width
  const width = searchParams.get('w') || searchParams.get('width')
  if (width) {
    options.width = Number.parseInt(width, 10)
  }

  // Height
  const height = searchParams.get('h') || searchParams.get('height')
  if (height) {
    options.height = Number.parseInt(height, 10)
  }

  // Format
  const format = searchParams.get('f') || searchParams.get('format')
  if (format && ['avif', 'heif', 'jpeg', 'jpg', 'png', 'webp'].includes(format)) {
    options.format = format as ImageTransformOptions['format']
  }

  // Quality
  const quality = searchParams.get('q') || searchParams.get('quality')
  if (quality) {
    options.quality = Math.min(100, Math.max(1, Number.parseInt(quality, 10)))
  }

  // Fit mode
  const fit = searchParams.get('fit')
  if (fit && ['contain', 'cover', 'fill', 'inside', 'outside'].includes(fit)) {
    options.fit = fit as ImageTransformOptions['fit']
  }

  return options
}

export async function transformImage(
  inputBuffer: Buffer,
  options: ImageTransformOptions,
): Promise<Buffer> {
  let pipeline = sharp(inputBuffer)

  // Resize with fit mode
  if (options.width || options.height) {
    const resizeOptions: ResizeOptions = {
      height: options.height,
      width: options.width,
    }

    // Map Astro fit modes to Sharp fit modes
    if (options.fit) {
      const fitMap: Record<string, keyof FitEnum> = {
        contain: 'inside',
        cover: 'cover',
        fill: 'fill',
        inside: 'inside',
        outside: 'outside',
      }
      resizeOptions.fit = fitMap[options.fit] || 'cover'
    }

    pipeline = pipeline.resize(resizeOptions)
  }

  // Format conversion
  if (options.format) {
    const format = options.format === 'jpg' ? 'jpeg' : options.format

    switch (format) {
      case 'avif': {
        pipeline = pipeline.avif({ quality: options.quality || 85 })
        break
      }
      case 'heif': {
        pipeline = pipeline.heif({ quality: options.quality || 85 })
        break
      }
      case 'jpeg': {
        pipeline = pipeline.jpeg({ quality: options.quality || 85 })
        break
      }
      case 'png': {
        pipeline = pipeline.png({ quality: options.quality || 90 })
        break
      }
      case 'webp': {
        pipeline = pipeline.webp({ quality: options.quality || 85 })
        break
      }
    }
  } else if (options.quality) {
    // Apply quality without format change
    pipeline = pipeline.jpeg({ quality: options.quality })
  }

  return pipeline.toBuffer()
}
