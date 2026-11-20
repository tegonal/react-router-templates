import { type ILogObj, type ISettingsParam, Logger } from 'tslog'

const dev: ISettingsParam<ILogObj> = { minLevel: 2, type: 'pretty' }
// JSON output defaults to `stack.capture: 'off'`, so no code positions are logged in production
const prod: ISettingsParam<ILogObj> = { minLevel: 3, type: 'json' }

const logger: Logger<ILogObj> = new Logger(process.env.NODE_ENV === 'production' ? prod : dev)

export { logger }
