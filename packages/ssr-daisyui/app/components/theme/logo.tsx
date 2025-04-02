import LogoFile from './logos/logo.svg?react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'
import { SVGProps } from 'react'

const variants = cva([''], {
	variants: {
		variant: {
			xs: 'h-auto w-3',
			sm: 'h-auto w-6',
			md: 'h-auto w-8',
			lg: 'h-auto w-12',
			xl: 'h-auto w-16',
		},
	},
	defaultVariants: {
		variant: 'md',
	},
})

interface Props extends VariantProps<typeof variants>, SVGProps<SVGSVGElement> {
	className?: string
}

export const Logo: React.FC<Props> = ({ variant, className }) => {
	return (
		<div className={cn([variants({ variant }), className])}>
			<LogoFile className={'object-contain'} />
		</div>
	)
}
