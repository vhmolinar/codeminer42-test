import express from 'express';
import { pilotsController, shipsController } from '@/controllers';

export default express.Router()
  .get('/', pilotsController.index)
  .get('/:idPilot', pilotsController.get)
  .post('/', pilotsController.validate('create'), pilotsController.create)
  .post('/:idPilot/ship', shipsController.validate('create'), shipsController.create)
  .get('/:idPilot/ship', shipsController.get);
