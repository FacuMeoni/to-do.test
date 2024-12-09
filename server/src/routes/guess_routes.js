import { Router } from 'express'
import { createGuessUser, logoutGuessUser } from '../controllers/user_controller.js'
import { TryCatch } from '../utils/try_catch.js'
import { validateJwtToken } from '../middlewares/jwt_validations.js'

const GuessRouter = Router()

GuessRouter.post('/auth/register', (TryCatch(createGuessUser)))
GuessRouter.post('/auth/logout', TryCatch(validateJwtToken), (TryCatch(logoutGuessUser)))

export default GuessRouter
