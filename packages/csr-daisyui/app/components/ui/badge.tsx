import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('badge', {
	variants: {
		variant: {
			primary: 'badge-primary',
			secondary: 'badge-secondary',
			warning: 'badge-warning',
			success: 'badge-success',
			outline: 'badge-outline',
			neutral: 'badge-neutral',
		},
		size: {
			sm: 'badge-sm',
			md: 'badge-md',
			lg: 'badge-lg',
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

export function Badge({ children, variant, className }: Props) {
	return <div className={cn([variants({ variant }), className])}>{children}</div>
}
