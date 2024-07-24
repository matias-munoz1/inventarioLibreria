// models/Movement.js
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
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'movements',
  }
);

export default Movement;
