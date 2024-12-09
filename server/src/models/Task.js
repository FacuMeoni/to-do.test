import sequelize from '../config/db.js'
import { DataTypes } from 'sequelize'

export const TaskModel = sequelize.define('task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING
  },
  condition: {
    type: DataTypes.ENUM('hecha', 'proceso', 'descartada'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})
