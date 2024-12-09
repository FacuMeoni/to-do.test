import { NotFoundError, ValidationError } from '../utils/errors.js'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/index.js'
import { validateUser } from '../validations/user_validations.js'
import { validateUUID } from '../validations/uuid_validations.js'
import { generateJWT } from '../utils/generate_jwt_token.js'
import crypto from 'node:crypto'

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

  const token = await generateJWT({ id: newUser.id, username: newUser.username })

  return res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60
    })
    .status(201).json({ success: true, user: { id: newUser.id, username } })
}

export const createGuessUser = async (req, res) => {
  const username = `Guess_${crypto.randomUUID()}`

  const guessUser = await UserModel.create({ username })

  if (!guessUser) throw new Error()

  const token = await generateJWT({ id: guessUser.id, username: guessUser.username })

  return res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60
    })
    .status(201).json({ success: true, user: { id: guessUser.id, username } })
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body

  const user = await UserModel.findOne({
    where: { username }
  })
  if (!user) throw new NotFoundError('Username dont exists.')

  const passValidation = await bcrypt.compare(password, user.password)
  if (!passValidation) throw new ValidationError('Password is incorrect.')

  const token = await generateJWT({ id: user.id, username: user.username })

  return res
    .cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60
    })
    .status(200).json({ success: true, user: { id: user.id, username: user.username } })
}

export const logoutUser = async (req, res) => {
  return res
    .clearCookie('access_token')
    .status(200).json({ success: true })
}

export const logoutGuessUser = async (req, res) => {
  const { id } = req.session.user
  const validatedID = validateUUID(id)
  const userToDelete = await UserModel.findByPk(validatedID)
  if (!userToDelete) throw new NotFoundError('User not found')

  try {
    await userToDelete.destroy()
  } catch (error) {
    throw new Error()
  }
  return res.clearCookie('access_token').status(200).json({ success: true })
}
