import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('bg-base-300 mb-6 max-w-full overflow-x-scroll px-1 py-2', {
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

export const PRE: React.FC<Props> = ({ children, className, variant }) => {
	return <pre className={cn([variants({ variant }), className])}>{children}</pre>
}
