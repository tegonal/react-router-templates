# Image Service Feature

## Overview

The Image Service feature provides optimized image handling capabilities including resizing,
caching, and proxying. This feature was ported from a Payload CMS-based project and includes mock
implementations for Payload-specific dependencies.

## Dependencies

### Required Dependencies

- `sharp` - For image transformation and optimization
- `axios` - For fetching remote images
- `es-toolkit` - Utility functions

### Payload CMS Integration

⚠️ **Important**: This feature is tied to Payload CMS architecture. The current implementation
includes mock services to satisfy these dependencies:

1. **Payload API Client** (`~/services/api/payload/api-server-service.server.ts`)
   - Mock implementation of the Payload CMS API client
   - Provides `apiServerServiceClient`, `setServiceClientToken`, and related functions
   - In a real Payload CMS project, this would connect to your actual Payload API

2. **Payload Types** (`~/services/api/payload/payload-types.ts`)
   - Mock types for Media, User, and Page entities
   - Replace with actual generated types from your Payload CMS instance

## Components

### Image Component

```tsx
import { Image } from '~/features/image-service'
;<Image src="/path/to/image.jpg" alt="Description" width={800} height={600} loading="lazy" />
```

### ResponsiveImage Component

```tsx
import { ResponsiveImage } from '~/features/image-service'
;<ResponsiveImage
	src="/path/to/image.jpg"
	alt="Description"
	sizes="(max-width: 768px) 100vw, 50vw"
	className="h-auto w-full"
/>
```

## API Routes

### Image Resize Endpoint

**Route**: `/api/image`

Query parameters:

- `src` - Source image URL or path
- `w` - Width in pixels
- `h` - Height in pixels
- `q` - Quality (1-100)
- `format` - Output format (webp, jpeg, png, avif)

Example:

```
/api/image?src=/images/hero.jpg&w=800&h=600&format=webp&q=80
```

### Image Proxy Endpoint

**Route**: `/api/proxy/*`

Proxies images from external sources through your server, useful for:

- CORS issues
- Caching external images
- Hiding original image sources

Example:

```
/api/proxy/https://external-site.com/image.jpg
```

## Configuration

### Environment Variables

```env
# Required for proxy functionality
API_URL=https://your-api-endpoint.com

# Optional - for authenticated Payload CMS requests
PAYLOAD_SERVICE_USER_API_KEY=your-service-key
```

### Supported Payload Endpoints

The proxy endpoint validates requests against configured Payload endpoints. Modify
`PAYLOAD_ENDPOINTS` in `config.server.ts`:

```typescript
export const PAYLOAD_ENDPOINTS = [
	'media',
	'uploads',
	// Add your Payload collections here
]
```

## Caching

The image service implements file-system based caching:

- Processed images are cached in the `CACHE_DIR` directory
- Cache keys are generated based on source URL and transformation parameters
- Cached images are served with long-term cache headers

## Migration from Payload CMS

If you're using this in an actual Payload CMS project:

1. Replace the mock services with your actual Payload API client
2. Update the `payload-types.ts` with generated types from Payload
3. Configure the `PAYLOAD_ENDPOINTS` for your collections
4. Set up proper environment variables for API access

## Performance Considerations

- Images are cached after first transformation
- Use appropriate image formats (WebP/AVIF for modern browsers)
- Set reasonable size limits in transformation parameters
- Consider CDN integration for production deployments

## Security

- The proxy endpoint validates against allowed endpoints
- Image transformations have size limits to prevent abuse
- Consider implementing rate limiting for public endpoints
- Validate and sanitize all user inputs
