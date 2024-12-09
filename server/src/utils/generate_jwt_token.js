import jwt from 'jsonwebtoken'
import { SECRET_PASSWORD_KEY } from '../config/variable_provider.js'

export const generateJWT = async ({ id, username }) => {
  const token = jwt.sign({ id, username },
    SECRET_PASSWORD_KEY,
    { expiresIn: '1h' }
  )
  if (!token) throw new Error()

  return token
}
