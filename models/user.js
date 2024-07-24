// models/user.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('viewer', 'editor', 'admin'),
      allowNull: false,
      defaultValue: 'viewer',
    },
  },
  {
    tableName: 'users',
  }
);

export { User };
