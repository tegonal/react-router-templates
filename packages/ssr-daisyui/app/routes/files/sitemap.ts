import { type LoaderFunctionArgs } from 'react-router'

import { i18nConfig } from '~/i18n-config.ts'

const pagesToInclude = [
	{
		lastmod: '2025-04-01',
		path: '/',
	},
	{
		lastmod: '2025-04-01',
		path: '/home',
	},
	{
		lastmod: '2025-04-01',
		path: '/form',
	},
	{
		lastmod: '2025-04-01',
		path: '/legal',
	},
]

type StaticPagesList = {
	alternates: {
		href: string
		hreflang: string
	}[]
	lastmod: string
	loc: string
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
	const availableLocales = i18nConfig.supportedLngs
	const fallbackLocale = i18nConfig.fallbackLng

	return pages.map((entry) => {
		// Start with the base URL data
		return {
			alternates: availableLocales.map((locale) => ({
				href: `${baseUrl}/${locale}${entry.path === '/' ? '' : entry.path}`,
				hreflang: locale,
			})),
			lastmod: entry.lastmod,
			loc: `${baseUrl}/${fallbackLocale}${entry.path === '/' ? '' : entry.path}`,
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
		headers: {
			'Content-Type': 'application/xml',
		},
		status: 200,
	})
}
