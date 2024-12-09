import { Router } from 'express'
import { createUser, loginUser, logoutUser } from '../controllers/user_controller.js'
import { TryCatch } from '../utils/try_catch.js'
import { getUserTasks } from '../controllers/task_controller.js'
import { validateJwtToken } from '../middlewares/jwt_validations.js'

const UserRouter = Router()

UserRouter.post('/auth/register', (TryCatch(createUser)))
UserRouter.post('/auth/login', TryCatch(loginUser))
UserRouter.post('/auth/logout', TryCatch(validateJwtToken), TryCatch(logoutUser))
UserRouter.get('/task', TryCatch(validateJwtToken), TryCatch(getUserTasks))

export default UserRouter
