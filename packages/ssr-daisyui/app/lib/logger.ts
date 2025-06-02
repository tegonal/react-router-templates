import { type ILogObj, Logger } from 'tslog'

const dev: ILogObj = { minLevel: 2, type: 'pretty' }
const prod: ILogObj = { hideLogPositionForProduction: true, minLevel: 3, type: 'json' }

const logger: Logger<ILogObj> = new Logger(process.env.NODE_ENV === 'production' ? prod : dev)

export { logger }
