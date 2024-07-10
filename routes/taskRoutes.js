// taskRoutes.js
import express from 'express';
import { check, validationResult } from 'express-validator';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// Ruta para obtener todas las tareas
router.get('/tasks', getAllTasks);

router.get('/tasks/:id', getTaskById);

// Ruta para crear una nueva tarea con validación de datos
router.post(
  '/tasks',
  [
    check('title')
      .isString()
      .notEmpty()
      .withMessage('Title is required and should be a string'),
    check('description')
      .isString()
      .notEmpty()
      .withMessage('Description is required and should be a string'),
    check('status').isBoolean().withMessage('Status should be a boolean'),
    check('stock')
      .isInt({ min: 0 })
      .withMessage('Stock should be a non-negative integer'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createTask
);

// Ruta para actualizar una tarea existente con validación de datos
router.put(
  '/tasks/:id',
  [
    check('title')
      .isString()
      .notEmpty()
      .withMessage('Title is required and should be a string'),
    check('description')
      .isString()
      .notEmpty()
      .withMessage('Description is required and should be a string'),
    check('status').isBoolean().withMessage('Status should be a boolean'),
    check('stock')
      .isInt({ min: 0 })
      .withMessage('Stock should be a non-negative integer'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  updateTask
);

// Ruta para eliminar una tarea existente
router.delete('/tasks/:id', deleteTask);

export default router;
