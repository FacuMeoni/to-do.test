import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

export const {
  PORT = 3000,
  DB_PORT,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  ALLOWED_ORIGINS
} = process.env
