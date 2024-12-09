import { TaskModel, UserModel } from '../models/index.js'
import { NotFoundError, UnauthorizedError } from '../utils/errors.js'
import { validateTask, partialValidateTask } from '../validations/task_validations.js'
import { validateUUID } from '../validations/uuid_validations.js'

export const createTask = async (req, res) => {
  const { title, description, condition } = req.body
  const userId = req.session.user.id

  const validatedUserID = validateUUID(userId)
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
  const { id } = req.session.user
  const validatedUserID = validateUUID(id)
  const user = await UserModel.findByPk(validatedUserID)
  if (!user) throw new NotFoundError('User not found, verify ID.')

  const allTasks = await TaskModel.findAll({ where: { userId: validatedUserID } })
  if (!allTasks) throw NotFoundError('User dont have any task yet.')

  return res.status(200).json({
    success: true,
    allTasks
  })
}

export const getTaskByID = async (req, res) => {
  const { id } = req.params

  const validatedID = validateUUID(id)

  const task = await TaskModel.findByPk(validatedID)
  if (!task) throw new NotFoundError(`Not found any task with id ${validatedID}`)

  return res.status(200).json({
    success: true,
    task
  })
}

export const updateTask = async (req, res) => {
  const { id } = req.params
  const userId = req.session.user.id
  const { name, description, condition } = req.body

  const validatedID = validateUUID(id)
  const validatedTask = partialValidateTask({ name, description, condition })

  const taskToUpdate = await TaskModel.findByPk(validatedID)

  if (taskToUpdate.userId !== userId) throw new UnauthorizedError('This task does not belong to the user')

  if (!taskToUpdate)NotFoundError(`Not found any task with id ${validatedID}`)

  const taskUpdated = await taskToUpdate.update({ ...validatedTask })
  if (!taskUpdated) throw new Error()

  return res.status(200).json({
    success: true,
    taskUpdated
  })
}
