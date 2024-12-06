import server from './src/config/server.js'
import sequelize from './src/config/db.js'
import { PORT } from './src/config/variable_provider.js'
import './src/models/index.js'

server.listen(PORT, async () => {
  try {
    console.log(`😎 server running in: http://localhost:${PORT} `)

    await sequelize.authenticate()
    console.log('✅ Connection has been established successfully.')

    await sequelize.sync({ force: false })
    console.log('✅ Syncronization has been established successfully.')
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.errors)
  }
})
