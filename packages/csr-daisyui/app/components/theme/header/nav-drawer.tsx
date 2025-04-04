import { MenuIcon } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { href, Link } from 'react-router'
import { Logo } from '~/components/theme/logo.tsx'
import { useLang } from '~/hooks/use-lang.tsx'
import { type MenuItem } from '~/types/menu-item.ts'

export const NavDrawer: React.FC = () => {
	const id = React.useId()
	const { t } = useTranslation()
	const { lang } = useLang()
	const [isOpen, setIsOpen] = React.useState(false)

	const open = () => setIsOpen(true)
	const close = () => setIsOpen(false)
	const toggle = () => setIsOpen((prev) => !prev)

	const menu: MenuItem[] = [
		{
			path: (lang: string) => href('/home', { lang }),
			name: t('menu.home.name', 'Home'),
		},
		{
			path: (lang: string) => href('/form', { lang }),
			name: t('menu.form.name', 'Example Form'),
		},
	]

	return (
		<div className="drawer">
			<input id={id} type="checkbox" className="drawer-toggle" checked={isOpen} onChange={toggle} />
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-base-300 flex w-full">
					<div className="flex-none lg:hidden">
						<button onClick={toggle} aria-label="open sidebar" className="btn btn-square btn-ghost">
							<MenuIcon />
						</button>
					</div>
					<div className="mx-2 flex-1 justify-items-end px-2 md:justify-items-start">
						<Link to={href('/')} className="btn btn-ghost btn-sm flex flex-row gap-3 text-xl">
							<Logo variant="sm" />
							<span>{t('header.title', 'ACME Inc.')}</span>
						</Link>
					</div>
					<div className="hidden flex-none lg:block">
						<ul className="menu menu-horizontal">
							{menu?.map((each, idx) => (
								<li key={idx}>
									<Link to={each.path(lang)}>{t(each.name)}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div className="drawer-side z-10">
				<label
					htmlFor={id}
					aria-label="close sidebar"
					className="drawer-overlay"
					onClick={close}></label>
				<ul className="menu bg-base-200 min-h-full w-80 p-4">
					{menu?.map((each, idx) => (
						<li key={idx}>
							<Link to={each.path(lang)} onClick={close}>
								{t(each.name)}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
