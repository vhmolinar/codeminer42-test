/* istanbul ignore file */
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class TravelCargo extends Model {}

TravelCargo.init(
  {
    id_travel: {
      type: DataTypes.NUMBER,
      primaryKey: true
    },
    resource_cargo: {
      type: DataTypes.TEXT,
      primaryKey: true
    }
  },
  {
    sequelize,
    modelName: 'travel_cargo',
    tableName: 'travel_cargo',
    timestamps: false
  },
);
