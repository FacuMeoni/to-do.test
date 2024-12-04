import TaskModel from '../models/Task.js'

export const createTask = async (req, res) => {
  const { title, description, condition } = req.body
  if (!condition) return res.status(404).json({ success: false, message: 'Falta la condicición' })

  const newTask = await TaskModel.create({
    title,
    condition,
    description
  })

  if (!newTask) return res.status(500).json({ success: false, message: 'Error interno, intente más tarde.' })

  return res.status(200).json({
    success: true,
    newTask
  })
}
