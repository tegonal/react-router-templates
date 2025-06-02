import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils'

const variants = cva('loading loading-spinner', {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			default: 'loading-spinner-md',
		},
	},
})

interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export function Spinner({ children, className, variant }: Props) {
	return <div className={cn([variants({ variant }), className])}>{children}</div>
}
