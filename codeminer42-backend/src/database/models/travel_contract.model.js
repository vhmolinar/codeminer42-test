/* istanbul ignore file */
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class TravelContract extends Model {}

TravelContract.init(
  {
    id_pilot: DataTypes.NUMBER,
    id_ship: DataTypes.NUMBER,
    id_route: DataTypes.NUMBER,
    description: DataTypes.TEXT,
    budget: DataTypes.NUMBER
  },
  {
    sequelize,
    modelName: 'travel_contract',
    tableName: 'travel_contract',
    timestamps: false
  },
);
