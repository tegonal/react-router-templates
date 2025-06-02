export type MenuItem = {
	children?: MenuItem[]
	icon?: React.ReactElement
	name: string
	path: (...args: any) => string
}
