import { useRouteLoaderData } from 'react-router'
import { RootRouteLoaderData } from '~/root.tsx'
import { invariant } from '@epic-web/invariant'

/**
 * @returns the request info from the root loader (throws an error if it does not exist)
 */
export function useRequestInfo() {
	const maybeRequestInfo = useOptionalRequestInfo()
	invariant(maybeRequestInfo, 'No requestInfo found in root loader')

	return maybeRequestInfo
}

export function useOptionalRequestInfo() {
	const data = useRouteLoaderData<RootRouteLoaderData>('root')

	return data?.requestInfo
}
