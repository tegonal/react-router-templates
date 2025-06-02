import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
	type ActionFunctionArgs,
	data,
	Form,
	type LoaderFunctionArgs,
	type MetaFunction,
} from 'react-router'
import { getValidatedFormData, useRemixForm } from 'remix-hook-form'
import { z } from 'zod'

import { Container } from '~/components/theme/container.tsx'
import { H1 } from '~/components/typography/h1.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Input } from '~/components/ui/input.tsx'
import { Select } from '~/components/ui/select.tsx'
import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { logger } from '~/lib/logger.ts'
import { zIsEmail, zIsRequired } from '~/lib/zod-form-validations.ts'
import { getInstance } from '~/middleware/i18next.ts'

import { type Route as RootRoute } from '../../../.react-router/types/app/+types/root.ts'

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const { t } = getInstance(context)

	return data({
		description: t(
			'routes.form.description',
			'A route that serves as the example form page for the application.',
		),
		title: t('routes.form.title', 'Example Form with Validation'),
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

const schema = z.object({
	email: zIsRequired.pipe(zIsEmail),
	flavour: z.enum(['vanilla', 'chocolate', 'strawberry']).pipe(zIsRequired),
	name: zIsRequired,
})

const resolver = zodResolver(schema)

export const action = async ({ request }: ActionFunctionArgs) => {
	const {
		data: formData,
		errors,
		receivedValues: defaultValues,
	} = await getValidatedFormData(request, resolver)
	if (errors) {
		// The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
		return data({ defaultValues, errors })
	}

	logger.debug(formData)

	// Do something with the data
	return data(formData)
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}

export default function FormExample() {
	const { t } = useTranslation()
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useRemixForm({
		mode: 'onSubmit',
		resolver,
	})

	return (
		<Container>
			<H1>{t('routes.form.title', 'Example Form with Validation')}</H1>
			<Form className="flex max-w-2xl flex-col gap-3" method="POST" onSubmit={handleSubmit}>
				<Input
					{...register('name')}
					autoComplete="name"
					description={t(
						'form.description.name',
						'Your name, family name, nick name or anything in between',
					)}
					error={errors.name}
					label={t('form.label.name', 'Name')}
					type="text"
				/>
				<Input
					{...register('email')}
					autoComplete="email"
					description={t('form.description.email', 'Your email address')}
					error={errors.email}
					label={t('form.label.email', 'Email')}
					type="email"
				/>
				<Select
					{...register('flavour')}
					defaultValue={undefined}
					description={t('form.description.flavour', 'Your favourite flavour')}
					error={errors.flavour}
					label={t('form.label.flavour', 'Flavour')}>
					<option value="vanilla">{t('form.flavour.vanilla', 'Vanilla')}</option>
					<option value="chocolate">{t('form.flavour.chocolate', 'Chocolate')}</option>
					<option value="strawberry">{t('form.flavour.strawberry', 'Strawberry')}</option>
				</Select>
				<Button type="submit" variant="primary">
					{t('userActions.button.submit', 'Submit Form')}
				</Button>
			</Form>
		</Container>
	)
}
