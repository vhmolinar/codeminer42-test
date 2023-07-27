import { appError } from '@/utils';
import { ResourceCargo } from '@/database/models/resource_cargos.model';
import { logger } from '@/utils';

export async function saveResourceCargo(data) {
  if (!data) {
    return Promise.reject(appError('Failed to save resource cargo'));
  }
  logger.info(`New resource cargo saved`, { data });
  return await ResourceCargo.create(data);
}
