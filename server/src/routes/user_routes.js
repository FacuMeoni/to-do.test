import { Router } from 'express'
import { createUser, loginUser } from '../controllers/user_controller.js'
import { TryCatch } from '../utils/try_catch.js'
import { getUserTasks } from '../controllers/task_controller.js'

const UserRouter = Router()

UserRouter.post('/register', TryCatch(createUser))
UserRouter.post('/login', TryCatch(loginUser))
UserRouter.get('/task/:id', TryCatch(getUserTasks))

export default UserRouter
