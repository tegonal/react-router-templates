import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '~/lib/utils.ts'

const variants = cva('mb-6 tracking-tight', {
	variants: {
		variant: {
			xs: 'text-base md:text-lg lg:text-xl',
			sm: 'text-lg md:text-xl lg:text-2xl',
			md: 'text-xl md:text-2xl lg:text-3xl',
			lg: 'text-2xl md:text-3xl lg:text-4xl',
			xl: 'text-3xl md:text-4xl lg:text-5xl',
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
		weight: 'semibold',
		align: 'left',
	},
})

export interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export const H3: React.FC<Props> = ({ children, variant, weight, align, className }) => {
	return <h3 className={cn(variants({ variant, weight, align }), className)}>{children}</h3>
}
