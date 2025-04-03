import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Form } from 'react-router'
import { useRemixForm } from 'remix-hook-form'
import { z } from 'zod'
import { Container } from '~/components/theme/container.tsx'
import { H1 } from '~/components/typography/h1.tsx'
import { Button } from '~/components/ui/button.tsx'
import { Input } from '~/components/ui/input.tsx'
import { Select } from '~/components/ui/select.tsx'
import { zIsEmail, zIsRequired } from '~/lib/zod-form-validations.ts'

const schema = z.object({
	name: zIsRequired,
	email: zIsRequired.pipe(zIsEmail),
	flavour: z.enum(['vanilla', 'chocolate', 'strawberry']).pipe(zIsRequired),
})

type FormData = z.infer<typeof schema>
const resolver = zodResolver(schema)

export const FormExample: React.FC = () => {
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
			<Form onSubmit={handleSubmit} method="POST" className="flex max-w-2xl flex-col gap-3">
				<Input
					{...register('name')}
					type="text"
					label={t('form.label.name', 'Name')}
					description={t(
						'form.description.name',
						'Your name, family name, nick name or anything in between',
					)}
					autoComplete="name"
					error={errors.name}
				/>
				<Input
					{...register('email')}
					type="email"
					label={t('form.label.email', 'Email')}
					description={t('form.description.email', 'Your email address')}
					autoComplete="email"
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
				<Button type="submit" variant="primary">
					{t('userActions.button.submit', 'Submit Form')}
				</Button>
			</Form>
		</Container>
	)
}
