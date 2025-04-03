import React, { createContext, type ReactNode, useContext } from 'react'

/*
 * This is an example of a context provider for a configuration object.
 */
interface ConfigContextProps {
	isBusy: boolean
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined)

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const initialState: ConfigContextProps = {
		isBusy: false,
	}

	return <ConfigContext.Provider value={initialState}>{children}</ConfigContext.Provider>
}

export const useConfig = (): ConfigContextProps => {
	const context = useContext(ConfigContext)
	if (!context) {
		throw new Error('useConfig must be used within a ConfigProvider')
	}
	return context
}
