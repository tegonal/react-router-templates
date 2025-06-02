import { Badge } from '~/components/ui/badge.tsx'

export const DevModeOverlay = () => {
	const isDev = import.meta.env.DEV

	return (
		<div className="hidden md:block">
			{isDev ? (
				<div className="fixed top-2 right-2 flex flex-row gap-1 text-xs md:top-auto md:right-auto md:bottom-2 md:left-2">
					<Badge>localhost</Badge>
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
