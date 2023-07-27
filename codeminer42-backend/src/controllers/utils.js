import { logger } from '@/utils';
import { StatusCodes } from 'http-status-codes';

export const validationResponse = (res, errors) => {
  const errorList = errors.array();
  logger.error('Validation failure', { errors: errorList });
  res.status(StatusCodes.BAD_REQUEST).json({ errors: errorList });
};
