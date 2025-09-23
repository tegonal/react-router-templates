import { plausibleConfig, type PlausiblePropType } from '../config'

export interface ValidationError {
	field: string
	message: string
}

export function sanitizeEventData(data: unknown): unknown {
	if (!data || typeof data !== 'object') {
		return data
	}

	const sanitized = { ...(data as Record<string, unknown>) }

	// Trim string fields
	if (sanitized.name && typeof sanitized.name === 'string') {
		sanitized.name = sanitized.name.trim()
	}
	if (sanitized.domain && typeof sanitized.domain === 'string') {
		sanitized.domain = sanitized.domain.trim()
	}
	if (sanitized.url && typeof sanitized.url === 'string') {
		sanitized.url = sanitized.url.trim()
	}
	if (sanitized.referrer && typeof sanitized.referrer === 'string') {
		sanitized.referrer = sanitized.referrer.trim()
	}

	// Ensure props is an object
	if ('props' in sanitized && !sanitized.props) {
		sanitized.props = {}
	}

	// Sanitize prop values
	if (sanitized.props && typeof sanitized.props === 'object') {
		const sanitizedProps: Record<string, unknown> = {}
		for (const [key, value] of Object.entries(sanitized.props)) {
			// Only keep allowed types
			const valueType = typeof value
			if (plausibleConfig.validation.allowedPropTypes.includes(valueType as PlausiblePropType)) {
				// Trim string values
				sanitizedProps[key] = typeof value === 'string' ? String(value).trim() : value
			}
		}
		sanitized.props = sanitizedProps
	}

	return sanitized
}

export function validateEventData(data: unknown): ValidationError[] {
	const errors: ValidationError[] = []

	// Check required fields
	const requiredFields = ['domain', 'name', 'url']
	for (const field of requiredFields) {
		if (!data || typeof data !== 'object' || !(field in data)) {
			errors.push({
				field,
				message: plausibleConfig.validation.messages.FIELD_REQUIRED(field),
			})
		}
	}

	// Validate event name length
	const typedData = data as Record<string, unknown>
	if (
		typedData.name &&
		typeof typedData.name === 'string' &&
		typedData.name.length > plausibleConfig.validation.maxEventNameLength
	) {
		errors.push({
			field: 'name',
			message: plausibleConfig.validation.messages.EVENT_NAME_TOO_LONG,
		})
	}

	// Validate URL format
	if (typedData.url && typeof typedData.url === 'string') {
		try {
			new URL(typedData.url)
		} catch {
			errors.push({
				field: 'url',
				message: plausibleConfig.validation.messages.URL_INVALID,
			})
		}
	}

	// Validate domain format
	if (
		typedData.domain &&
		typeof typedData.domain === 'string' &&
		!plausibleConfig.validation.domainPattern.test(typedData.domain)
	) {
		errors.push({
			field: 'domain',
			message: plausibleConfig.validation.messages.DOMAIN_INVALID,
		})
	}

	// Validate props
	if (typedData && 'props' in typedData) {
		if (
			typeof typedData.props !== 'object' ||
			Array.isArray(typedData.props) ||
			typedData.props === null
		) {
			errors.push({
				field: 'props',
				message: 'Props must be an object',
			})
		} else {
			// Check props size
			const propsSize = JSON.stringify(typedData.props).length
			if (propsSize > plausibleConfig.validation.maxPropsSize) {
				errors.push({
					field: 'props',
					message: plausibleConfig.validation.messages.PROPS_SIZE_EXCEEDED,
				})
			}

			// Validate prop values
			for (const [key, value] of Object.entries(typedData.props as Record<string, unknown>)) {
				const valueType = typeof value
				if (!plausibleConfig.validation.allowedPropTypes.includes(valueType as PlausiblePropType)) {
					errors.push({
						field: `props.${key}`,
						message: plausibleConfig.validation.messages.PROPS_TYPE_INVALID(valueType),
					})
				}
			}
		}
	}

	return errors
}
