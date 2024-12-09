import jwt from 'jsonwebtoken'
import { SECRET_PASSWORD_KEY } from '../config/variable_provider.js'
import { UnauthorizedError } from '../utils/errors.js'

export const validateJwtToken = async (req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  if (!token) throw new UnauthorizedError('Access token is missing', 401)
  try {
    const data = jwt.verify(token, SECRET_PASSWORD_KEY)
    req.session.user = data
  } catch (error) {
    throw new UnauthorizedError('Unauthorized error.', 403)
  }
  next()
}
