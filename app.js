import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express(); // Crea una instancia de la aplicación Express
const PORT = process.env.PORT || 3000;

// Middleware para permitir solicitudes CORS
app.use(cors()); // Usa cors aquí

// Middleware para parsear JSON en las solicitudes entrantes
app.use(express.json());
app.use('/api', taskRoutes);

// Middleware para manejar errores
app.use(errorHandler);

// Inicia el servidor y sincroniza los modelos con la base de datos
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    // Sincroniza los modelos con la base de datos
    // Si las tablas no existen, las crea automáticamente
    await sequelize.sync();
    console.log('Database connected and tables created');
  } catch (error) {
    // Manejo de errores en la conexión a la base de datos
    console.error('Unable to connect to the database:', error);
  }
});
