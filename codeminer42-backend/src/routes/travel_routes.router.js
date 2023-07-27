import express from 'express';
import { travelRoutesController } from '@/controllers';

export default express.Router()
.get('/', travelRoutesController.index);
