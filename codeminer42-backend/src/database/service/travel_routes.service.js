import { appError } from '@/utils';
import { TravelRoute } from '@/database/models/travel_route.model';
import { Op } from 'sequelize';
 
export async function getRouteById(id) {
  try {
    return (await TravelRoute.findByPk(id));
  } catch (error) {
    return Promise.reject(
      appError('Failed to retrieve route'),
    );
  }
}

export async function listRoutes(planetFrom, planetTo) {
  try {
    const where = {};
    if (planetFrom) {
      where['planet_from'] = {
        [Op.eq]: planetFrom
      };
    }
    if (planetTo) {
      where['planet_to'] = {
        [Op.eq]: planetTo
      };
    }

    const routes = await TravelRoute.findAll({ where })
    return routes;
  } catch (error) {
    return Promise.reject(
      appError('Failed to retrieve routes'),
    );
  }
}
