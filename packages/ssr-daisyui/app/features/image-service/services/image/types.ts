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
