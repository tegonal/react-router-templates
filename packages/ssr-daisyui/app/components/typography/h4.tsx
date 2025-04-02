import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '~/lib/utils.ts'

const variants = cva('mb-6 tracking-tight', {
	variants: {
		variant: {
			xs: 'text-sm md:text-base lg:text-lg',
			sm: 'text-base md:text-lg lg:text-xl',
			md: 'text-lg md:text-xl lg:text-2xl',
			lg: 'text-xl md:text-2xl lg:text-3xl',
			xl: 'text-2xl md:text-3xl lg:text-4xl',
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
		weight: 'medium',
		align: 'left',
	},
})

export interface Props extends VariantProps<typeof variants> {
	children?: React.ReactNode
	className?: string
}

export const H4: React.FC<Props> = ({ children, variant, weight, align, className }) => {
	return <h4 className={cn(variants({ variant, weight, align }), className)}>{children}</h4>
}
