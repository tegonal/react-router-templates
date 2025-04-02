import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('bg-base-300', {
	variants: {
		variant: {
			default: '',
			muted: 'text-muted-foreground text-sm',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export const CODE: React.FC<Props> = ({ children, variant, className }) => {
	return <code className={cn([variants({ variant }), className])}>{children}</code>
}
