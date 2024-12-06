import { AppError } from '../utils/errors.js'

export const errhandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.name,
      message: err.message
    })
  }

  console.log(err)

  return res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: 'Something go wrong, please try later.'
  })
}
