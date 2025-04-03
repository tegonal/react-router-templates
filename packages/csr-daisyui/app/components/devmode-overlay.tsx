import { Badge } from '~/components/ui/badge.tsx'

export const DevModeOverlay = () => {
	const isDev = import.meta.env.DEV

	return (
		<div className="hidden md:block">
			{isDev ? (
				<div className="fixed top-2 right-2 flex flex-row gap-1 text-xs md:top-auto md:right-auto md:bottom-2 md:left-2">
					<Badge>localhost</Badge>
					<Badge variant="secondary" className="sm:hidden md:hidden lg:hidden xl:hidden">
						sm (&lt; 640px)
					</Badge>
					<Badge variant="secondary" className="hidden sm:inline-flex md:hidden">
						sm
					</Badge>
					<Badge variant="secondary" className="hidden md:inline-flex lg:hidden">
						md
					</Badge>
					<Badge variant="secondary" className="hidden lg:inline-flex xl:hidden">
						lg
					</Badge>
					<Badge variant="secondary" className="hidden xl:inline-flex">
						xl
					</Badge>
				</div>
			) : (
				<div className="fixed hidden">{process.env.APP_VERSION}</div>
			)}
		</div>
	)
}
