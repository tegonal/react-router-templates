import { Header } from '~/components/theme/header.tsx'
import { Footer } from '~/components/theme/footer.tsx'
import { Outlet } from 'react-router'
import { Container } from '~/components/theme/container.tsx'

export default function Layout() {
	return (
		<>
			<Header />
			<Container>
				<div className={'divider'}></div>
			</Container>
			<Container className={'gap-0 py-12'}>
				<Outlet />
			</Container>
			<Footer />
		</>
	)
}
