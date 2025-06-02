import { createCookie } from 'react-router'

export const i18nCookie = createCookie('i18next', {
	httpOnly: true,
	sameSite: 'lax',
	secure: process.env.NODE_ENV === 'production',
})
