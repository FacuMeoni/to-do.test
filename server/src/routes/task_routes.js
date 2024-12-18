import { Router } from 'express'
import { createTask, deleteTask, getTaskByID, updateTask } from '../controllers/task_controller.js'
import { TryCatch } from '../utils/try_catch.js'
import { validateJwtToken } from '../middlewares/jwt_validations.js'

const Taskrouter = Router()

Taskrouter.post('/', TryCatch(validateJwtToken), TryCatch(createTask))
Taskrouter.get('/:id', TryCatch(validateJwtToken), TryCatch(getTaskByID))
Taskrouter.patch('/:id', TryCatch(validateJwtToken), TryCatch(updateTask))
Taskrouter.delete('/:id', TryCatch(validateJwtToken), TryCatch(deleteTask))

export default Taskrouter
