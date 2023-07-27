/* istanbul ignore file */
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class Ship extends Model {}

Ship.init(
  {
    id_pilot: DataTypes.NUMBER,
    fuel_capacity: DataTypes.NUMBER,
    fuel_level: DataTypes.NUMBER,
    weight_capacity: DataTypes.NUMBER
  },
  {
    sequelize,
    modelName: 'ship',
    tableName: 'ship',
    timestamps: false
  },
);
