import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta del archivo JSON donde se guardarán los datos de los usuarios
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario por correo electrónico
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Si el usuario no existe, crea uno nuevo
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ email, password: hashedPassword });
    } else {
      // Verifica la contraseña
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    // Guarda el usuario en el archivo JSON
    let users = [];
    if (fs.existsSync(usersFilePath)) {
      const usersData = fs.readFileSync(usersFilePath, 'utf8');
      users = JSON.parse(usersData);
    }
    users.push({ email: user.email, password });
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');

    // Devuelve la información del usuario logueado
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Server error:', error); // Log para depuración
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
