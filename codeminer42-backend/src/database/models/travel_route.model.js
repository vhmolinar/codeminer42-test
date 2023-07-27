/* istanbul ignore file */
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

export class TravelRoute extends Model {}

TravelRoute.init(
  {
    planet_from: DataTypes.TEXT,
    planet_to: DataTypes.TEXT,
    fuel_cost: DataTypes.NUMBER,
    available: DataTypes.BOOLEAN
  },
  {
    sequelize,
    modelName: 'travel_route',
    tableName: 'travel_route',
    timestamps: false
  },
);
