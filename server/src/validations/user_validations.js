import { userSchema } from './schemas/user_schema.js'

export const validateUser = (user) => {
  const validatedUser = userSchema.safeParse(user)

  if (validatedUser.error) throw validatedUser.error

  return validatedUser.data
}

export const partialValidateUser = (user) => {
  const validatedUser = userSchema.partial().safeParse(user)

  if (validatedUser.error) throw validatedUser.error

  return validatedUser.data
}
