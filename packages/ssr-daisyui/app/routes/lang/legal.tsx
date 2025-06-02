import React from 'react'
import { useTranslation } from 'react-i18next'
import { data, type LoaderFunctionArgs, type MetaFunction } from 'react-router'

import { H1 } from '~/components/typography/h1.tsx'
import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { getInstance } from '~/middleware/i18next.ts'

import { type Route as RootRoute } from '../../../.react-router/types/app/+types/root.ts'

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const { t } = getInstance(context)

	return data({
		description: t('routes.legal.description', 'This is the legal information page.'),
		title: t('routes.legal.title', 'Legal Information'),
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

export default function Legal() {
	const { t } = useTranslation()
	return <H1>{t('routes.legal.title', 'Legal')}</H1>
}
