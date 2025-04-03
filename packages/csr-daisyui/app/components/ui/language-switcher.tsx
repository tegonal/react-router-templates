import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { Button } from '~/components/ui/button.tsx'
import { useLang } from '~/hooks/use-lang.tsx'
import { i18nConfig } from '~/i18n.ts'

export const LanguageSwitcher: React.FC = () => {
	const { lang } = useLang()
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()

	const supportedLngs = i18nConfig.supportedLngs || []

	const changeLanguage = async (language: string) => {
		await i18n.changeLanguage(language).then(async () => {
			await navigate(window.location.pathname)
		})
	}

	return (
		<div title={t('language.switcher.title', 'Change Language')} className="flex gap-2">
			{supportedLngs
				.filter((each) => each !== lang)
				.map((each) => (
					<Button
						size="sm"
						variant="ghost"
						onClick={() => changeLanguage(each)}
						key={each}
						className="hover:underline">
						{each.toUpperCase()}
					</Button>
				))}
		</div>
	)
}
