import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('alert', {
	variants: {
		variant: {
			primary: 'alert-primary',
			secondary: 'alert-secondary',
			warning: 'alert-warning',
			success: 'alert-success text-primary-content',
			neutral: 'alert-neutral',
			info: 'alert-info',
			error: 'alert-error',
		},
		size: {
			sm: 'alert-sm',
			md: 'alert-md',
			lg: 'alert-lg',
		},
	},
	defaultVariants: {
		variant: 'neutral',
		size: 'md',
	},
})

interface Props extends VariantProps<typeof variants> {
	children: React.ReactNode
	className?: string
}

export function Alert({ children, variant, size, className }: Props) {
	return (
		<div role="alert" className={cn([variants({ variant, size }), className])}>
			{children}
		</div>
	)
}
