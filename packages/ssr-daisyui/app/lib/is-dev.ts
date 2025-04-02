import { isClient } from '~/lib/is-client.ts'
import { isServer } from '~/lib/is-server.ts'

export const isDev = () => {
	if (isClient()) {
		return window.ENV.NODE_ENV !== 'production'
	}
	if (isServer()) {
		return process.env.NODE_ENV !== 'production'
	}
	return false
}
