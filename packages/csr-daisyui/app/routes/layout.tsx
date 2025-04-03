import { type PropsWithChildren } from 'react'
import { Container } from '~/components/theme/container.tsx'
import { Footer } from '~/components/theme/footer.tsx'
import { Header } from '~/components/theme/header.tsx'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<Container>
				<div className="divider"></div>
			</Container>
			<Container className="gap-0 py-12">{children}</Container>
			<Footer />
		</>
	)
}
