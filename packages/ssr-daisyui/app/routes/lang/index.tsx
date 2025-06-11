import { href, type LoaderFunctionArgs, redirect } from 'react-router'

import { getInstance } from '~/middleware/i18next.ts'
/*
 * This route is the index route for the application to redirect to the home page while setting the locale.
 */
export const loader = async ({ context }: LoaderFunctionArgs) => {
	const { language } = getInstance(context)
	return redirect(href('/:lang?/home', { lang: language }))
}
