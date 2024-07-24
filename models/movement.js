import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Movement = sequelize.define(
  'Movement',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fromCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'movements',
  }
);

export default Movement;
