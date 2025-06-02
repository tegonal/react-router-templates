import { type PropsWithChildren } from 'react'

import { Container } from '~/components/theme/container.tsx'
import { Footer } from '~/components/theme/footer.tsx'
import { Header } from '~/components/theme/header/header.tsx'

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<Header />
			<Container>
				<div className="divider my-0 md:my-4"></div>
			</Container>
			<Container className="gap-0 py-3 md:py-12">{children}</Container>
			<Footer />
		</>
	)
}
