import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils.ts'

const variants = cva('mb-8 font-extrabold tracking-tight', {
	defaultVariants: {
		align: 'left',
		variant: 'md',
		weight: 'extrabold',
	},
	variants: {
		align: {
			center: 'text-center',
			left: 'text-left',
			right: 'text-right',
		},
		variant: {
			lg: 'text-4xl md:text-5xl lg:text-6xl',
			md: 'text-3xl md:text-4xl lg:text-5xl',
			sm: 'text-2xl md:text-3xl lg:text-4xl',
			xl: 'text-5xl md:text-6xl lg:text-7xl',
			xs: 'text-xl md:text-2xl lg:text-3xl',
		},
		weight: {
			bold: 'font-bold',
			extrabold: 'font-extrabold',
			medium: 'font-medium',
			normal: 'font-normal',
			semibold: 'font-semibold',
		},
	},
})

export interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export const H1: React.FC<Props> = ({ align, children, className, variant, weight }) => {
	return <h1 className={cn(variants({ align, variant, weight }), className)}>{children}</h1>
}
