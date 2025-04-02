import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '~/lib/utils.ts'

const variants = cva('mb-8 font-extrabold tracking-tight', {
	variants: {
		variant: {
			xs: 'text-xl md:text-2xl lg:text-3xl',
			sm: 'text-2xl md:text-3xl lg:text-4xl',
			md: 'text-3xl md:text-4xl lg:text-5xl',
			lg: 'text-4xl md:text-5xl lg:text-6xl',
			xl: 'text-5xl md:text-6xl lg:text-7xl',
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
		weight: 'extrabold',
		align: 'left',
	},
})

export interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export const H1: React.FC<Props> = ({ children, variant, weight, align, className }) => {
	return <h1 className={cn(variants({ variant, weight, align }), className)}>{children}</h1>
}
