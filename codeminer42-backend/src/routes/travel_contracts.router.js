import express from 'express';
import { travelContractsController } from '@/controllers';

export default express.Router()
  .get('/', travelContractsController.index)
  .post('/', travelContractsController.validate('create'), travelContractsController.create)
  .put('/:idContract/execute', travelContractsController.execute);
