import { Router } from 'express'
import { createTask, getTaskByID } from '../controllers/task_controller.js'
import { TryCatch } from '../middlewares/try_catch.js'

const Taskrouter = Router()

Taskrouter.post('/', TryCatch(createTask))
Taskrouter.get('/:id', TryCatch(getTaskByID))

export default Taskrouter
