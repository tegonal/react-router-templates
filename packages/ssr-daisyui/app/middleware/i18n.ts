import { unstable_createI18nextMiddleware } from 'remix-i18next/middleware'
import i18n from '../i18next.server'

export const [i18nextMiddleware, getFixedT, getLocale] = unstable_createI18nextMiddleware(i18n)
