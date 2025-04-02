export const isServer = (): boolean =>
	typeof window === 'undefined' && typeof process !== 'undefined'
