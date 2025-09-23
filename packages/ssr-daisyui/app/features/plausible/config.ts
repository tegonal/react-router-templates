export const plausibleConfig = {
	// API endpoint configuration
	api: {
		endpoint: '/api/event',
		timeout: 5000, // 5 seconds
	},

	// Environment-specific settings
	environments: {
		development: {
			logLevel: 'debug',
			suppressEvents: true,
		},
		production: {
			logLevel: 'warn',
			suppressEvents: false,
		},
	},

	// Rate limiting configuration
	rateLimit: {
		maxRequests: 100, // 100 requests per minute per IP
		windowMs: 60 * 1000, // 1 minute
	},

	// Retry configuration for critical events
	retry: {
		backoffMultiplier: 2,
		delay: 1000, // 1 second
		maxAttempts: 3,
	},

	// Event validation
	validation: {
		/**
		 * Allowed data types for event properties
		 * Business reason: Plausible only supports these primitive types for reliable data processing
		 */
		allowedPropTypes: ['string', 'number', 'boolean'] as const,

		/**
		 * Domain name validation pattern
		 * Business reason: Ensures domain names follow RFC standards (alphanumeric, dots, hyphens)
		 * Prevents injection attacks and ensures compatibility with DNS systems
		 */
		domainPattern: /^[a-zA-Z0-9.-]+$/,

		/**
		 * Maximum length for event names in Plausible analytics
		 * Business reason: Plausible has limits on event name length to ensure efficient storage and processing
		 */
		maxEventNameLength: 100 as const,

		/**
		 * Maximum size for event properties object in bytes
		 * Business reason: Prevents excessive data payloads that could impact performance and storage costs
		 */
		maxPropsSize: 1024 as const, // 1KB

		/**
		 * Common validation messages for consistency
		 */
		messages: {
			DOMAIN_INVALID: 'Invalid domain format',
			EVENT_NAME_TOO_LONG: 'Event name must be less than 100 characters',
			FIELD_REQUIRED: (field: string) => `${field} is required`,
			PROPS_SIZE_EXCEEDED: 'Props size exceeds maximum of 1024 bytes',
			PROPS_TYPE_INVALID: (type: string) =>
				`Invalid prop type: ${type}. Allowed types: string, number, boolean`,
			URL_INVALID: 'Invalid URL format',
		} as const,

		/**
		 * URL validation pattern for basic URL structure
		 * Business reason: Ensures URLs have proper protocol and structure for routing and security
		 */
		urlPattern: /^https?:\/\/.+/,
	},
} as const

export type PlausibleConfig = typeof plausibleConfig

/**
 * Type for Plausible allowed property types
 */
export type PlausiblePropType = (typeof plausibleConfig.validation.allowedPropTypes)[number]
