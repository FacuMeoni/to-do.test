import z from 'zod'

export const taskSchema = z.object({
  title: z.string({ invalid_type_error: 'Title must be an string' }).trim().optional(),
  condition: z.enum(['hecha', 'proceso', 'descartada'], { message: 'Condition must be: hecha, proceso or descartada', required_error: 'Condition is required' }),
  description: z.string({ invalid_type_error: 'Description must be an string' }).optional(),
  disabled: z.boolean({ invalid_type_error: 'Disabled must be a boolean' }).optional()
})
