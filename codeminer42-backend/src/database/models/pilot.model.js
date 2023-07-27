/* istanbul ignore file */
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class Pilot extends Model {}

Pilot.init(
  {
    certification: DataTypes.TEXT,
    name: DataTypes.TEXT,
    credits: DataTypes.NUMBER,
    location: DataTypes.TEXT
  },
  {
    sequelize,
    modelName: 'pilot',
    tableName: 'pilot',
    timestamps: false
  },
);
