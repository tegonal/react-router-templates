import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils.ts'

const variants = cva('mb-6 tracking-tight', {
	defaultVariants: {
		align: 'left',
		variant: 'md',
		weight: 'medium',
	},
	variants: {
		align: {
			center: 'text-center',
			left: 'text-left',
			right: 'text-right',
		},
		variant: {
			lg: 'text-xl md:text-2xl lg:text-3xl',
			md: 'text-lg md:text-xl lg:text-2xl',
			sm: 'text-base md:text-lg lg:text-xl',
			xl: 'text-2xl md:text-3xl lg:text-4xl',
			xs: 'text-sm md:text-base lg:text-lg',
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

export const H4: React.FC<Props> = ({ align, children, className, variant, weight }) => {
	return <h4 className={cn(variants({ align, variant, weight }), className)}>{children}</h4>
}
