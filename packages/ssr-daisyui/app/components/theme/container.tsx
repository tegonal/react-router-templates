import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import { cn } from '~/lib/utils.ts'

const variants = cva('container mx-auto flex max-w-[1280px] px-3 md:px-0', {
	defaultVariants: {
		variant: 'default',
	},
	variants: {
		variant: {
			default: 'flex-col gap-8',
			row: 'flex-row gap-8',
		},
	},
})

type AsProp<C extends React.ElementType> = {
	as?: C
}

interface LayoutContainerProps extends VariantProps<typeof variants> {
	className?: string
}

type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>> &
	React.PropsWithChildren<
	AsProp<C> & Props
>

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P)

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
