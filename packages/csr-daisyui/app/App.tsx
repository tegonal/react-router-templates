import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router'

import { DevModeOverlay } from '~/components/devmode-overlay.tsx'
import { FormExample } from '~/routes/form-example.tsx'
import { Legal } from '~/routes/legal.tsx'
import { Privacy } from '~/routes/privacy.tsx'

import { Layout } from './components/theme/layout.tsx'
import { ConfigProvider } from './contexts/config-provider.tsx'
import { CatchAll404 } from './routes/catch-all-404.tsx'
import { Home } from './routes/home.tsx'

export const App = () => {
	return (
		<ConfigProvider>
			<Router>
				<Layout>
					<Routes>
						<Route element={<Home />} path="/" />
						<Route element={<Home />} path="/home" />
						<Route element={<FormExample />} path="/form" />
						<Route element={<Legal />} path="/legal" />
						<Route element={<Privacy />} path="/privacy" />
						<Route element={<CatchAll404 />} path="*" />
					</Routes>
				</Layout>
			</Router>
			<DevModeOverlay />
		</ConfigProvider>
	)
}
