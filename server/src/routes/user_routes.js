import { Router } from 'express'
import { createUser } from '../controllers/user_controller.js'
import { TryCatch } from '../middlewares/try_catch.js'
import { getUserTasks } from '../controllers/task_controller.js'

const UserRouter = Router()

UserRouter.post('/register', TryCatch(createUser))
UserRouter.get('/task/:id', TryCatch(getUserTasks))

export default UserRouter
