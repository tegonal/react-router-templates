import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('mb-6 ml-6 list-decimal [&>li]:mt-1 [&>li>ul]:mb-0', {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			default: '',
			lead: 'text-lg leading-8 font-light md:text-xl',
			muted: 'text-muted-foreground text-sm',
			sm: 'text-sm leading-6 font-light',
		},
	},
})

export interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export const OL: React.FC<Props> = ({ children, className, variant }) => {
	return <ol className={cn([variants({ variant }), className])}>{children}</ol>
}
