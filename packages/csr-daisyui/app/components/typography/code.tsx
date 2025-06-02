import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('bg-base-300', {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			default: '',
			muted: 'text-muted-foreground text-sm',
		},
	},
})

export interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export const CODE: React.FC<Props> = ({ children, className, variant }) => {
	return <code className={cn([variants({ variant }), className])}>{children}</code>
}
