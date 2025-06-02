import { createCookie } from 'react-router'
import { z } from 'zod'

export const userPreferencesCookie = createCookie('store-selection', {
	httpOnly: true,
	maxAge: 60 * 60 * 24 * 365,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production',
})

const userPreferencesCookieSchema = z.object({
	storeId: z.string(),
	storeRedirectUrl: z.string(),
	storeVersionDate: z.string(),
})

export default userPreferencesCookieSchema
export type UserPreferencesCookie = z.infer<typeof userPreferencesCookieSchema>
