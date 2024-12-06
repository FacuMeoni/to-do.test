import { TaskModel, UserModel } from '../models/index.js'
import { NotFoundError } from '../utils/errors.js'
import { validateTask } from '../validations/task_validations.js'
import { validateUserID } from '../validations/user_validations.js'

export const createTask = async (req, res) => {
  const { title, description, condition, userId } = req.body

  const validatedUserID = validateUserID(userId)
  const user = await UserModel.findByPk(validatedUserID)
  if (!user) throw new NotFoundError('User not found, verify ID.')

  const validatedTask = validateTask({ title, condition, description })
  const newTask = await TaskModel.create({ ...validatedTask, userId: validatedUserID })
  if (!newTask) throw new Error('Error creating task, please try again later')

  return res.status(201).json({
    success: true,
    newTask
  })
}

export const getUserTasks = async (req, res) => {
  const { id } = req.params
  const validatedUserID = validateUserID(id)
  const user = await UserModel.findByPk(validatedUserID)
  if (!user) throw new NotFoundError('User not found, verify ID.')

  const allTasks = await TaskModel.findAll({ where: { userId: validatedUserID } })
  if (!allTasks) throw NotFoundError('User dont have any task yet.')

  return res.status(200).json({
    success: true,
    allTasks
  })
}
