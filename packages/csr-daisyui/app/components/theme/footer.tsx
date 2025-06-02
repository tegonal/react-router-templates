import { SiGithub, SiMastodon, SiSignal } from '@icons-pack/react-simple-icons'
import { useTranslation } from 'react-i18next'
import { href, Link } from 'react-router'

import { Container } from '~/components/theme/container.tsx'
import { Logo } from '~/components/theme/logo.tsx'
import { LanguageSwitcher } from '~/components/ui/language-switcher.tsx'
import { useLang } from '~/hooks/use-lang.tsx'

export const Footer: React.FC = () => {
	const { t } = useTranslation()
	const { lang } = useLang()
	const currentYear = new Date().getFullYear()

	const menu = [
		{
			items: [
				{
					name: t('menu.home.name', 'Home'),
					path: (lang: string) => href('/home', { lang }),
				},
				{
					name: t('menu.form.name', 'Example Form'),
					path: (lang: string) => href('/form', { lang }),
				},
			],
			section: t('menu.footer.section.products', 'Products'),
		},
		{
			items: [
				{
					name: t('menu.home.name', 'Home'),
					path: (lang: string) => href('/home', { lang }),
				},
				{
					name: t('menu.form.name', 'Example Form'),
					path: (lang: string) => href('/form', { lang }),
				},
			],
			section: t('menu.footer.section.company', 'Company'),
		},
		{
			items: [
				{
					name: t('menu.home.name', 'Home'),
					path: (lang: string) => href('/home', { lang }),
				},
				{
					name: t('menu.form.name', 'Example Form'),
					path: (lang: string) => href('/form', { lang }),
				},
			],
			section: t('menu.footer.section.resources', 'Resources'),
		},
	]
	return (
		<footer className="bg-base-200">
			<Container className="text-base-content py-10">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
					{/* Logo and company info */}
					<div className="col-span-1 lg:col-span-2">
						<Link className="mb-4 flex items-center" to={href('/')}>
							<Logo className="mr-3" variant="xs" />
							<span className="text-lg font-semibold">{t('header.title', 'ACME Inc.')}</span>
						</Link>
						<p className="mb-4 max-w-xs text-sm opacity-80">
							{t(
								'theme.footer.claim',
								'Revolutionizing the industry with our cutting-edge solutions.',
							)}
						</p>
						<div className="mt-4 flex gap-4">
							<a className="btn btn-circle btn-sm btn-ghost" href="#">
								<SiMastodon />
							</a>
							<a className="btn btn-circle btn-sm btn-ghost" href="#">
								<SiGithub />
							</a>
							<a className="btn btn-circle btn-sm btn-ghost" href="#">
								<SiSignal />
							</a>
						</div>
						<div className="mt-4">
							<LanguageSwitcher />
						</div>
					</div>

					{/* Footer link sections */}
					{menu.map((section, index) => (
						<div className="col-span-1" key={index}>
							<h3 className="mb-4 text-lg font-semibold">{t(section.section)}</h3>
							<nav className="flex flex-col space-y-2">
								{section.items.map((link, linkIndex) => (
									<Link
										className="text-sm transition-colors hover:underline"
										key={linkIndex}
										to={link.path(lang)}>
										{t(link.name)}
									</Link>
								))}
							</nav>
						</div>
					))}
				</div>

				<div className="divider my-6"></div>

				<div className="flex flex-col items-center justify-between text-sm md:flex-row">
					<div className="mb-4 md:mb-0">
						{t('theme.footer.copyright', '© {{year}} ACME Inc. - All rights reserved', {
							year: currentYear,
						})}
					</div>
					<div className="flex flex-wrap gap-x-6 gap-y-2">
						<Link className="hover:underline" to={href('/legal')}>
							{t('theme.footer.legalLink', 'Legal information')}
						</Link>
						<Link className="hover:underline" to={href('/privacy')}>
							{t('theme.footer.privacyLink', 'Privacy Policy')}
						</Link>
					</div>
				</div>
			</Container>
		</footer>
	)
}
