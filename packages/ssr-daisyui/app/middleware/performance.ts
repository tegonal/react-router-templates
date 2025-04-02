import { Route } from '../../.react-router/types/app/+types/root.ts'
import { logger } from '~/lib/logger.ts'
import { round } from 'lodash-es'

// This is an example middleware that logs the time taken for a route transition.
// https://reactrouter.com/start/changelog#middleware-unstable

export const performanceMiddleware: Route.unstable_ClientMiddlewareFunction = async (
	{ context },
	next,
) => {
	const startTime = performance.now()
	const result = await next()
	const duration = performance.now() - startTime
	logger.debug(`Route transition duration: ${round(duration, 2)}ms`)
	return result
}
