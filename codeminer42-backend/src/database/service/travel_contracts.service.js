import { validationError } from '@/utils';
import { TravelContract } from '@/database/models/travel_contract.model';
import { TravelCargo } from '@/database/models/travel_cargo.model';
import { logger } from '@/utils';
import { QueryTypes } from 'sequelize';
import { sequelize } from '../models';

import { getShip, consumeFuel } from './ships.service';
import { getRouteById } from './travel_routes.service';
import { addCredits } from './pilots.service';

export async function listContracts() {
  try {
    const res = await sequelize.query(`
      SELECT
        tc.id as id_contract,
        tc.description,
        tc.budget,
        tc.executed,
        p.name as pilot,
        r.planet_from,
        r.planet_to        
      FROM travel_contract tc
      INNER JOIN pilot p on p.id = tc.id_pilot
      INNER JOIN travel_route r on r.id = tc.id_route      
      `, { type: QueryTypes.SELECT }
    );
    return res;
  } catch (error) {
    return Promise.reject(
      appError('Failed to retrieve contracts'),
    );
  }
}

export async function saveContract(data) {
  await validateContractRules(data);

  const transaction = await sequelize.transaction();
  try {
    const { id: idTravel } = await TravelContract.create({
      id_pilot: data.idPilot,
      id_route: data.idRoute,
      id_ship: data.idShip,
      description: data.description,
      budget: data.budget
    }, { transaction });
    
    await TravelCargo.create({
      id_travel: idTravel,
      resource_cargo: data.resourceCargo
    }, { transaction });
  
    logger.info(`New contract saved`, { data });
    await transaction.commit();
    return { id: idTravel };
  } catch (e) {
    await transaction.rollback();
    throw e;
  }
}

export async function executeContract(idContract) {
  const contract = await TravelContract.findByPk(idContract);
  await validateContractExecution(contract);

  const transaction = await sequelize.transaction();  
  try {
    await TravelContract.update({
      executed: true
    }, {
      where: {
        id: idContract
      },
      transaction
    });

    const {
      id_pilot: idPilot,
      budget,
      id_ship: idShip,
      id_route: idRoute
    } = contract;
    await addCredits(idPilot, budget, transaction);
    
    const route = await getRouteById(idRoute); 
    const { fuel_cost: cost } = route;
    await consumeFuel(idShip, cost, transaction);

    await transaction.commit();
  } catch (e) {
    console.error('Rollback', e);
    await transaction.rollback();
    throw e;
  }
}

async function validateContractExecution(contract) {  
  const {
    id_ship: idShip, 
    id_route: idRoute
  } = contract;

  const ship = await getShip(idShip);
  const route = await getRouteById(idRoute);  

  const { fuel_cost: cost } = route;
  const { fuel_level: fuel } = ship;

  if (parseFloat(fuel) < parseFloat(cost)) {
    return Promise.reject(
      validationError('Not enough fuel')
    );
  }
}

async function validateContractRules(data) {
  const { idRoute } = data;
  const route = await getRouteById(idRoute);  

  const { available: routeAvailable } = route;

  if (!routeAvailable) {
    return Promise.reject(
      validationError('Route path is blocked')
    );
  }
}
