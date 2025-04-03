import { useTranslation } from 'react-i18next'
import { href, Link } from 'react-router'
import { Container } from '~/components/theme/container.tsx'
import { Logo } from '~/components/theme/logo.tsx'
import { useLang } from '~/hooks/use-lang.tsx'
import { type MenuItem } from '~/types/menu-item.ts'

export const Header: React.FC = () => {
	const { t } = useTranslation()
	const { lang } = useLang()

	const menu: MenuItem[] = [
		{
			path: (lang: string) => href('/:lang?/home', { lang }),
			name: t('menu.home.name', 'Home'),
		},
		{
			path: (lang: string) => href('/:lang?/form', { lang }),
			name: t('menu.form.name', 'Example Form'),
		},
	]

	return (
		<Container as="header" className="py-4">
			<div className="navbar">
				<div className="flex flex-1 flex-row items-center gap-2">
					<Link to={href('/')} className="btn btn-ghost btn-sm flex flex-row gap-3 text-xl">
						<Logo variant="sm" />
						<span>{t('header.title', 'ACME Inc.')}</span>
					</Link>
				</div>
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						{menu?.map((each, idx) => (
							<li key={idx}>
								<Link to={each.path(lang)}>{t(each.name)}</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Container>
	)
}
