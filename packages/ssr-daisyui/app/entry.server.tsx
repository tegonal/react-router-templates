import { createReadableStreamFromReadable } from '@react-router/node'
import { isbot } from 'isbot'
import { PassThrough } from 'node:stream'
import { renderToPipeableStream, type RenderToPipeableStreamOptions } from 'react-dom/server'
import { I18nextProvider } from 'react-i18next'
import { type EntryContext, ServerRouter, type unstable_RouterContextProvider } from 'react-router'

import { getInstance } from './middleware/i18next'

export const streamTimeout = 5_000

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	entryContext: EntryContext,
	routerContext: unstable_RouterContextProvider,
) {
	return new Promise((resolve, reject) => {
		let shellRendered = false
		let userAgent = request.headers.get('user-agent')

		let readyOption: keyof RenderToPipeableStreamOptions =
			(userAgent && isbot(userAgent)) || entryContext.isSpaMode ? 'onAllReady' : 'onShellReady'

		let { abort, pipe } = renderToPipeableStream(
			<I18nextProvider i18n={getInstance(routerContext)}>
				<ServerRouter context={entryContext} url={request.url} />
			</I18nextProvider>,
			{
				onError(error: unknown) {
					responseStatusCode = 500
					if (shellRendered) console.error(error)
				},
				onShellError(error: unknown) {
					reject(error)
				},
				[readyOption]() {
					shellRendered = true
					let body = new PassThrough()
					let stream = createReadableStreamFromReadable(body)

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(stream, {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					)

					pipe(body)
				},
			},
		)

		setTimeout(abort, streamTimeout + 1000)
	})
}
