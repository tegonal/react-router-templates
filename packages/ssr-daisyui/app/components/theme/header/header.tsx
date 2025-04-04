import { Container } from '~/components/theme/container.tsx'
import { NavDrawer } from '~/components/theme/header/nav-drawer.tsx'

export const Header: React.FC = () => {
	return (
		<Container as="header" className="py-0 md:py-4">
			<NavDrawer />
		</Container>
	)
}
