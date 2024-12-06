import { AppError } from '../utils/errors.js'

export const errhandler = (err, req, res, next) => {
  if (err.name === 'ZodError') {
    return res.status(404).json({
      success: false,
      type: 'Validation Error',
      errors: err.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message,
        expected: issue.expected,
        received: issue.received
      }))
    })
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      type: err.name,
      message: err.message
    })
  }

  console.log(err)

  return res.status(500).json({
    success: false,
    type: 'Internal Server Error',
    message: 'Something go wrong, please try later.'
  })
}
