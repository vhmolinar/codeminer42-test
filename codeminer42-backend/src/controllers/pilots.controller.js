import { body, validationResult } from 'express-validator';
import { validationResponse } from './utils';
import { StatusCodes } from 'http-status-codes';

export async function index(req, res) {
  const pilots = await req.service.listPilots();
  res.status(StatusCodes.OK).json({ pilots });
}

export async function get(req, res) {
  const pilot = await req.service.getPilot(req.params.idPilot);
  res.status(StatusCodes.OK).json(pilot);
}

export async function create(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      validationResponse(res, errors);
      return;
    }

    const data = {
      certification: req.body.certification,
      name: req.body.name,
      credits: req.body.credits,
      location: req.body.location,
    };

    const pilot = await req.service.savePilot(data);
    res.status(StatusCodes.OK).json({ pilot: { id: pilot.id } });
  } catch (error) {
    console.log('Create Pilot Error',error);
    next(error);
  }
}

export const validate = method => {
  switch (method) {
    case 'create': {
      return [
        body('name', 'Required param name').exists(),
        body('credits', 'Required param credits').exists(),
        body('location', 'Required param location').exists()
      ];
    }
    default:
      throw new Error('Please provide a valid method name');
  }
};
