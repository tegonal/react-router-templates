import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('alert', {
	defaultVariants: {
		size: 'md',
		variant: 'neutral',
	},
	variants: {
		size: {
			lg: 'alert-lg',
			md: 'alert-md',
			sm: 'alert-sm',
		},
		variant: {
			error: 'alert-error',
			info: 'alert-info',
			neutral: 'alert-neutral',
			primary: 'alert-primary',
			secondary: 'alert-secondary',
			success: 'alert-success text-primary-content',
			warning: 'alert-warning',
		},
	},
})

interface Props extends VariantProps<typeof variants> {
	children: React.ReactNode
	className?: string
}

export function Alert({ children, className, size, variant }: Props) {
	return (
		<div className={cn([variants({ size, variant }), className])} role="alert">
			{children}
		</div>
	)
}
