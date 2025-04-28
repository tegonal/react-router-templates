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
		<div title={t('language.switcher.title', 'Change Language')} className="flex gap-2">
			{i18nConfig.supportedLngs
				.filter((each) => each !== lang)
				.map((each) => (
					<Link to={location.pathname.replace(lang, each)} key={each} reloadDocument={true}>
						<Button variant="ghost" size="xs">
							{each.toUpperCase()}
						</Button>
					</Link>
				))}
		</div>
	)
}
