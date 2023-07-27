import { appError } from '@/utils';
import { Pilot } from '@/database/models/pilot.model';
import { logger } from '@/utils';

import { getPilotShips } from './ships.service';

export async function addCredits(idPilot, income, transaction) {
  const pilot = await getPilot(idPilot);
  const { credits } = pilot;

  await Pilot.update({
    credits: parseFloat(credits) + parseFloat(income)
  }, {
    where: {
      id: idPilot
    },
    transaction
  });
}

export async function listPilots() {
  try {
    return (await Pilot.findAll());
  } catch (error) {
    return Promise.reject(
      appError('Failed to retrieve pilots'),
    );
  }
}

export async function getPilot(id) {
  try {
    const pilot = await Pilot.findByPk(id);
    pilot.ships = await getPilotShips(pilot.id);
    return pilot;
  } catch (error) {
    return Promise.reject(
      appError('Failed to retrieve pilots'),
    );
  }
}

export async function savePilot(data) {
  if (!data) {
    return Promise.reject(appError('Failed to save pilot'));
  }
  logger.info(`New pilot saved`, { data });
  return await Pilot.create(data);
}
