import z from 'zod'

export const uuidSchema = z.string({ required_error: 'User id is required' }).uuid({ invalid_type_error: 'Invalid user id' })
