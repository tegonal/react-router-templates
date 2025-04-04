import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { Layout } from './components/theme/layout.tsx'
import { ConfigProvider } from './contexts/config-provider.tsx'

import { CatchAll404 } from './routes/catch-all-404.tsx'
import { Home } from './routes/home.tsx'
import { DevModeOverlay } from '~/components/devmode-overlay.tsx'
import { FormExample } from '~/routes/form-example.tsx'
import { Legal } from '~/routes/legal.tsx'
import { Privacy } from '~/routes/privacy.tsx'

export const App = () => {
	return (
		<ConfigProvider>
			<Router>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/form" element={<FormExample />} />
						<Route path="/legal" element={<Legal />} />
						<Route path="/privacy" element={<Privacy />} />
						<Route path="*" element={<CatchAll404 />} />
					</Routes>
				</Layout>
			</Router>
			<DevModeOverlay />
		</ConfigProvider>
	)
}
