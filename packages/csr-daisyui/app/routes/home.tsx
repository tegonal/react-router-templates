import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { useLang } from '~/hooks/use-lang.tsx'
import { markdownComponents } from '~/lib/markdown-components.tsx'

export const Home: React.FC = () => {
	const { lang } = useLang()
	const [markdown, setMarkdown] = useState<string>('')

	useEffect(() => {
		const fetchMarkdown = async () => {
			try {
				const response = await fetch(`${import.meta.env.BASE_URL}md-content/home.${lang}.md`)
				if (!response.ok) {
					console.error('Error fetching markdown:', response.statusText)
					setMarkdown('Failed to fetch markdown')
					return
				}
				const text = await response.text()
				setMarkdown(text)
			} catch (error) {
				console.error('Error fetching markdown:', error)
				setMarkdown('Error fetching markdown: ${error}')
			}
		}

		void fetchMarkdown()
	}, [lang])

	return <Markdown components={markdownComponents}>{markdown}</Markdown>
}
