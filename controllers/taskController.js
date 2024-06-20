import Task from '../models/task.js';

// Obtiene todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtiene una tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(400).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crea una nueva tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const tasks = await Task.findAll({ attributes: ['id'] });
    const ids = tasks.map((task) => task.id);
    let newId = 1;
    while (ids.includes(newId)) {
      newId++;
    }
    const task = await Task.create({ id: newId, title, description, status });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualiza una tarea existente
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = await Task.findByPk(id);
    if (task) {
      task.title = title;
      task.description = description;
      task.status = status;
      await task.save();
      res.status(200).json(task);
    } else {
      res.status(400).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Elimina una tarea y reasigna IDs
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (task) {
      await task.destroy();

      // Reasignar IDs de las tareas restantes
      const tasks = await Task.findAll({ order: [['id', 'ASC']] });
      for (let i = 0; i < tasks.length; i++) {
        tasks[i].id = i + 1;
        await tasks[i].save();
      }

      res.status(204).json();
    } else {
      res.status(400).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
