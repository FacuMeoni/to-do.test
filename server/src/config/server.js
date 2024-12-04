import express from 'express'
import morgan from 'morgan'
import Taskrouter from '../routes/task_routes.js'

const server = express()

server.use(morgan('dev'))
server.use(express.json())

server.use('/task', Taskrouter)

export default server
