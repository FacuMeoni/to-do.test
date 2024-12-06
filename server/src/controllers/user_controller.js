import { NotFoundError, ValidationError } from '../utils/errors.js'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/index.js'
import { validateUser } from '../validations/user_validations.js'

export const createUser = async (req, res) => {
  const { username, password } = req.body

  validateUser({ username, password })

  const userExists = await UserModel.findOne({ where: { username } })
  if (userExists) throw new ValidationError('Username already exists')

  const hashedPass = await bcrypt.hash(password, 10)
  if (!hashedPass) throw new Error()

  const newUser = await UserModel.create({
    username,
    password: hashedPass
  })

  if (!newUser) throw new Error()

  return res.status(201).json({
    success: true,
    user: {
      id: newUser.id,
      username
    }
  })
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  const user = await UserModel.findOne({
    where: { username }
  })
  if (!user) throw new NotFoundError('Username dont exists.')

  const passValidation = await bcrypt.compare(password, user.password)
  if (!passValidation) throw new ValidationError('Password is incorrect.')

  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      username
    }
  })
}
