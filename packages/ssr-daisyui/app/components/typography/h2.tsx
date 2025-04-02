import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '~/lib/utils.ts'

const variants = cva('mb-6 tracking-tight', {
	variants: {
		variant: {
			xs: 'text-lg md:text-xl lg:text-2xl',
			sm: 'text-xl md:text-2xl lg:text-3xl',
			md: 'text-2xl md:text-3xl lg:text-4xl',
			lg: 'text-3xl md:text-4xl lg:text-5xl',
			xl: 'text-4xl md:text-5xl lg:text-6xl',
		},
		weight: {
			normal: 'font-normal',
			medium: 'font-medium',
			semibold: 'font-semibold',
			bold: 'font-bold',
			extrabold: 'font-extrabold',
		},
		align: {
			left: 'text-left',
			center: 'text-center',
			right: 'text-right',
		},
	},
	defaultVariants: {
		variant: 'md',
		weight: 'bold',
		align: 'left',
	},
})

export interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export const H2: React.FC<Props> = ({ children, variant, weight, align, className }) => {
	return <h2 className={cn(variants({ variant, weight, align }), className)}>{children}</h2>
}
