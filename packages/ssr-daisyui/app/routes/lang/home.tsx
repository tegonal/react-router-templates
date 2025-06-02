import * as fs from 'node:fs'
import React from 'react'
import Markdown from 'react-markdown'
import { data, type LoaderFunctionArgs, type MetaFunction, useLoaderData } from 'react-router'

import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { markdownComponents } from '~/lib/markdown-components.tsx'
import { getInstance } from '~/middleware/i18next.ts'

import { type Route as RootRoute } from '../../../.react-router/types/app/+types/root.ts'

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const { language, t } = getInstance(context)

	const markdown = fs.readFileSync(`./app/md-content/home.${language}.md`, 'utf8')

	return data({
		description: t(
			'routes.home.description',
			'A route that serves as the home page for the application.',
		),
		markdown,
		title: t('routes.home.title', 'Home'),
	})
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.title },
		{
			content: data?.description,
			name: 'description',
		},
	]
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}

export default function Home() {
	const { markdown } = useLoaderData<typeof loader>()
	return <Markdown components={markdownComponents}>{markdown}</Markdown>
}
