# Plausible Analytics Feature

## Overview

Enhanced Plausible Analytics integration with advanced features including rate limiting, validation,
retry logic, and improved error handling.

## Features

- **Client-side event tracking** with automatic retry for critical events
- **Server-side event proxying** to protect your Plausible instance
- **Rate limiting** to prevent abuse
- **Event validation and sanitization**
- **Configurable retry logic** for important events
- **TypeScript support** with full type definitions

## Usage

### Client-Side Events

```typescript
import { plausibleClientEvent, GenericAppEvents } from '~/features/plausible'

// Track a page view
plausibleClientEvent({
  name: GenericAppEvents.PageView,
})

// Track a custom event with properties
plausibleClientEvent({
  name: GenericAppEvents.UserAction,
  props: {
    action: 'download',
    resource: 'ebook-react-patterns',
  },
})
```

### Server-Side Events

```typescript
import { plausibleServerEvent } from '~/features/plausible'

// Track server-side events (in loaders/actions)
export async function loader({ request }: LoaderFunctionArgs) {
  await plausibleServerEvent({
    name: 'api-request',
    url: request.url,
    domain: 'your-domain.com',
    request,
  })

  // ... rest of your loader
}
```

## Configuration

### Environment Variables

```env
# Required
PLAUSIBLE_HOST=https://plausible.io
ORIGIN=https://your-domain.com

# Optional - for self-hosted instances
PLAUSIBLE_DOMAIN=your-domain.com
```

### Configuration File

The feature configuration is in `features/plausible/config.ts`:

```typescript
export const plausibleConfig = {
  api: {
    endpoint: '/api/event',
    timeout: 5000,
  },
  rateLimit: {
    maxRequests: 100, // per IP
    windowMs: 60000, // 1 minute
  },
  retry: {
    maxAttempts: 3,
    delay: 1000,
    backoffMultiplier: 2,
  },
  validation: {
    maxEventNameLength: 100,
    maxPropsSize: 1024, // 1KB
  },
}
```

## Event Types

### Pre-defined Events

```typescript
enum GenericAppEvents {
  PageView = 'page-view',
  UserAction = 'user-action',
  Search = 'search',
  Download = 'download',
  // ... more events
}
```

### Custom Events

You can define your own event types:

```typescript
type MyCustomEvent = {
  name: 'checkout-completed'
  props: {
    value: string
    currency: string
    items: number
  }
}

plausibleClientEvent({
  name: 'checkout-completed',
  props: {
    value: '99.99',
    currency: 'USD',
    items: 3,
  },
})
```

## API Route

The feature provides an `/api/event` endpoint that:

1. **Validates** incoming event data
2. **Sanitizes** properties to prevent injection
3. **Rate limits** requests per IP
4. **Proxies** to your Plausible instance
5. **Handles errors** gracefully

## Security Features

### Rate Limiting

- Configurable requests per minute per IP
- Returns 429 with Retry-After header when exceeded

### Validation

- Event name length limits
- Property size restrictions
- Type validation for all properties
- Domain format validation
- URL structure validation

### Sanitization

- Removes invalid property types
- Truncates oversized values
- Filters out potentially malicious content

## Development vs Production

### Development Mode

- Events are suppressed on localhost
- Debug logging enabled
- Detailed error messages

### Production Mode

- All events are forwarded
- Minimal logging
- Generic error messages for security

## Best Practices

1. **Use TypeScript** - Define your event types for type safety
2. **Group related events** - Use consistent naming conventions
3. **Keep properties minimal** - Only track what you need
4. **Handle failures gracefully** - Analytics should never break UX
5. **Test in development** - Use debug logs to verify events

## Advanced Usage

### Custom Retry Logic

For critical events that must be tracked:

```typescript
import { shouldRetryEvent, withRetry } from '~/features/plausible/utils/retry'

// Configure which events should retry
export function shouldRetryEvent(eventName: string): boolean {
  const criticalEvents = ['purchase', 'signup', 'error']
  return criticalEvents.includes(eventName)
}
```

### Server Context

When tracking server events, include request context:

```typescript
import { getClientIPAddress } from 'remix-utils/get-client-ip-address'

const clientIp = getClientIPAddress(request)
await plausibleServerEvent({
  name: 'form-submission',
  url: request.url,
  domain: 'your-domain.com',
  request,
  props: {
    form: 'contact',
    ip: clientIp,
  },
})
```

## Troubleshooting

### Events not appearing in Plausible

1. Check environment variables are set
2. Verify domain matches Plausible configuration
3. Check browser console for errors
4. Enable debug logging in development

### Rate limiting issues

- Adjust `maxRequests` in config
- Implement user-specific limits if needed
- Consider caching for repeated events

### CORS errors

- Use the proxy endpoint `/api/event`
- Don't call Plausible directly from client
