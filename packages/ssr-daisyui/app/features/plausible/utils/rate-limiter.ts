interface RateLimiterOptions {
	maxRequests: number // Maximum requests per window
	windowMs: number // Time window in milliseconds
}

interface RequestRecord {
	count: number
	resetTime: number
}

export class RateLimiter {
	private cleanupInterval: NodeJS.Timeout | null = null
	private requests: Map<string, RequestRecord> = new Map()

	constructor(private options: RateLimiterOptions) {
		// Clean up expired entries every minute
		this.cleanupInterval = setInterval(() => this.cleanup(), 60000)
	}

	destroy(): void {
		if (this.cleanupInterval) {
			clearInterval(this.cleanupInterval)
			this.cleanupInterval = null
		}
		this.requests.clear()
	}

	getRemainingRequests(identifier: string): number {
		const record = this.requests.get(identifier)
		if (!record || Date.now() > record.resetTime) {
			return this.options.maxRequests
		}
		return Math.max(0, this.options.maxRequests - record.count)
	}

	getResetTime(identifier: string): number {
		const record = this.requests.get(identifier)
		return record?.resetTime || Date.now()
	}

	isAllowed(identifier: string): boolean {
		const now = Date.now()
		const record = this.requests.get(identifier)

		if (!record || now > record.resetTime) {
			// New window or expired window
			this.requests.set(identifier, {
				count: 1,
				resetTime: now + this.options.windowMs,
			})
			return true
		}

		if (record.count >= this.options.maxRequests) {
			return false
		}

		// Increment count
		record.count++
		return true
	}

	private cleanup(): void {
		const now = Date.now()
		for (const [key, record] of this.requests.entries()) {
			if (now > record.resetTime) {
				this.requests.delete(key)
			}
		}
	}
}

// Create a singleton instance for the API route
export const plausibleRateLimiter = new RateLimiter({
	maxRequests: 100, // 100 requests per minute per IP
	windowMs: 60 * 1000, // 1 minute
})
