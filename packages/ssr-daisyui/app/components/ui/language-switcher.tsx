import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'

import { Button } from '~/components/ui/button.tsx'
import { useLang } from '~/hooks/use-lang.tsx'
import { i18nConfig } from '~/i18n-config.ts'

export const LanguageSwitcher: React.FC = () => {
	const { lang } = useLang()
	const { t } = useTranslation()
	const location = useLocation()

	const getLocalizedPath = (targetLang: string) => {
		const segments = location.pathname.split('/')
		// Check if the first segment (after empty string from leading /) is a supported language
		if (segments[1] && i18nConfig.supportedLngs.includes(segments[1])) {
			// Replace the language segment
			segments[1] = targetLang
			return segments.join('/')
		}
		// If no language in path, assume we're at root and redirect to home with language
		return `/${targetLang}/home`
	}

	return (
		<div className="flex gap-2" title={t('language.switcher.title', 'Change Language')}>
			{i18nConfig.supportedLngs
				.filter((each) => each !== lang)
				.map((each) => (
					<Link key={each} reloadDocument={true} to={getLocalizedPath(each)}>
						<Button size="xs" variant="ghost">
							{each.toUpperCase()}
						</Button>
					</Link>
				))}
		</div>
	)
}
