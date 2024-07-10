import express from 'express';
import { check, validationResult } from 'express-validator';
import {
  loginUser,
  deleteUsers,
  getAllUsers,
  deleteAllUsers,
} from '../controllers/usercontroller.js';

const router = express.Router();

router.post('/login', loginUser);

router.delete(
  '/deleteUsers',
  [
    check('emails')
      .isArray()
      .withMessage('Emails should be an array of strings'),
    check('emails.*')
      .isEmail()
      .withMessage('Each email should be a valid email address'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  deleteUsers
);

// Nueva ruta para obtener todos los usuarios
router.get('/users', getAllUsers);

// Nueva ruta para eliminar todos los usuarios
router.delete('/users', deleteAllUsers);

export default router;
