import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('btn', {
	defaultVariants: {
		size: 'md',
		variant: 'neutral',
	},
	variants: {
		size: {
			lg: 'btn-lg',
			md: 'btn-md',
			sm: 'btn-sm',
			xs: 'btn-xs',
		},
		variant: {
			ghost: 'btn-ghost',
			neutral: 'btn-neutral',
			outline: 'btn-outline',
			primary: 'btn-primary',
			secondary: 'btn-secondary',
			success: 'btn-success',
			warning: 'btn-warning',
		},
	},
})

interface Props
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export function Button({ children, className, size, variant, ...rest }: Props) {
	return (
		<button className={cn([variants({ size, variant }), className])} {...rest}>
			{children}
		</button>
	)
}
