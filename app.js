import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Importa las rutas de usuario

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Permitir CORS
app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api', userRoutes); // Usa las rutas de usuario con el prefijo '/api'

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync();
    console.log('Database connected and tables created');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
