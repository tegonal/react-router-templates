export type MenuItem = {
	path: (...args: any) => string
	name: string
	icon?: React.ReactElement
	children?: MenuItem[]
}
