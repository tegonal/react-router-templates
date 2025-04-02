/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import i18next from 'i18next'
import I18nLanguageDetector from 'i18next-browser-languagedetector'
import I18nBackend from 'i18next-http-backend'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { HydratedRouter } from 'react-router/dom'
import { getInitialNamespaces } from 'remix-i18next/client'
import versionFile from './version.json'
import i18n from '~/i18n.ts'

async function hydrate() {
	await i18next
		.use(initReactI18next)
		.use(I18nLanguageDetector)
		.use(I18nBackend)
		.init({
			...i18n,
			ns: getInitialNamespaces(),
			backend: { loadPath: `/locales/${i18n.jsonFileSchema}?${versionFile.version}` },
			detection: {
				// Here only enable htmlTag detection, we'll detect the language only
				// server-side with remix-i18next, by using the `<html lang>` attribute
				// we can communicate to the client the language detected server-side
				order: ['htmlTag'],
				// Because we only use htmlTag, there's no reason to cache the language
				// on the browser, so we disable it
				caches: [],
			},
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

if (window.requestIdleCallback) {
	window.requestIdleCallback(hydrate)
} else {
	// Safari doesn't support requestIdleCallback
	// https://caniuse.com/requestidlecallback
	window.setTimeout(hydrate, 1)
}
