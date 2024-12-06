import cors from 'cors'

export const CorsMiddleware = (ALLOWED_ORIGINS = {}) => cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error(`Origin ${origin} not allowed by Cors`))
    }
  },
  methods: ['GET', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-type', 'Authorization']
})
