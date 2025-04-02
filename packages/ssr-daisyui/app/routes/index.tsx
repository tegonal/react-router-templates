import { href, type LoaderFunctionArgs, redirect } from 'react-router'
import { getLocale } from '~/middleware/i18n.ts'
/*
 * This route is the index route for the application to redirect to the home page while setting the locale.
 */
export const loader = async ({ context }: LoaderFunctionArgs) => {
	const lang = getLocale(context)
	return redirect(href('/:lang?/home', { lang }))
}
