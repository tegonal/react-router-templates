import { type PlausibleEventNames } from './event-names.ts'

export type ActionEvent = {
  name: 'action'
  props?: Record<string, string>
}

export type PlausibleClientEventOptions =
  | ActionEvent
  | {
      name: PlausibleEventNames
    }

export type PlausibleEventOptions = ActionEvent | UserActionEvent

export type PlausibleServerEventOptions = PlausibleEventOptions & {
  request: Request
}

export type UserActionEvent = {
  name: PlausibleEventNames
  props?: Record<string, number | string>
}
