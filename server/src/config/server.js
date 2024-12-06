import express from 'express'
import morgan from 'morgan'
import Taskrouter from '../routes/task_routes.js'
import UserRouter from '../routes/user_routes.js'
import { errhandler } from '../middlewares/err_handler.js'

const server = express()

server.use(morgan('dev'))
server.use(express.json())

server.use('/task', Taskrouter)
server.use('/user', UserRouter)

server.use(errhandler)

export default server
