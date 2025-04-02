import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('mb-6 leading-7', {
	variants: {
		variant: {
			default: '',
			sm: 'text-sm leading-6 font-light',
			lead: 'text-lg leading-8 font-light md:text-xl',
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

export const P: React.FC<Props> = ({ children, variant, className }) => {
	return <p className={cn([variants({ variant }), className])}>{children}</p>
}
