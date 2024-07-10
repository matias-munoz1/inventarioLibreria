// app.js
import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
// import taskRoutes from './routes/taskRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
// import errorHandler from './middlewares/errorHandler.js'; // Comentado para desactivarlo

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use('/api', taskRoutes);
app.use('/api', bookRoutes);
// app.use(errorHandler); // Comentado para desactivarlo

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync({ force: true });
    console.log('Database connected and tables created');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
