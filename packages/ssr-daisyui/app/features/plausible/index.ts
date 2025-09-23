export { plausibleClientEvent } from './events/plausible-client-event.ts'

export { plausibleServerEvent } from './events/plausible-server-event.ts'

export {
	GenericAppEvents,
	type PlausibleEventNames,
	UserActionEvents,
} from './types/event-names.ts'

export type {
	ActionEvent,
	PlausibleClientEventOptions,
	PlausibleEventOptions,
	PlausibleServerEventOptions,
	UserActionEvent,
} from './types/types.ts'

export { getHostname } from './utils/get-hostname.ts'

export { getPathname } from './utils/get-pathname.ts'
