import { ActionFunctionArgs, data, Form, LoaderFunctionArgs, type MetaFunction } from 'react-router'
import React from 'react'
import { ErrorBoundaryShared } from '~/lib/error-boundary-shared.tsx'
import { Route as RootRoute } from '../../../.react-router/types/app/+types/root.ts'
import { useTranslation } from 'react-i18next'
import { H1 } from '~/components/typography/h1.tsx'
import { Container } from '~/components/theme/container.tsx'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getValidatedFormData, useRemixForm } from 'remix-hook-form'
import { Button } from '~/components/ui/button.tsx'
import { zIsEmail, zIsRequired } from '~/lib/zod-form-validations.ts'
import { Input } from '~/components/ui/input.tsx'
import { logger } from '~/lib/logger.ts'
import { Select } from '~/components/ui/select.tsx'
import { getFixedT } from '~/middleware/i18n.ts'

export const loader = async ({ context }: LoaderFunctionArgs) => {
	const t = await getFixedT(context)

	return data({
		title: t('routes.form.title', 'Example Form with Validation'),
		description: t(
			'routes.form.description',
			'A route that serves as the example form page for the application.',
		),
	})
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data?.title },
		{
			name: 'description',
			content: data?.description,
		},
	]
}

const schema = z.object({
	name: zIsRequired,
	email: zIsRequired.pipe(zIsEmail),
	flavour: z.enum(['vanilla', 'chocolate', 'strawberry']).pipe(zIsRequired),
})

type FormData = z.infer<typeof schema>
const resolver = zodResolver(schema)

export const action = async ({ request }: ActionFunctionArgs) => {
	const {
		errors,
		data: formData,
		receivedValues: defaultValues,
	} = await getValidatedFormData<FormData>(request, resolver)
	if (errors) {
		// The keys "errors" and "defaultValues" are picked up automatically by useRemixForm
		return data({ errors, defaultValues })
	}

	logger.debug(formData)

	// Do something with the data
	return data(formData)
}

export default function Home() {
	const { t } = useTranslation()
	const {
		handleSubmit,
		formState: { errors },
		register,
	} = useRemixForm<FormData>({
		mode: 'onSubmit',
		resolver,
	})
	return (
		<Container>
			<H1>{t('routes.form.title', 'Example Form with Validation')}</H1>
			<Form onSubmit={handleSubmit} method="POST" className={'flex max-w-2xl flex-col gap-3'}>
				<Input
					{...register('name')}
					type={'text'}
					label={t('form.label.name', 'Name')}
					description={t(
						'form.description.name',
						'Your name, family name, nick name or anything in between',
					)}
					autoComplete={'name'}
					error={errors.name}
				/>
				<Input
					{...register('email')}
					type={'email'}
					label={t('form.label.email', 'Email')}
					description={t('form.description.email', 'Your email address')}
					autoComplete={'email'}
					error={errors.email}
				/>
				<Select
					{...register('flavour')}
					label={t('form.label.flavour', 'Flavour')}
					description={t('form.description.flavour', 'Your favourite flavour')}
					error={errors.flavour}
					defaultValue={undefined}>
					<option value="vanilla">{t('form.flavour.vanilla', 'Vanilla')}</option>
					<option value="chocolate">{t('form.flavour.chocolate', 'Chocolate')}</option>
					<option value="strawberry">{t('form.flavour.strawberry', 'Strawberry')}</option>
				</Select>
				<Button type="submit" variant={'primary'}>
					{t('userActions.button.submit', 'Submit Form')}
				</Button>
			</Form>
		</Container>
	)
}

export function ErrorBoundary(args: RootRoute.ErrorBoundaryProps) {
	return ErrorBoundaryShared(args)
}
