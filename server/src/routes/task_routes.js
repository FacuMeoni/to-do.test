import { Router } from 'express'
import { createTask } from '../controllers/task_controller.js'
import { TryCatch } from '../middlewares/try_catch.js'

const Taskrouter = Router()

Taskrouter.post('/', TryCatch(createTask))

export default Taskrouter
