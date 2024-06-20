import { createTask, updateTask } from '../controllers/taskController';
import Task from '../models/task';

jest.mock('../models/task');

describe('Task Controller', () => {
  
  describe('createTask', () => {
    it('should create a new task', async () => {
      const req = { body: { title: 'New Task', description: 'New Task Description', status: 'pending' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const newTask = { id: 1, title: 'New Task', description: 'New Task Description', status: 'pending' };

      Task.findAll.mockResolvedValue([]);
      Task.create.mockResolvedValue(newTask);

      await createTask(req, res);

      expect(Task.findAll).toHaveBeenCalled();
      expect(Task.create).toHaveBeenCalledWith(expect.objectContaining({ title: 'New Task', description: 'New Task Description', status: 'pending' }));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newTask);
    });

    it('should handle errors', async () => {
      const req = { body: { title: 'New Task', description: 'New Task Description', status: 'pending' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = 'Database error';

      Task.findAll.mockRejectedValue(new Error(errorMessage));

      await createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const req = { params: { id: 1 }, body: { title: 'Updated Task', description: 'Updated Task Description', status: 'completed' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const existingTask = { id: 1, title: 'Old Task', description: 'Old Task Description', status: 'pending', save: jest.fn() };

      Task.findByPk.mockResolvedValue(existingTask);

      await updateTask(req, res);

      expect(Task.findByPk).toHaveBeenCalledWith(1);
      expect(existingTask.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(existingTask);
    });

    it('should handle task not found', async () => {
      const req = { params: { id: 1 }, body: { title: 'Updated Task', description: 'Updated Task Description', status: 'completed' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Task.findByPk.mockResolvedValue(null);

      await updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Task not found' });
    });

    it('should handle errors', async () => {
      const req = { params: { id: 1 }, body: { title: 'Updated Task', description: 'Updated Task Description', status: 'completed' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const errorMessage = 'Database error';

      Task.findByPk.mockRejectedValue(new Error(errorMessage));

      await updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
