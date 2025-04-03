import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'

const variants = cva('input w-full', {
	variants: {
		variant: {
			default: 'input-bordered',
			ghost: 'input-ghost',
			primary: 'input-primary',
			secondary: 'input-secondary',
			accent: 'input-accent',
			info: 'input-info',
			success: 'input-success',
			warning: 'input-warning',
			error: 'input-error',
		},
		size: {
			xs: 'input-xs',
			sm: 'input-sm',
			md: '',
			lg: 'input-lg',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
	},
})

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		VariantProps<typeof variants> {
	label?: string
	error?: {
		message?: string
	}
	description?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, variant, size, label, error, description, ...props }, ref) => {
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
					id={id}
					className={cn(variants({ variant: error?.message ? 'error' : variant, size, className }))}
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
