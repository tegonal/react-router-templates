import { cva, type VariantProps } from 'class-variance-authority'
import { type SVGProps } from 'react'

import { cn } from '~/lib/utils'

import LogoFile from './logos/logo.svg?react'

const variants = cva([''], {
	defaultVariants: {
		variant: 'md',
	},
	variants: {
		variant: {
			lg: 'h-auto w-12',
			md: 'h-auto w-8',
			sm: 'h-auto w-6',
			xl: 'h-auto w-16',
			xs: 'h-auto w-3',
		},
	},
})

interface Props extends SVGProps<SVGSVGElement>, VariantProps<typeof variants> {
	className?: string
}

export const Logo: React.FC<Props> = ({ className, variant }) => {
	return (
		<div className={cn([variants({ variant }), className])}>
			<LogoFile className="object-contain" />
		</div>
	)
}
