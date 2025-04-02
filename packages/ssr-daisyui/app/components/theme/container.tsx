import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { cn } from '~/lib/utils.ts'

const variants = cva('container mx-auto flex max-w-[1280px]', {
	variants: {
		variant: {
			default: 'flex-col gap-8',
			row: 'flex-row gap-8',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

type AsProp<C extends React.ElementType> = {
	as?: C
}

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = React.PropsWithChildren<
	Props & AsProp<C>
> &
	Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

interface LayoutContainerProps extends VariantProps<typeof variants> {
	className?: string
}

export const Container = <C extends React.ElementType = 'div'>({
	as,
	children,
	className,
	variant,
	...rest
}: PolymorphicComponentProp<C, LayoutContainerProps>) => {
	const Component = as || 'div'

	return (
		<Component className={cn(variants({ variant }), className)} {...rest}>
			{children}
		</Component>
	)
}
