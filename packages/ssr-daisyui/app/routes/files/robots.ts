import { type LoaderFunctionArgs } from 'react-router'

export const loader = ({request}:LoaderFunctionArgs) => {
  const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

  const disallowIndexing = `
User-agent: *
Disallow: /
`

  const allowIndexing = `
User-agent: *
Allow: /
`

  const robotText = host?.includes('test') ? disallowIndexing : allowIndexing;

  return new Response(robotText,{
    headers: {
      "Content-Type": "text/plain",
    },
    status: 200
  });
};

