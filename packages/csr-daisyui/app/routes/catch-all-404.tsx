import { useTranslation } from 'react-i18next'

import { H1 } from '~/components/typography/h1.tsx'
import { P } from '~/components/typography/p.tsx'

export const CatchAll404: React.FC = () => {
	const { t } = useTranslation()
	return (
		<div className="flex flex-col items-center justify-center gap-8 py-24">
			<H1>{t('common.404.title', 'Page not found')}</H1>
			<P>{t('common.404.message', 'The page you were looking for does not exist.')}</P>
		</div>
	)
}
