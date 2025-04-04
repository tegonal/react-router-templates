import { createCookie } from 'react-router'

export const i18nCookie = createCookie('i18next', {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
})
