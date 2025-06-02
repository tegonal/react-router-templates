import i18next from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import Fetch from 'i18next-fetch-backend'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { HydratedRouter } from 'react-router/dom'
import { getInitialNamespaces } from 'remix-i18next/client'

import { i18nConfig } from '~/i18n-config.ts'

async function main() {
	await i18next
		.use(initReactI18next)
		.use(Fetch)
		.use(I18nextBrowserLanguageDetector)
		.init({
			backend: { loadPath: '/api/locales/{{lng}}/{{ns}}' },
			detection: { caches: [], order: ['htmlTag'] },
			fallbackLng: i18nConfig.fallbackLng,
			ns: getInitialNamespaces(),
		})

	startTransition(() => {
		hydrateRoot(
			document,
			<I18nextProvider i18n={i18next}>
				<StrictMode>
					<HydratedRouter />
				</StrictMode>
			</I18nextProvider>,
		)
	})
}

main().catch((error) => console.error(error))
