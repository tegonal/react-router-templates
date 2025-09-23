import { type ImgHTMLAttributes } from 'react'

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'> {
	alt: string
	className?: string
	disableSrcSet?: boolean
	fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside'
	format?: 'avif' | 'jpeg' | 'jpg' | 'png' | 'webp'
	height?: number
	priority?: boolean
	quality?: number
	sizes?: string
	src: any // Keep flexible for different CMS types
	width?: number
}

export interface ImageRequest {
	params: ImageTransformOptions
	src: string
}

export interface ImageServiceConfig {
	allowedDomains?: string[]
	cacheDir?: string
	maxAge?: number
}

export interface ImageTransformOptions {
	fit?: 'contain' | 'cover' | 'fill' | 'inside' | 'outside'
	format?: 'avif' | 'heif' | 'jpeg' | 'jpg' | 'png' | 'webp'
	height?: number
	quality?: number
	width?: number
}

export interface ResponsiveImageProps extends Omit<ImageProps, 'sizes'> {
	aspectRatio?: '1/2' | '2/1' | '2/3' | '3/2' | '3/4' | '4/3' | '9/16' | '16/9' | 'square' | 'video'
}
