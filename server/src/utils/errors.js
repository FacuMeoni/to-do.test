export class AppError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = this.constructor.name
  }
}

export class ValidationError extends AppError {
  name = 'Validation Error'
  constructor (message) {
    super(message, 400)
  }
}

export class NotFoundError extends AppError {
  name = 'Not Found Error'
  constructor (message) {
    super(message, 404)
  }
}

export class UnauthorizedError extends AppError {
  name = 'Unauthorized Error'
  constructor (message, statusCode = 401) {
    super(message, statusCode)
  }
}
