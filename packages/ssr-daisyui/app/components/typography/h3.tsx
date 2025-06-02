import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils.ts'

const variants = cva('mb-6 tracking-tight', {
	defaultVariants: {
		align: 'left',
		variant: 'md',
		weight: 'semibold',
	},
	variants: {
		align: {
			center: 'text-center',
			left: 'text-left',
			right: 'text-right',
		},
		variant: {
			lg: 'text-2xl md:text-3xl lg:text-4xl',
			md: 'text-xl md:text-2xl lg:text-3xl',
			sm: 'text-lg md:text-xl lg:text-2xl',
			xl: 'text-3xl md:text-4xl lg:text-5xl',
			xs: 'text-base md:text-lg lg:text-xl',
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

export const H3: React.FC<Props> = ({ align, children, className, variant, weight }) => {
	return <h3 className={cn(variants({ align, variant, weight }), className)}>{children}</h3>
}
