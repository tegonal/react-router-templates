import { Route } from './+types/event'
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

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
		'User-Agent': userAgent,
		'Content-Type': 'application/json',
		'X-Forwarded-For': clientIp,
	}

	body = JSON.stringify(body)

	const response = await fetch(`${process.env.PLAUSIBLE_HOST}/api/event`, {
		body,
		method,
		headers,
	})

	const responseBody = await response.text()
	const { status, statusText } = response

	return new Response(responseBody, { status, statusText })
}
