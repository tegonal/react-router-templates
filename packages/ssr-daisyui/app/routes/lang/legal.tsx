import React from 'react'
import { useTranslation } from 'react-i18next'
import { data, type LoaderFunctionArgs, type MetaFunction } from 'react-router'
import { type Route as RootRoute } from '../../../.react-router/types/app/+types/root.ts'
import { H1 } from '~/components/typography/h1.tsx'
import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { getFixedT } from '~/middleware/i18n.ts'

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const t = await getFixedT(context)

	return data({
		title: t('routes.legal.title', 'Legal Information'),
		description: t('routes.legal.description', 'This is the legal information page.'),
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
	const { t } = useTranslation()
	return <H1>{t('routes.legal.title', 'Legal')}</H1>
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
