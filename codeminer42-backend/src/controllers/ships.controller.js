import { body, validationResult } from 'express-validator';
import { validationResponse } from './utils';
import { StatusCodes } from 'http-status-codes';

export async function get(req, res) {  
  const { idPilot } = req.params;
  const ships = await req.service.getPilotShips(idPilot);
  res.status(StatusCodes.OK).json(ships);
}

export async function create(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      validationResponse(res, errors);
      return;
    }

    const data = {
      idPilot: req.params.idPilot,
      fuelCapacity: req.body.fuelCapacity,      
      weightCapacity: req.body.weightCapacity
    };

    const ship = await req.service.saveShip(data);
    res.status(StatusCodes.OK).json({ ship: { id: ship.id } });
  } catch (error) {
    console.log('Create Ship Error',error);
    next(error);
  }
}


export const validate = method => {
  switch (method) {
    case 'create': {
      return [
        body('fuelCapacity', 'Required param fuelCapacity').exists(),
        body('weightCapacity', 'Required param weightCapacity').exists()
      ];
    }
    default:
      throw new Error('Please provide a valid method name');
  }
};
