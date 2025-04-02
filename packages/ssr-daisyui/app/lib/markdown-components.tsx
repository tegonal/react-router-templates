import { H1 } from '~/components/typography/h1'
import { H2 } from '~/components/typography/h2'
import { H3 } from '~/components/typography/h3'
import { H4 } from '~/components/typography/h4'
import { Components } from 'react-markdown'
import { P } from '~/components/typography/p.tsx'
import { UL } from '~/components/typography/ul.tsx'
import { CODE } from '~/components/typography/code.tsx'
import { PRE } from '~/components/typography/pre.tsx'
import { OL } from '~/components/typography/ol.tsx'

export const markdownComponents: Components = {
	// Add any custom components you want to use in your markdown here
	// For example, if you want to use a custom p component:
	// p: (props) => <MyParagraph {...props} />,

	h1: (props) => <H1 {...props} />,
	h2: (props) => <H2 {...props} />,
	h3: (props) => <H3 {...props} />,
	h4: (props) => <H4 {...props} />,
	p: (props) => <P {...props} />,
	ul: (props) => <UL {...props} />,
	ol: (props) => <OL {...props} />,
	code: (props) => <CODE {...props} />,
	pre: (props) => <PRE {...props} />,
}
