import { data, LoaderFunctionArgs, type MetaFunction, useLoaderData } from 'react-router'
import React from 'react'
import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { Route as RootRoute } from '../../../.react-router/types/app/+types/root.ts'
import * as fs from 'node:fs'
import Markdown from 'react-markdown'
import { markdownComponents } from '~/lib/markdown-components.tsx'
import { getFixedT, getLocale } from '~/middleware/i18n.ts'

export const loader = async ({ request, context }: LoaderFunctionArgs) => {
	const t = await getFixedT(context)
	const lang = getLocale(context)

	const markdown = fs.readFileSync(`./app/md-content/home.${lang}.md`, 'utf8')

	return data({
		markdown,
		title: t('routes.home.title', 'Home'),
		description: t(
			'routes.home.description',
			'A route that serves as the home page for the application.',
		),
	})
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.title },
		{
			name: 'description',
			content: data?.description,
		},
	]
}

export default function Home() {
	const { markdown } = useLoaderData<typeof loader>()
	return <Markdown components={markdownComponents}>{markdown}</Markdown>
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
