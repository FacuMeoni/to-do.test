import z from 'zod'

export const userSchema = z.object({
  username: z.string({
    required_error: 'Username are required',
    invalid_type_error: 'Username must be and string'
  }).min(3, { message: 'Username must be almost 3 characters long' }).trim(),
  password: z.string({
    required_error: 'Password are required'
  }).min(5, { message: 'Password must be almost 5 characters long' })
})
