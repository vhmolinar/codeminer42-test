import { body, validationResult } from 'express-validator';
import { validationResponse } from './utils';
import { StatusCodes } from 'http-status-codes';

export async function create(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      validationResponse(res, errors);
      return;
    }

    const data = {
      name: req.body.name,      
      weight: req.body.weight
    };

    const resourceCargo = await req.service.saveResourceCargo(data);
    res.status(StatusCodes.OK).json(resourceCargo);
  } catch (error) {
    console.log('Create Resource Cargo Error',error);
    next(error);
  }
}


export const validate = method => {
  switch (method) {
    case 'create': {
      return [
        body('name', 'Required param name').exists(),
        body('weight', 'Required param weight').exists()
      ];
    }
    default:
      throw new Error('Please provide a valid method name');
  }
};
