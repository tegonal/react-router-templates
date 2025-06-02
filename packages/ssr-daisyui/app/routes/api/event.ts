import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

import { type Route } from './+types/event'

export const action = async ({ request }: Route.ActionArgs) => {
	const { method } = request

	const userAgent = request.headers.get('user-agent') || ''

	let body = await request.json()
	const clientIp = getClientIPAddress(request) || ''

	if (!('domain' in body)) {
		throw new Error('Plausible Event API: body.domain is required')
	}

	if (!('name' in body)) {
		throw new Error('Plausible Event API: body.name is required')
	}

	if (!('url' in body)) {
		throw new Error('Plausible Event API: body.url is required')
	}

	const headers = {
		'Content-Type': 'application/json',
		'User-Agent': userAgent,
		'X-Forwarded-For': clientIp,
	}

	body = JSON.stringify(body)

	const response = await fetch(`${process.env.PLAUSIBLE_HOST}/api/event`, {
		body,
		headers,
		method,
	})

	const responseBody = await response.text()
	const { status, statusText } = response

	return new Response(responseBody, { status, statusText })
}
