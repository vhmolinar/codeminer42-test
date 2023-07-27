/* istanbul ignore file */
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class ResourceCargo extends Model {}

ResourceCargo.init(
  {
    name: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    weight: DataTypes.TEXT
  },
  {
    sequelize,
    modelName: 'resource_cargo',
    tableName: 'resource_cargo',
    timestamps: false
  },
);
