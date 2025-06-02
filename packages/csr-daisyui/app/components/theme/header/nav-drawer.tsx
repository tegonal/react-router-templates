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

	const close = () => setIsOpen(false)
	const toggle = () => setIsOpen((prev) => !prev)

	const menu: MenuItem[] = [
		{
			name: t('menu.home.name', 'Home'),
			path: (lang: string) => href('/home', { lang }),
		},
		{
			name: t('menu.form.name', 'Example Form'),
			path: (lang: string) => href('/form', { lang }),
		},
	]

	return (
		<div className="drawer">
			<input checked={isOpen} className="drawer-toggle" id={id} onChange={toggle} type="checkbox" />
			<div className="drawer-content flex flex-col">
				<div className="navbar bg-base-300 flex w-full">
					<div className="flex-none lg:hidden">
						<button aria-label="open sidebar" className="btn btn-square btn-ghost" onClick={toggle}>
							<MenuIcon />
						</button>
					</div>
					<div className="mx-2 flex-1 justify-items-end px-2 md:justify-items-start">
						<Link className="btn btn-ghost btn-sm flex flex-row gap-3 text-xl" to={href('/')}>
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
					aria-label="close sidebar"
					className="drawer-overlay"
					htmlFor={id}
					onClick={close}></label>
				<ul className="menu bg-base-200 min-h-full w-80 p-4">
					{menu?.map((each, idx) => (
						<li key={idx}>
							<Link onClick={close} to={each.path(lang)}>
								{t(each.name)}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
