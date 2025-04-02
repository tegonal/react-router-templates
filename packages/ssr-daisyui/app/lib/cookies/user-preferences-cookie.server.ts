import { createCookie } from 'react-router'
import { z } from 'zod'

export const userPreferencesCookie = createCookie('store-selection', {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
	maxAge: 60 * 60 * 24 * 365,
})

const userPreferencesCookieSchema = z.object({
	storeRedirectUrl: z.string(),
	storeId: z.string(),
	storeVersionDate: z.string(),
})

export default userPreferencesCookieSchema
export type UserPreferencesCookie = z.infer<typeof userPreferencesCookieSchema>
