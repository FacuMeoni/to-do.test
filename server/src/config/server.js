import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import Taskrouter from '../routes/task_routes.js'
import UserRouter from '../routes/user_routes.js'
import { errhandler } from '../middlewares/err_handler.js'
import { CorsMiddleware } from '../middlewares/cors.js'
import { ALLOWED_ORIGINS } from './variable_provider.js'

const server = express()

server.use(morgan('dev'))
server.use(express.json())
server.use(cookieParser())
server.use(CorsMiddleware(ALLOWED_ORIGINS))

server.use('/task', Taskrouter)
server.use('/user', UserRouter)
server.use('/', (req, res) => {
  return res.status(404).json({ message: 'Route not found' })
})

server.use(errhandler)

export default server
