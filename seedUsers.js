// seedUsers.js
import bcrypt from 'bcrypt';
import { User } from './models/user.js';

const users = [
  {
    email: 'cliente@gmail.com',
    password: bcrypt.hashSync('password', 10),
    role: 'viewer',
  },
  {
    email: 'bodeguero@gmail.com',
    password: bcrypt.hashSync('password', 10),
    role: 'editor',
  },
  {
    email: 'jefebodega@gmail.com',
    password: bcrypt.hashSync('password', 10),
    role: 'admin',
  },
];

const seedUsers = async () => {
  try {
    for (const user of users) {
      await User.create(user);
    }
    console.log('Users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

export default seedUsers;
