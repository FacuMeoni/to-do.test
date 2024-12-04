import { Router } from 'express'
import { createTask } from '../controllers/task_controller.js'

const Taskrouter = Router()

Taskrouter.post('/', createTask)

export default Taskrouter
