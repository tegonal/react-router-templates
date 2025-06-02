import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('badge', {
	defaultVariants: {
		size: 'md',
		variant: 'neutral',
	},
	variants: {
		size: {
			lg: 'badge-lg',
			md: 'badge-md',
			sm: 'badge-sm',
		},
		variant: {
			neutral: 'badge-neutral',
			outline: 'badge-outline',
			primary: 'badge-primary',
			secondary: 'badge-secondary',
			success: 'badge-success',
			warning: 'badge-warning',
		},
	},
})

interface Props extends VariantProps<typeof variants> {
	children: React.ReactNode
	className?: string
}

export function Badge({ children, className, variant }: Props) {
	return <div className={cn([variants({ variant }), className])}>{children}</div>
}
