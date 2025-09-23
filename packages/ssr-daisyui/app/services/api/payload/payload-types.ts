/**
 * Mock Payload CMS Types
 * This is a mock implementation for the image-service feature
 */

export interface Media {
	alt?: string
	createdAt?: string
	filename?: string
	filesize?: number
	height?: number
	id?: number | string
	mimeType?: string
	updatedAt?: string
	url?: string
	width?: number
}

export interface Page {
	content?: any
	createdAt?: string
	id: string
	publishedAt?: string
	slug: string
	title: string
	updatedAt?: string
}

// Export type aliases that might be used
export type PayloadMedia = Media

export type PayloadPage = Page
export type PayloadUser = User
export interface User {
	createdAt?: string
	email: string
	id: string
	name?: string
	role?: string
	updatedAt?: string
}
