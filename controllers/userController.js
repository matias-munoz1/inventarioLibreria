// controllers/userController.js
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, 'secret_key', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Bienvenido!', user, token });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  const { emails } = req.body;

  try {
    const users = await User.findAll({ where: { email: emails } });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    await User.destroy({ where: { email: emails } });

    const deletedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    const filePath = path.join(__dirname, '..', 'deletedUsers.json');
    fs.writeFileSync(filePath, JSON.stringify(deletedUsers, null, 2), 'utf-8');

    res
      .status(200)
      .json({ message: 'Users deleted successfully', deletedUsers });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    await User.destroy({ where: {}, truncate: true });
    res.status(200).json({ message: 'All users deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
