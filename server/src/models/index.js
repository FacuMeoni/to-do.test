import { TaskModel } from './Task.js'
import { UserModel } from './User.js'

UserModel.hasMany(TaskModel, {
  onUpdate: 'CASCADE'
})

TaskModel.belongsTo(UserModel, {
  foreignKey: 'userId'
})

export { TaskModel, UserModel }
