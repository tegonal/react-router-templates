import { type ILogObj, Logger } from 'tslog'

const dev: ILogObj = { type: 'pretty', minLevel: 2 }
const prod: ILogObj = { type: 'json', minLevel: 3, hideLogPositionForProduction: true }

const logger: Logger<ILogObj> = new Logger(process.env.NODE_ENV === 'production' ? prod : dev)

export { logger }
