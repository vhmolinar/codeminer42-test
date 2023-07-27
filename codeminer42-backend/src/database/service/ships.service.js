import { appError } from '@/utils';
import { Ship } from '@/database/models/ship.model';
import { logger } from '@/utils';
import { Op } from 'sequelize';

export async function consumeFuel(idShip, fuelCost, transaction) {
  const ship = await getShip(idShip);
  const { fuel_level: level } = ship;
  await Ship.update({
    fuel_level: parseFloat(level) - parseFloat(fuelCost)
  },
  {
    where: {
      id: idShip
    },
    transaction
  })
}

export async function getPilotShips(idPilot) {  
  const where = {
    id_pilot: {
      [Op.eq]: idPilot
    }
  };
  return Ship.findAll({ where });
}

export async function getShip(id) {
  try {
    return (await Ship.findByPk(id));
  } catch (error) {
    return Promise.reject(
      appError('Failed to retrieve ship'),
    );
  }
}

export async function saveShip(data) {
  if (!data) {
    return Promise.reject(appError('Failed to save ship'));
  }
  logger.info(`New ship saved`, { data });
  return await Ship.create({
    id_pilot: data.idPilot,
    fuel_capacity: data.fuelCapacity,
    fuel_level: data.fuelCapacity,
    weight_capacity: data.weightCapacity
  });
}
