import { useEffect, useState } from 'react'
import { useFetcher, useNavigation, useRevalidator, useRouteLoaderData } from 'react-router'

import { Badge } from '~/components/ui/badge.tsx'
import { Spinner } from '~/components/ui/spinner.tsx'
import { isClient } from '~/lib/is-client.ts'
import { type RootRouteLoaderData } from '~/root.tsx'

const DevModeOverlay = () => {
	const loaderData = useRouteLoaderData<RootRouteLoaderData>('root')
	const [instance, setInstance] = useState('N/A')
	const navigation = useNavigation()
	const fetcher = useFetcher()
	const revalidate = useRevalidator()
	const [isFetching, setIsFetching] = useState(false)
	const [isRevalidating, setIsRevalidating] = useState(false)
	const [isNavigating, setIsNavigating] = useState(false)

	useEffect(() => {
		// Monitor data fetching, revalidation, and navigation
		setIsFetching(fetcher.state !== 'idle')
		setIsRevalidating(revalidate.state !== 'idle')
		setIsNavigating(navigation.state !== 'idle')
	}, [fetcher.state, revalidate.state, navigation.state])

	useEffect(() => {
		setInstance(isClient() ? window.ENV.INSTANCE_NAME : 'N/A')
	}, [])

	return (
		<div className="hidden md:block">
			{loaderData?.isDev ? (
				<div className="fixed top-2 right-2 flex flex-row gap-1 text-xs md:top-auto md:right-auto md:bottom-2 md:left-2">
					{isFetching && (
						<div className="h-4 w-4 rounded-full text-blue-500">
							<Spinner />
						</div>
					)}
					{isRevalidating && (
						<div className="h-4 w-4 rounded-full text-red-500">
							<Spinner />
						</div>
					)}
					{isNavigating && (
						<div className="h-4 w-4 rounded-full text-green-500">
							<Spinner />
						</div>
					)}
					<Badge>{instance}</Badge>
					<Badge className="sm:hidden md:hidden lg:hidden xl:hidden" variant="secondary">
						sm (&lt; 640px)
					</Badge>
					<Badge className="hidden sm:inline-flex md:hidden" variant="secondary">
						sm
					</Badge>
					<Badge className="hidden md:inline-flex lg:hidden" variant="secondary">
						md
					</Badge>
					<Badge className="hidden lg:inline-flex xl:hidden" variant="secondary">
						lg
					</Badge>
					<Badge className="hidden xl:inline-flex" variant="secondary">
						xl
					</Badge>
				</div>
			) : (
				<div className="fixed hidden">{process.env.APP_VERSION}</div>
			)}
		</div>
	)
}

export { DevModeOverlay }
