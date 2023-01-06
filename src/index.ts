import server from './server'
import { Logger } from './utils/logger'

const NODE_ENV = process.env.NODE_ENV

Logger.setLogger()
server.use(Logger.httpLogger())

/** ESTABLISHING HTTP CONNECTION */
server.get('/', (req, res) => res.status(200).json({ message: 'Thank you for using the TO-DO-LIST API!' }))

if (NODE_ENV !== 'test') server.listen(8080, () => Logger.log('info', 'Server running at localhost:8080'))

export { default } from './server'
