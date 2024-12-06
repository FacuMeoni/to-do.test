import { uuidSchema } from './schemas/uuid_schema.js'

export const validateUUID = (id) => {
  const validatedID = uuidSchema.safeParse(id)

  if (validatedID.error) throw validatedID.error

  return validatedID.data
}
