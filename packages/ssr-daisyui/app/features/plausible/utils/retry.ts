import { plausibleConfig } from '../config.ts'

interface RetryOptions {
	backoffMultiplier?: number
	delay?: number
	maxAttempts?: number
	onRetry?: (attempt: number, error: Error) => void
}

// Helper to determine if an event should be retried
export function shouldRetryEvent(eventName: string): boolean {
	// Critical events that should be retried
	const criticalEvents = ['user.signUp', 'user.signIn', 'user.passwordResetInitiate', 'app.error']

	return criticalEvents.includes(eventName)
}

export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
	const {
		backoffMultiplier = plausibleConfig.retry.backoffMultiplier,
		delay = plausibleConfig.retry.delay,
		maxAttempts = plausibleConfig.retry.maxAttempts,
		onRetry,
	} = options

	let lastError: Error

	for (let attempt = 1; attempt <= maxAttempts; attempt++) {
		try {
			return await fn()
		} catch (error) {
			lastError = error as Error

			if (attempt === maxAttempts) {
				throw lastError
			}

			if (onRetry) {
				onRetry(attempt, lastError)
			}

			// Calculate delay with exponential backoff
			const waitTime = delay * Math.pow(backoffMultiplier, attempt - 1)
			await new Promise((resolve) => setTimeout(resolve, waitTime))
		}
	}

	throw lastError!
}
