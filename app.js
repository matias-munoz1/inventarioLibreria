// app.js
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import seedUsers from './seedUsers.js'; // Importar la función seedUsers

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', bookRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Sincronizar la base de datos y asegurar que las tablas existan
    await sequelize.sync({ force: true });
    console.log('Database connected and tables created');

    // Ejecutar el script de inicialización de usuarios
    await seedUsers();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
