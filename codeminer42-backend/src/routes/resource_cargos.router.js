import express from 'express';
import { resourceCargosController } from '@/controllers';

export default express
  .Router()
  .post('/', resourceCargosController.validate('create'), resourceCargosController.create);
