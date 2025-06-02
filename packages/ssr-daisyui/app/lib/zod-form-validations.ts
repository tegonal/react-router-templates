import { z } from 'zod'

import { t } from '~/lib/t-dummy.ts'

export const zIsRequired = z.string().min(1, { message: 'form.errors.required' })
t('form.errors.required', 'This field is required')

export const zIsEmail = z.string().email({ message: 'form.errors.invalid.email' })
t('form.errors.invalid.email', 'Invalid email address')
