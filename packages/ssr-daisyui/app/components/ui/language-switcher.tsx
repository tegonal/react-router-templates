import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

import { Button } from '~/components/ui/button.tsx'
import { useLang } from '~/hooks/use-lang.tsx'
import { i18nConfig } from '~/i18n-config.ts'

export const LanguageSwitcher: React.FC = () => {
	const { lang } = useLang()
	const { t } = useTranslation()
	const location = useLocation()

	return (
		<div className="flex gap-2" title={t('language.switcher.title', 'Change Language')}>
			{i18nConfig.supportedLngs
				.filter((each) => each !== lang)
				.map((each) => (
					<Link key={each} reloadDocument={true} to={location.pathname.replace(lang, each)}>
						<Button size="xs" variant="ghost">
							{each.toUpperCase()}
						</Button>
					</Link>
				))}
		</div>
	)
}
