import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'

const variants = cva('select w-full', {
	variants: {
		variant: {
			default: 'select-bordered',
			ghost: 'select-ghost',
			primary: 'select-primary',
			secondary: 'select-secondary',
			accent: 'select-accent',
			info: 'select-info',
			success: 'select-success',
			warning: 'select-warning',
			error: 'select-error',
		},
		size: {
			xs: 'select-xs',
			sm: 'select-sm',
			md: '',
			lg: 'select-lg',
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'md',
	},
})

interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
		VariantProps<typeof variants> {
	label?: string
	error?: {
		message?: string
	}
	description?: string
	children: React.ReactNode
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, variant, size, label, error, description, children, ...props }, ref) => {
		const id = props.id || React.useId()
		const { t } = useTranslation()

		return (
			<fieldset className="fieldset">
				{label && (
					<legend className="fieldset-legend">
						<span className="label-text">{label}</span>
					</legend>
				)}
				<select
					id={id}
					className={cn(variants({ variant: error?.message ? 'error' : variant, size, className }))}
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
