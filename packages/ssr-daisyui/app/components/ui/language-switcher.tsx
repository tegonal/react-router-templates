import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'
import { useLang } from '~/hooks/use-lang.tsx'
import i18n from '~/i18n.ts'

export const LanguageSwitcher: React.FC = () => {
	const { lang } = useLang()
	const { t } = useTranslation()
	const location = useLocation()

	return (
		<div title={t('language.switcher.title', 'Change Language')} className="flex gap-2">
			{i18n.supportedLngs
				.filter((each) => each !== lang)
				.map((each) => (
					<Link to={location.pathname.replace(lang, each)} key={each}>
						{each.toUpperCase()}
					</Link>
				))}
		</div>
	)
}
