// models/Book.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Book = sequelize.define(
  'Book',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
    },
    publisher: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'books',
  }
);

export default Book;
