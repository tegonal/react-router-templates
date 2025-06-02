import React from 'react'
import { isRouteErrorResponse } from 'react-router'

import { H1 } from '~/components/typography/h1.tsx'
import { P } from '~/components/typography/p.tsx'

import { type Route } from '../../.react-router/types/app/+types/root.ts'

export function ErrorBoundaryShared({ error }: Route.ErrorBoundaryProps) {
	if (isRouteErrorResponse(error)) {
		return (
			<>
				<H1>
					{error.status} {error.statusText}
				</H1>
				<P>{error.data}</P>
			</>
		)
	} else if (error instanceof Error) {
		return (
			<div>
				<H1>Error</H1>
				<P>{error.message}</P>
				<P>The stack trace is:</P>
				<pre>{error.stack}</pre>
			</div>
		)
	} else {
		return <H1>Unknown Error</H1>
	}
}
