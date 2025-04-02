import { data, type LoaderFunctionArgs } from 'react-router'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

	// You can extend this health function to check other services and return an aggregated status
	// For example, check database connection, third-party services, etc.

	return data({ status: `ok ${host}` }, { status: 200 })
}
