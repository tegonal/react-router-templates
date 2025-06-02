import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '~/lib/utils'

const variants = cva('input w-full', {
	defaultVariants: {
		size: 'md',
		variant: 'default',
	},
	variants: {
		size: {
			lg: 'input-lg',
			md: '',
			sm: 'input-sm',
			xs: 'input-xs',
		},
		variant: {
			accent: 'input-accent',
			default: 'input-bordered',
			error: 'input-error',
			ghost: 'input-ghost',
			info: 'input-info',
			primary: 'input-primary',
			secondary: 'input-secondary',
			success: 'input-success',
			warning: 'input-warning',
		},
	},
})

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof variants> {
	description?: string
	error?: {
		message?: string
	}
	label?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, description, error, label, size, variant, ...props }, ref) => {
		const generatedId = React.useId()
		const id = props.id || generatedId
		const { t } = useTranslation()

		return (
			<fieldset className="fieldset">
				{label && (
					<legend className="fieldset-legend">
						<span className="label-text">{label}</span>
					</legend>
				)}
				<input
					className={cn(variants({ className, size, variant: error?.message ? 'error' : variant }))}
					id={id}
					ref={ref}
					{...props}
				/>
				{(error?.message || description) && (
					<p className="fieldset-label">
						{error?.message && <span className="text-error">{t(error.message)}</span>}
						{description && !error && <span className="">{description}</span>}
					</p>
				)}
			</fieldset>
		)
	},
)
