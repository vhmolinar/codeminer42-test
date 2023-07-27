import { body, validationResult } from 'express-validator';
import { validationResponse } from './utils';
import { StatusCodes } from 'http-status-codes';

export async function execute(req, res, next) {
  try {
    const { idContract } = req.params;
    await req.service.executeContract(idContract);
    res.status(StatusCodes.NO_CONTENT).end();
  } catch(error) {
    next(error);
  }
}

export async function index(req, res, next) {
  try {
    const contracts = await req.service.listContracts();
    res.status(StatusCodes.OK).json({ contracts });
  } catch(error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      validationResponse(res, errors);
      return;
    }

    const data = {
      idPilot: req.body.idPilot,
      idRoute: req.body.idRoute,
      idShip: req.body.idShip,
      description: req.body.description,
      budget: req.body.budget,
      resourceCargo: req.body.resourceCargo
    };

    const contract = await req.service.saveContract(data);
    res.status(StatusCodes.OK).json(contract);
  } catch (error) {
    console.log('Create Contract Error',error);
    next(error);
  }
}

export const validate = method => {
  switch (method) {
    case 'create': {
      return [
        body('idPilot', 'Required param idPilot').exists(),
        body('idRoute', 'Required param idRoute').exists(),
        body('idShip', 'Required param idShip').exists(),
        body('description', 'Required param description').exists(),
        body('budget', 'Required param budget').exists(),
        body('resourceCargo', 'Required param resourceCargo').exists()        
      ];
    }
    default:
      throw new Error('Please provide a valid method name');
  }
};
