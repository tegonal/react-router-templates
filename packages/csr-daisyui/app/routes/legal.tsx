import React from 'react'
import { useTranslation } from 'react-i18next'

import { H1 } from '~/components/typography/h1.tsx'

export const Legal: React.FC = () => {
	const { t } = useTranslation()
	return <H1>{t('routes.legal.title', 'Legal')}</H1>
}
