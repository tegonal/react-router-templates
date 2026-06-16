import React from 'react'
import { useTranslation } from 'react-i18next'
import { data, type LoaderFunctionArgs, type MetaFunction } from 'react-router'

import { H1 } from '~/components/typography/h1.tsx'
import { H2 } from '~/components/typography/h2.tsx'
import { P } from '~/components/typography/p.tsx'
import { Image, ResponsiveImage } from '~/features/image-service'
import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { getInstance } from '~/middleware/i18next.ts'

import { type Route as RootRoute } from '../../../.react-router/types/app/+types/root.ts'

export const loader = async ({ context }: LoaderFunctionArgs) => {
  const { t } = getInstance(context)

  return data({
    description: t(
      'routes.images.description',
      'Examples of optimized image components with various configurations',
    ),
    title: t('routes.images.title', 'Image Examples'),
  })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.title },
    {
      content: data?.description,
      name: 'description',
    },
  ]
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
  return ErrorBoundaryShared(args)
}

export default function Images() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto space-y-12 py-8">
      <div className="space-y-4">
        <H1>{t('routes.images.title', 'Image Examples')}</H1>
        <P>
          {t(
            'routes.images.intro',
            'This page demonstrates the Image Service features for optimized image loading and transformation.',
          )}
        </P>
      </div>

      {/* Feature Overview */}
      <section className="space-y-4">
        <H2>{t('routes.images.features.title', 'Image Service Features')}</H2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">On-the-fly Optimization</h3>
              <p className="text-sm opacity-75">
                Images are optimized server-side with caching for performance
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">Format Conversion</h3>
              <p className="text-sm opacity-75">
                Convert to modern formats like WebP and AVIF for smaller file sizes
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">Dynamic Resizing</h3>
              <p className="text-sm opacity-75">
                Resize images to exact dimensions needed, reducing bandwidth
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">Quality Control</h3>
              <p className="text-sm opacity-75">
                Fine-tune compression quality for the right balance
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">Responsive Component</h3>
              <p className="text-sm opacity-75">
                ResponsiveImage adapts to container size with ResizeObserver
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow">
            <div className="card-body">
              <h3 className="card-title text-base">Lazy Loading</h3>
              <p className="text-sm opacity-75">
                Built-in lazy loading with smooth fade-in animation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Original Image */}
      <section className="space-y-4">
        <H2>{t('routes.images.original.title', 'Original Image')}</H2>
        <P>
          {t(
            'routes.images.original.description',
            'The original image without any transformations.',
          )}
        </P>
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <Image
              alt="Saigon landscape"
              className="w-full"
              loading="eager"
              src="/assets/saigon.jpg"
            />
          </figure>
          <div className="card-body">
            <p className="text-sm opacity-75">
              {t('routes.images.original.caption', 'Full resolution, original format')}
            </p>
          </div>
        </div>
      </section>

      {/* Resized Image */}
      <section className="space-y-4">
        <H2>{t('routes.images.resized.title', 'Resized Image')}</H2>
        <P>
          {t(
            'routes.images.resized.description',
            'Image resized to specific dimensions using the image service.',
          )}
        </P>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                alt="OS Mittelland landscape - 800x600"
                height={600}
                loading="lazy"
                src="/assets/saigon.jpg"
                width={800}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">800x600</h3>
              <p className="text-sm opacity-75">
                {t('routes.images.resized.standard', 'Standard resolution')}
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                alt="OS Mittelland landscape - 400x300"
                height={300}
                loading="lazy"
                src="/assets/saigon.jpg"
                width={400}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">400x300</h3>
              <p className="text-sm opacity-75">
                {t('routes.images.resized.thumbnail', 'Thumbnail size')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Format Conversion */}
      <section className="space-y-4">
        <H2>{t('routes.images.formats.title', 'Format Conversion')}</H2>
        <P>
          {t(
            'routes.images.formats.description',
            'Same image converted to different modern formats for better compression.',
          )}
        </P>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                alt="OS Mittelland - WebP format"
                className="h-48 w-full object-cover"
                format="webp"
                height={400}
                loading="lazy"
                src="/assets/saigon.jpg"
                width={600}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">WebP</h3>
              <p className="text-sm opacity-75">
                {t('routes.images.formats.webp', 'Modern format with excellent compression')}
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                alt="OS Mittelland - AVIF format"
                className="h-48 w-full object-cover"
                format="avif"
                height={400}
                loading="lazy"
                src="/assets/saigon.jpg"
                width={600}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">AVIF</h3>
              <p className="text-sm opacity-75">
                {t('routes.images.formats.avif', 'Next-gen format with superior compression')}
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                alt="OS Mittelland - JPEG format"
                className="h-48 w-full object-cover"
                format="jpeg"
                height={400}
                loading="lazy"
                quality={85}
                src="/assets/saigon.jpg"
                width={600}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">JPEG (85% quality)</h3>
              <p className="text-sm opacity-75">
                {t('routes.images.formats.jpeg', 'Classic format with adjustable quality')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Image */}
      <section className="space-y-4">
        <H2>{t('routes.images.responsive.title', 'Responsive Image')}</H2>
        <P>
          {t(
            'routes.images.responsive.description',
            'Using the ResponsiveImage component that automatically adapts to container size.',
          )}
        </P>
        <div className="card bg-base-100 shadow-xl">
          <figure>
            <ResponsiveImage
              alt="Saigon landscape - Responsive"
              aspectRatio="video"
              className="w-full"
              src="/assets/saigon.jpg"
            />
          </figure>
          <div className="card-body">
            <p className="text-sm opacity-75">
              {t(
                'routes.images.responsive.caption',
                'Automatically calculates optimal dimensions based on container size and pixel density (capped at 2x)',
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Quality Comparison */}
      <section className="space-y-4">
        <H2>{t('routes.images.quality.title', 'Quality Comparison')}</H2>
        <P>
          {t(
            'routes.images.quality.description',
            'Same image with different quality settings to demonstrate file size vs visual quality trade-offs.',
          )}
        </P>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                alt="OS Mittelland - Low quality"
                className="h-48 w-full object-cover"
                format="jpeg"
                height={333}
                loading="lazy"
                quality={30}
                src="/assets/saigon.jpg"
                width={500}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">30% Quality</h3>
              <p className="text-sm opacity-75">
                {t('routes.images.quality.low', 'Smallest file size, visible compression')}
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                alt="OS Mittelland - Medium quality"
                className="h-48 w-full object-cover"
                format="jpeg"
                height={333}
                loading="lazy"
                quality={60}
                src="/assets/saigon.jpg"
                width={500}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">60% Quality</h3>
              <p className="text-sm opacity-75">
                {t('routes.images.quality.medium', 'Good balance of quality and size')}
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image
                alt="OS Mittelland - High quality"
                className="h-48 w-full object-cover"
                format="jpeg"
                height={333}
                loading="lazy"
                quality={90}
                src="/assets/saigon.jpg"
                width={500}
              />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-lg">90% Quality</h3>
              <p className="text-sm opacity-75">
                {t('routes.images.quality.high', 'Best quality, larger file size')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
