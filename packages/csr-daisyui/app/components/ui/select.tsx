import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '~/lib/utils'

const variants = cva('select w-full', {
	defaultVariants: {
		size: 'md',
		variant: 'default',
	},
	variants: {
		size: {
			lg: 'select-lg',
			md: '',
			sm: 'select-sm',
			xs: 'select-xs',
		},
		variant: {
			accent: 'select-accent',
			default: 'select-bordered',
			error: 'select-error',
			ghost: 'select-ghost',
			info: 'select-info',
			primary: 'select-primary',
			secondary: 'select-secondary',
			success: 'select-success',
			warning: 'select-warning',
		},
	},
})

interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
		VariantProps<typeof variants> {
	children: React.ReactNode
	description?: string
	error?: {
		message?: string
	}
	label?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ children, className, description, error, label, size, variant, ...props }, ref) => {
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
				<select
					className={cn(variants({ className, size, variant: error?.message ? 'error' : variant }))}
					id={id}
					ref={ref}
					{...props}>
					{children}
				</select>
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
