import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

import { Button } from '~/components/ui/button.tsx'
import { useLang } from '~/hooks/use-lang.tsx'
import { i18nConfig } from '~/i18n.ts'

export const LanguageSwitcher: React.FC = () => {
	const { lang } = useLang()
	const { i18n, t } = useTranslation()
	const navigate = useNavigate()

	const supportedLngs = i18nConfig.supportedLngs || []

	const changeLanguage = async (language: string) => {
		await i18n.changeLanguage(language).then(async () => {
			await navigate(window.location.pathname)
		})
	}

	return (
		<div className="flex gap-2" title={t('language.switcher.title', 'Change Language')}>
			{supportedLngs
				.filter((each) => each !== lang)
				.map((each) => (
					<Button
						className="hover:underline"
						key={each}
						onClick={() => changeLanguage(each)}
						size="sm"
						variant="ghost">
						{each.toUpperCase()}
					</Button>
				))}
		</div>
	)
}
