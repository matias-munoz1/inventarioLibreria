import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import taskRoutes from './routes/taskRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync();
    console.log('Database connected and tables created');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
