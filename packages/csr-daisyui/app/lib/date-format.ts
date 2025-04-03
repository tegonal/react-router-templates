import { format, formatRelative } from 'date-fns'
import { DateLocales } from '~/config/date-locales'

export const dateFormat = (
	inputDate: string | Date,
	formatStr: any = 'PP',
	locale: string,
): string => {
	if (!inputDate) return ''
	const date = inputDate instanceof Date ? inputDate : new Date(inputDate)
	return format(date, formatStr, {
		locale: DateLocales[locale],
	})
}

export const dateFormatRelative = (inputDate: string | Date, locale: string): string => {
	if (!inputDate) return ''
	const date = typeof inputDate === 'string' ? new Date(inputDate) : inputDate
	return formatRelative(date, new Date(), {
		locale: DateLocales[locale],
	})
}
