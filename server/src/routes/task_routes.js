import { Router } from 'express'
import { createTask, getTaskByID } from '../controllers/task_controller.js'
import { TryCatch } from '../utils/try_catch.js'
import { validateJwtToken } from '../middlewares/jwt_validations.js'

const Taskrouter = Router()

Taskrouter.post('/', TryCatch(validateJwtToken), TryCatch(createTask))
Taskrouter.get('/:id', TryCatch(validateJwtToken), TryCatch(getTaskByID))

export default Taskrouter
