import { taskSchema } from './schemas/task_schema.js'

export const validateTask = (task) => {
  const validatedTask = taskSchema.safeParse(task)

  if (validatedTask.error) throw validatedTask.error

  return validatedTask.data
}

export const partialValidateTask = (task) => {
  const validatedTask = taskSchema.partial().safeParse(task)

  if (validatedTask.error) throw validatedTask.error

  return validatedTask.data
}
