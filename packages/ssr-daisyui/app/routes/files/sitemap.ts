import { LoaderFunctionArgs } from 'react-router'
import i18n from '../../i18n.ts'

const pagesToInclude = [
	{
		path: '/',
		lastmod: '2025-04-01',
	},
	{
		path: '/home',
		lastmod: '2025-04-01',
	},
	{
		path: '/form',
		lastmod: '2025-04-01',
	},
	{
		path: '/legal',
		lastmod: '2025-04-01',
	},
]

type StaticPagesList = {
	loc: string
	lastmod: string
	alternates: {
		hreflang: string
		href: string
	}[]
}[]

const generateSitemapXml = (entries: StaticPagesList) => {
	return entries
		.map((entry) => {
			const alternateElements = entry.alternates
				.map(
					(alt) =>
						`    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`,
				)
				.join('\n')

			return `<url>
      <loc>${entry.loc}</loc>
      <lastmod>${entry.lastmod}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    ${alternateElements}
    </url>`
		})
		.join('\n')
}

const generateStaticPagesList = (pages: typeof pagesToInclude, request: Request) => {
	const host =
		request.headers.get('X-Forwarded-Host') ?? request.headers.get('host') ?? 'example.com'
	const protocol = host.includes('localhost') ? 'http' : 'https'
	const baseUrl = `${protocol}://${host}`
	const availableLocales = i18n.supportedLngs
	const fallbackLocale = i18n.fallbackLng

	return pages.map((entry) => {
		// Start with the base URL data
		return {
			loc: `${baseUrl}/${fallbackLocale}${entry.path === '/' ? '' : entry.path}`,
			lastmod: entry.lastmod,
			alternates: availableLocales.map((locale) => ({
				hreflang: locale,
				href: `${baseUrl}/${locale}${entry.path === '/' ? '' : entry.path}`,
			})),
		}
	}) as StaticPagesList
}

export const loader = ({ request }: LoaderFunctionArgs) => {
	// Generate the XML content
	const staticPagesSitemap = generateSitemapXml(generateStaticPagesList(pagesToInclude, request))

	const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${staticPagesSitemap}
    </urlset>`

	return new Response(xmlContent, {
		status: 200,
		headers: {
			'Content-Type': 'application/xml',
		},
	})
}
